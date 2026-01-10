export default function Placeholder({ title }) {
  return (
    <div className="min-h-[60vh] bg-black text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <p className="mt-4 text-white/70">Page en construction.</p>
      </div>
    </div>
  )
}
