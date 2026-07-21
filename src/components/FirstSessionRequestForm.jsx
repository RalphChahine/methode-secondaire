import { useId, useState } from "react"
import { CalendarCheck, Check, Clock3, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CRM_PROXY_URL } from "@/config/crm"
import { buildLeadCrmMetadata, buildLeadCrmPayload, sendLeadToCrmWebhook } from "@/lib/leadCrm"
import { clearRememberedParentIntent, getRememberedParentIntent } from "@/lib/parentIntent"
import { resolveRequestedOffer } from "@/lib/pricing"
import { siteConfig } from "@/lib/seo"

const copyByLocale = {
  fr: {
    contactTitle: "Vos coordonnées",
    nameLabel: "Nom du parent",
    namePlaceholder: "Votre nom",
    emailLabel: "Courriel",
    emailPlaceholder: "nom@exemple.com",
    phoneLabel: "Téléphone",
    phonePlaceholder: "514 555-1234",
    studentTitle: "Pour bien préparer la première séance",
    levelLabel: "Niveau scolaire",
    levelPlaceholder: "Choisir le niveau",
    levels: [
      { value: "secondary-1", label: "Secondaire 1" },
      { value: "secondary-2", label: "Secondaire 2" },
      { value: "secondary-3", label: "Secondaire 3" },
      { value: "secondary-4", label: "Secondaire 4" },
      { value: "secondary-5", label: "Secondaire 5" },
    ],
    subjectLabel: "Matière",
    subjectPlaceholder: "Choisir la matière",
    subjects: [
      { value: "math", label: "Mathématiques" },
      { value: "science", label: "Sciences" },
      { value: "physics", label: "Physique" },
      { value: "chemistry", label: "Chimie" },
      { value: "other", label: "Autre / à préciser" },
    ],
    needLabel: "Besoin principal",
    needPlaceholder: "Choisir le besoin",
    needs: [
      { value: "exam-prep", label: "Préparation d'examen" },
      { value: "catch-up", label: "Rattrapage ou remise à niveau" },
      { value: "weekly", label: "Installer un suivi régulier" },
      { value: "independence", label: "Gagner en méthode et autonomie" },
      { value: "unsure", label: "Je veux d'abord clarifier" },
    ],
    timingTitle: "Disponibilités et urgence",
    urgencyLabel: "Quand faut-il commencer ?",
    urgencyPlaceholder: "Choisir le délai",
    urgencies: [
      { value: "this-week", label: "Cette semaine" },
      { value: "two-weeks", label: "Dans les deux prochaines semaines" },
      { value: "this-month", label: "Ce mois-ci" },
      { value: "flexible", label: "Flexible" },
    ],
    availabilityLabel: "Meilleures disponibilités",
    availabilityPlaceholder: "Ex. mardi ou jeudi après 17 h",
    consent:
      "J'accepte que Méthode Secondaire utilise ces renseignements pour traiter cette demande et me recontacter à son sujet.",
    submitIdle: "Envoyer ma demande",
    submitSending: "Envoi en cours…",
    formNote: "Aucun compte ni paiement maintenant. Nous confirmons d'abord le bon tuteur et le créneau.",
    successTitle: "Demande envoyée",
    successText:
      "Merci. Nous allons vous proposer la suite la plus simple : un tuteur et un créneau à confirmer avant tout paiement.",
    successCall: "Appeler si c'est urgent",
    successReset: "Envoyer une autre demande",
    errorText:
      "La demande n'a pas pu être envoyée. Réessayez dans un instant ou appelez-nous directement.",
    availabilityMessage: "Disponibilités indiquées",
    offers: {
      targeted_session: { studentTitle: "Pour bien préparer la séance ciblée", requestMessage: "Demande de séance ciblée" },
      momentum_block: { studentTitle: "Pour préparer le bloc d'élan", requestMessage: "Demande de bloc d'élan · 4 séances" },
      progression_block: { studentTitle: "Pour préparer le bloc de progression", requestMessage: "Demande de bloc de progression · 10 séances" },
    },
  },
  en: {
    contactTitle: "Your contact details",
    nameLabel: "Parent name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    phoneLabel: "Phone number",
    phonePlaceholder: "514 555-1234",
    studentTitle: "To prepare the first session",
    levelLabel: "School grade",
    levelPlaceholder: "Choose a grade",
    levels: [
      { value: "secondary-1", label: "Secondary 1" },
      { value: "secondary-2", label: "Secondary 2" },
      { value: "secondary-3", label: "Secondary 3" },
      { value: "secondary-4", label: "Secondary 4" },
      { value: "secondary-5", label: "Secondary 5" },
    ],
    subjectLabel: "Subject",
    subjectPlaceholder: "Choose a subject",
    subjects: [
      { value: "math", label: "Math" },
      { value: "science", label: "Science" },
      { value: "physics", label: "Physics" },
      { value: "chemistry", label: "Chemistry" },
      { value: "other", label: "Other / to clarify" },
    ],
    needLabel: "Main need",
    needPlaceholder: "Choose the need",
    needs: [
      { value: "exam-prep", label: "Exam preparation" },
      { value: "catch-up", label: "Catch-up or academic reset" },
      { value: "weekly", label: "Set up regular follow-up" },
      { value: "independence", label: "Build method and independence" },
      { value: "unsure", label: "I would like clarity first" },
    ],
    timingTitle: "Availability and urgency",
    urgencyLabel: "When should we start?",
    urgencyPlaceholder: "Choose a timeline",
    urgencies: [
      { value: "this-week", label: "This week" },
      { value: "two-weeks", label: "Within the next two weeks" },
      { value: "this-month", label: "This month" },
      { value: "flexible", label: "Flexible" },
    ],
    availabilityLabel: "Best availability",
    availabilityPlaceholder: "For example: Tuesday or Thursday after 5 p.m.",
    consent:
      "I agree that Méthode Secondaire may use this information to handle this request and contact me about it.",
    submitIdle: "Send my request",
    submitSending: "Sending…",
    formNote: "No account or payment now. We first confirm the right tutor and a time that works.",
    successTitle: "Request sent",
    successText:
      "Thank you. We will suggest the simplest next step: a tutor and time to confirm before any payment.",
    successCall: "Call if it is urgent",
    successReset: "Send another request",
    errorText:
      "Your request could not be sent. Please try again in a moment or call us directly.",
    availabilityMessage: "Availability provided",
    offers: {
      targeted_session: { studentTitle: "To prepare the targeted session", requestMessage: "Targeted session request" },
      momentum_block: { studentTitle: "To prepare the momentum block", requestMessage: "4-session momentum block request" },
      progression_block: { studentTitle: "To prepare the progress block", requestMessage: "10-session progress block request" },
    },
  },
}

