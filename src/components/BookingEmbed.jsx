export default function BookingEmbed() {
  return (
    <div className="relative rounded-3xl bg-white p-3 shadow-2xl">
      {/* subtle glow */}
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-white/40 blur-xl opacity-30" />

      <div className="relative overflow-hidden rounded-2xl">
        <iframe
          src="https://calendar.app.google/o7Qmq62Gqg2dQCe16"
          width="100%"
          height="700"
          frameBorder="0"
          scrolling="no"
          title="Réserver un rendez-vous"
        />
      </div>
    </div>
  )
}
