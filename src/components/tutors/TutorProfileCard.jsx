import TutorProfilePortrait from "@/components/tutors/TutorProfilePortrait"

const labelsByLocale = {
  fr: {
    details: "Voir le profil",
    subjects: "Matières",
    levels: "Niveaux",
    formats: "Format",
    languages: "Langues",
    zones: "Zones",
    teachingStyle: "Style d'accompagnement",
  },
  en: {
    details: "View profile",
    subjects: "Subjects",
    levels: "Levels",
    formats: "Format",
    languages: "Languages",
    zones: "Areas",
    teachingStyle: "Teaching style",
  },
}

function text(value) {
  return typeof value === "string" ? value.trim() : ""
}

function ProfileFacts({ profile, labels, compact = false }) {
  const facts = [
    [labels.subjects, profile?.subjects],
    [labels.levels, profile?.levels],
    [labels.formats, profile?.formats],
    [labels.languages, profile?.languages],
    [labels.zones, profile?.zones],
  ].filter(([, value]) => text(value))

  return (
    <dl className={compact ? "space-y-1.5 text-sm text-[#25456f]" : "mt-5 grid gap-3 text-sm text-[#25456f] sm:grid-cols-2"}>
      {facts.map(([label, value]) => (
        <div key={label} className={compact ? "flex gap-2" : "rounded-2xl bg-[#eff5ff] px-3 py-2.5"}>
          <dt className="shrink-0 font-semibold text-[#15315a]">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function TutorProfileCard({ profile, locale = "fr", variant = "public", labels: customLabels }) {
  const labels = { ...labelsByLocale[locale], ...customLabels }
  const headline = text(profile?.[`headline_${locale}`]) || text(profile?.headline_fr) || text(profile?.headline_en)
  const bio = text(profile?.[`bio_${locale}`]) || text(profile?.bio_fr) || text(profile?.bio_en)
  const teachingStyle = text(profile?.[`teaching_style_${locale}`]) || text(profile?.teaching_style_fr) || text(profile?.teaching_style_en)
  const isCompact = variant === "compact"

  return (
    <article className={`overflow-hidden rounded-[28px] border border-[#cfddf3] bg-white text-[#15315a] shadow-[0_16px_45px_rgba(21,49,90,0.1)] ${isCompact ? "p-4" : "p-6"}`}>
      <div className={`flex gap-4 ${isCompact ? "items-center" : "items-start"}`}>
        <div className={`shrink-0 overflow-hidden rounded-2xl ${isCompact ? "h-14 w-14" : "h-20 w-20"}`}>
          <TutorProfilePortrait profile={profile} locale={locale} fallbackLabel={labels.portraitFallback} />
        </div>
        <div className="min-w-0">
          <h3 className={isCompact ? "font-display text-xl font-semibold" : "font-display text-2xl font-semibold"}>{profile?.display_name}</h3>
          {headline ? <p className="mt-1 text-sm font-medium text-[#28608f]">{headline}</p> : null}
        </div>
      </div>

      {isCompact ? <ProfileFacts profile={profile} labels={labels} compact /> : null}

      {!isCompact ? (
        <details className="group mt-5 rounded-2xl border border-[#dce7f7] bg-[#f8fbff] px-4 py-3">
          <summary className="cursor-pointer list-none font-semibold text-[#15315a] marker:hidden">{labels.details}</summary>
          <div className="mt-4 space-y-4 text-sm leading-6 text-[#25456f]">
            {bio ? <p>{bio}</p> : null}
            {teachingStyle ? <p><span className="font-semibold text-[#15315a]">{labels.teachingStyle}</span> — {teachingStyle}</p> : null}
            <ProfileFacts profile={profile} labels={labels} />
          </div>
        </details>
      ) : null}
    </article>
  )
}
