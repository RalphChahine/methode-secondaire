import { ExternalLink, FileText } from "lucide-react"

import { getSessionMaterials } from "@/lib/portalMaterials"

export default function TutorSessionMaterialsPanel({ copy, sessions = [], materials = [] }) {
  const groups = sessions
    .map((session) => ({
      session,
      materials: getSessionMaterials(materials, session.session_id),
    }))
    .filter((group) => group.materials.length)

  if (!groups.length) {
    return null
  }

  return (
    <section className="panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5">
      <div className="journey-eyebrow">{copy.tutorMaterialsEyebrow}</div>
      <h2 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">{copy.tutorMaterialsTitle}</h2>

      <div className="mt-5 space-y-4">
        {groups.map(({ session, materials: sessionMaterials }) => (
          <div key={session.session_id} className="rounded-[18px] border border-white/10 bg-white/5 p-3">
            <div className="text-sm font-semibold text-white/82">
              {session.student_name || session.student_level_subject || session.session_id}
            </div>
            <div className="mt-3 space-y-2">
              {sessionMaterials.map((material) => material.drive_url ? (
                <a
                  key={material.material_id}
                  href={material.drive_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${copy.materialsOpen}: ${material.file_name}`}
                  className="flex min-h-11 items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]"
                >
                  <FileText className="h-4 w-4" />
                  <span className="truncate">{material.file_name}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <div key={material.material_id} className="flex min-h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/62">
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{material.file_name}</span>
                  <span className="text-xs text-white/45">{copy.materialsOpenUnavailable}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