const FIRST_SESSION_PREFILL_KEY = "methode:first-session-prefill"

function getInitialValues() {
  return {
    name: "",
    email: "",
    phone: "",
    level: "",
    subject: "",
    need: "",
    urgency: "",
    availability: "",
    consent: false,
    website: "",
  }
}

function getOptionLabel(options, value) {
  return options.find((option) => option.value === value)?.label || value
}

function readFirstSessionPrefill() {
  if (typeof window === "undefined") {
    return { values: {}, diagnosticSummary: "" }
  }

  try {
    const stored = window.sessionStorage.getItem(FIRST_SESSION_PREFILL_KEY)
    const parsed = stored ? JSON.parse(stored) : null

    if (!parsed || typeof parsed !== "object") {
      return { values: {}, diagnosticSummary: "" }
    }

    const submittedValues = parsed.values && typeof parsed.values === "object" ? parsed.values : parsed
    const answers = parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {}
    const result = parsed.result && typeof parsed.result === "object" ? parsed.result : {}
    const summary = [
      parsed.diagnosticSummary,
      parsed.summary,
      result.suggestedMessage,
      result.summary,
      submittedValues.diagnosticSummary,
      submittedValues.summary,
    ].find((value) => typeof value === "string" && value.trim()) || ""

    return {
      values: {
        name: readString(submittedValues.name || submittedValues.nom || submittedValues.parent_name, 180),
        email: readString(submittedValues.email, 254),
        phone: readString(submittedValues.phone || submittedValues.telephone, 40),
        level: normalizePrefillOption(answers.level || submittedValues.level, "level"),
        subject: normalizePrefillOption(answers.subject || submittedValues.subject, "subject"),
        need: normalizePrefillOption(answers.goal || submittedValues.need || submittedValues.priorite, "need"),
        urgency: normalizePrefillOption(answers.timing || submittedValues.urgency || submittedValues.timeline, "urgency"),
        availability: readString(submittedValues.availability || submittedValues.disponibilites, 500),
      },
      diagnosticSummary: readString(summary, 1000),
    }
  } catch {
    return { values: {}, diagnosticSummary: "" }
  }
}

function clearFirstSessionPrefill() {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.sessionStorage.removeItem(FIRST_SESSION_PREFILL_KEY)
  } catch {
    // A completed public request must not depend on browser storage access.
  }
}

