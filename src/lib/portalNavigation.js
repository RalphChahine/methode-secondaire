import {
  CalendarCheck,
  CalendarDays,
  Clock3,
  Home,
  Inbox,
  MessageSquareText,
  MoreHorizontal,
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
