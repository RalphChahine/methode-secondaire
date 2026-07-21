import { ArrowRight } from "lucide-react"

import { DECLIC_REQUEST_URL } from "@/config/booking"
import { Button } from "@/components/ui/button"

export default function BookingEmbed({
  title = "Demander une séance ciblée avec Méthode Secondaire",
}) {
  return (
    <div className="glass-panel rounded-[24px] p-6 text-center text-white">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/68">
        Creez votre profil, puis notre equipe vous propose le bon tuteur avant de vous laisser choisir un creneau.
      </p>
      <Button asChild className="mt-5 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
        <a href={DECLIC_REQUEST_URL}>
          Demander une séance ciblée
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    </div>
  )
}
