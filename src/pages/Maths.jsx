import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MotionCard from "@/components/MotionCard"

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

export default function Maths() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-20 -right-40 h-[480px] w-[480px] rounded-full bg-white/10 blur-3xl" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-28">
        {/* HERO */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={item} className="flex items-center gap-3">
            <Badge className="bg-white/10 text-white border border-white/15">
              Mathématiques
            </Badge>
            <span className="text-sm text-white/60">Secondaire 1 à 5</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight"
          >
            Réussir en maths,
            <span className="block text-white/70">sans stress ni panique.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-lg text-white/70">
            Algèbre, fonctions, géométrie et problèmes — expliqués clairement,
            étape par étape, selon le programme du Québec.
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <Button className="rounded-2xl bg-white text-black hover:bg-white/90 px-6 py-6">
              Réserver un cours de maths
            </Button>
          </motion.div>
        </motion.div>

        {/* LEVELS */}
        <section className="mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold"
          >
            Contenu couvert
          </motion.h2>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Level
              title="Secondaire 1–2"
              topics={[
                "Fractions et nombres rationnels",
                "Problèmes écrits",
                "Géométrie de base",
                "Priorités des opérations",
              ]}
            />

            <Level
              title="Secondaire 3"
              topics={[
                "Algèbre et équations",
                "Fonctions linéaires",
                "Systèmes",
                "Problèmes de modélisation",
              ]}
            />

            <Level
              title="Secondaire 4–5"
              topics={[
                "Fonctions quadratiques",
                "Exponentielles et rationnelles",
                "Trigonométrie",
                "Préparation examens ministériels",
              ]}
            />
          </div>
        </section>

        {/* METHOD */}
        <section className="mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold"
          >
            Ma méthode
          </motion.h2>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <MethodStep
              step="01"
              title="Comprendre"
              desc="On clarifie la théorie avec des exemples simples et visuels."
            />
            <MethodStep
              step="02"
              title="Appliquer"
              desc="On pratique avec des exercices ciblés et guidés."
            />
            <MethodStep
              step="03"
              title="Réussir"
              desc="On automatise la méthode pour les examens et devoirs."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <MotionCard className="rounded-3xl border-white/20 bg-white/10 p-8 text-center">
            <div className="text-2xl font-semibold">
              Besoin d’aide en mathématiques ?
            </div>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">
              Un suivi régulier fait toute la différence. On identifie les
              blocages et on bâtit une vraie confiance.
            </p>
            <div className="mt-6">
              <Button className="rounded-2xl bg-white text-black hover:bg-white/90 px-8 py-6">
                Réserver maintenant
              </Button>
            </div>
          </MotionCard>
        </section>
      </main>
    </div>
  )
}

function Level({ title, topics }) {
  return (
    <MotionCard className="rounded-3xl border-white/15 bg-white/5 p-6">
      <div className="text-lg font-semibold">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {topics.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            {t}
          </li>
        ))}
      </ul>
    </MotionCard>
  )
}

function MethodStep({ step, title, desc }) {
  return (
    <MotionCard className="rounded-3xl border-white/15 bg-white/5 p-6">
      <div className="text-sm text-white/50">Étape {step}</div>
      <div className="mt-1 text-xl font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">{desc}</div>
    </MotionCard>
  )
}
