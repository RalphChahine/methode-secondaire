import { useEffect, useState } from "react"
import {
  Camera,
  CircleCheck,
  FileText,
  ImagePlus,
  LoaderCircle,
  MessageSquareText,
  RotateCcw,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  sendPortalSessionMessage,
  uploadPortalSessionMaterial,
  withdrawPortalSessionMaterial,
} from "@/lib/portalClient"
import {
  MAX_PORTAL_MATERIAL_FILES,
  getSessionMaterials,
  preparePortalMaterialUpload,
} from "@/lib/portalMaterials"

function materialEntryId(file) {
  return `${file.name}-${file.size}-${file.lastModified}`
}

export function stagePortalMaterialFiles(currentEntries, selectedFiles, sharedCount = 0) {
  const current = Array.isArray(currentEntries) ? currentEntries : []
  const existingIds = new Set(current.map((entry) => entry.id))
  const available = Math.max(0, MAX_PORTAL_MATERIAL_FILES - sharedCount - current.length)
  const additions = Array.from(selectedFiles || [])
    .filter((file) => !existingIds.has(materialEntryId(file)))
    .slice(0, available)
    .map((file) => ({
      id: materialEntryId(file),
      file,
      name: file.name,
      state: "ready",
      error: "",
    }))

  return [...current, ...additions]
}

export function getVisibleSessionMaterials(materials, sessionId, withdrawnMaterialIds = []) {
  const withdrawnIds = withdrawnMaterialIds instanceof Set
    ? withdrawnMaterialIds
    : new Set(withdrawnMaterialIds)

  return getSessionMaterials(materials, sessionId)
    .filter((material) => !withdrawnIds.has(material.material_id))
}

export async function processPortalMaterialWithdrawal({
  token,
  materialId,
  withdraw = withdrawPortalSessionMaterial,
  onWithdrawn,
  onSaved,
}) {
  const result = await withdraw({ token, materialId })
  if (!result.ok) {
    return result
  }

  onWithdrawn(materialId)
  try {
    await onSaved?.({ silent: true })
  } catch {
    // The server withdrawal is already authoritative. Keep the row hidden
    // locally and let a later dashboard refresh reconcile the CRM snapshot.
  }
  return result
}

export async function processReadyPortalMaterials({
  entries,
  token,
  sessionId,
  prepare = preparePortalMaterialUpload,
  upload = uploadPortalSessionMaterial,
  copy,
  getErrorMessage,
  onEntryChange,
}) {
  let shared = 0
  let failed = 0
  const readyEntries = entries.filter((entry) => entry.state === "ready")

  for (const entry of readyEntries) {
    onEntryChange(entry.id, { state: "uploading", error: "" })

    try {
      const material = await prepare(entry.file)
      if (material?.ok === false) {
        failed += 1
        onEntryChange(entry.id, {
          state: "failed",
          error: getErrorMessage(copy, material.code),
        })
        continue
      }

      const result = await upload({ token, sessionId, material })
      if (!result.ok) {
        failed += 1
        onEntryChange(entry.id, {
          state: "failed",
          error: getErrorMessage(copy, result.code),
        })
        continue
      }

      shared += 1
      onEntryChange(entry.id, { state: "shared", error: "" })
    } catch {
      failed += 1
      onEntryChange(entry.id, {
        state: "failed",
        error: getErrorMessage(copy, "SESSION_MATERIAL_IMAGE_PROCESSING_FAILED"),
      })
    }
  }

  return { shared, failed }
}

