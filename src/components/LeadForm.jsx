import { useState } from "react"
import { CalendarDays, Check, Clock3, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BOOKING_URL } from "@/config/booking"
import { siteConfig } from "@/lib/seo"

const copyByLocale = {
  fr: {
    noteTitle: "R\u00E9ponse rapide et orient\u00E9e action",
    noteText:
      "D\u00E9crivez la situation en une minute. Le retour permet ensuite de vous orienter vers le bon format ou le bon tuteur.",
    quickReply: "R\u00E9ponse vis\u00E9e sous 24 h ouvrables.",
    nameLabel: "Nom",
    namePlaceholder: "Nom de l'\u00E9l\u00E8ve ou du parent",
    emailLabel: "Email",
    emailPlaceholder: "adresse@email.com",
    subjectLabel: "Niveau et mati\u00E8re",
    subjectPlaceholder: "Ex. secondaire 4 maths ou secondaire 5 sciences",
    priorityLabel: "Besoin le plus urgent",
    priorityPlaceholder: "Choisir la situation qui ressemble le plus",
    priorityOptions: [
      { value: "examens", label: "Pr\u00E9paration d'examens" },
      { value: "suivi", label: "Suivi hebdomadaire" },
      { value: "rattrapage", label: "Rattrapage ou remise \u00E0 niveau" },
      { value: "incertain", label: "Je ne suis pas encore certain" },
    ],
    formatLabel: "Format souhait\u00E9",
    formatOptions: [
      { value: "en-ligne", label: "En ligne" },
      { value: "presentiel", label: "Pr\u00E9sentiel si possible" },
      { value: "flexible", label: "Les deux me conviennent" },
    ],
    messageLabel: "Message",
    messagePlaceholder: "D\u00E9crivez bri\u00E8vement la situation, les difficult\u00E9s ou l'objectif.",
    submitIdle: "Envoyer la demande",
    submitSending: "Envoi en cours...",
    formNote: "Plus le contexte est clair, plus l'orientation peut \u00EAtre rapide d\u00E8s le premier retour.",
    successTitle: "Demande envoy\u00E9e",
    successText:
      "La demande a bien \u00E9t\u00E9 transmise. Si le besoin est urgent, vous pouvez aussi appeler tout de suite pour cadrer la suite plus vite.",
    successCall: "Appeler maintenant",
    successBook: "R\u00E9server directement",
    successReset: "Envoyer un autre message",
    errorText:
      "Une erreur est survenue pendant l'envoi. Vous pouvez r\u00E9essayer ou contacter directement par t\u00E9l\u00E9phone ou par email.",
    emailSubject: "Nouvelle demande - M\u00E9thode Secondaire",
  },
  en: {
    noteTitle: "Fast, action-oriented reply",
    noteText:
      "Describe the situation in a minute. The reply can then guide you toward the right format or tutor profile.",
    quickReply: "Target reply within one business day.",
    nameLabel: "Name",
    namePlaceholder: "Student or parent name",
    emailLabel: "Email",
    emailPlaceholder: "name@email.com",
    subjectLabel: "Level and subject",
    subjectPlaceholder: "Ex. Secondary 4 math or Secondary 5 science",
    priorityLabel: "Most urgent need",
    priorityPlaceholder: "Choose the closest situation",
    priorityOptions: [
      { value: "exam-prep", label: "Exam preparation" },
      { value: "weekly", label: "Weekly follow-up" },
      { value: "catch-up", label: "Catch-up or academic reset" },
      { value: "unsure", label: "I am not fully sure yet" },
    ],
    formatLabel: "Preferred format",
    formatOptions: [
      { value: "online", label: "Online" },
      { value: "in-person", label: "In person if possible" },
      { value: "either", label: "Either works" },
    ],
    messageLabel: "Message",
    messagePlaceholder: "Briefly describe the situation, challenge or goal.",
    submitIdle: "Send request",
    submitSending: "Sending...",
    formNote: "The clearer the context, the faster the first reply can point you in the right direction.",
    successTitle: "Request sent",
    successText:
      "Your request was sent successfully. If the need is urgent, you can also call right away to frame the next step faster.",
    successCall: "Call now",
    successBook: "Book directly",
    successReset: "Send another message",
    errorText:
      "An error occurred while sending. You can try again or contact directly by phone or email.",
    emailSubject: "New tutoring request - Méthode Secondaire",
  },
}

