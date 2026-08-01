export default function HomeProofStrip({ locale = "fr" }) {
  const items = locale === "en"
    ? ["Reply within 24 business hours", "A tutor matched to the need", "A three-point recap after each session"]
    : ["Réponse sous 24 heures ouvrables", "Un tuteur choisi pour le besoin", "Un résumé en trois points après la séance"]

  return <section aria-label={locale === "en" ? "What you can expect" : "Ce que vous obtenez"} className="grid gap-3 pt-8 sm:grid-cols-3">
    {items.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm font-semibold text-white/82">{item}</div>)}
  </section>
}
