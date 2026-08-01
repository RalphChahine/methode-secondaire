import { Link } from "react-router-dom"

import TutorProfileCard from "@/components/tutors/TutorProfileCard"

export default function TutorProfileRoster({ copy = {}, profiles = [], status = "ready", locale = "fr", fallback = {} }) {
  if (status === "loading") {
    return (
      <section aria-live="polite" className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 text-white">
        <h2 className="font-display text-2xl font-semibold">{copy.loadingTitle}</h2>
        {copy.loadingText ? <p className="mt-2 text-sm leading-6 text-white/72">{copy.loadingText}</p> : null}
      </section>
    )
  }

  if (status === "error") {
    return (
      <section role="status" className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 text-white">
        <h2 className="font-display text-2xl font-semibold">{copy.errorTitle}</h2>
        {copy.errorText ? <p className="mt-2 text-sm leading-6 text-white/72">{copy.errorText}</p> : null}
        {fallback.requestPath ? <Link className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#f5c977] px-4 text-sm font-semibold text-[#071631]" to={fallback.requestPath}>{fallback.requestLabel}</Link> : null}
      </section>
    )
  }

  if (!profiles.length) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 text-white">
        <h2 className="font-display text-2xl font-semibold">{fallback.title || copy.emptyTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-white/72">{fallback.description || copy.emptyText}</p>
        {fallback.requestPath ? <Link className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#f5c977] px-4 text-sm font-semibold text-[#071631]" to={fallback.requestPath}>{fallback.requestLabel}</Link> : null}
      </section>
    )
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {profiles.map((profile) => (
        <TutorProfileCard key={profile.tutor_id || profile.slug || profile.display_name} profile={profile} locale={locale} labels={copy} />
      ))}
    </div>
  )
}
