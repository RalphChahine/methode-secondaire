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

export default function Sciences() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-20 -right-40 h-[480px] w-[480px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-240px] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-28">
        {/* HERO */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={item} className="flex items-center gap-3">
            <Badge className="bg-white/10 text-white border border-white/15">
              Sciences
            </Badge>
            <span className="text-sm text-white/60">Secondaire 1 à 5</span>
          </motion.div>

          <motion.h1 variants={item} className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
            Comprendre la science,
            <span className="block text-white/70">pas juste la mémoriser.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-lg text-white/70">
            Physique, chimie, électricité — on rend ça clair, visuel et logique.
            Parfait pour devoirs, labos et examens.
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <Button className="rounded-2xl bg-white text-black hover:bg-white/90 px-6 py-6">
              Réserver un cours de sciences
            </Button>
          </motion.div>
        </motion.div>

        {/* TOPICS */}
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
            <TopicCard
              title="Secondaire 1–2"
              topics={[
                "Méthode scientifique",
                "Mesures & unités",
                "Énergie & transformations",
                "Écosystèmes (selon niveau)",
              ]}
            />
            <TopicCard
              title="Secondaire 3"
              topics={[
                "Chimie de base (atomes, molécules)",
                "Forces & mouvement (intro)",
                "Graphes & interprétation",
                "Problèmes guidés",
              ]}
            />
            <TopicCard
              title="Secondaire 4–5"
              topics={[
                "Physique (mécanique, électricité)",
                "Chimie (moles, réactions, stœchiométrie)",
                "Labos + analyse",
                "Préparation examens",
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
            Approche en 3 étapes
          </motion.h2>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <Step step="01" title="Visualiser" desc="Schémas simples pour comprendre les concepts." />
            <Step step="02" title="Appliquer" desc="Exercices ciblés + méthodes de résolution." />
            <Step step="03" title="Réussir" desc="Questions type examens + gestion du temps." />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <MotionCard className="rounded-3xl border-white/20 bg-white/10 p-8 text-center">
            <div className="text-2xl font-semibold">On fait ça simple et logique.</div>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">
              On identifie ce qui bloque, on clarifie avec des exemples, puis on pratique jusqu’à ce que ça devienne naturel.
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

function TopicCard({ title, topics }) {
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

function Step({ step, title, desc }) {
  return (
    <MotionCard className="rounded-3xl border-white/15 bg-white/5 p-6">
      <div className="text-sm text-white/50">Étape {step}</div>
      <div className="mt-1 text-xl font-semibold">{title}</div>
      <div className="mt-2 text-sm text-white/70">{desc}</div>
    </MotionCard>
  )
}