export default function SessionMaterialsPanel({
  copy,
  session,
  materials = [],
  token,
  onSaved,
  formatDateTime,
  getErrorMessage,
}) {
  const [stagedEntries, setStagedEntries] = useState([])
  const [note, setNote] = useState("")
  const [status, setStatus] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [withdrawingId, setWithdrawingId] = useState("")
  const [withdrawnMaterialIds, setWithdrawnMaterialIds] = useState([])
  const sharedMaterials = getVisibleSessionMaterials(
    materials,
    session?.session_id,
    withdrawnMaterialIds,
  )
  const isUpcoming = Boolean(
    session?.start_at &&
    new Date(session.start_at).getTime() > Date.now() &&
    !["cancelled", "no_show", "completed"].includes(session.session_status),
  )

  useEffect(() => {
    if (!sharedMaterials.length) {
      return
    }

    const sharedNames = new Set(sharedMaterials.map((material) => material.file_name))
    setStagedEntries((current) => current.filter(
      (entry) => entry.state !== "shared" || !sharedNames.has(entry.name),
    ))
  }, [materials, session?.session_id])

  function stageFiles(event) {
    const selectedFiles = Array.from(event.target.files || [])
    setStatus("")
    setStagedEntries((current) => {
      const next = stagePortalMaterialFiles(current, selectedFiles, sharedMaterials.length)
      if (next.length - current.length < selectedFiles.filter(
        (file) => !current.some((entry) => entry.id === materialEntryId(file)),
      ).length) {
        setStatus(getErrorMessage(copy, "SESSION_MATERIAL_LIMIT_REACHED"))
      }
      return next
    })
    event.target.value = ""
  }

  function updateEntry(id, update) {
    setStagedEntries((current) => current.map(
      (entry) => entry.id === id ? { ...entry, ...update } : entry,
    ))
  }

  async function sendToTutor() {
    if (!session?.session_id) {
      return
    }

    const readyEntries = stagedEntries.filter((entry) => entry.state === "ready")
    const preparationNote = note.trim()
    if (!readyEntries.length && !preparationNote) {
      return
    }

    setIsSending(true)
    setStatus("")
    const outcome = await processReadyPortalMaterials({
      entries: readyEntries,
      token,
      sessionId: session.session_id,
      copy,
      getErrorMessage,
      onEntryChange: updateEntry,
    })

    let noteWasSent = false
    if (preparationNote) {
      const result = await sendPortalSessionMessage({
        token,
        sessionId: session.session_id,
        message: [
          `${copy.sessionPrepTitle} · ${formatDateTime(session.start_at)}`,
          preparationNote,
        ].join("\n\n"),
      })

      if (result.ok) {
        noteWasSent = true
        setNote("")
        setStatus(copy.sessionPrepSent)
      } else {
        setStatus(getErrorMessage(copy, result.code))
      }
    }

    setIsSending(false)
    if (outcome.shared > 0 || noteWasSent) {
      onSaved?.()
    }
  }

  async function withdraw(materialId) {
    setWithdrawingId(materialId)
    setStatus("")
    const result = await processPortalMaterialWithdrawal({
      token,
      materialId,
      onWithdrawn: (withdrawnId) => {
        setWithdrawnMaterialIds((current) => current.includes(withdrawnId)
          ? current
          : [...current, withdrawnId])
        setWithdrawingId("")
        setStatus(copy.materialsWithdrawn)
      },
      onSaved,
    })

    if (result.ok) {
      return
    }

    setWithdrawingId("")
    setStatus(getErrorMessage(copy, result.code))
  }

  const canSend = stagedEntries.some((entry) => entry.state === "ready") || Boolean(note.trim())

  return (
    <section id="portal-preparation" className="panel-soft min-w-0 scroll-mt-24 rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#f5c977]">
          <Camera className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="journey-eyebrow">{copy.materialsEyebrow}</div>
          <h2 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">{copy.materialsTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-white/62">{session ? copy.materialsDescription : copy.materialsNoSession}</p>
        </div>
      </div>

      {session ? (
        <>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <label className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#f5c977] px-4 py-3 text-center text-sm font-semibold text-[#071631] transition hover:bg-[#f7d38f]">
              <input type="file" accept="image/*" capture="environment" onChange={stageFiles} className="sr-only" />
              <Camera className="h-4 w-4" />
              {copy.materialsCapture}
            </label>
            <label className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
              <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" multiple onChange={stageFiles} className="sr-only" />
              <ImagePlus className="h-4 w-4" />
              {copy.materialsAddFile}
            </label>
          </div>

          <p className="mt-3 text-xs leading-5 text-white/50">
            {copy.materialsFileTypes} {copy.materialsFileLimit} {copy.materialsSessionLimit}
          </p>

          {(sharedMaterials.length || stagedEntries.length) ? (
            <div className="mt-3 space-y-2">
              {sharedMaterials.map((material) => (
                <div key={material.material_id} className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#f5c977]/20 bg-[#f5c977]/8 px-3 py-2.5 text-sm text-white/82">
                  <CircleCheck className="h-4 w-4 shrink-0 text-[#f5c977]" />
                  <span className="min-w-0 flex-1 truncate">{material.file_name}</span>
                  <span className="shrink-0 text-xs text-white/50">{copy.materialsShared}</span>
                  {isUpcoming ? (
                    <button
                      type="button"
                      disabled={withdrawingId === material.material_id}
                      onClick={() => withdraw(material.material_id)}
                      className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-full px-2 text-xs font-semibold text-white/64 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                    >
                      {withdrawingId === material.material_id
                        ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                        : <Trash2 className="h-3.5 w-3.5" />}
                      {copy.materialsWithdraw}
                    </button>
                  ) : null}
                </div>
              ))}

              {stagedEntries.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/78">
                  <div className="flex min-w-0 items-center gap-3">
                    {entry.state === "uploading"
                      ? <LoaderCircle className="h-4 w-4 shrink-0 animate-spin text-[#f5c977]" />
                      : entry.state === "shared"
                        ? <CircleCheck className="h-4 w-4 shrink-0 text-[#f5c977]" />
                        : <FileText className="h-4 w-4 shrink-0 text-[#f5c977]" />}
                    <span className="min-w-0 flex-1 truncate">{entry.name}</span>
                    <span className="shrink-0 text-xs text-white/50">
                      {entry.state === "ready" ? copy.materialsReadyState : null}
                      {entry.state === "uploading" ? copy.materialsUploading : null}
                      {entry.state === "shared" ? copy.materialsShared : null}
                      {entry.state === "failed" ? copy.materialsFailed : null}
                    </span>
                    {entry.state === "failed" ? (
                      <button
                        type="button"
                        onClick={() => updateEntry(entry.id, { state: "ready", error: "" })}
                        className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-full px-2 text-xs font-semibold text-white/64 transition hover:bg-white/10 hover:text-white"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        {copy.materialsRetry}
                      </button>
                    ) : null}
                    {["ready", "failed"].includes(entry.state) ? (
                      <button
                        type="button"
                        onClick={() => setStagedEntries((current) => current.filter((item) => item.id !== entry.id))}
                        className="shrink-0 text-xs font-semibold text-white/58 transition hover:text-white"
                      >
                        {copy.materialsRemove}
                      </button>
                    ) : null}
                  </div>
                  {entry.error ? <p className="mt-2 text-xs leading-5 text-red-100/82">{entry.error}</p> : null}
                </div>
              ))}
            </div>
          ) : null}

          <label className="mt-3 block text-sm font-semibold text-white/84">
            {copy.materialsNote}
            <Textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-2 min-h-20 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
              placeholder={copy.materialsNotePlaceholder}
            />
          </label>

          <Button
            type="button"
            disabled={isSending || !canSend}
            onClick={sendToTutor}
            className="mt-3 min-h-11 w-full rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
          >
            {isSending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <MessageSquareText className="h-4 w-4" />}
            {copy.materialsSendToTutor}
          </Button>
          <p className="mt-3 text-xs leading-5 text-white/50">{copy.materialsRetention}</p>
          {status ? <p className="mt-3 text-sm leading-6 text-white/68">{status}</p> : null}
        </>
      ) : null}
    </section>
  )
}
