import {
  CalendarCheck,
  CalendarDays,
  CreditCard,
  Clock3,
  Home,
  Inbox,
  MessageSquareText,
  MoreHorizontal,
  Settings2,
  UsersRound,
} from "lucide-react"

const destinationCopy = {
  parent: {
    fr: [
      ["home", "Accueil", Home],
      ["sessions", "Séances", CalendarDays],
      ["messages", "Messages", MessageSquareText],
      ["more", "Plus", MoreHorizontal],
    ],
    en: [
      ["home", "Home", Home],
      ["sessions", "Sessions", CalendarDays],
      ["messages", "Messages", MessageSquareText],
      ["more", "More", MoreHorizontal],
    ],
  },
  tutor: {
    fr: [
      ["today", "Aujourd’hui", Clock3],
      ["schedule", "Horaire", CalendarDays],
      ["students", "Élèves", UsersRound],
      ["messages", "Messages", MessageSquareText],
    ],
    en: [
      ["today", "Today", Clock3],
      ["schedule", "Schedule", CalendarDays],
      ["students", "Students", UsersRound],
      ["messages", "Messages", MessageSquareText],
    ],
  },
  operator: {
    fr: [
      ["today", "Aujourd’hui", Clock3],
      ["families", "Familles", UsersRound],
      ["calendar", "Calendrier", CalendarCheck],
      ["inbox", "Boîte", Inbox],
      ["more", "Plus", MoreHorizontal],
    ],
    en: [
      ["today", "Today", Clock3],
      ["families", "Families", UsersRound],
      ["calendar", "Calendar", CalendarCheck],
      ["inbox", "Inbox", Inbox],
      ["more", "More", MoreHorizontal],
    ],
  },
}

export function getPortalDestinations(role, locale = "fr") {
  const roleCopy = destinationCopy[role] || destinationCopy.parent
  const entries = roleCopy[locale] || roleCopy.fr
  return entries.map(([key, label, icon]) => ({ key, label, icon }))
}

export function getDefaultPortalDestination(role) {
  return role === "parent" ? "home" : "today"
}

export function getPortalDesktopDestinations(role, locale = "fr") {
  const destinations = getPortalDestinations(role, locale)
  if (role !== "operator") return destinations
  const moreIndex = destinations.findIndex((destination) => destination.key === "more")
  const extras = locale === "en"
    ? [
      { key: "tutors", label: "Tutors", icon: UsersRound },
      { key: "payments", label: "Payments", icon: CreditCard },
      { key: "settings", label: "Settings", icon: Settings2 },
    ]
    : [
      { key: "tutors", label: "Tuteurs", icon: UsersRound },
      { key: "payments", label: "Paiements", icon: CreditCard },
      { key: "settings", label: "Réglages", icon: Settings2 },
    ]
  return [...destinations.slice(0, moreIndex), ...extras, ...destinations.slice(moreIndex)]
}
