import { ChevronRight, UsersRound } from "lucide-react"

import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"

export default function TutorStudents({ copy, groups = [], onSelect, detail }) {
  if (detail) return detail

  return (
    <PortalDetailPanel title={copy.tutorStudentsTitle} description={copy.tutorStudentsIntro}>
      {groups.length ? (
        <div className="space-y-2">
          {groups.map((group) => (
            <button key={group.key} type="button" onClick={() => onSelect?.(group)} className="flex min-h-16 w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c977]">
              <span className="flex min-w-0 items-center gap-3">
                <UsersRound className="h-5 w-5 shrink-0 text-[#f5c977]" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-white">{group.studentName}</span>
                  <span className="mt-1 block text-xs text-white/55">{group.sessions.length} {(copy.sessions || "sessions").toLowerCase()}</span>
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/50" />
            </button>
          ))}
        </div>
      ) : <p className="text-sm leading-6 text-white/60">{copy.tutorNoStudents}</p>}
    </PortalDetailPanel>
  )
}
