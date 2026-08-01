export function HowItWorksSection({ locale = "fr" }) {
  const steps = locale === "en"
    ? ["Describe the level, subject and sticking point.", "We confirm the right tutor and a realistic time.", "You use the portal for sessions, recaps and payments."]
    : ["Décrivez le niveau, la matière et ce qui bloque.", "Nous confirmons le bon tuteur et un créneau réaliste.", "Le portail sert au suivi des séances, résumés et paiements."]

  return <section className="pt-12 sm:pt-16" aria-labelledby="how-it-works-title">
    <div className="journey-eyebrow">{locale === "en" ? "How it works" : "Comment ça marche"}</div>
    <h2 id="how-it-works-title" className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">{locale === "en" ? "One clear next step at a time." : "Un prochain pas clair à la fois."}</h2>
    <div className="mt-6 grid gap-3 sm:grid-cols-3">{steps.map((step, index) => <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"><div className="text-sm font-bold text-[#f5c977]">0{index + 1}</div><p className="mt-3 text-sm leading-6 text-white/72">{step}</p></div>)}</div>
  </section>
}