function normalizePrefillOption(value, field) {
  const normalized = String(value || "").trim().toLowerCase()
  const aliases = {
    level: {
      sec1: "secondary-1",
      sec2: "secondary-2",
      sec3: "secondary-3",
      sec4: "secondary-4",
      sec5: "secondary-5",
      "secondary 1": "secondary-1",
      "secondary 2": "secondary-2",
      "secondary 3": "secondary-3",
      "secondary 4": "secondary-4",
      "secondary 5": "secondary-5",
      "secondaire 1": "secondary-1",
      "secondaire 2": "secondary-2",
      "secondaire 3": "secondary-3",
      "secondaire 4": "secondary-4",
      "secondaire 5": "secondary-5",
    },
    subject: {
      math: "math",
      maths: "math",
      mathématiques: "math",
      mathematics: "math",
      science: "science",
      sciences: "science",
      physics: "physics",
      physique: "physics",
      chemistry: "chemistry",
      chimie: "chemistry",
      unsure: "other",
    },
    need: {
      "exam-prep": "exam-prep",
      weekly: "weekly",
      "catch-up": "catch-up",
      independence: "independence",
      unsure: "unsure",
    },
    urgency: {
      "this-week": "this-week",
      "two-weeks": "two-weeks",
      "this-month": "this-month",
      flexible: "flexible",
    },
  }

  return aliases[field]?.[normalized] || ""
}

function readString(value, limit) {
  return typeof value === "string" ? value.trim().slice(0, limit) : ""
}

/**
 * Compact, public intake for a first session. It deliberately creates a CRM
 * lead only; it does not create a parent portal account or charge the family.
 */