export default function LeadForm({ locale = "fr", pageName = "website" }) {
  const copy = copyByLocale[locale] || copyByLocale.fr
  const [status, setStatus] = useState("idle")

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus("sending")

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/mzddpkaz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })

      if (!response.ok) {
        throw new Error("Submission failed")
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("methode:lead-submit", {
            detail: {
              locale,
              source_page: pageName,
              priority: data.get("priorite") || "",
              format: data.get("format") || "",
            },
          }),
        )
      }

      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[28px] border border-white/10 bg-[#0a1d43]/80 px-6 py-10 text-center">
        <div className="inline-flex rounded-full bg-[#f5c977] p-3 text-[#071631]">
          <Check className="h-5 w-5" />
        </div>
        <div className="mt-5 font-display text-3xl font-semibold text-white">{copy.successTitle}</div>
        <p className="mt-3 text-sm leading-7 text-white/72">{copy.successText}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="h-4 w-4" />
              {copy.successCall}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">
              <CalendarDays className="h-4 w-4" />
              {copy.successBook}
            </a>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="mt-4 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
          onClick={() => setStatus("idle")}
        >
          {copy.successReset}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-[24px] border border-white/10 bg-[#0a1d43]/70 px-5 py-4 text-white">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Clock3 className="h-4 w-4 text-[#f5c977]" />
          {copy.noteTitle}
        </div>
        <p className="mt-2 text-sm leading-7 text-white/72">{copy.noteText}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[#f5c977]">{copy.quickReply}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={copy.nameLabel}>
          <Input
            name="nom"
            required
            className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
            placeholder={copy.namePlaceholder}
          />
        </Field>

        <Field label={copy.emailLabel}>
          <Input
            name="email"
            type="email"
            required
            className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
            placeholder={copy.emailPlaceholder}
          />
        </Field>
      </div>

      <Field label={copy.subjectLabel}>
        <Input
          name="sujet"
          required
          className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder={copy.subjectPlaceholder}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={copy.priorityLabel}>
          <select
            name="priorite"
            required
            defaultValue=""
            className="h-12 w-full rounded-2xl border border-white/10 bg-[#06132f]/85 px-4 text-white outline-none transition focus:border-[#f5c977]/60"
          >
            <option value="" disabled className="bg-[#06132f] text-white/45">
              {copy.priorityPlaceholder}
            </option>
            {copy.priorityOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#06132f] text-white">
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={copy.formatLabel}>
          <select
            name="format"
            defaultValue={copy.formatOptions[2].value}
            className="h-12 w-full rounded-2xl border border-white/10 bg-[#06132f]/85 px-4 text-white outline-none transition focus:border-[#f5c977]/60"
          >
            {copy.formatOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#06132f] text-white">
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={copy.messageLabel}>
        <Textarea
          name="message"
          required
          className="min-h-[140px] rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
          placeholder={copy.messagePlaceholder}
        />
      </Field>

      <input type="hidden" name="_subject" value={copy.emailSubject} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_gotcha" />
      <input type="hidden" name="site_locale" value={locale} />
      <input type="hidden" name="source_page" value={pageName} />

      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[#f5c977] py-6 text-[#071631] hover:bg-[#f7d38f]"
      >
        {status === "sending" ? copy.submitSending : copy.submitIdle}
      </Button>

      <p className="text-center text-sm leading-7 text-white/60">{copy.formNote}</p>

      {status === "error" && (
        <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {copy.errorText}
        </div>
      )}
    </form>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/70">{label}</span>
      {children}
    </label>
  )
}
