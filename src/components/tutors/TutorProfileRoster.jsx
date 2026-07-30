import TutorProfileCard from "@/components/tutors/TutorProfileCard"

export default function TutorProfileRoster({ copy = {}, profiles = [], status = "ready", locale = "fr" }) {
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
      </section>
    )
  }

  if (!profiles.length) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 text-white">
        <h2 className="font-display text-2xl font-semibold">{copy.emptyTitle}</h2>
        {copy.emptyText ? <p className="mt-2 text-sm leading-6 text-white/72">{copy.emptyText}</p> : null}
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
