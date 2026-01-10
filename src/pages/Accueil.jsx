import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MotionCard from "@/components/MotionCard"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import BookingEmbed from "@/components/BookingEmbed"
import { BOOKING_URL } from "@/config/booking"



const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

export default function Accueil() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-24 -right-48 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-260px] left-1/2 h-[680px] w-[900px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-28">
        {/* HERO */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={item} className="flex items-center gap-3">
            <Badge className="bg-white/10 text-white border border-white/15 hover:bg-white/10">
              Québec • Secondaire 1 à 5
            </Badge>
            <span className="text-sm text-white/60">Maths • Sciences • Examens</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight"
          >
            Méthode Secondaire
            <span className="block text-white/70">apprendre vite, comprendre pour vrai.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-lg text-white/70">
            Une approche claire et structurée pour réussir en mathématiques et en sciences.
            En ligne ou en présentiel.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button className="relative rounded-2xl px-6 py-6 text-base bg-white text-black hover:bg-white/90 overflow-hidden">
              <span className="pointer-events-none absolute inset-0 rounded-2xl blur-xl bg-white/20 opacity-0 hover:opacity-100 transition" />
              <span className="relative">Réserver une séance</span>
            </Button>

            <Button
              variant="outline"
              className="rounded-2xl px-6 py-6 text-base border-white/20 text-white bg-transparent hover:bg-white/10"
              onClick={() => document.getElementById("programmes")?.scrollIntoView({ behavior: "smooth" })}
            >
              Voir les programmes
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-10 grid grid-cols-3 gap-3 max-w-md">
            <MiniStat label="Clarté" value="⭐⭐⭐⭐⭐" />
            <MiniStat label="Méthode" value="Structurée" />
            <MiniStat label="Suivi" value="Hebdo" />
          </motion.div>
        </motion.div>

        {/* FEATURES */}
        <section id="programmes" className="mt-16">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item} className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <h2 className="text-2xl font-semibold">Programmes</h2>
                <p className="mt-2 text-white/70 max-w-2xl">
                  Aligné au programme du Québec (Sec 1 à 5). On comprend, on pratique, on réussit.
                </p>
              </div>
              <Badge className="bg-white/10 text-white border border-white/15 hover:bg-white/10">
                En ligne • Présentiel
              </Badge>
            </motion.div>

            <motion.div variants={item} className="mt-6 grid md:grid-cols-3 gap-4">
              <Feature
                title="Explications ultra claires"
                desc="On simplifie sans perdre la rigueur. Tu comprends le pourquoi."
              />
              <Feature
                title="Méthode structurée"
                desc="Plan de match, exercices ciblés, progression visible."
              />
              <Feature
                title="Préparation examens"
                desc="Stratégie, exercices type, gestion du temps — pour performer."
              />
            </motion.div>

            <motion.div variants={item} className="mt-8">
              <Separator className="bg-white/10" />
            </motion.div>

            <motion.div variants={item} className="mt-8 grid md:grid-cols-2 gap-4">
              <MotionCard className="rounded-3xl border-white/15 bg-white/5 text-white p-6">
                <div className="text-sm text-white/60">Mathématiques</div>
                <div className="mt-2 text-xl font-semibold">Algèbre • Fonctions • Géométrie</div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {["Résolution d’équations", "Fonctions & graphes", "Problèmes & stratégies"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                      {t}
                    </li>
                  ))}
                </ul>
              </MotionCard>

              <MotionCard className="rounded-3xl border-white/15 bg-white/5 text-white p-6">
                <div className="text-sm text-white/60">Sciences</div>
                <div className="mt-2 text-xl font-semibold">Physique • Chimie • Électricité</div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {["Forces & mouvement", "Réactions & matière", "Circuits & concepts"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                      {t}
                    </li>
                  ))}
                </ul>
              </MotionCard>
            </motion.div>
          </motion.div>
        </section>

        {/* PRICING */}
        <section id="prix" className="mt-20">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item}>
              <h2 className="text-2xl font-semibold">Tarifs</h2>
              <p className="mt-2 text-white/70 max-w-2xl">
                Choisis la formule qui correspond à ton rythme. Le suivi hebdo est le plus efficace.
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-6 grid md:grid-cols-3 gap-4">
              <Pricing title="À la carte" price="75$/h" bullets={["Flexible", "Ponctuel", "En ligne ou présence"]} />
              <Pricing
                title="Hebdomadaire"
                price="70$/h"
                highlight
                bullets={["Place réservée", "Suivi régulier", "Progrès rapides"]}
              />
              <Pricing title="Intensif" price="Sur demande" bullets={["Avant examens", "2–4 semaines", "Ciblé"]} />
            </motion.div>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-20">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={item}>
              <h2 className="text-2xl font-semibold">Contact</h2>
              <p className="mt-2 text-white/70 max-w-2xl">
                Appelle-moi, écris-moi, ou réserve directement. Réponse rapide.
              </p>
            </motion.div>

            {/* Info + form */}
            <motion.div variants={item} className="mt-6 grid lg:grid-cols-2 gap-4">
              {/* LEFT: Contact info */}
              <MotionCard className="rounded-3xl border-white/15 bg-white/5 text-white p-6">
                <div className="text-sm text-white/60">Zone</div>
                <div className="mt-1 font-medium">Montréal • Laval • En ligne</div>

                <div className="mt-5 text-sm text-white/60">Email</div>
                <a
                  className="mt-1 inline-block font-medium hover:underline"
                  href="mailto:ajoute-ton-email@exemple.com"
                >
                  ajoute-ton-email@exemple.com
                </a>

                <div className="mt-5 text-sm text-white/60">Téléphone</div>
                <a
                  className="mt-1 inline-block font-medium hover:underline"
                  href="tel:+15145551234"
                >
                  +1 (514) 555-1234
                </a>

                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <a href="tel:+15145551234" className="block">
                    <Button className="w-full rounded-2xl bg-white text-black hover:bg-white/90">
                      Appeler
                    </Button>
                  </a>

                  <a href="mailto:ajoute-ton-email@exemple.com" className="block">
                    <Button
                      variant="outline"
                      className="w-full rounded-2xl border-white/20 text-white bg-transparent hover:bg-white/10"
                    >
                      Email
                    </Button>
                  </a>
                </div>

                <div className="mt-3">
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="block">
                    <Button className="w-full rounded-2xl bg-white text-black hover:bg-white/90">
                      Réserver (Google Calendar)
                    </Button>
                  </a>
                </div>

                <div className="mt-3 text-xs text-white/50">
                  Astuce: le suivi hebdomadaire donne les meilleurs résultats.
                </div>
              </MotionCard>

              {/* RIGHT: Message form (for now -> mailto) */}
              <MotionCard className="rounded-3xl border-white/15 bg-white/5 text-white p-6">
                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const form = new FormData(e.currentTarget)
                    const nom = form.get("nom") || ""
                    const email = form.get("email") || ""
                    const sujet = form.get("sujet") || ""
                    const message = form.get("message") || ""

                    const body =
                      `Nom: ${nom}\n` +
                      `Email: ${email}\n` +
                      `Niveau/Matière: ${sujet}\n\n` +
                      `${message}`

                    const mailto = `mailto:ajoute-ton-email@exemple.com?subject=${encodeURIComponent(
                      "Méthode Secondaire — Demande"
                    )}&body=${encodeURIComponent(body)}`

                    window.location.href = mailto
                  }}
                >
                  <Input
                    name="nom"
                    className="bg-black/40 border-white/15 text-white placeholder:text-white/40"
                    placeholder="Nom"
                  />
                  <Input
                    name="email"
                    className="bg-black/40 border-white/15 text-white placeholder:text-white/40"
                    placeholder="Email"
                  />
                  <Input
                    name="sujet"
                    className="bg-black/40 border-white/15 text-white placeholder:text-white/40"
                    placeholder="Sec + matière (ex: Sec 4 maths)"
                  />
                  <Textarea
                    name="message"
                    className="min-h-[120px] bg-black/40 border-white/15 text-white placeholder:text-white/40"
                    placeholder="Ton message"
                  />
                  <Button type="submit" className="rounded-2xl bg-white text-black hover:bg-white/90 w-full">
                    Envoyer
                  </Button>
                  <div className="text-xs text-white/50">
                    (Ça ouvre ton app email avec le message prêt à envoyer.)
                  </div>
                </form>
              </MotionCard>
            </motion.div>

            {/* Booking embed (full width) */}
            <motion.div variants={item} className="mt-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-lg font-semibold">Réserver en ligne</div>
                  <div className="text-sm text-white/60">Choisis un moment qui te convient.</div>
                </div>
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  <Button
                    variant="outline"
                    className="rounded-2xl border-white/20 text-white bg-transparent hover:bg-white/10"
                  >
                    Ouvrir en plein écran
                  </Button>
                </a>
              </div>

              <div className="mt-4">
                <BookingEmbed />
              </div>
            </motion.div>
          </motion.div>
        </section>


        <footer className="mt-20 pt-10 border-t border-white/10 text-sm text-white/50">
          © {new Date().getFullYear()} Méthode Secondaire — Tous droits réservés.
        </footer>
      </main>
    </div>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs text-white/60">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  )
}

function Feature({ title, desc }) {
  return (
    <MotionCard className="rounded-3xl border-white/15 bg-white/5 text-white p-6">
      <div className="text-xl font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">{desc}</div>
    </MotionCard>
  )
}

function Pricing({ title, price, bullets, highlight }) {
  return (
    <MotionCard
      className={`rounded-3xl p-6 text-white ${highlight ? "border-white/30 bg-white/10" : "border-white/15 bg-white/5"
        }`}
    >
      <div className="flex items-center justify-between">
        <div className="font-medium">{title}</div>
        {highlight && <Badge className="bg-white text-black border-0">Recommandé</Badge>}
      </div>
      <div className="mt-4 text-3xl font-semibold">{price}</div>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            {b}
          </li>
        ))}
      </ul>
      <Button
        className={`mt-6 w-full rounded-2xl ${highlight
            ? "bg-white text-black hover:bg-white/90"
            : "bg-white/5 border border-white/15 hover:bg-white/10 text-white"
          }`}
      >
        Choisir
      </Button>
    </MotionCard>
  )
}
