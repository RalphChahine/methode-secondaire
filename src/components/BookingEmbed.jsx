import { BOOKING_URL } from "@/config/booking"

export default function BookingEmbed({
  title = "Réserver une séance avec Méthode Secondaire",
}) {
  return (
    <div className="glass-panel relative overflow-hidden rounded-[32px] p-3">
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <div className="overflow-hidden rounded-[24px] border border-slate-200/70 bg-white shadow-2xl">
        <iframe
          src={BOOKING_URL}
          width="100%"
          height="720"
          frameBorder="0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          scrolling="no"
          title={title}
        />
      </div>
    </div>
  )
}