export default function FirstSessionRequestForm({
  locale = "fr",
  pageName = "first-session-request",
  offer: selectedOffer = "targeted_session",
  className = "",
  onSuccess,
}) {
  const copy = copyByLocale[locale] || copyByLocale.fr
  const requestedOffer = resolveRequestedOffer(selectedOffer)
  const offer = requestedOffer
  const offerCopy = copy.offers[requestedOffer]
  const formId = useId().replaceAll(":", "")
  const [prefill] = useState(readFirstSessionPrefill)
  const [values, setValues] = useState(() => ({
    ...getInitialValues(),
    ...prefill.values,
  }))
  const [status, setStatus] = useState("idle")

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    // A hidden field stops ordinary form bots without exposing a CRM webhook
    // or changing the parent-facing result.
    if (values.website) {
      setStatus("success")
      return
    }

    setStatus("sending")

    const level = getOptionLabel(copy.levels, values.level)
    const subject = getOptionLabel(copy.subjects, values.subject)
    const availability = values.availability.trim()
    const message = [
      `${offerCopy.requestMessage}.`,
      `${copy.availabilityMessage}: ${availability}.`,
      prefill.diagnosticSummary,
    ].filter(Boolean).join(" ").slice(0, 1500)
    const leadValues = {
      nom: values.name.trim(),
      email: values.email.trim(),
      telephone: values.phone.trim(),
      sujet: [level, subject].filter(Boolean).join(" · "),
      priorite: values.need,
      timeline: values.urgency,
      format: "either",
      contactPreference: "either",
      message,
    }
    const rememberedIntent = getRememberedParentIntent()
    const parentIntent = rememberedIntent || "first_session_request"
    const metadata = buildLeadCrmMetadata({
      locale,
      pageName,
      values: leadValues,
      parentIntent,
    })
    const crmPayload = {
      ...buildLeadCrmPayload({
        locale,
        pageName,
        values: leadValues,
        parentIntent,
        metadata,
      }),
      offer_recommended: offer,
      privacy_consent_at: new Date().toISOString(),
      privacy_consent_version: "first-session-request-v1",
    }

    try {
      const result = await sendLeadToCrmWebhook(crmPayload, CRM_PROXY_URL)

      if (!result.sent) {
        throw new Error(result.code || "CRM_REQUEST_FAILED")
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("methode:lead-submit", {
            detail: {
              locale,
              source_page: pageName,
              offer,
            },
          }),
        )
        window.dispatchEvent(
          new CustomEvent("methode:first-session-request-submit", {
            detail: {
              locale,
              offer,
            },
          }),
        )
      }

      clearRememberedParentIntent()
      clearFirstSessionPrefill()
      setStatus("success")
      setValues(getInitialValues())
      onSuccess?.()
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-[28px] border border-white/10 bg-[#0a1d43]/80 px-5 py-8 text-center sm:px-6 ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="inline-flex rounded-full bg-[#f5c977] p-3 text-[#071631]">
          <Check className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-white">{copy.successTitle}</h3>
        <p className="mt-3 text-sm leading-7 text-white/72">{copy.successText}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone className="h-4 w-4" />
              {copy.successCall}
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            onClick={() => setStatus("idle")}
          >
            {copy.successReset}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`} noValidate={false}>
      <section aria-labelledby={`${formId}-contact`}>
        <h3 id={`${formId}-contact`} className="flex items-center gap-2 text-sm font-semibold text-[#f5c977]">
          <Clock3 className="h-4 w-4" />
          {copy.contactTitle}
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field id={`${formId}-name`} label={copy.nameLabel}>
            <Input
              id={`${formId}-name`}
              name="parent_name"
              autoComplete="name"
              required
              maxLength={180}
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
              placeholder={copy.namePlaceholder}
            />
          </Field>
          <Field id={`${formId}-email`} label={copy.emailLabel}>
            <Input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
              className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
              placeholder={copy.emailPlaceholder}
            />
          </Field>
          <Field id={`${formId}-phone`} label={copy.phoneLabel}>
            <Input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              minLength={7}
              maxLength={40}
              value={values.phone}
              onChange={(event) => updateValue("phone", event.target.value)}
              className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
              placeholder={copy.phonePlaceholder}
            />
          </Field>
        </div>
      </section>

      <section aria-labelledby={`${formId}-student`}>
        <h3 id={`${formId}-student`} className="text-sm font-semibold text-[#f5c977]">
          {offerCopy.studentTitle || copy.studentTitle}
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <SelectField
            id={`${formId}-level`}
            name="level"
            label={copy.levelLabel}
            placeholder={copy.levelPlaceholder}
            options={copy.levels}
            value={values.level}
            onChange={(value) => updateValue("level", value)}
          />
          <SelectField
            id={`${formId}-subject`}
            name="subject"
            label={copy.subjectLabel}
            placeholder={copy.subjectPlaceholder}
            options={copy.subjects}
            value={values.subject}
            onChange={(value) => updateValue("subject", value)}
          />
          <SelectField
            id={`${formId}-need`}
            name="need"
            label={copy.needLabel}
            placeholder={copy.needPlaceholder}
            options={copy.needs}
            value={values.need}
            onChange={(value) => updateValue("need", value)}
            containerClassName="sm:col-span-2"
          />
        </div>
      </section>

      <section aria-labelledby={`${formId}-timing`}>
        <h3 id={`${formId}-timing`} className="flex items-center gap-2 text-sm font-semibold text-[#f5c977]">
          <CalendarCheck className="h-4 w-4" />
          {copy.timingTitle}
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <SelectField
            id={`${formId}-urgency`}
            name="urgency"
            label={copy.urgencyLabel}
            placeholder={copy.urgencyPlaceholder}
            options={copy.urgencies}
            value={values.urgency}
            onChange={(value) => updateValue("urgency", value)}
          />
          <Field id={`${formId}-availability`} label={copy.availabilityLabel}>
            <Input
              id={`${formId}-availability`}
              name="availability"
              required
              minLength={3}
              maxLength={500}
              value={values.availability}
              onChange={(event) => updateValue("availability", event.target.value)}
              className="h-12 rounded-2xl border-white/10 bg-[#06132f]/85 text-white placeholder:text-white/35"
              placeholder={copy.availabilityPlaceholder}
            />
          </Field>
        </div>
      </section>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => updateValue("website", event.target.value)}
        />
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/72">
        <input
          name="consent"
          type="checkbox"
          required
          checked={values.consent}
          onChange={(event) => updateValue("consent", event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#f5c977]"
        />
        <span>{copy.consent}</span>
      </label>

      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[#f5c977] py-6 text-[#071631] hover:bg-[#f7d38f]"
      >
        {status === "sending" ? copy.submitSending : copy.submitIdle}
      </Button>

      <p className="text-center text-sm leading-6 text-white/60">{copy.formNote}</p>

      {status === "error" ? (
        <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-200" role="alert">
          {copy.errorText}
        </div>
      ) : null}
    </form>
  )
}

function Field({ id, label, children, className = "" }) {
  return (
    <label className={`block ${className}`} htmlFor={id}>
      <span className="mb-2 block text-sm text-white/70">{label}</span>
      {children}
    </label>
  )
}

function SelectField({ id, name, label, placeholder, options, value, onChange, containerClassName = "" }) {
  return (
    <Field id={id} label={label} className={containerClassName}>
      <select
        id={id}
        name={name}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-2xl border border-white/10 bg-[#06132f]/85 px-4 text-white outline-none transition focus:border-[#f5c977]/60"
      >
        <option value="" disabled className="bg-[#06132f] text-white/45">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#06132f] text-white">
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  )
}
