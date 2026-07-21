import { useEffect, useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Component } from "react"
import {
  ArrowRight,
  Camera,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarPlus,
  ClipboardList,
  CircleCheck,
  Clock3,
  CreditCard,
  FileText,
  ImagePlus,
  LoaderCircle,
  LogOut,
  Mail,
  MessageSquareText,
  Pause,
  Pencil,
  Play,
  Phone,
  RefreshCw,
  ShieldCheck,
  Star,
  Trash2,
  UserPlus,
  UserCog,
  UserRound,
  UsersRound,
} from "lucide-react"

import MotionCard from "@/components/MotionCard"
import ProgressJourney from "@/components/ProgressJourney"
import Seo from "@/components/Seo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  buildAlternates,
  getAlternateOgLocale,
  getHtmlLang,
  getLocaleFromPath,
  getLocalizedPath,
  getOgLocale,
} from "@/lib/i18n"
import {
  clearPortalSession,
  adjustPortalPlanCredits,
  assignPortalTutor,
  assignPortalStudentTutor,
  bookPortalSession,
  cancelPortalSession,
  createPortalAccount,
  createPortalPlanEnrollment,
  createPortalPlanPaymentRequest,
  createPortalParent,
  createPortalRequest,
  createPortalSession,
  createPortalTutor,
  deletePortalParent,
  deletePortalTestRecord,
  deletePortalTestRecords,
  deletePortalTutor,
  getPortalDashboard,
  invitePortalTutor,
  loadPortalSession,
  pausePortalPlanEnrollment,
  requestPortalCode,
  reissuePortalPaymentCheckout,
  reschedulePortalSession,
  resumePortalPlanEnrollment,
  savePortalSession,
  respondToPortalSession,
  sendPortalSessionMessage,
  setPortalParentAccess,
  submitParentFeedback,
  submitPortalSessionNote,
  updatePortalLeadFollowUp,
  updatePortalParentProfile,
  updatePortalTutorCalendar,
  updatePortalRequestStatus,
  upsertPortalParent,
  upsertPortalStudent,
  upsertPortalTutorAvailability,
  verifyPortalCode,
} from "@/lib/portalClient"
import {
  formatCadAmount,
  getOffer,
  getOfferByPlanId,
  getPaymentLinkDefaultAmountCad,
  getPricingCopy,
  pricing,
} from "@/lib/pricing"
import { siteConfig } from "@/lib/seo"

const progressionInstallmentPrice = {
  fr: formatCadAmount(pricing.offers.progression_block.installmentPriceCad, "fr"),
  en: formatCadAmount(pricing.offers.progression_block.installmentPriceCad, "en"),
}

const copyByLocale = {
  fr: {
    seoTitle: "Connexion au portail client | Méthode Secondaire",
    seoDescription:
      "Connexion réservée aux parents et aux tuteurs déjà accompagnés pour suivre les séances, paiements, notes et prochaines actions.",
    badge: "Espace client Méthode Secondaire",
    title: "Accédez à votre espace client.",
    subtitle:
      "Cet espace est réservé aux parents et aux tuteurs déjà accompagnés. Connectez-vous avec le code reçu par courriel pour consulter vos séances, paiements et suivis.",
    firstSessionRequestBadge: "Demande de première séance",
    firstSessionRequestTitle: "Parlez-nous de la situation de votre jeune.",
    firstSessionRequestSubtitle:
      "Décrivez le niveau, la matière et le besoin. L'équipe vous proposera ensuite un tuteur et un créneau; le portail servira au suivi après votre première confirmation.",
    newClientPrompt: "Vous cherchez un tuteur pour la première fois ?",
    newClientAction: "Demander une première séance",
    parent: "Parent",
    tutor: "Tuteur",
    operator: "Équipe",
    loginTab: "Connexion",
    createTab: "Ma demande",
    existingAccessTitle: "J'ai déjà un accès",
    createParentTitle: "Demande de première séance",
    createTutorTitle: "Demande d'accès tuteur",
    email: "Adresse email",
    code: "Code reçu par email",
    sendCode: "Recevoir un code",
    verifyCode: "Se connecter",
    parentName: "Nom du parent",
    phone: "Téléphone",
    studentLevelSubject: "Niveau et matière",
    mainConcern: "Besoin principal",
    preferredFormat: "Format souhaité",
    tutorName: "Nom du tuteur",
    tutorSubjects: "Matières et niveaux",
    createParentAccount: "Envoyer ma demande",
    createTutorRequest: "Demander l'accès",
    privacyConsent: "J'accepte que Méthode Secondaire conserve ces renseignements pour organiser les séances, le suivi et les paiements.",
    codeSent:
      "Si un accès existe pour cette adresse, un code vient d'être envoyé. Vérifiez aussi vos indésirables.",
    sendingCode: "Envoi du code...",
    signingIn: "Connexion...",
    creatingAccount: "Création du compte...",
    loadingDashboard: "Chargement de votre espace...",
    loadingDashboardSlow: "Connexion au CRM en cours. Vos données restent sécurisées.",
    serviceTimeout:
      "Le service prend plus de temps que prévu. Rafraîchissez dans un instant; votre session et vos données sont conservées.",
    dashboardDisplayError:
      "Le tableau a reçu les données, mais une section n'a pas pu s'afficher. Vos données restent intactes.",
    retryDashboard: "Réessayer le tableau",
    accountCreated:
      "Demande reçue. Un code vient d'être envoyé à votre email pour confirmer l'accès à votre suivi.",
    existingAccountCodeSent:
      "Un accès existe déjà pour cette adresse. Un code vient d'être envoyé.",
    tutorRequestSent:
      "Demande reçue. L'accès tuteur sera activé après validation dans le roster.",
    tutorInviteRequired: "L'accès tuteur est créé et envoyé uniquement par l'équipe Méthode Secondaire.",
    tutorInviteTitle: "Accès tuteurs",
    tutorCreateTitle: "Ajouter un tuteur",
    tutorCreateIntro: "Créez sa fiche, puis le tuteur reçoit son code de connexion par email.",
    tutorExistingTitle: "Accès déjà créés",
    tutorInviteStatus: "Statut d'accès",
    inviteTutor: "Créer et envoyer l'accès",
    tutorInvited: "Accès tuteur créé. Un code de connexion a été envoyé.",
    createTutor: "Créer le tuteur et envoyer l'accès",
    tutorCreatedAndInvited: "Tuteur créé et accès envoyé par email.",
    tutorCreatedInvitePending: "Tuteur créé. Renvoyez son accès ci-dessous lorsque l'envoi email est disponible.",
    tutorDetailsRequired: "Ajoutez le nom, l'email, les matières, les niveaux, le format et une capacité de 1 à 40 élèves.",
    tutorEmailInUse: "Cette adresse email appartient déjà à un tuteur.",
    tutorLevels: "Niveaux couverts",
    tutorWeeklyCapacity: "Capacité hebdomadaire (élèves)",
    tutorLanguage: "Langue de travail",
    tutorZones: "Zone ou secteur",
    tutorRate: "Tarif horaire (CAD/h — base 28 $, ajustable selon l’expérience et le rôle)",
    tutorRateInvalid: "Le tarif horaire doit être d’au moins 28 $ CAD/h.",
    tutorNotes: "Note interne (facultative)",
    tutorInviteDetailsRequired: "Choisissez un tuteur actif avec une adresse email calendrier.",
    logout: "Déconnexion",
    cancel: "Annuler",
    refresh: "Rafraîchir",
    setupPending:
      "Le portail est prêt côté site, mais l'envoi de code doit être autorisé dans Apps Script si le courriel ne part pas.",
    apiUnavailable:
      "L'API du portail ne répond pas ici. En local, relancez le site puis réessayez; en production, vérifiez la configuration Vercel.",
    accountRequired: "Ajoutez au minimum le nom et l'email pour créer l'accès.",
    privacyConsentRequired: "Le consentement est requis pour créer le compte parent.",
    emailRequired: "Entrez une adresse email valide.",
    emailNotAuthorized:
      "L'envoi des codes email doit être autorisé une fois dans Google Apps Script. Réessayez dans quelques instants ou contactez Méthode Secondaire.",
    emailQuotaReached:
      "L'envoi de codes est temporairement indisponible. Réessayez plus tard ou contactez Méthode Secondaire.",
    emailSendFailed:
      "Le code n'a pas pu être envoyé. Réessayez dans quelques instants ou contactez Méthode Secondaire.",
    loginFailed: "Le code ou l'adresse email est incorrect. Demandez un nouveau code et réessayez.",
    loginCooldown: "Trop de codes incorrects ont été saisis. Attendez 15 minutes avant de demander un nouveau code.",
    codeExpired: "Ce code a expiré. Demandez un nouveau code.",
    sessionExpired: "Votre session n'est plus active. Demandez un nouveau code pour vous reconnecter.",
    parentDashboard: "Espace parent",
    tutorDashboard: "Espace tuteur",
    operatorDashboard: "Gestion des séances",
    parentJourneyTitle: "Votre parcours",
    parentJourneyProfile: "Profil reçu",
    parentJourneyMatching: "Tuteur proposé",
    parentJourneyBooking: "Séance réservée",
    parentJourneyFollowUp: "Suivi en cours",
    parentJourneyCurrent: "En cours",
    parentJourneyDone: "Terminé",
    parentJourneyEyebrow: "Le suivi de votre famille",
    parentJourneyNext: "Prochaine étape",
    parentJourneyCount: "étapes complétées",
    parentJourneyCompleteMessage: "Tout est en place. Vous gardez maintenant le fil dans le portail.",
    parentActionEyebrow: "À faire maintenant",
    parentActionProfile: "Compléter votre profil",
    parentActionProfileText: "Ajoutez les quelques détails utiles pour que le jumelage parte du bon contexte.",
    parentActionMatching: "Le jumelage est en préparation",
    parentActionMatchingText: "Votre demande est bien reçue. Nous vous proposons le bon tuteur avant la réservation.",
    parentActionBooking: "Choisir une première séance",
    parentActionBookingText: "Votre tuteur est prêt : choisissez simplement le créneau qui convient à votre famille.",
    parentActionPayment: "Finaliser le paiement",
    parentActionPaymentText: "Un paiement attend votre attention pour garder la séance confirmée.",
    parentActionMessage: "Répondre au dernier message",
    parentActionMessageText: "Une réponse rapide aide l'équipe et le tuteur à bien préparer la suite.",
    parentActionAllSet: "Tout est à jour",
    parentActionAllSetText: "Votre famille est prête. Les prochains repères apparaîtront ici au bon moment.",
    parentActionOpen: "Voir la prochaine étape",
    rhythmEyebrow: "Votre rythme",
    rhythmTitle: "Un suivi qui reste simple",
    rhythmNoContract: "Aucun abonnement ni renouvellement automatique",
    rhythmNoContractText: "La cadence est choisie avec vous après le jumelage. Elle organise les séances du bloc sans créer un abonnement.",
    rhythmSameTutor: "Même tuteur, même créneau",
    rhythmSameTutorText: "Le suivi garde son contexte : moins de répétitions, plus de continuité.",
    rhythmDeadline: "Échéance de planification",
    rhythmDeadlineFallback: `Prévoyez toute modification au moins ${pricing.cancellation.noticeHours} h avant une séance.`,
    rhythmDeadlinePassed: `La fenêtre de ${pricing.cancellation.noticeHours} h est passée : l'équipe peut encore étudier un ajustement.`,
    rhythmPause: "Mettre le rythme sur pause",
    rhythmResume: "Reprendre le rythme",
    rhythmPauseHelp: `Une pause s'applique aux prochaines séances qui ne sont pas encore dans la fenêtre de ${pricing.cancellation.noticeHours} h. Aucun paiement réel n'est lancé depuis cette carte.`,
    rhythmPauseConfirmed: "Le rythme est mis sur pause. Les séances déjà confirmées restent à vérifier séparément.",
    rhythmResumeConfirmed: "Le rythme est repris. L'équipe et le tuteur voient de nouveau votre cadence.",
    rhythmPauseSetup: "L'équipe active d'abord ce rythme dans votre dossier; vous pourrez ensuite le mettre sur pause ici.",
    rhythmManage: "Gérer les séances",
    rhythmPriceNote: "La cadence est confirmée après le jumelage; elle ne renouvelle jamais le bloc automatiquement.",
    programEyebrow: "Votre bloc",
    programCredits: "séances restantes",
    programOutOf: "sur",
    programUsed: "séances utilisées",
    programAction: "Voir les séances du programme",
    programPending: "Programme à activer",
    materialsEyebrow: "Avant la séance",
    materialsTitle: "Préparer la séance",
    materialsDescription: "Une photo du devoir, du chapitre ou de l'examen aide le tuteur à cibler plus vite.",
    materialsNoSession: "Dès qu'une séance est prévue, vous pourrez préparer ce que votre jeune veut travailler ici.",
    materialsCapture: "Prendre une photo",
    materialsAddFile: "Ajouter des photos ou un PDF",
    materialsSelected: "Sur cet appareil",
    materialsReceived: "Documents reçus",
    materialsRemove: "Retirer",
    materialsNote: "Ce qui bloque le plus (facultatif)",
    materialsNotePlaceholder: "Ex. Je ne comprends pas comment commencer la question 4.",
    materialsLocalOnly: "Les photos et PDF restent sur cet appareil jusqu'à l'activation du transfert sécurisé. La note peut toutefois être envoyée au tuteur maintenant.",
    materialsReady: "Ajoutez une note pour préciser ce que votre jeune veut travailler; le transfert sécurisé des fichiers sera activé séparément.",
    materialsMessageTutor: "Écrire au tuteur",
    materialsSendNote: "Envoyer la note au tuteur",
    calendarNoSessions: "Aucune séance prévue cette semaine.",
    profileTitle: "Profil de suivi",
    profileIntro: "Gardez les renseignements de l'élève à jour pour que chaque séance parte du bon contexte.",
    profileSaved: "Profil de suivi mis à jour.",
    profileDetailsRequired: "Ajoutez au minimum votre nom pour enregistrer le profil.",
    profileTimeline: "Rythme ou échéance importante",
    profileSave: "Enregistrer le profil",
    welcome: "Bonjour",
    nextSession: "Prochaine séance",
    manageSession: "Gérer cette séance",
    noNextSession: "Aucune séance confirmée à venir.",
    sessions: "Séances",
    scheduleSession: "Planifier une séance",
    chooseParent: "Choisir un parent",
    chooseTutor: "Choisir un tuteur",
    sessionDate: "Date et heure",
    duration: "Durée",
    studentName: "Nom de l'élève",
    sessionType: "Type de séance",
    sessionFormat: "Format",
    location: "Lieu ou lien de rencontre",
    recurrence: "Récurrence",
    createSession: "Envoyer la proposition",
    sessionCreated: "Séance proposée aux deux personnes pour confirmation.",
    confirmSession: "Confirmer",
    requestChange: "Demander un ajustement",
    rescheduleSession: "Modifier le créneau",
    rescheduleTitle: "Proposer un nouveau créneau",
    rescheduleDate: "Nouvelle date et heure",
    rescheduleDuration: "Nouvelle durée (minutes)",
    rescheduleSave: "Envoyer la nouvelle proposition",
    sessionRescheduled: "Nouveau créneau proposé. Le parent et le tuteur doivent maintenant confirmer.",
    rescheduleNotAvailable: "Cette séance ne peut plus être replanifiée.",
    cancelSession: "Annuler la séance",
    cancellationPolicy: `Avec ${pricing.cancellation.noticeHours} h de préavis, le report est garanti. Sous ce délai, l'équipe examine la demande; aucun crédit ou paiement n'est retiré automatiquement.`,
    cancellationConfirmed: "Séance annulée. Le calendrier et le paiement non réglé ont été mis à jour.",
    cancellationReview: "Demande d'annulation transmise à l'équipe pour révision.",
    operatorCancellationConfirm: "Annuler cette séance? Le parent, le tuteur, le calendrier et le paiement non réglé seront mis à jour.",
    operatorCancellationConfirmed: "Séance annulée par l'équipe. Le calendrier et le paiement ont été mis à jour.",
    cancellationNotAvailable: "Cette séance ne peut plus être annulée depuis le portail.",
    sessionConfirmed: "Confirmation enregistrée. Le calendrier et le paiement suivront dès que les deux personnes ont confirmé.",
    sessionChangeRequested: "Demande d'ajustement envoyée à l'équipe.",
    confirmationWaiting: "En attente de l'autre confirmation",
    parentConfirmed: "Parent confirmé",
    tutorConfirmed: "Tuteur confirmé",
    paymentReady: "Paiement prêt",
    planSetupTitle: "Blocs et paiements",
    planSetupIntro: "Créez un Bloc d'élan ou un Bloc de progression. La vérification Stripe accorde automatiquement les crédits prévus, une seule fois.",
    planChoose: "Formule",
    planChooseParent: "Parent",
    planChooseStudent: "Élève",
    planChooseTutor: "Tuteur",
    planCadence: "Cadence après le jumelage",
    planCadenceHelp: "Choisissez un rythme seulement après avoir confirmé le tuteur et les disponibilités de la famille.",
    planCadenceOptions: {
      one_time: "À planifier au besoin",
      weekly: "Chaque semaine",
      biweekly: "Aux deux semaines",
    },
    planWeekday: "Jour habituel",
    planTime: "Heure habituelle",
    planSessionLink: "Suivi lié (facultatif)",
    planSessionLinkNone: "Aucune formule liée",
    planSessionLinkHelp: "Liez cette séance au suivi actif. Un crédit est réservé automatiquement pour le bloc de 10 séances.",
    planDetailsRequired: "Confirmez le jumelage élève-tuteur, puis une cadence, un jour et une heure réalistes avant de créer le bloc.",
    planActivate: "Créer le bloc et envoyer le paiement",
    planEnrollmentSaved: "Bloc créé dans le dossier parent.",
    planPaymentRequestCreated: "Demande de paiement créée. La vérification Stripe activera automatiquement les crédits, une seule fois.",
    planPaymentRequestTitle: "Demande de paiement du bloc",
    planPaymentRequestOpen: "Ouvrir le paiement Stripe",
    planMidpointTitle: "Paiement de mi-parcours du Bloc de progression",
    planMidpointIntro: `Le deuxième paiement de ${progressionInstallmentPrice.fr} devient disponible lorsque les cinq premiers crédits sont tous réservés ou utilisés.`,
    planMidpointAction: "Créer le paiement de mi-parcours",
    planMidpointNone: "Aucun Bloc de progression n'a encore atteint le point de mi-parcours.",
    planPaymentStageNotReady: "Les cinq premiers crédits doivent être entièrement réservés ou utilisés avant ce paiement.",
    planPaymentRequestBusy: "La demande de paiement est en cours de création. Réessayez dans quelques secondes.",
    planAlreadyActive: "Cette famille a déjà cette formule active pour cet élève. Ouvrez-la plutôt que de créer un second programme.",
    planEnrollmentBusy: "La formule est en cours d’activation. Réessayez dans quelques secondes.",
    planCannotAdjust: "Cette formule n’est plus active : ses crédits ne peuvent plus être modifiés.",
    planEnrollmentPending: "Formule créée en attente : confirmez le paiement avant d'ajouter les crédits.",
    planNoPlans: "Les formules seront disponibles après la synchronisation CRM.",
    planAdjustTitle: "Correction manuelle exceptionnelle de crédits",
    planAdjustHelp: "Réservé aux corrections exceptionnelles. Une raison précise est obligatoire; les paiements normaux sont crédités automatiquement par Stripe.",
    planSelectEnrollment: "Programme parent",
    planCreditAmount: "Crédits à ajouter ou retirer",
    planCreditReason: "Raison de l'ajustement",
    planCreditReasonRequired: "Ajoutez une raison avant d'enregistrer cette correction exceptionnelle.",
    planCreditSaved: "Crédits mis à jour.",
    paymentDemoAction: "Payer en simulation",
    paymentDemoSuccess: "Paiement simulé confirmé. Aucune carte n'a été débitée.",
    paymentDemoNotAvailable: "Cette séance utilise déjà le paiement par carte ou ne peut plus être simulée.",
    bookingTitle: "Réserver une séance",
    bookingIntro: "Choisissez un créneau. Un lien de paiement Stripe sécurisé sera créé pour votre réservation.",
    bookingPaymentNotice: "Le paiement par carte s’ouvre uniquement dans la page Stripe sécurisée.",
    bookingCreditIntro: "Choisissez un créneau : un crédit du programme sera réservé pour cette séance.",
    bookingNoSlots: "Aucun créneau n'est ouvert pour l'instant.",
    bookingPrice: "Prix de cette séance",
    bookingProgramCredit: "1 crédit du programme",
    bookingPlanCredit: "1 crédit du programme sera réservé pour cette séance.",
    bookingProgramCreditNotice: "Le crédit est réservé maintenant, puis consommé seulement après la séance.",
    matchingPendingTitle: "Nous préparons le bon jumelage",
    matchingPendingIntro: "Votre profil est reçu. L'équipe vous propose un tuteur avant de vous afficher ses créneaux.",
    matchingPendingCall: "Situation urgente ou besoin complexe? Appelez-nous.",
    chooseSlot: "Choisir ce créneau",
    bookingStudentName: "Nom de l'élève",
    bookingChooseChild: "Élève concerné",
    bookingAddChild: "Ajoutez d'abord un élève pour réserver un créneau.",
    bookSession: "Réserver et payer",
    bookWithProgramCredit: "Réserver avec un crédit",
    bookingLoading: "Validation du créneau...",
    bookingSuccess: "Séance réservée. Vous pouvez maintenant compléter le paiement simulé.",
    bookingCreditSuccess: "Séance réservée. Un crédit du programme est maintenant réservé.",
    bookingDetailsRequired: "Choisissez un créneau et ajoutez le nom de l'élève.",
    childrenTitle: "Mes élèves",
    childrenIntro: "Chaque enfant garde son niveau, son tuteur et son suivi. Ajoutez tous les enfants de la famille ici.",
    childName: "Nom de l'élève",
    childLevelSubject: "Niveau et matières",
    childLearningNotes: "Contexte utile pour le tuteur",
    childTutor: "Tuteur de l'élève",
    chooseStudent: "Choisir un élève",
    addChild: "Ajouter un élève",
    saveChild: "Enregistrer l'élève",
    childSaved: "Fiche élève enregistrée.",
    childDetailsRequired: "Ajoutez au minimum le nom de l'élève.",
    childNotFound: "Cette fiche élève n'est plus disponible.",
    childTutorAssigned: "Tuteur assigné à cet élève.",
    childTutorAssignmentRequired: "Choisissez un élève et un tuteur actif.",
    noChildren: "Aucun élève n'est encore ajouté.",
    calendarTitle: "Calendrier",
    calendarIntro: "Séances, confirmations et rappels restent visibles au même endroit.",
    calendarToday: "Aujourd'hui",
    calendarInviteSent: "Invitation calendrier envoyée",
    calendarReminderSent: "Rappel envoyé",
    calendarNotSynced: "Synchronisation en attente",
    activityTitle: "Historique de la famille",
    activityIntro: "Séances, résumés, messages, paiements et demandes dans l'ordre.",
    noActivity: "Les prochaines actions et les échanges apparaîtront ici.",
    todayTitle: "Aujourd'hui",
    todayIntro: "Les appels, confirmations, rappels et séances qui demandent une action maintenant.",
    todayCalls: "Appels à faire",
    todayConfirmations: "Séances à confirmer",
    todaySessions: "Séances du jour",
    todayReminders: "Rappels à envoyer",
    calendarId: "Calendrier Google partagé (facultatif)",
    calendarIdHelp: "Ajoutez l'ID d'un calendrier partagé avec l'équipe. Sans ID, l'événement est créé dans le calendrier de l'équipe et les participants sont invités.",
    calendarSaved: "Calendrier du tuteur mis à jour.",
    bookingSlotUnavailable: "Ce créneau vient d'être pris. Choisissez-en un autre.",
    parentUpdateSent: "Le résumé parent a été envoyé.",
    nextSessionProposed: "La prochaine séance a été proposée automatiquement.",
    sessionDetailsRequired: "Choisissez un parent, un tuteur et une date future.",
    sessionParticipantMissing: "Le parent ou le tuteur choisi n'est plus disponible.",
    sessionTimeConflict: "Ce tuteur a déjà une séance à ce moment. Choisissez un autre créneau.",
    parentManagement: "Gestion des parents",
    teamCreateParentTitle: "Ajouter un parent",
    createParentIntro: "Ajoutez une famille issue d'un appel ou d'une recommandation. L'accès portail reste sous votre contrôle.",
    createParentAccess: "Créer aussi l'accès portail parent",
    createParentConsent: "Le parent a consenti à l'ouverture de son dossier et de son accès portail.",
    createParent: "Créer le parent",
    parentCreated: "Parent ajouté au CRM.",
    parentCreatedWithAccess: "Parent ajouté et accès portail activé. Le parent peut maintenant demander son code par email.",
    callFollowUp: "Suivi de l'appel",
    callFollowUpIntro: "Gardez chaque rappel commercial visible, puis envoyez le parent au matching quand il est pret.",
    callParent: "Appeler le parent",
    leadStatus: "Etat du lead",
    callbackNotes: "Notes d'appel",
    saveCallFollowUp: "Enregistrer le suivi",
    callFollowUpSaved: "Suivi d'appel enregistre.",
    leadFollowUpStatusRequired: "Choisissez un etat de suivi valide.",
    parentManagementIntro: "Toutes les fiches parents sont ici. Vous pouvez les modifier, assigner un tuteur ou les supprimer avec confirmation.",
    parentIntentLabel: "Contexte initial",
    parentIntentExam: "Pr\u00e9paration d'examen",
    parentIntentHomework: "Devoirs difficiles",
    parentIntentOngoing: "Difficult\u00e9s r\u00e9currentes",
    chooseParentAccount: "Choisir un compte parent",
    assignedTutor: "Tuteur assigné",
    saveParent: "Enregistrer le parent",
    parentSaved: "Compte parent mis à jour.",
    parentDetailsRequired: "Ajoutez le nom et une adresse email valide.",
    parentNotFound: "Ce compte parent n'est plus disponible.",
    parentEmailInUse: "Cette adresse email appartient déjà à un autre parent.",
    parentAccess: "Accès portail",
    activateParent: "Activer l'accès",
    deactivateParent: "Désactiver l'accès",
    parentAccessUpdated: "Accès parent mis à jour.",
    assignTutor: "Assigner ce tuteur",
    tutorAssigned: "Tuteur assigné. Vous pouvez maintenant planifier la séance.",
    assignmentDetailsRequired: "Choisissez un parent et un tuteur actif.",
    deleteParent: "Supprimer le parent",
    confirmationEmail: "Retapez l'email du parent pour confirmer",
    parentDeleteConfirmationRequired: "L'email de confirmation ne correspond pas.",
    parentDeleted: "Compte parent et données associées supprimés.",
    tutorManagement: "Gestion des tuteurs",
    tutorManagementIntro: "Tous les tuteurs, actifs ou non, sont réunis ici. La suppression retire aussi leurs accès, disponibilités et séances liées.",
    tutorDetails: "Détails du tuteur",
    tutorStatus: "Statut du roster",
    tutorCapacity: "Capacité",
    deleteTutor: "Supprimer le tuteur",
    confirmationTutorEmail: "Retapez l'email du tuteur pour confirmer",
    tutorDeleteConfirmationRequired: "L'email de confirmation ne correspond pas.",
    tutorDeleted: "Tuteur et données associées supprimés.",
    tutorNotFound: "Ce tuteur n'est plus disponible.",
    messagesTitle: "Messages de séance",
    messageSession: "Séance concernée",
    messagePlaceholder: "Écrire un message",
    sendMessage: "Envoyer le message",
    messageSent: "Message envoyé. Le destinataire a aussi été avisé par email.",
    messageSentPortal: "Message envoyé dans le portail.",
    responseSla: "Réponse attendue dans les 24 h. L'équipe est alertée si le délai est dépassé.",
    messageRequired: "Écrivez un message avant de l'envoyer.",
    messageNotAllowed: "La messagerie est réservée au parent et au tuteur de cette séance.",
    notes: "Résumés",
    payments: "Paiements",
    amount: "Montant",
    pay: "Payer",
    paid: "Payé",
    paymentDueOneHour: "Paiement à effectuer dans l’heure",
    paymentDueUntil: "À régler avant",
    paymentLinkExpired: "Ce lien de paiement a expiré.",
    requestNewPaymentLink: "Demander un nouveau lien de paiement",
    paymentReissueSuccess: "Un nouveau lien de paiement sécurisé est prêt pendant une heure.",
    bookingReleased: "La réservation a été libérée. Choisissez un nouveau créneau avant de payer.",
    meetPreparing: "Lien Google Meet en préparation",
    joinGoogleMeet: "Rejoindre Google Meet",
    requestTitle: "Demander un suivi",
    requestHistory: "Suivi des demandes",
    requestQueue: "Demandes à traiter",
    requestStatus: "État",
    requestSave: "Mettre à jour",
    requestUpdated: "Demande mise à jour.",
    requestStatusRequired: "Choisissez un état valide.",
    requestNotFound: "Cette demande n'est plus disponible.",
    parentNoteTitle: "Ajouter une note",
    parentNoteSession: "Séance concernée",
    parentNoteMessage: "Information à partager avec l'équipe ou le tuteur",
    parentNoteSent: "Note ajoutée au suivi de la séance.",
    sessionPrepTitle: "Préparer la prochaine séance",
    sessionPrepIntro: "Partagez la priorité, un devoir ou un changement de contexte directement avec le tuteur.",
    sessionPrepMessage: "Priorité, devoir, évaluation ou contexte à connaître avant la séance",
    sessionPrepSent: "Préparation envoyée au tuteur dans l'espace de séance.",
    requestSubject: "Sujet",
    requestMessage: "Message",
    sendRequest: "Envoyer la demande",
    requestSent: "Demande envoyée. Elle apparaît dans le CRM pour traitement.",
    noteTitle: "Note après séance",
    chooseSession: "Choisir une séance",
    attendance: "Présence",
    focusWorked: "Ce qui a été travaillé",
    wins: "Ce qui avance bien",
    stuckPoints: "Ce qui bloque encore",
    homeworkNext: "Travail avant la prochaine séance",
    parentSummary: "Résumé parent",
    studentConfidence: "Confiance de l'élève",
    nextGoal: "Prochain objectif",
    riskLevel: "Risque",
    recommendation: "Recommandation",
    submitNote: "Envoyer la note",
    noteSent: "Note reçue. Le résumé parent est prêt à être validé.",
    noteNotReady: "La note peut être déposée après la fin de la séance.",
    availabilityTitle: "Mes disponibilités",
    availabilityIntro: "Les créneaux ouverts ici deviennent réservables par les parents dans le portail.",
    availabilityAdd: "Ajouter une disponibilité",
    availabilitySave: "Enregistrer la disponibilité",
    availabilityEdit: "Modifier",
    availabilityDay: "Jour",
    availabilityStart: "Début",
    availabilityEnd: "Fin",
    availabilityStatus: "Statut",
    availabilitySaved: "Disponibilité mise à jour.",
    availabilityPause: "Mettre en pause",
    availabilityOpen: "Ouvrir",
    availabilityEmpty: "Aucune disponibilité n'est publiée pour l'instant.",
    availabilityDetailsRequired: "Choisissez un jour, une heure de début et une heure de fin valides.",
    availabilityDuplicate: "Cette disponibilité existe déjà.",
    availabilityOverlap: "Cette plage chevauche déjà une autre disponibilité active.",
    feedbackTitle: "Votre retour",
    feedbackSession: "Séance concernée",
    sessionRating: "Satisfaction",
    clarityRating: "Clarté du suivi",
    followUpNeeded: "Souhaitez-vous un suivi?",
    feedbackComment: "Commentaire facultatif",
    submitFeedback: "Envoyer le retour",
    feedbackSent: "Merci, votre retour a été enregistré.",
    feedbackDetailsRequired: "Choisissez une séance et donnez deux évaluations.",
    feedbackNotAvailable: "Le retour est disponible après la séance.",
    parentFeedback: "Retours parents",
    testData: "Autres données de test",
    testDataHelp: "Les parents, tuteurs, séances, paiements, retours et demandes marqués test, demo, example, sample, mock, fake, essai ou qa apparaissent ici.",
    noTestData: "Aucune donnée de test à supprimer.",
    deleteTest: "Supprimer",
    testDeleted: "Donnée de test supprimée.",
    deleteAllTest: "Supprimer tous les tests",
    deleteAllTestConfirm: "Supprimer toutes les données de test affichées? Cette action retire aussi les données liées aux comptes de test.",
    testAllDeleted: "Données de test supprimées.",
    testRecordNotFound: "Cette donnée de test n'est plus disponible.",
    priorityTitle: "A traiter maintenant",
    priorityIntro: "Les files sont mises a jour depuis le CRM pour guider la prochaine action de l'equipe.",
    queueCallbacks: "Appels parents",
    queueMatching: "Matching",
    queueConfirmations: "Confirmations",
    queueCalendar: "Calendrier",
    queueNotes: "Bilans tuteurs",
    queuePayments: "Paiements",
    queueMessages: "Messages",
    queueEmpty: "Aucun element en attente.",
    automationTitle: "Automatisations",
    automationReminders: "Rappels",
    automationCalendar: "Calendrier",
    automationDigest: "Point equipe",
    automationPayments: "Paiement",
    automationReminderDetail: "avant seance, bilan et retour parent",
    automationCalendarDetail: "cree apres les deux confirmations",
    automationDigestDetail: "chaque jour",
    paymentModeCheckout: "Checkout Stripe sécurisés",
    paymentModeUnavailable: "Configuration requise",
    empty: "Rien à afficher pour l'instant.",
    loginHelp:
      "Ce portail est destiné aux clients existants. Les accès tuteurs sont créés uniquement par l'équipe.",
    createHelp:
      "Cette demande crée votre fiche de suivi; l'équipe propose d'abord le tuteur et le créneau. Aucun paiement ni engagement n'est confirmé ici.",
    createStepsTitle: "Après votre demande",
    createSteps: [
      "Vous confirmez votre adresse avec un code reçu par email.",
      "L'équipe reçoit la matière, le niveau et le besoin à cadrer.",
      "Le tuteur et le créneau sont proposés avant votre confirmation.",
    ],
    error: "Une erreur est survenue. Réessayez ou contactez Méthode Secondaire.",
  },
  en: {
    seoTitle: "Client portal sign-in | Méthode Secondaire",
    seoDescription:
      "Sign-in reserved for current parents and tutors to follow sessions, payments, notes and next actions.",
    badge: "Méthode Secondaire client portal",
    title: "Access your client portal.",
    subtitle:
      "This space is reserved for current parents and tutors. Sign in with the code received by email to view your sessions, payments and follow-up.",
    firstSessionRequestBadge: "First-session request",
    firstSessionRequestTitle: "Tell us about your student's situation.",
    firstSessionRequestSubtitle:
      "Share the grade, subject and need. The team will then propose a tutor and time; the portal is used for follow-up after your first confirmation.",
    newClientPrompt: "Looking for a tutor for the first time?",
    newClientAction: "Request a first session",
    parent: "Parent",
    tutor: "Tutor",
    operator: "Team",
    loginTab: "Sign in",
    createTab: "My request",
    existingAccessTitle: "I already have access",
    createParentTitle: "First-session request",
    createTutorTitle: "Tutor access request",
    email: "Email address",
    code: "Code received by email",
    sendCode: "Get a code",
    verifyCode: "Sign in",
    parentName: "Parent name",
    phone: "Phone",
    studentLevelSubject: "Grade and subject",
    mainConcern: "Main need",
    preferredFormat: "Preferred format",
    tutorName: "Tutor name",
    tutorSubjects: "Subjects and grades",
    createParentAccount: "Send my request",
    createTutorRequest: "Request access",
    privacyConsent: "I agree that Méthode Secondaire may keep this information to organize sessions, follow-up and payments.",
    codeSent:
      "If access exists for this address, a code has been sent. Please check spam too.",
    sendingCode: "Sending code...",
    signingIn: "Signing in...",
    creatingAccount: "Creating account...",
    loadingDashboard: "Loading your space...",
    loadingDashboardSlow: "Connecting to the CRM. Your data remains secure.",
    serviceTimeout:
      "The service is taking longer than expected. Refresh in a moment; your session and data are still safe.",
    dashboardDisplayError:
      "The dashboard received data, but one section could not be displayed. Your data remains safe.",
    retryDashboard: "Retry dashboard",
    accountCreated:
      "Request received. A code has been sent to your email to confirm access to your follow-up.",
    existingAccountCodeSent:
      "Access already exists for this address. A code has been sent.",
    tutorRequestSent:
      "Request received. Tutor access will be enabled after roster approval.",
    tutorInviteRequired: "Tutor access is created and sent only by the Méthode Secondaire team.",
    tutorInviteTitle: "Tutor access",
    tutorCreateTitle: "Add a tutor",
    tutorCreateIntro: "Create the profile, then the tutor receives a sign-in code by email.",
    tutorExistingTitle: "Existing access",
    tutorInviteStatus: "Access status",
    inviteTutor: "Create and send access",
    tutorInvited: "Tutor access created. A sign-in code was sent.",
    createTutor: "Create tutor and send access",
    tutorCreatedAndInvited: "Tutor created and access sent by email.",
    tutorCreatedInvitePending: "Tutor created. Send the access below when email delivery is available.",
    tutorDetailsRequired: "Add a name, email, subjects, grades, format and a capacity from 1 to 40 students.",
    tutorEmailInUse: "This email address already belongs to a tutor.",
    tutorLevels: "Grades covered",
    tutorWeeklyCapacity: "Weekly capacity (students)",
    tutorLanguage: "Working language",
    tutorZones: "Area or service zone",
    tutorRate: "Hourly rate (CAD/h — $28 base, adjusted by experience and role)",
    tutorRateInvalid: "The hourly rate must be at least CAD $28/hour.",
    tutorNotes: "Internal note (optional)",
    tutorInviteDetailsRequired: "Choose an active tutor with a calendar email address.",
    logout: "Sign out",
    cancel: "Cancel",
    refresh: "Refresh",
    setupPending:
      "The portal is ready on the website, but Apps Script email authorization may still be needed if no code arrives.",
    apiUnavailable:
      "The portal API is not responding here. In local development, restart the site and try again; in production, check the Vercel configuration.",
    accountRequired: "Add at least the name and email to create access.",
    privacyConsentRequired: "Consent is required to create the parent account.",
    emailRequired: "Enter a valid email address.",
    emailNotAuthorized:
      "Email code delivery needs a one-time Google Apps Script authorization. Please retry shortly or contact Méthode Secondaire.",
    emailQuotaReached:
      "Email code delivery is temporarily unavailable. Please retry later or contact Méthode Secondaire.",
    emailSendFailed:
      "The code could not be sent. Please retry shortly or contact Méthode Secondaire.",
    loginFailed: "The code or email address is incorrect. Request a new code and try again.",
    loginCooldown: "Too many incorrect codes were entered. Wait 15 minutes before requesting a new code.",
    codeExpired: "This code has expired. Request a new code.",
    sessionExpired: "Your session is no longer active. Request a new code to sign in again.",
    parentDashboard: "Parent space",
    tutorDashboard: "Tutor space",
    operatorDashboard: "Session management",
    parentJourneyTitle: "Your journey",
    parentJourneyProfile: "Profile received",
    parentJourneyMatching: "Tutor proposed",
    parentJourneyBooking: "Session booked",
    parentJourneyFollowUp: "Follow-up underway",
    parentJourneyCurrent: "In progress",
    parentJourneyDone: "Complete",
    parentJourneyEyebrow: "Your family follow-up",
    parentJourneyNext: "Next step",
    parentJourneyCount: "steps complete",
    parentJourneyCompleteMessage: "Everything is in place. Your portal now keeps the full picture clear.",
    parentActionEyebrow: "Do this now",
    parentActionProfile: "Complete your profile",
    parentActionProfileText: "Add the few useful details that help matching start with the right context.",
    parentActionMatching: "Matching is being prepared",
    parentActionMatchingText: "Your request is safely received. We will suggest the right tutor before booking.",
    parentActionBooking: "Choose a first session",
    parentActionBookingText: "Your tutor is ready: simply choose the time that works for your family.",
    parentActionPayment: "Complete the payment",
    parentActionPaymentText: "A payment needs your attention to keep the session confirmed.",
    parentActionMessage: "Reply to the latest message",
    parentActionMessageText: "A quick reply helps the team and tutor prepare what comes next.",
    parentActionAllSet: "Everything is up to date",
    parentActionAllSetText: "Your family is ready. The next helpful milestone will appear here at the right time.",
    parentActionOpen: "See the next step",
    rhythmEyebrow: "Your rhythm",
    rhythmTitle: "Follow-up that stays simple",
    rhythmNoContract: "No subscription or automatic renewal",
    rhythmNoContractText: "The cadence is chosen with you after matching. It organizes the block's sessions without creating a subscription.",
    rhythmSameTutor: "Same tutor, same time",
    rhythmSameTutorText: "Your follow-up keeps its context: less repeating and more continuity.",
    rhythmDeadline: "Planning deadline",
    rhythmDeadlineFallback: `Plan any change at least ${pricing.cancellation.noticeHours} hours before a session.`,
    rhythmDeadlinePassed: `The ${pricing.cancellation.noticeHours}-hour window has passed: the team can still review an adjustment.`,
    rhythmPause: "Pause this rhythm",
    rhythmResume: "Resume this rhythm",
    rhythmPauseHelp: `A pause applies to future sessions that are not yet inside the ${pricing.cancellation.noticeHours}-hour window. No real payment is triggered from this card.`,
    rhythmPauseConfirmed: "The rhythm is paused. Sessions already confirmed still need to be reviewed separately.",
    rhythmResumeConfirmed: "The rhythm is resumed. The team and tutor can see your cadence again.",
    rhythmPauseSetup: "The team first activates this rhythm in your file; you will then be able to pause it here.",
    rhythmManage: "Manage sessions",
    rhythmPriceNote: "Cadence is confirmed after matching; it never renews the block automatically.",
    programEyebrow: "Your block",
    programCredits: "sessions left",
    programOutOf: "of",
    programUsed: "sessions used",
    programAction: "See program sessions",
    programPending: "Program being activated",
    materialsEyebrow: "Before the session",
    materialsTitle: "Prepare the session",
    materialsDescription: "A photo of homework, the chapter, or an exam helps the tutor focus faster.",
    materialsNoSession: "Once a session is scheduled, you will be able to prepare what your student wants to work on here.",
    materialsCapture: "Take a photo",
    materialsAddFile: "Add photos or a PDF",
    materialsSelected: "On this device",
    materialsReceived: "Documents received",
    materialsRemove: "Remove",
    materialsNote: "What feels most stuck? (optional)",
    materialsNotePlaceholder: "For example: I do not know how to start question 4.",
    materialsLocalOnly: "Photos and PDFs stay on this device until secure transfer is enabled. You can still send the note to the tutor now.",
    materialsReady: "Add a note to clarify what your student wants to work on; secure file transfer will be enabled separately.",
    materialsMessageTutor: "Message the tutor",
    materialsSendNote: "Send note to tutor",
    calendarNoSessions: "No sessions scheduled this week.",
    profileTitle: "Learning profile",
    profileIntro: "Keep the student's information current so each session starts with the right context.",
    profileSaved: "Learning profile updated.",
    profileDetailsRequired: "Add at least your name before saving the profile.",
    profileTimeline: "Important timeline or cadence",
    profileSave: "Save profile",
    welcome: "Hello",
    nextSession: "Next session",
    manageSession: "Manage this session",
    noNextSession: "No confirmed upcoming session.",
    sessions: "Sessions",
    scheduleSession: "Schedule a session",
    chooseParent: "Choose a parent",
    chooseTutor: "Choose a tutor",
    sessionDate: "Date and time",
    duration: "Duration",
    studentName: "Student name",
    sessionType: "Session type",
    sessionFormat: "Format",
    location: "Location or meeting link",
    recurrence: "Recurrence",
    createSession: "Send proposal",
    sessionCreated: "The session was proposed to both people for confirmation.",
    confirmSession: "Confirm",
    requestChange: "Request a change",
    rescheduleSession: "Change time",
    rescheduleTitle: "Propose a new time",
    rescheduleDate: "New date and time",
    rescheduleDuration: "New duration (minutes)",
    rescheduleSave: "Send new proposal",
    sessionRescheduled: "New time proposed. The parent and tutor now need to confirm.",
    rescheduleNotAvailable: "This session can no longer be rescheduled.",
    cancelSession: "Cancel session",
    cancellationPolicy: `With ${pricing.cancellation.noticeHours} hours' notice, rescheduling is guaranteed. Later requests are reviewed by the team; no credit or payment is removed automatically.`,
    cancellationConfirmed: "Session cancelled. Calendar and unpaid payment were updated.",
    cancellationReview: "Cancellation request sent to the team for review.",
    operatorCancellationConfirm: "Cancel this session? The parent, tutor, calendar and outstanding payment will be updated.",
    operatorCancellationConfirmed: "Session cancelled by the team. Calendar and payment were updated.",
    cancellationNotAvailable: "This session can no longer be cancelled from the portal.",
    sessionConfirmed: "Confirmation saved. Calendar and payment will follow once both people confirm.",
    sessionChangeRequested: "The change request was sent to the team.",
    confirmationWaiting: "Waiting for the other confirmation",
    parentConfirmed: "Parent confirmed",
    tutorConfirmed: "Tutor confirmed",
    paymentReady: "Payment ready",
    planSetupTitle: "Blocks and payments",
    planSetupIntro: "Create a Momentum block or a Progress block. Stripe verification automatically grants the included credits exactly once.",
    planChoose: "Offer",
    planChooseParent: "Parent",
    planChooseStudent: "Student",
    planChooseTutor: "Tutor",
    planCadence: "Cadence after matching",
    planCadenceHelp: "Choose a rhythm only after confirming the tutor and the family's availability.",
    planCadenceOptions: {
      one_time: "Plan as needed",
      weekly: "Every week",
      biweekly: "Every two weeks",
    },
    planWeekday: "Usual day",
    planTime: "Usual time",
    planSessionLink: "Linked follow-up (optional)",
    planSessionLinkNone: "No linked offer",
    planSessionLinkHelp: "Link this session to active follow-up. A credit is reserved automatically for the 10-session block.",
    planDetailsRequired: "Confirm the student-tutor match, then a realistic cadence, day, and time before creating the block.",
    planActivate: "Create block and send payment",
    planEnrollmentSaved: "Block created in the parent file.",
    planPaymentRequestCreated: "Payment request created. Stripe verification will activate the credits automatically, exactly once.",
    planPaymentRequestTitle: "Block payment request",
    planPaymentRequestOpen: "Open Stripe payment",
    planMidpointTitle: "Progress block midpoint payment",
    planMidpointIntro: `The second ${progressionInstallmentPrice.en} payment becomes available once all first five credits are reserved or used.`,
    planMidpointAction: "Create midpoint payment",
    planMidpointNone: "No Progress block has reached the midpoint yet.",
    planPaymentStageNotReady: "All first five credits must be reserved or used before this payment.",
    planPaymentRequestBusy: "The payment request is being created. Please try again in a few seconds.",
    planAlreadyActive: "This family already has this active offer for this student. Open it instead of creating a second program.",
    planEnrollmentBusy: "The offer is being activated. Please try again in a few seconds.",
    planCannotAdjust: "This offer is no longer active, so its credits cannot be changed.",
    planEnrollmentPending: "Offer created pending: confirm payment before adding credits.",
    planNoPlans: "Offers will be available after the CRM sync.",
    planAdjustTitle: "Exceptional manual credit correction",
    planAdjustHelp: "Use only for exceptional corrections. A specific reason is required; normal payments are credited automatically by Stripe.",
    planSelectEnrollment: "Parent program",
    planCreditAmount: "Credits to add or remove",
    planCreditReason: "Reason for adjustment",
    planCreditReasonRequired: "Add a reason before saving this exceptional correction.",
    planCreditSaved: "Credits updated.",
    paymentDemoAction: "Pay in simulation",
    paymentDemoSuccess: "Simulated payment confirmed. No card was charged.",
    paymentDemoNotAvailable: "This session already uses card payment or can no longer be simulated.",
    bookingTitle: "Book a session",
    bookingIntro: "Choose a time. A secure Stripe payment link will be created for your booking.",
    bookingPaymentNotice: "Card payment opens only on Stripe’s secure page.",
    bookingCreditIntro: "Choose a time: one program credit will be reserved for this session.",
    bookingNoSlots: "No time is open right now.",
    bookingPrice: "Price for this session",
    bookingProgramCredit: "1 program credit",
    bookingPlanCredit: "1 program credit will be reserved for this session.",
    bookingProgramCreditNotice: "The credit is reserved now and used only after the session is completed.",
    matchingPendingTitle: "We are preparing the right match",
    matchingPendingIntro: "Your profile is in. The team will propose a tutor before showing that tutor's available times.",
    matchingPendingCall: "Urgent or complex situation? Call us.",
    chooseSlot: "Choose this time",
    bookingStudentName: "Student name",
    bookingChooseChild: "Student",
    bookingAddChild: "Add a student before booking a time.",
    bookSession: "Book and pay",
    bookWithProgramCredit: "Book with a credit",
    bookingLoading: "Confirming time...",
    bookingSuccess: "Session booked. You can now complete the simulated payment.",
    bookingCreditSuccess: "Session booked. One program credit is now reserved.",
    bookingDetailsRequired: "Choose a time and add the student name.",
    childrenTitle: "My students",
    childrenIntro: "Each child keeps their grade, tutor and follow-up. Add every student in the family here.",
    childName: "Student name",
    childLevelSubject: "Grade and subjects",
    childLearningNotes: "Useful context for the tutor",
    childTutor: "Student tutor",
    chooseStudent: "Choose a student",
    addChild: "Add a student",
    saveChild: "Save student",
    childSaved: "Student profile saved.",
    childDetailsRequired: "Add at least the student name.",
    childNotFound: "This student profile is no longer available.",
    childTutorAssigned: "Tutor assigned to this student.",
    childTutorAssignmentRequired: "Choose a student and an active tutor.",
    noChildren: "No students have been added yet.",
    calendarTitle: "Calendar",
    calendarIntro: "Sessions, confirmations and reminders stay visible in one place.",
    calendarToday: "Today",
    calendarInviteSent: "Calendar invitation sent",
    calendarReminderSent: "Reminder sent",
    calendarNotSynced: "Sync pending",
    activityTitle: "Family history",
    activityIntro: "Sessions, summaries, messages, payments and requests in order.",
    noActivity: "Upcoming actions and exchanges will appear here.",
    todayTitle: "Today",
    todayIntro: "Calls, confirmations, reminders and sessions that need action now.",
    todayCalls: "Calls to make",
    todayConfirmations: "Sessions to confirm",
    todaySessions: "Today's sessions",
    todayReminders: "Reminders to send",
    calendarId: "Shared Google Calendar (optional)",
    calendarIdHelp: "Add a calendar ID shared with the team. Without one, the event is created in the team calendar and both people receive an invite.",
    calendarSaved: "Tutor calendar updated.",
    bookingSlotUnavailable: "That time was just taken. Choose another one.",
    parentUpdateSent: "The parent summary was sent.",
    nextSessionProposed: "The next session was proposed automatically.",
    sessionDetailsRequired: "Choose a parent, tutor and future date.",
    sessionParticipantMissing: "The selected parent or tutor is no longer available.",
    sessionTimeConflict: "This tutor already has a session at that time. Choose another time.",
    parentManagement: "Parent management",
    teamCreateParentTitle: "Add a parent",
    createParentIntro: "Add a family from a call or referral. Portal access stays under your control.",
    createParentAccess: "Also create parent portal access",
    createParentConsent: "The parent has consented to opening their record and portal access.",
    createParent: "Create parent",
    parentCreated: "Parent added to the CRM.",
    parentCreatedWithAccess: "Parent added and portal access enabled. They can now request their code by email.",
    callFollowUp: "Call follow-up",
    callFollowUpIntro: "Keep every sales callback visible, then move the parent to matching when they are ready.",
    callParent: "Call parent",
    leadStatus: "Lead status",
    callbackNotes: "Call notes",
    saveCallFollowUp: "Save follow-up",
    callFollowUpSaved: "Call follow-up saved.",
    leadFollowUpStatusRequired: "Choose a valid follow-up status.",
    parentManagementIntro: "Every parent profile is here. You can edit it, assign a tutor or delete it with confirmation.",
    parentIntentLabel: "Starting context",
    parentIntentExam: "Exam preparation",
    parentIntentHomework: "Difficult homework",
    parentIntentOngoing: "Recurring difficulties",
    chooseParentAccount: "Choose a parent account",
    assignedTutor: "Assigned tutor",
    saveParent: "Save parent",
    parentSaved: "Parent account updated.",
    parentDetailsRequired: "Add a name and valid email address.",
    parentNotFound: "This parent account is no longer available.",
    parentEmailInUse: "This email address belongs to another parent.",
    parentAccess: "Portal access",
    activateParent: "Enable access",
    deactivateParent: "Disable access",
    parentAccessUpdated: "Parent access updated.",
    assignTutor: "Assign this tutor",
    tutorAssigned: "Tutor assigned. You can now schedule the session.",
    assignmentDetailsRequired: "Choose a parent and active tutor.",
    deleteParent: "Delete parent",
    confirmationEmail: "Re-enter the parent email to confirm",
    parentDeleteConfirmationRequired: "The confirmation email does not match.",
    parentDeleted: "Parent account and related data deleted.",
    tutorManagement: "Tutor management",
    tutorManagementIntro: "Every tutor, active or not, is gathered here. Deletion also removes their access, availability and linked sessions.",
    tutorDetails: "Tutor details",
    tutorStatus: "Roster status",
    tutorCapacity: "Capacity",
    deleteTutor: "Delete tutor",
    confirmationTutorEmail: "Retype the tutor email to confirm",
    tutorDeleteConfirmationRequired: "The confirmation email does not match.",
    tutorDeleted: "Tutor and related data deleted.",
    tutorNotFound: "This tutor is no longer available.",
    messagesTitle: "Session messages",
    messageSession: "Session",
    messagePlaceholder: "Write a message",
    sendMessage: "Send message",
    messageSent: "Message sent. The recipient was also notified by email.",
    messageSentPortal: "Message sent in the portal.",
    responseSla: "A reply is expected within 24 hours. The team is alerted if that deadline is missed.",
    messageRequired: "Write a message before sending it.",
    messageNotAllowed: "Messages are limited to the parent and tutor assigned to this session.",
    notes: "Summaries",
    payments: "Payments",
    amount: "Amount",
    pay: "Pay",
    paid: "Paid",
    paymentDueOneHour: "Payment due within one hour",
    paymentDueUntil: "Pay by",
    paymentLinkExpired: "This payment link has expired.",
    requestNewPaymentLink: "Request a new payment link",
    paymentReissueSuccess: "A new secure payment link is ready for one hour.",
    bookingReleased: "This booking was released. Choose a new time before paying.",
    meetPreparing: "Google Meet link is being prepared",
    joinGoogleMeet: "Join Google Meet",
    requestTitle: "Ask for follow-up",
    requestHistory: "Request updates",
    requestQueue: "Requests to handle",
    requestStatus: "Status",
    requestSave: "Update",
    requestUpdated: "Request updated.",
    requestStatusRequired: "Choose a valid status.",
    requestNotFound: "This request is no longer available.",
    parentNoteTitle: "Add a note",
    parentNoteSession: "Session",
    parentNoteMessage: "Information to share with the team or tutor",
    parentNoteSent: "Note added to the session follow-up.",
    sessionPrepTitle: "Prepare the next session",
    sessionPrepIntro: "Share the priority, homework or a context change directly with the tutor.",
    sessionPrepMessage: "Priority, homework, assessment or context to know before the session",
    sessionPrepSent: "Preparation sent to the tutor in the session space.",
    requestSubject: "Subject",
    requestMessage: "Message",
    sendRequest: "Send request",
    requestSent: "Request sent. It now appears in the CRM.",
    noteTitle: "Post-session note",
    chooseSession: "Choose a session",
    attendance: "Attendance",
    focusWorked: "What was covered",
    wins: "What improved",
    stuckPoints: "What is still blocked",
    homeworkNext: "Work before next session",
    parentSummary: "Parent summary",
    studentConfidence: "Student confidence",
    nextGoal: "Next goal",
    riskLevel: "Risk",
    recommendation: "Recommendation",
    submitNote: "Submit note",
    noteSent: "Note received. The parent summary is ready for review.",
    noteNotReady: "The session note can be submitted after the session ends.",
    availabilityTitle: "My availability",
    availabilityIntro: "Open windows here become bookable by parents in the portal.",
    availabilityAdd: "Add availability",
    availabilitySave: "Save availability",
    availabilityEdit: "Edit",
    availabilityDay: "Day",
    availabilityStart: "Start",
    availabilityEnd: "End",
    availabilityStatus: "Status",
    availabilitySaved: "Availability updated.",
    availabilityPause: "Pause",
    availabilityOpen: "Open",
    availabilityEmpty: "No availability is published yet.",
    availabilityDetailsRequired: "Choose a valid day, start time and end time.",
    availabilityDuplicate: "This availability already exists.",
    availabilityOverlap: "This window overlaps another active availability.",
    feedbackTitle: "Your feedback",
    feedbackSession: "Session",
    sessionRating: "Satisfaction",
    clarityRating: "Clarity of follow-up",
    followUpNeeded: "Would you like follow-up?",
    feedbackComment: "Optional comment",
    submitFeedback: "Send feedback",
    feedbackSent: "Thank you, your feedback was recorded.",
    feedbackDetailsRequired: "Choose a session and provide both ratings.",
    feedbackNotAvailable: "Feedback is available after the session.",
    parentFeedback: "Parent feedback",
    testData: "Other test data",
    testDataHelp: "Parents, tutors, sessions, payments, feedback and requests marked test, demo, example, sample, mock, fake, essai or qa appear here.",
    noTestData: "No test data to delete.",
    deleteTest: "Delete",
    testDeleted: "Test data deleted.",
    deleteAllTest: "Delete all tests",
    deleteAllTestConfirm: "Delete every displayed test record? This also removes data linked to test accounts.",
    testAllDeleted: "Test data deleted.",
    testRecordNotFound: "This test record is no longer available.",
    priorityTitle: "Handle now",
    priorityIntro: "These queues are updated from the CRM to guide the team's next action.",
    queueCallbacks: "Parent calls",
    queueMatching: "Matching",
    queueConfirmations: "Confirmations",
    queueCalendar: "Calendar",
    queueNotes: "Tutor notes",
    queuePayments: "Payments",
    queueMessages: "Messages",
    queueEmpty: "Nothing waiting.",
    automationTitle: "Automations",
    automationReminders: "Reminders",
    automationCalendar: "Calendar",
    automationDigest: "Team digest",
    automationPayments: "Payments",
    automationReminderDetail: "before sessions, notes and parent feedback",
    automationCalendarDetail: "created after both confirmations",
    automationDigestDetail: "every day",
    paymentModeCheckout: "Secure Stripe Checkout",
    paymentModeUnavailable: "Setup required",
    empty: "Nothing to show yet.",
    loginHelp:
      "This portal is for current clients. Tutor access is created only by the team.",
    createHelp:
      "This request creates your follow-up profile; the team first proposes a tutor and time. No payment or commitment is confirmed here.",
    createStepsTitle: "After your request",
    createSteps: [
      "Confirm your email address with the code you receive.",
      "The team receives the subject, grade and need to frame.",
      "The tutor and time are proposed before you confirm.",
    ],
    error: "Something went wrong. Please try again or contact Méthode Secondaire.",
  },
}

const attendanceOptions = ["present", "late", "cancelled", "no_show"]
const riskOptions = ["green", "watch", "high"]
const recommendationOptions = [
  "keep_weekly",
  "add_practice",
  "exam_sprint",
  "parent_call",
  "change_tutor",
  "pause",
  "no_change",
]
const confidenceOptions = ["lower", "steady", "higher"]

function emitPortalTrackingEvent(name, detail = {}) {
  if (typeof window === "undefined") {
    return
  }

  window.dispatchEvent(new CustomEvent(name, { detail }))
}

export default function Portal() {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const copy = copyByLocale[locale] || copyByLocale.fr
  const path = getLocalizedPath("portal", locale)
  const homePath = getLocalizedPath("home", locale)
  const isFirstSessionRequest = new URLSearchParams(location.search).get("mode") === "create"
  const [role, setRole] = useState("parent")
  const [authMode, setAuthMode] = useState(() => (
    isFirstSessionRequest ? "create" : "login"
  ))
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [session, setSession] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [loadingAction, setLoadingAction] = useState("")
  const [notice, setNotice] = useState("")
  const [error, setError] = useState("")
  const [isDashboardSlow, setIsDashboardSlow] = useState(false)
  const isLoading = Boolean(loadingAction)

  useEffect(() => {
    if (isFirstSessionRequest) {
      setRole("parent")
      setAuthMode("create")
      return
    }

    setAuthMode("login")
  }, [isFirstSessionRequest])

  useEffect(() => {
    if (loadingAction !== "loadingDashboard") {
      setIsDashboardSlow(false)
      return undefined
    }

    const timeoutId = window.setTimeout(() => setIsDashboardSlow(true), 5000)
    return () => window.clearTimeout(timeoutId)
  }, [loadingAction])

  useEffect(() => {
    const stored = loadPortalSession()
    if (!stored?.token || !stored?.role) {
      return
    }

    setSession(stored)
    setRole(stored.role)
    setEmail(stored.email || "")
    refreshDashboard(stored)
  }, [])

  async function handleRequestCode(event) {
    event.preventDefault()
    setLoadingAction("sendingCode")
    setError("")
    setNotice("")

    const result = await requestPortalCode({ role, email })
    setLoadingAction("")

    if (!result.ok) {
      setError(getPortalErrorMessage(copy, result.code))
      return
    }

    setNotice(copy.codeSent)
  }

  async function handleCreateAccount(values) {
    setLoadingAction("creatingAccount")
    setError("")
    setNotice("")

    const result = await createPortalAccount({
      role,
      values: {
        ...values,
        email,
        locale,
      },
    })
    setLoadingAction("")

    if (!result.ok) {
      setError(getPortalErrorMessage(copy, result.code))
      return
    }

    if (role === "parent" && result.account_created) {
      emitPortalTrackingEvent("methode:session-request-created", {
        source: "portal-account",
        locale,
        status: "created",
      })
    }

    if (result.email) {
      setEmail(result.email)
    }
    if (result.role) {
      setRole(result.role)
    }

    if (result.access_request_created) {
      setNotice(copy.tutorRequestSent)
      return
    }

    setAuthMode("login")
    setCode("")
    setNotice(result.account_created ? copy.accountCreated : copy.existingAccountCodeSent)
  }

  async function handleVerifyCode(event) {
    event.preventDefault()
    setLoadingAction("signingIn")
    setError("")

    const result = await verifyPortalCode({ role, email, code })
    setLoadingAction("")

    if (!result.ok) {
      setError(getPortalErrorMessage(copy, result.code))
      return
    }

    const nextSession = {
      role: result.role,
      email: result.email,
      token: result.token,
      session_expires_at: result.session_expires_at,
    }
    savePortalSession(nextSession)
    setSession(nextSession)
    setDashboard(result.dashboard)
    setNotice("")
    setCode("")
  }

  async function refreshDashboard(currentSession = session) {
    if (!currentSession?.token) {
      return
    }

    setLoadingAction("loadingDashboard")
    setError("")
    const result = await getPortalDashboard(currentSession)
    setLoadingAction("")

    if (!result.ok) {
      const invalidSession = ["PORTAL_SESSION_REQUIRED", "PORTAL_SESSION_INVALID", "PORTAL_SESSION_EXPIRED"].includes(result.code)

      if (invalidSession) {
        clearPortalSession()
        setSession(null)
        setDashboard(null)
      }

      setError(getPortalErrorMessage(copy, result.code))
      return
    }

    setDashboard(result.dashboard)
  }

  function handleLogout() {
    clearPortalSession()
    setSession(null)
    setDashboard(null)
    setCode("")
    setNotice("")
    setError("")
  }

  function retryDashboard() {
    setDashboard(null)
    refreshDashboard()
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.seoTitle,
    description: copy.seoDescription,
    url: `${siteConfig.siteUrl}${path}`,
  }

  return (
    <div className="relative min-w-0 overflow-x-hidden">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        jsonLd={schema}
        lang={getHtmlLang(locale)}
        locale={getOgLocale(locale)}
        alternateLocale={getAlternateOgLocale(locale)}
        alternates={buildAlternates("portal")}
      />

      <main className="mx-auto w-full min-w-0 max-w-7xl px-4 pb-12 pt-5 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8 lg:pb-28 lg:pt-10">
        <MotionCard className={`section-shell noise-overlay text-white ${session ? "p-4 sm:p-6" : "p-4 sm:p-8"}`}>
          {!session ? (
            <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/85">
                  <ShieldCheck className="h-4 w-4 text-[#f5c977]" />
                  {isFirstSessionRequest ? copy.firstSessionRequestBadge : copy.badge}
                </div>
                <h1 className="balanced-copy mt-5 font-display text-3xl font-semibold leading-tight sm:text-5xl">
                  {isFirstSessionRequest ? copy.firstSessionRequestTitle : copy.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/74">
                  {isFirstSessionRequest ? copy.firstSessionRequestSubtitle : copy.subtitle}
                </p>
              </div>

              <div className="panel-soft rounded-[24px] p-4 sm:p-5">
                <LoginPanel
                  copy={copy}
                  role={role}
                  authMode={authMode}
                  email={email}
                  code={code}
                  isLoading={isLoading}
                  loadingAction={loadingAction}
                  onRoleChange={(nextRole) => {
                    setRole(nextRole)
                    if (nextRole !== "parent") {
                      setAuthMode("login")
                    }
                  }}
                  onAuthModeChange={setAuthMode}
                  onEmailChange={setEmail}
                  onCodeChange={setCode}
                  onRequestCode={handleRequestCode}
                  onVerifyCode={handleVerifyCode}
                  onCreateAccount={handleCreateAccount}
                  showAccountCreation={isFirstSessionRequest}
                  newClientPath={homePath}
                />
                {notice ? <p className="mt-4 rounded-2xl bg-[#f5c977]/12 px-4 py-3 text-sm leading-6 text-white/78">{notice}</p> : null}
                {error ? <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">{error}</p> : null}
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-sm text-white/60">
                  <ShieldCheck className="h-4 w-4 text-[#f5c977]" />
                  {dashboard?.profile?.name ? `${copy.welcome}, ${dashboard.profile.name}` : session.email}
                </div>
                <h1 className="mt-1 font-display text-2xl font-semibold sm:mt-2 sm:text-4xl">
                  {session.role === "operator"
                    ? copy.operatorDashboard
                    : session.role === "tutor"
                      ? copy.tutorDashboard
                      : copy.parentDashboard}
                </h1>
              </div>
              <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
                <Button
                  type="button"
                  onClick={() => refreshDashboard()}
                  disabled={isLoading}
                  className="h-10 min-w-0 rounded-full bg-white/10 px-3 text-sm text-white hover:bg-white/15 sm:h-auto sm:w-auto sm:px-4"
                >
                  {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  {copy.refresh}
                </Button>
                <Button
                  type="button"
                  onClick={handleLogout}
                  variant="outline"
                  className="h-10 min-w-0 rounded-full border-white/15 bg-white/5 px-3 text-sm text-white hover:bg-white/10 hover:text-white sm:h-auto sm:w-auto sm:px-4"
                >
                  <LogOut className="h-4 w-4" />
                  {copy.logout}
                </Button>
              </div>
              {notice ? <p className="w-full rounded-2xl bg-[#f5c977]/12 px-4 py-3 text-sm leading-6 text-white/78">{notice}</p> : null}
              {error ? <p className="w-full rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">{error}</p> : null}
            </div>
          )}
        </MotionCard>

        {session && !dashboard && isLoading ? <PortalLoadingState copy={copy} isSlow={isDashboardSlow} /> : null}
        {session && dashboard ? (
          <PortalDashboardBoundary copy={copy} onRetry={retryDashboard}>
            {session.role === "operator" ? (
              <OperatorDashboard copy={copy} dashboard={dashboard} locale={locale} token={session.token} onSaved={() => refreshDashboard()} />
            ) : session.role === "tutor" ? (
              <TutorDashboard
                copy={copy}
                dashboard={dashboard}
                token={session.token}
                onSaved={() => refreshDashboard()}
              />
            ) : (
              <ParentDashboard
                copy={copy}
                dashboard={dashboard}
                locale={locale}
                role={session.role}
                token={session.token}
                onSaved={() => refreshDashboard()}
              />
            )}
          </PortalDashboardBoundary>
        ) : null}
      </main>
    </div>
  )
}

function PortalLoadingState({ copy, isSlow }) {
  return (
    <div className="mt-6 grid min-h-44 place-items-center rounded-[24px] border border-white/10 bg-[#091939] p-6 text-center text-white">
      <LoaderCircle className="h-7 w-7 animate-spin text-[#f5c977]" />
      <p className="mt-3 text-sm font-semibold text-white/84">
        {isSlow ? copy.loadingDashboardSlow : copy.loadingDashboard}
      </p>
    </div>
  )
}

class PortalDashboardBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error("Portal dashboard render failed.", error)
    reportPortalClientError(error, info)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <section className="mt-6 rounded-[24px] border border-white/10 bg-[#091939] p-6 text-white">
        <h2 className="font-display text-2xl font-semibold">{this.props.copy.dashboardDisplayError}</h2>
        <Button type="button" onClick={this.props.onRetry} className="mt-5 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
          <RefreshCw className="h-4 w-4" />
          {this.props.copy.retryDashboard}
        </Button>
      </section>
    )
  }
}

function reportPortalClientError(error, info) {
  if (typeof window === "undefined" || typeof window.fetch !== "function") {
    return
  }

  window.fetch("/api/client-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: "portal_dashboard_render",
      message: String(error?.message || "Unknown portal render error").slice(0, 400),
      component_stack: String(info?.componentStack || "").slice(0, 2000),
      path: window.location.pathname,
    }),
    keepalive: true,
  }).catch(() => {})
}

function getPortalErrorMessage(copy, code) {
  if (["PORTAL_REQUEST_TIMEOUT", "PORTAL_CRM_TIMEOUT"].includes(code)) {
    return copy.serviceTimeout
  }

  if (code === "PORTAL_API_UNAVAILABLE") {
    return copy.apiUnavailable
  }

  if (["MISSING_CRM_WEBHOOK_URL", "PORTAL_CRM_UNREACHABLE", "PORTAL_CRM_FAILED"].includes(code)) {
    return copy.setupPending
  }

  if (code === "PORTAL_ACCOUNT_REQUIRED") {
    return copy.accountRequired
  }

  if (code === "PORTAL_EMAIL_REQUIRED") {
    return copy.emailRequired
  }

  if (code === "PORTAL_EMAIL_NOT_AUTHORIZED") {
    return copy.emailNotAuthorized
  }

  if (code === "PORTAL_EMAIL_QUOTA_REACHED") {
    return copy.emailQuotaReached
  }

  if (code === "PORTAL_EMAIL_SEND_FAILED") {
    return copy.emailSendFailed
  }

  if (code === "PORTAL_LOGIN_FAILED") {
    return copy.loginFailed
  }

  if (code === "PORTAL_LOGIN_COOLDOWN") {
    return copy.loginCooldown
  }

  if (code === "PORTAL_CODE_BUSY") {
    return copy.error
  }

  if (code === "PORTAL_CODE_EXPIRED") {
    return copy.codeExpired
  }

  if (["PORTAL_SESSION_REQUIRED", "PORTAL_SESSION_INVALID", "PORTAL_SESSION_EXPIRED"].includes(code)) {
    return copy.sessionExpired
  }

  if (code === "PORTAL_TUTOR_INVITE_REQUIRED") {
    return copy.tutorInviteRequired
  }

  if (code === "PRIVACY_CONSENT_REQUIRED") {
    return copy.privacyConsentRequired
  }

  if (code === "SESSION_DETAILS_REQUIRED") {
    return copy.sessionDetailsRequired
  }

  if (code === "SESSION_PARTICIPANT_NOT_FOUND") {
    return copy.sessionParticipantMissing
  }

  if (code === "SESSION_TIME_CONFLICT") {
    return copy.sessionTimeConflict
  }

  if (code === "LEAD_FOLLOW_UP_STATUS_REQUIRED") {
    return copy.leadFollowUpStatusRequired
  }

  if (code === "SESSION_RESCHEDULE_NOT_AVAILABLE") {
    return copy.rescheduleNotAvailable
  }

  if (code === "PLAN_PAYMENT_STAGE_NOT_READY") {
    return copy.planPaymentStageNotReady
  }

  if (code === "PLAN_PAYMENT_REQUEST_BUSY") {
    return copy.planPaymentRequestBusy
  }

  if (code === "PLAN_ENROLLMENT_EXISTS") {
    return copy.planAlreadyActive
  }

  if (code === "PLAN_ENROLLMENT_BUSY") {
    return copy.planEnrollmentBusy
  }

  if (code === "PLAN_ENROLLMENT_NOT_ACTIONABLE") {
    return copy.planCannotAdjust
  }

  if (code === "PLAN_CREDIT_ADJUSTMENT_REASON_REQUIRED") {
    return copy.planCreditReasonRequired
  }

  if (["PLAN_ENROLLMENT_DETAILS_REQUIRED", "PLAN_RHYTHM_DETAILS_REQUIRED", "PLAN_ENROLLMENT_MATCH_REQUIRED", "PLAN_ENROLLMENT_SCHEDULE_REQUIRED"].includes(code)) {
    return copy.planDetailsRequired
  }

  if (code === "BOOKING_DETAILS_REQUIRED") {
    return copy.bookingDetailsRequired
  }

  if (code === "MATCHING_PENDING") {
    return copy.matchingPendingIntro
  }

  if (code === "BOOKING_SLOT_UNAVAILABLE") {
    return copy.bookingSlotUnavailable
  }

  if (code === "FEEDBACK_DETAILS_REQUIRED") {
    return copy.feedbackDetailsRequired
  }

  if (code === "FEEDBACK_NOT_AVAILABLE") {
    return copy.feedbackNotAvailable
  }

  if (code === "TEST_RECORD_NOT_FOUND") {
    return copy.testRecordNotFound
  }

  if (code === "PARENT_DETAILS_REQUIRED") {
    return copy.parentDetailsRequired
  }

  if (code === "PARENT_PROFILE_DETAILS_REQUIRED") {
    return copy.profileDetailsRequired
  }

  if (code === "PARENT_NOT_FOUND") {
    return copy.parentNotFound
  }

  if (code === "PARENT_EMAIL_IN_USE") {
    return copy.parentEmailInUse
  }

  if (code === "STUDENT_DETAILS_REQUIRED") {
    return copy.childDetailsRequired
  }

  if (code === "STUDENT_NOT_FOUND") {
    return copy.childNotFound
  }

  if (code === "STUDENT_ASSIGNMENT_DETAILS_REQUIRED") {
    return copy.childTutorAssignmentRequired
  }

  if (code === "PARENT_DELETE_CONFIRMATION_REQUIRED") {
    return copy.parentDeleteConfirmationRequired
  }

  if (code === "ASSIGNMENT_DETAILS_REQUIRED") {
    return copy.assignmentDetailsRequired
  }

  if (code === "TUTOR_INVITE_DETAILS_REQUIRED") {
    return copy.tutorInviteDetailsRequired
  }

  if (code === "TUTOR_DETAILS_REQUIRED") {
    return copy.tutorDetailsRequired
  }

  if (code === "TUTOR_RATE_INVALID") {
    return copy.tutorRateInvalid
  }

  if (code === "TUTOR_EMAIL_IN_USE") {
    return copy.tutorEmailInUse
  }

  if (code === "TUTOR_NOT_FOUND") {
    return copy.tutorNotFound
  }

  if (code === "TUTOR_DELETE_CONFIRMATION_REQUIRED") {
    return copy.tutorDeleteConfirmationRequired
  }

  if (code === "DEMO_PAYMENT_NOT_AVAILABLE") {
    return copy.paymentDemoNotAvailable
  }

  if (code === "SESSION_MESSAGE_REQUIRED") {
    return copy.messageRequired
  }

  if (code === "SESSION_MESSAGE_NOT_ALLOWED") {
    return copy.messageNotAllowed
  }

  if (code === "SESSION_CANCELLATION_NOT_AVAILABLE") {
    return copy.cancellationNotAvailable
  }

  if (code === "SESSION_NOTE_NOT_READY") {
    return copy.noteNotReady
  }

  if (code === "TUTOR_AVAILABILITY_DETAILS_REQUIRED") {
    return copy.availabilityDetailsRequired
  }

  if (code === "TUTOR_AVAILABILITY_DUPLICATE") {
    return copy.availabilityDuplicate
  }

  if (code === "TUTOR_AVAILABILITY_OVERLAP") {
    return copy.availabilityOverlap
  }

  if (code === "PORTAL_REQUEST_STATUS_REQUIRED") {
    return copy.requestStatusRequired
  }

  if (code === "PORTAL_REQUEST_NOT_FOUND") {
    return copy.requestNotFound
  }

  return copy.error
}

function LoginPanel({
  copy,
  role,
  authMode,
  email,
  code,
  isLoading,
  loadingAction,
  onRoleChange,
  onAuthModeChange,
  onEmailChange,
  onCodeChange,
  onRequestCode,
  onVerifyCode,
  onCreateAccount,
  showAccountCreation,
  newClientPath,
}) {
  const authOptions = [
    { value: "login", label: copy.loginTab, icon: Mail },
    ...(showAccountCreation && role === "parent" ? [{ value: "create", label: copy.createTab, icon: UserPlus }] : []),
  ]

  return (
    <div>
      {!showAccountCreation ? (
        <div className="grid grid-cols-3 rounded-full border border-white/10 bg-white/5 p-1">
          {[
            { value: "parent", label: copy.parent, icon: UserRound },
            { value: "tutor", label: copy.tutor, icon: UsersRound },
            { value: "operator", label: copy.operator, icon: UserCog },
          ].map((option) => {
            const Icon = option.icon

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onRoleChange(option.value)}
                className={`inline-flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-full px-1.5 text-xs font-semibold transition sm:gap-2 sm:px-3 sm:text-sm ${
                  role === option.value ? "bg-[#f5c977] text-[#071631]" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="hidden h-4 w-4 shrink-0 sm:block" />
                <span className="truncate">{option.label}</span>
              </button>
            )
          })}
        </div>
      ) : null}

      <div className={`grid rounded-2xl border border-white/10 bg-white/5 p-1 ${showAccountCreation ? "mt-0 grid-cols-2" : "mt-5 grid-cols-1"}`}>
        {authOptions.map((option) => {
          const Icon = option.icon

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onAuthModeChange(option.value)}
              className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition ${
                authMode === option.value ? "bg-white/14 text-white" : "text-white/58 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {option.label}
            </button>
          )
        })}
      </div>

      {authMode === "login" ? (
        <AccessCodeForm
          copy={copy}
          email={email}
          code={code}
          isLoading={isLoading}
          loadingAction={loadingAction}
          onEmailChange={onEmailChange}
          onCodeChange={onCodeChange}
          onRequestCode={onRequestCode}
          onVerifyCode={onVerifyCode}
        />
      ) : (
        <AccountCreationForm
          copy={copy}
          role={role}
          email={email}
          isLoading={isLoading}
          loadingAction={loadingAction}
          onEmailChange={onEmailChange}
          onCreateAccount={onCreateAccount}
        />
      )}

      {!showAccountCreation ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
          <p className="text-sm leading-6 text-white/68">{copy.newClientPrompt}</p>
          <Link
            to={newClientPath}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#f5c977] transition hover:text-[#f7d38f]"
          >
            {copy.newClientAction}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </div>
  )
}

function AccessCodeForm({
  copy,
  email,
  code,
  isLoading,
  loadingAction,
  onEmailChange,
  onCodeChange,
  onRequestCode,
  onVerifyCode,
}) {
  return (
    <div>
      <div className="mt-5 text-sm font-semibold text-white/78">{copy.existingAccessTitle}</div>
      <form className="mt-3 space-y-4" onSubmit={onRequestCode}>
        <label className="block text-sm font-semibold text-white/84">
          {copy.email}
          <Input
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            type="email"
            autoComplete="email"
            required
            className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
            placeholder="nom@email.com"
          />
        </label>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-[#f5c977] px-5 py-6 text-[#071631] hover:bg-[#f7d38f]"
        >
          {loadingAction === "sendingCode" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          {loadingAction === "sendingCode" ? copy.sendingCode : copy.sendCode}
        </Button>
      </form>

      <form className="mt-5 space-y-4 border-t border-white/10 pt-5" onSubmit={onVerifyCode}>
        <label className="block text-sm font-semibold text-white/84">
          {copy.code}
          <Input
            value={code}
            onChange={(event) => onCodeChange(event.target.value)}
            inputMode="numeric"
            required
            className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
            placeholder="123456"
          />
        </label>
        <Button
          type="submit"
          disabled={isLoading}
          variant="outline"
          className="w-full rounded-full border-white/15 bg-white/5 px-5 py-6 text-white hover:bg-white/10 hover:text-white"
        >
          {loadingAction === "signingIn" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          {loadingAction === "signingIn" ? copy.signingIn : copy.verifyCode}
        </Button>
      </form>

      <p className="mt-4 text-sm leading-6 text-white/56">{copy.loginHelp}</p>
    </div>
  )
}

function AccountCreationForm({ copy, role, email, isLoading, loadingAction, onEmailChange, onCreateAccount }) {
  const [values, setValues] = useState({
    parent_name: "",
    student_name: "",
    phone: "",
    student_level_subject: "",
    main_concern: "",
    format: "",
    tutor_name: "",
    subjects_levels: "",
    message: "",
  })
  const [privacyConsent, setPrivacyConsent] = useState(false)

  function updateValue(key, value) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onCreateAccount({
      ...values,
      privacy_consent: privacyConsent ? "yes" : "",
    })
  }

  const isParent = role === "parent"

  return (
    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
      <div>
        <div className="text-sm font-semibold text-white/78">
          {isParent ? copy.createParentTitle : copy.createTutorTitle}
        </div>
        <p className="mt-1 text-sm leading-6 text-white/56">{copy.createHelp}</p>
      </div>

      {isParent ? (
        <div className="border-l-2 border-[#f5c977] pl-4 text-sm leading-6 text-white/70">
          <p className="font-semibold text-white/84">{copy.createStepsTitle}</p>
          <ol className="mt-2 space-y-2">
            {copy.createSteps.map((step, index) => (
              <li key={step} className="flex gap-2">
                <span className="font-semibold text-[#f5c977]">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <label className="block text-sm font-semibold text-white/84">
        {isParent ? copy.parentName : copy.tutorName}
        <Input
          value={isParent ? values.parent_name : values.tutor_name}
          onChange={(event) => updateValue(isParent ? "parent_name" : "tutor_name", event.target.value)}
          autoComplete="name"
          required
          className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
          placeholder={isParent ? "Nom du parent" : "Nom du tuteur"}
        />
      </label>

      <label className="block text-sm font-semibold text-white/84">
        {copy.email}
        <Input
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          type="email"
          autoComplete="email"
          required
          className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
          placeholder="nom@email.com"
        />
      </label>

      {isParent ? (
        <>
          <label className="block text-sm font-semibold text-white/84">
            {copy.phone}
            <Input
              value={values.phone}
              onChange={(event) => updateValue("phone", event.target.value)}
              type="tel"
              autoComplete="tel"
              className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
              placeholder="514-000-0000"
            />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.childName}
            <Input
              value={values.student_name}
              onChange={(event) => updateValue("student_name", event.target.value)}
              required
              className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
              placeholder="Nom de l'élève"
            />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.studentLevelSubject}
            <Input
              value={values.student_level_subject}
              onChange={(event) => updateValue("student_level_subject", event.target.value)}
              required
              className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
              placeholder="Secondaire 4 - maths SN"
            />
          </label>
          <PortalTextarea
            label={copy.mainConcern}
            value={values.main_concern}
            onChange={(value) => updateValue("main_concern", value)}
          />
          <label className="block text-sm font-semibold text-white/84">
            {copy.preferredFormat}
            <Input
              value={values.format}
              onChange={(event) => updateValue("format", event.target.value)}
              className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
              placeholder="En ligne, en personne ou flexible"
            />
          </label>
          <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm leading-6 text-white/72">
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(event) => setPrivacyConsent(event.target.checked)}
              required
              className="mt-1 h-4 w-4 accent-[#f5c977]"
            />
            <span>{copy.privacyConsent}</span>
          </label>
        </>
      ) : (
        <>
          <label className="block text-sm font-semibold text-white/84">
            {copy.tutorSubjects}
            <Input
              value={values.subjects_levels}
              onChange={(event) => updateValue("subjects_levels", event.target.value)}
              required
              className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
              placeholder="Maths secondaire, sciences, français..."
            />
          </label>
          <PortalTextarea
            label={copy.requestMessage}
            value={values.message}
            onChange={(value) => updateValue("message", value)}
          />
        </>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-[#f5c977] px-5 py-6 text-[#071631] hover:bg-[#f7d38f]"
      >
        {loadingAction === "creatingAccount" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
        {loadingAction === "creatingAccount" ? copy.creatingAccount : (isParent ? copy.createParentAccount : copy.createTutorRequest)}
      </Button>
    </form>
  )
}

function ParentActionCenter({ copy, dashboard }) {
  const hasProfile = Boolean(dashboard.profile?.name)
  const hasTutor = Boolean(dashboard.matching?.tutor_id || dashboard.students?.some((student) => student.assigned_tutor_id))
  const hasSession = (dashboard.sessions || []).some((session) => !["cancelled", "no_show"].includes(session.session_status))
  const metrics = dashboard.metrics || {}
  const paymentsDue = Number(metrics.payments_due || 0)
  const messagesWaiting = Number(metrics.messages_to_reply || metrics.messages_waiting || 0)

  const action = !hasProfile
    ? { title: copy.parentActionProfile, description: copy.parentActionProfileText, href: "#portal-famille", icon: UserCog }
    : !hasTutor
      ? { title: copy.parentActionMatching, description: copy.parentActionMatchingText, href: "#portal-seances", icon: UsersRound }
      : !hasSession
        ? { title: copy.parentActionBooking, description: copy.parentActionBookingText, href: "#portal-seances", icon: CalendarDays }
        : paymentsDue > 0
          ? { title: copy.parentActionPayment, description: copy.parentActionPaymentText, href: "#portal-seances", icon: CreditCard }
          : messagesWaiting > 0
            ? { title: copy.parentActionMessage, description: copy.parentActionMessageText, href: "#portal-suivi", icon: MessageSquareText }
            : { title: copy.parentActionAllSet, description: copy.parentActionAllSetText, icon: CircleCheck }
  const Icon = action.icon

  return (
    <section className="action-surface min-w-0 rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f5c977] text-[#071631] shadow-[0_12px_30px_rgba(245,201,119,0.22)]">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="journey-eyebrow">{copy.parentActionEyebrow}</div>
            <h2 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">{action.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">{action.description}</p>
          </div>
        </div>
        {action.href ? (
          <a
            href={action.href}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#f5c977] px-4 py-2 text-sm font-semibold text-[#071631] transition hover:bg-[#f7d38f]"
          >
            {copy.parentActionOpen}
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <div className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/84">
            <CircleCheck className="h-4 w-4 text-[#f5c977]" />
            {copy.parentJourneyDone}
          </div>
        )}
      </div>
    </section>
  )
}

function ParentDashboard({ copy, dashboard, locale, role, token, onSaved }) {
  const offerSnapshot = getParentOfferSnapshot(dashboard)
  const rhythmSnapshot = getParentOfferSnapshot(dashboard, "weekly")
  const programSnapshot = getParentOfferSnapshot(dashboard, "pack")

  return (
    <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div className="min-w-0 space-y-6">
        <div id="portal-apercu" className="scroll-mt-24 space-y-6">
          <ParentActionCenter copy={copy} dashboard={dashboard} />
          <ParentRhythmCard copy={copy} locale={locale} snapshot={rhythmSnapshot} token={token} onSaved={onSaved} />
          <NextSessionCard copy={copy} session={dashboard.next_session} role={role} actionHref="#portal-seances" />
          <SessionPreparationCard copy={copy} dashboard={dashboard} session={offerSnapshot.nextSession} token={token} onSaved={onSaved} />
          <ProgramProgressCard copy={copy} locale={locale} snapshot={programSnapshot} />
          <ParentJourneyPanel copy={copy} dashboard={dashboard} />
          <MetricStrip metrics={dashboard.metrics} compact />
          <PortalQuickNav copy={copy} />
        </div>

        <div id="portal-suivi" className="scroll-mt-24 space-y-6 lg:hidden">
          <ActivityTimeline copy={copy} activity={dashboard.activity} />
          <SessionMessagePanel copy={copy} sessions={dashboard.sessions} messages={dashboard.messages} token={token} onSaved={onSaved} />
        </div>

        <div id="portal-seances" className="scroll-mt-24 space-y-6">
          <CalendarAgenda copy={copy} sessions={dashboard.sessions} />
          <BookingPanel copy={copy} dashboard={dashboard} locale={locale} token={token} onSaved={onSaved} />
          <RecordList
            icon={CalendarCheck}
            title={copy.sessions}
            empty={copy.empty}
            records={dashboard.sessions}
            render={(session) => (
              <SessionRow
                key={session.session_id}
                copy={copy}
                session={session}
                role={role}
                token={token}
                onSaved={onSaved}
              />
            )}
          />
          <RecordList
            icon={CreditCard}
            title={copy.payments}
            empty={copy.empty}
            records={dashboard.payments}
            render={(payment) => <PaymentRow key={`${payment.session_id || "package"}-${payment.created_at || payment.due_date || payment.amount_cad}`} copy={copy} locale={locale} payment={payment} token={token} onSaved={onSaved} />}
          />
        </div>

        <div id="portal-famille" className="scroll-mt-24 space-y-6">
          <FamilyStudentsPanel copy={copy} students={dashboard.students} role={role} token={token} onSaved={onSaved} />
          <ParentProfilePanel copy={copy} profile={dashboard.profile} token={token} onSaved={onSaved} />
        </div>
      </div>

      <div className="min-w-0 space-y-6">
        <div id="portal-suivi-desktop" className="hidden scroll-mt-24 space-y-6 lg:block">
          <ActivityTimeline copy={copy} activity={dashboard.activity} />
        </div>
        <ParentSessionNoteForm copy={copy} dashboard={dashboard} token={token} onSaved={onSaved} />
        <ParentFeedbackForm copy={copy} dashboard={dashboard} token={token} onSaved={onSaved} />
        <div className="hidden lg:block">
          <SessionMessagePanel copy={copy} sessions={dashboard.sessions} messages={dashboard.messages} token={token} onSaved={onSaved} />
        </div>
        <RecordList
          icon={ClipboardList}
          title={copy.requestHistory}
          empty={copy.empty}
          records={dashboard.requests}
          render={(request) => <RequestRow key={request.request_id} request={request} />}
        />
        <RecordList
          icon={FileText}
          title={copy.notes}
          empty={copy.empty}
          records={dashboard.notes}
          render={(note) => <NoteRow key={note.note_id} note={note} />}
        />
        <RecordList
          icon={Star}
          title={copy.feedbackTitle}
          empty={copy.empty}
          records={dashboard.feedback}
          render={(feedback) => <FeedbackRow key={feedback.feedback_id} feedback={feedback} />}
        />
        <ParentRequestForm copy={copy} role={role} token={token} onSaved={onSaved} />
      </div>
    </div>
  )
}

function ParentRhythmCard({ copy, locale, snapshot, token, onSaved }) {
  const [showPauseHelp, setShowPauseHelp] = useState(false)
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const isRhythm = snapshot.isRhythm || snapshot.kind === "weekly"
  const isPackage = Number(snapshot.offer?.sessionCount || 0) > 1
  const isPaused = snapshot.enrollmentStatus === "paused"
  const canManageEnrollment = Boolean(isRhythm && snapshot.enrollmentId && token)
  const offerLabel = formatParentOfferSummary(snapshot.offer || getOffer("targeted_session"), locale)
  const deadlineText = snapshot.changeDeadline
    ? snapshot.changeDeadline.getTime() > Date.now()
      ? `${copy.rhythmDeadline}: ${formatDateTime(snapshot.changeDeadline)}`
      : copy.rhythmDeadlinePassed
    : copy.rhythmDeadlineFallback

  async function toggleRhythm() {
    if (!canManageEnrollment) {
      setShowPauseHelp((current) => !current)
      return
    }

    setIsSaving(true)
    setStatus("")
    const result = isPaused
      ? await resumePortalPlanEnrollment({ token, enrollmentId: snapshot.enrollmentId })
      : await pausePortalPlanEnrollment({ token, enrollmentId: snapshot.enrollmentId })
    setIsSaving(false)

    if (result.ok) {
      setStatus(isPaused ? copy.rhythmResumeConfirmed : copy.rhythmPauseConfirmed)
      onSaved?.()
      return
    }

    setStatus(getPortalErrorMessage(copy, result.code))
  }

  return (
    <section id="portal-rythme" className="panel-soft min-w-0 scroll-mt-24 rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f5c977] text-[#071631]">
          <CalendarClock className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="journey-eyebrow">{copy.rhythmEyebrow}</div>
          <h2 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">{copy.rhythmTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-white/62">{offerLabel}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[18px] border border-white/10 bg-white/5 p-3.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <CircleCheck className="h-4 w-4 shrink-0 text-[#f5c977]" />
            {isPackage || isRhythm ? copy.rhythmNoContract : copy.rhythmSameTutor}
          </div>
          <p className="mt-2 text-sm leading-6 text-white/58">
            {isPackage || isRhythm ? copy.rhythmNoContractText : copy.rhythmSameTutorText}
          </p>
        </div>
        <div className="rounded-[18px] border border-white/10 bg-white/5 p-3.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
            <Clock3 className="h-4 w-4 shrink-0 text-[#f5c977]" />
            {copy.rhythmDeadline}
          </div>
          <p className="mt-2 text-sm leading-6 text-white/58">{deadlineText}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-5 text-white/50">{copy.rhythmPriceNote}</p>
        <div className="flex flex-wrap gap-2">
          {isRhythm ? (
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={toggleRhythm}
              className="min-h-10 rounded-full border-white/15 bg-white/5 px-4 text-white hover:bg-white/10 hover:text-white"
              aria-expanded={showPauseHelp}
            >
              {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              {isPaused ? copy.rhythmResume : copy.rhythmPause}
            </Button>
          ) : null}
          <a
            href="#portal-seances"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[#f5c977] px-4 py-2 text-sm font-semibold text-[#071631] transition hover:bg-[#f7d38f]"
          >
            {copy.rhythmManage}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {showPauseHelp ? (
        <p className="mt-3 rounded-2xl border border-[#f5c977]/20 bg-[#f5c977]/10 px-3 py-3 text-sm leading-6 text-white/74">
          {canManageEnrollment ? copy.rhythmPauseHelp : copy.rhythmPauseSetup}
        </p>
      ) : null}
      {status ? <p className="mt-3 text-sm leading-6 text-white/68">{status}</p> : null}
    </section>
  )
}

function ProgramProgressCard({ copy, locale, snapshot }) {
  if (!snapshot.hasProgram) {
    return null
  }

  if (!snapshot.creditsReady) {
    return (
      <section className="action-surface min-w-0 rounded-[24px] p-4 text-white sm:p-5">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f5c977] text-[#071631]">
              <Clock3 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="journey-eyebrow">{copy.programEyebrow}</div>
              <h2 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">{getParentOfferTitle(snapshot.offer, locale)}</h2>
              <p className="mt-2 text-sm leading-6 text-white/68">{formatParentOfferPricing(snapshot.offer, locale)}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-[#f5c977]/25 bg-[#f5c977]/10 px-3 py-1.5 text-xs font-semibold text-[#f8d58d]">
            {copy.programPending}
          </span>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/68">{getProgramPendingText(snapshot.offer, locale)}</p>
      </section>
    )
  }

  const totalCredits = snapshot.creditsTotal
  const remainingCredits = Math.max(0, Math.min(snapshot.creditsRemaining ?? totalCredits, totalCredits))
  const completedCredits = Math.max(0, Math.min(snapshot.creditsUsed ?? 0, totalCredits))
  const progress = totalCredits ? Math.round((completedCredits / totalCredits) * 100) : 0

  return (
    <section className="action-surface min-w-0 rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f5c977] text-[#071631]">
            <CircleCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="journey-eyebrow">{copy.programEyebrow}</div>
            <h2 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">{getParentOfferTitle(snapshot.offer, locale)}</h2>
            <p className="mt-2 text-sm leading-6 text-white/68">{formatParentOfferPricing(snapshot.offer, locale)}</p>
          </div>
        </div>
        <div className="shrink-0 rounded-2xl border border-[#f5c977]/25 bg-[#f5c977]/10 px-3 py-2 text-right">
          <div className="font-display text-2xl font-semibold text-[#f8d58d]">{remainingCredits}</div>
          <div className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-white/52">{copy.programCredits}</div>
        </div>
      </div>

      <div className="mt-5">
        <div
          role="progressbar"
          aria-label={`${remainingCredits} ${copy.programOutOf} ${totalCredits} ${copy.programCredits}`}
          aria-valuemin={0}
          aria-valuemax={totalCredits}
          aria-valuenow={completedCredits}
          className="h-2 overflow-hidden rounded-full bg-white/10"
        >
          <div className="h-full rounded-full bg-[#f5c977] transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-white/58">
          <span>{completedCredits} {copy.programUsed}</span>
          <span>{remainingCredits} {copy.programOutOf} {totalCredits}</span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/68">{getProgramCreditText(snapshot.offer, locale)}</p>
      <a href="#portal-seances" className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/88 transition hover:bg-white/14 hover:text-white">
        {copy.programAction}
        <ArrowRight className="h-4 w-4" />
      </a>
    </section>
  )
}

function SessionPreparationCard({ copy, dashboard, session, token, onSaved }) {
  const [localFiles, setLocalFiles] = useState([])
  const [note, setNote] = useState("")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const receivedMaterials = getPortalSessionMaterials(dashboard, session?.session_id)

  function stageFiles(event) {
    const nextFiles = Array.from(event.target.files || []).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
    }))

    if (nextFiles.length) {
      setLocalFiles((current) => {
        const existing = new Set(current.map((file) => file.id))
        return [...current, ...nextFiles.filter((file) => !existing.has(file.id))].slice(0, 5)
      })
    }

    event.target.value = ""
  }

  async function sendPreparationNote() {
    if (!session?.session_id || !note.trim()) {
      return
    }

    setIsSaving(true)
    setStatus("")
    const result = await sendPortalSessionMessage({
      token,
      sessionId: session.session_id,
      message: [`${copy.sessionPrepTitle} · ${formatDateTime(session.start_at)}`, note.trim()].join("\n\n"),
    })
    setIsSaving(false)

    if (result.ok) {
      setNote("")
      setStatus(copy.sessionPrepSent)
      onSaved?.()
      return
    }

    setStatus(getPortalErrorMessage(copy, result.code))
  }

  return (
    <section id="portal-preparation" className="panel-soft min-w-0 scroll-mt-24 rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#f5c977]">
          <Camera className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="journey-eyebrow">{copy.materialsEyebrow}</div>
          <h2 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">{copy.materialsTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-white/62">{session ? copy.materialsDescription : copy.materialsNoSession}</p>
        </div>
      </div>

      {session ? (
        <>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <label className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#f5c977] px-4 py-3 text-center text-sm font-semibold text-[#071631] transition hover:bg-[#f7d38f]">
              <input type="file" accept="image/*" capture="environment" onChange={stageFiles} className="sr-only" />
              <Camera className="h-4 w-4" />
              {copy.materialsCapture}
            </label>
            <label className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
              <input type="file" accept="image/*,application/pdf" multiple onChange={stageFiles} className="sr-only" />
              <ImagePlus className="h-4 w-4" />
              {copy.materialsAddFile}
            </label>
          </div>

          {(receivedMaterials.length || localFiles.length) ? (
            <div className="mt-3 space-y-2">
              {receivedMaterials.map((material, index) => (
                <div key={material.id || material.material_id || index} className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#f5c977]/20 bg-[#f5c977]/8 px-3 py-2.5 text-sm text-white/82">
                  <CircleCheck className="h-4 w-4 shrink-0 text-[#f5c977]" />
                  <span className="min-w-0 flex-1 truncate">{material.name || material.file_name || material.title || copy.materialsReceived}</span>
                  <span className="shrink-0 text-xs text-white/50">{copy.materialsReceived}</span>
                </div>
              ))}
              {localFiles.map((file) => (
                <div key={file.id} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/78">
                  <FileText className="h-4 w-4 shrink-0 text-[#f5c977]" />
                  <span className="min-w-0 flex-1 truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setLocalFiles((current) => current.filter((currentFile) => currentFile.id !== file.id))}
                    className="shrink-0 text-xs font-semibold text-white/58 transition hover:text-white"
                  >
                    {copy.materialsRemove}
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <label className="mt-3 block text-sm font-semibold text-white/84">
            {copy.materialsNote}
            <Textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-2 min-h-20 rounded-2xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
              placeholder={copy.materialsNotePlaceholder}
            />
          </label>
          <p className="mt-3 text-xs leading-5 text-white/50">{localFiles.length || note.trim() ? copy.materialsLocalOnly : copy.materialsReady}</p>
          <Button
            type="button"
            disabled={isSaving || !note.trim()}
            onClick={sendPreparationNote}
            variant="outline"
            className="mt-3 min-h-11 w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <MessageSquareText className="h-4 w-4" />}
            {copy.materialsSendNote}
          </Button>
          {status ? <p className="mt-3 text-sm leading-6 text-white/68">{status}</p> : null}
        </>
      ) : null}
    </section>
  )
}

function FamilyStudentsPanel({ copy, students = [], role, token, parentEmail = "", tutors = [], onSaved, embedded = false }) {
  const emptyValues = {
    student_id: "",
    student_name: "",
    student_level_subject: "",
    learning_notes: "",
  }
  const [values, setValues] = useState(emptyValues)
  const [assignments, setAssignments] = useState({})
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setAssignments(Object.fromEntries(students.map((student) => [student.student_id, student.assigned_tutor_id || ""])))
    if (values.student_id && !students.some((student) => student.student_id === values.student_id)) {
      setValues(emptyValues)
    }
  }, [students, values.student_id])

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  function editStudent(student) {
    setValues({
      student_id: student.student_id,
      student_name: student.student_name || "",
      student_level_subject: student.student_level_subject || "",
      learning_notes: student.learning_notes || "",
    })
    setStatus("")
  }

  async function saveStudent(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")
    const result = await upsertPortalStudent({
      token,
      role,
      values: {
        ...values,
        ...(role === "operator" ? { parent_email: parentEmail } : {}),
      },
    })
    setIsSaving(false)
    if (result.ok) {
      setValues(emptyValues)
      setStatus(copy.childSaved)
      onSaved?.()
      return
    }
    setStatus(getPortalErrorMessage(copy, result.code))
  }

  async function assignTutor(studentId) {
    const tutorId = assignments[studentId]
    if (!tutorId) {
      setStatus(copy.childTutorAssignmentRequired)
      return
    }
    setIsSaving(true)
    setStatus("")
    const result = await assignPortalStudentTutor({ token, studentId, tutorId })
    setIsSaving(false)
    if (result.ok) {
      setStatus(copy.childTutorAssigned)
      onSaved?.()
      return
    }
    setStatus(getPortalErrorMessage(copy, result.code))
  }

  if (role === "operator" && !parentEmail) {
    return null
  }

  return (
    <section className={embedded ? "mt-5 min-w-0 border-t border-white/10 pt-5 text-white" : "panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5"}>
      <div className="flex min-w-0 items-start gap-3">
        <UsersRound className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c977]" />
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{copy.childrenTitle}</h2>
          <p className="mt-1 text-sm leading-6 text-white/58">{copy.childrenIntro}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {students.length ? students.map((student) => (
          <div key={student.student_id} className="rounded-[18px] border border-white/10 bg-white/5 p-3 sm:p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-white">{student.student_name}</div>
                <div className="mt-1 text-sm text-white/60">{student.student_level_subject || "-"}</div>
                {student.assigned_tutor_name ? <div className="mt-2 text-sm text-[#f5c977]">{copy.childTutor}: {student.assigned_tutor_name}</div> : null}
              </div>
              <Button type="button" size="icon" variant="outline" title={copy.availabilityEdit} aria-label={copy.availabilityEdit} onClick={() => editStudent(student)} className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            {student.learning_notes ? <p className="mt-3 text-sm leading-6 text-white/60">{student.learning_notes}</p> : null}
            {role === "operator" ? (
              <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row">
                <select
                  value={assignments[student.student_id] || ""}
                  onChange={(event) => setAssignments((current) => ({ ...current, [student.student_id]: event.target.value }))}
                  className="h-11 min-w-0 flex-1 rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
                >
                  <option value="">{copy.chooseTutor}</option>
                  {tutors.map((tutor) => <option key={tutor.tutor_id} value={tutor.tutor_id}>{tutor.tutor_name}</option>)}
                </select>
                <Button type="button" disabled={isSaving} onClick={() => assignTutor(student.student_id)} className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
                  <UserPlus className="h-4 w-4" />
                  {copy.assignTutor}
                </Button>
              </div>
            ) : null}
          </div>
        )) : <p className="text-sm leading-7 text-white/60">{copy.noChildren}</p>}
      </div>

      <form onSubmit={saveStudent} className="mt-5 border-t border-white/10 pt-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-white/84">
            {copy.childName}
            <Input value={values.student_name} onChange={(event) => updateValue("student_name", event.target.value)} required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.childLevelSubject}
            <Input value={values.student_level_subject} onChange={(event) => updateValue("student_level_subject", event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
        </div>
        <label className="mt-3 block text-sm font-semibold text-white/84">
          {copy.childLearningNotes}
          <Textarea value={values.learning_notes} onChange={(event) => updateValue("learning_notes", event.target.value)} className="mt-2 min-h-20 rounded-2xl border-white/15 bg-white/5 text-white" />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="submit" disabled={isSaving} className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
            {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
            {values.student_id ? copy.saveChild : copy.addChild}
          </Button>
          {values.student_id ? <Button type="button" variant="outline" onClick={() => setValues(emptyValues)} className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">{copy.cancel}</Button> : null}
        </div>
      </form>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </section>
  )
}

function CalendarAgenda({ copy, sessions = [] }) {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const days = Array.from({ length: 7 }, (_, index) => new Date(start.getTime() + index * 24 * 60 * 60 * 1000))
  const upcoming = sessions.filter((session) => {
    const date = coerceDate(session.start_at)
    return date && date.getTime() >= start.getTime() && date.getTime() < days.at(-1).getTime() + 24 * 60 * 60 * 1000
  })
  const upcomingDays = days.map((day) => ({
    day,
    sessions: upcoming.filter((session) => isSameCalendarDay(coerceDate(session.start_at), day)),
  })).filter((entry) => entry.sessions.length)

  return (
    <section className="panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c977]" />
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{copy.calendarTitle}</h2>
          <p className="mt-1 text-sm leading-6 text-white/58">{copy.calendarIntro}</p>
        </div>
      </div>
      <div className="mt-5 space-y-2 md:hidden">
        {upcomingDays.length ? upcomingDays.map(({ day, sessions: daySessions }) => {
          const isToday = isSameCalendarDay(day, start)
          return (
            <div key={day.toISOString()} className={`grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 rounded-[18px] border p-3 ${isToday ? "border-[#f5c977]/55 bg-[#f5c977]/10" : "border-white/10 bg-white/5"}`}>
              <div className="border-r border-white/10 pr-3 text-center">
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white/52">{formatCalendarDay(day).split(" ")[0]}</div>
                <div className="mt-1 font-display text-2xl font-semibold text-white">{day.getDate()}</div>
              </div>
              <div className="min-w-0 space-y-2">
                {daySessions.map((session) => (
                  <div key={session.session_id} className="rounded-xl bg-[#071631]/70 px-3 py-2 text-sm text-white/78">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white">{formatCalendarTime(session.start_at)}</span>
                      <StatusPill value={session.session_status} />
                    </div>
                    <div className="mt-1 truncate text-xs text-white/60">{session.student_name || session.student_level_subject || session.tutor_name}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        }) : (
          <div className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-white/60">{copy.calendarNoSessions}</div>
        )}
      </div>
      <div className="mt-5 hidden overflow-x-auto pb-1 md:block">
        <div className="grid min-w-[46rem] grid-cols-7 gap-2">
          {days.map((day) => {
            const daySessions = upcoming.filter((session) => isSameCalendarDay(coerceDate(session.start_at), day))
            const isToday = isSameCalendarDay(day, start)
            return (
              <div key={day.toISOString()} className={`min-h-32 rounded-[16px] border p-3 ${isToday ? "border-[#f5c977]/55 bg-[#f5c977]/10" : "border-white/10 bg-white/5"}`}>
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/52">{formatCalendarDay(day)}</div>
                <div className="mt-3 space-y-2">
                  {daySessions.map((session) => (
                    <div key={session.session_id} className="rounded-xl bg-[#071631]/70 px-2 py-2 text-xs leading-5 text-white/76">
                      <div className="font-semibold text-white">{formatCalendarTime(session.start_at)}</div>
                      <div className="mt-1 line-clamp-2">{session.student_name || session.student_level_subject || session.tutor_name}</div>
                      <StatusPill value={session.session_status} />
                      <div className="mt-2 text-[0.68rem] leading-4 text-white/52">
                        {session.calendar_invites_sent_at
                          ? copy.calendarInviteSent
                          : ["confirmed", "calendar_created"].includes(session.session_status)
                            ? copy.calendarNotSynced
                            : ""}
                        {session.parent_reminder_sent_at || session.tutor_reminder_sent_at ? ` · ${copy.calendarReminderSent}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function activityPresentation(entry) {
  const type = String(entry.type || "").toLowerCase()
  const english = getPortalLocale().startsWith("en")
  const rawTitle = String(entry.title || "").trim()

  if (type === "session") {
    const status = rawTitle.replace(/^(s[ée]ance|session)\s*/i, "")
    return {
      icon: CalendarCheck,
      title: `${english ? "Session" : "Séance"} ${humanize(status || "proposed")}`,
    }
  }

  if (type === "summary") {
    return { icon: FileText, title: english ? "Session summary" : "Résumé de séance" }
  }

  if (type === "payment") {
    const status = rawTitle.replace(/^(paiement|payment)\s*/i, "")
    return {
      icon: CreditCard,
      title: `${english ? "Payment" : "Paiement"} ${humanize(status || "payment_requested")}`,
    }
  }

  if (type === "message") {
    return { icon: MessageSquareText, title: rawTitle || (english ? "New message" : "Nouveau message") }
  }

  if (type === "feedback") {
    return { icon: Star, title: english ? "Parent feedback" : "Retour parent" }
  }

  if (type === "request") {
    return { icon: ClipboardList, title: rawTitle || (english ? "Follow-up request" : "Demande de suivi") }
  }

  return { icon: ClipboardList, title: rawTitle || (english ? "Update" : "Mise à jour") }
}

function ActivityTimeline({ copy, activity = [], embedded = false }) {
  const recentActivity = activity.slice(0, 5)

  return (
    <section className={embedded ? "mt-5 min-w-0 border-t border-white/10 pt-5 text-white" : "panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5"}>
      <div className="flex min-w-0 items-start gap-3">
        <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c977]" />
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{copy.activityTitle}</h2>
          <p className="mt-1 text-sm leading-6 text-white/58">{copy.activityIntro}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {recentActivity.length ? recentActivity.map((entry) => {
          const presentation = activityPresentation(entry)
          const Icon = presentation.icon
          return (
            <div key={entry.activity_id} className="quiet-row min-w-0 py-3 first:border-t-0 first:pt-0">
              <div className="flex min-w-0 items-start gap-3">
                <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-[#f5c977]/24 bg-[#f5c977]/10 text-[#f5c977]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                    <div className="min-w-0 break-words text-sm font-semibold text-white/88">{presentation.title}</div>
                    <div className="shrink-0 text-xs text-white/48">{formatDateTime(entry.occurred_at)}</div>
                  </div>
                  {entry.student_name ? <div className="mt-1 text-xs font-medium text-[#f5c977]">{entry.student_name}</div> : null}
                  {entry.detail ? <div className="mt-1 break-words text-sm leading-6 text-white/60">{entry.detail}</div> : null}
                </div>
              </div>
            </div>
          )
        }) : <p className="text-sm leading-7 text-white/60">{copy.noActivity}</p>}
      </div>
    </section>
  )
}

function ParentProfilePanel({ copy, profile = {}, token, onSaved }) {
  const [values, setValues] = useState({
    parent_name: profile.name || "",
    phone: profile.phone || "",
    student_level_subject: profile.student_level_subject || "",
    main_concern: profile.main_concern || "",
    timeline: profile.timeline || "",
    format: profile.format || "online",
  })
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setValues({
      parent_name: profile.name || "",
      phone: profile.phone || "",
      student_level_subject: profile.student_level_subject || "",
      main_concern: profile.main_concern || "",
      timeline: profile.timeline || "",
      format: profile.format || "online",
    })
  }, [profile.format, profile.main_concern, profile.name, profile.phone, profile.student_level_subject, profile.timeline])

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")
    const result = await updatePortalParentProfile({ token, values })
    setIsSaving(false)

    if (result.ok) {
      setStatus(copy.profileSaved)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel-soft rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex items-center gap-3">
        <UserCog className="h-5 w-5 text-[#f5c977]" />
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{copy.profileTitle}</h2>
          <p className="mt-1 text-sm leading-6 text-white/58">{copy.profileIntro}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold text-white/84">
          {copy.parentName}
          <Input value={values.parent_name} onChange={(event) => updateValue("parent_name", event.target.value)} required className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white" />
        </label>
        <label className="text-sm font-semibold text-white/84">
          {copy.phone}
          <Input value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white" />
        </label>
      </div>
      <label className="mt-3 block text-sm font-semibold text-white/84">
        {copy.studentLevelSubject}
        <Input value={values.student_level_subject} onChange={(event) => updateValue("student_level_subject", event.target.value)} className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white" />
      </label>
      <label className="mt-3 block text-sm font-semibold text-white/84">
        {copy.mainConcern}
        <Textarea value={values.main_concern} onChange={(event) => updateValue("main_concern", event.target.value)} className="mt-2 min-h-24 rounded-2xl border-white/15 bg-white/5 text-white" />
      </label>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold text-white/84">
          {copy.profileTimeline}
          <Input value={values.timeline} onChange={(event) => updateValue("timeline", event.target.value)} className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white" />
        </label>
        <SelectField label={copy.preferredFormat} value={values.format} options={["online", "in_person", "either"]} onChange={(value) => updateValue("format", value)} />
      </div>
      <Button type="submit" disabled={isSaving} className="mt-4 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f]">
        <CircleCheck className="h-4 w-4" />
        {copy.profileSave}
      </Button>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </form>
  )
}

function ParentJourneyPanel({ copy, dashboard }) {
  const hasTutor = Boolean(dashboard.matching?.tutor_id || dashboard.students?.some((student) => student.assigned_tutor_id))
  const activeSessions = (dashboard.sessions || []).filter((session) => !["cancelled", "no_show"].includes(session.session_status))
  const activeSessionIds = new Set(activeSessions.map((session) => session.session_id).filter(Boolean))
  const hasSession = activeSessions.length > 0
  const hasFollowUp = [...(dashboard.notes || []), ...(dashboard.feedback || [])].some((record) => (
    !record.session_id || activeSessionIds.has(record.session_id)
  ))
  const steps = [
    { label: copy.parentJourneyProfile, done: Boolean(dashboard.profile?.name) },
    { label: copy.parentJourneyMatching, done: hasTutor },
    { label: copy.parentJourneyBooking, done: hasSession },
    { label: copy.parentJourneyFollowUp, done: hasFollowUp },
  ]
  const activeIndex = steps.findIndex((step) => !step.done)
  const nextStep = activeIndex >= 0 ? steps[activeIndex] : null

  return (
    <ProgressJourney
      title={copy.parentJourneyTitle}
      eyebrow={copy.parentJourneyEyebrow}
      intro={nextStep ? `${copy.parentJourneyNext}: ${nextStep.label}` : copy.parentJourneyCompleteMessage}
      steps={steps.map((step, index) => ({
        ...step,
        status: step.done ? copy.parentJourneyDone : index === activeIndex ? copy.parentJourneyCurrent : "",
      }))}
      currentIndex={activeIndex === -1 ? steps.length : activeIndex}
      countLabel={copy.parentJourneyCount}
      compact
    />
  )
}

function PortalQuickNav({ copy }) {
  const links = [
    { href: "#portal-apercu", label: copy.parentJourneyTitle, icon: CircleCheck },
    { href: "#portal-seances", label: copy.nextSession, icon: CalendarDays },
    { href: "#portal-suivi", label: copy.messagesTitle, icon: MessageSquareText },
    { href: "#portal-famille", label: copy.childrenTitle, icon: UsersRound },
  ]

  return (
    <nav aria-label={copy.parentDashboard} className="grid min-w-0 grid-cols-2 gap-2 lg:hidden">
      {links.map(({ href, label, icon: Icon }) => (
        <a key={href} href={href} className="flex min-h-12 min-w-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-semibold text-white/78 transition hover:bg-white/10 hover:text-white">
          <Icon className="h-4 w-4 shrink-0 text-[#f5c977]" />
          <span className="min-w-0 leading-4">{label}</span>
        </a>
      ))}
    </nav>
  )
}

function TutorDashboard({ copy, dashboard, token, onSaved }) {
  return (
    <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <div className="min-w-0 space-y-6">
        <MetricStrip metrics={dashboard.metrics} />
        <NextSessionCard copy={copy} session={dashboard.next_session} role="tutor" />
        <div className="lg:hidden">
          <RecordList
            icon={ClipboardList}
            title={copy.sessions}
            empty={copy.empty}
            records={dashboard.sessions}
            render={(session) => (
              <SessionRow
                key={session.session_id}
                copy={copy}
                session={session}
                role="tutor"
                token={token}
                onSaved={onSaved}
              />
            )}
          />
        </div>
        <CalendarAgenda copy={copy} sessions={dashboard.sessions} />
        <TutorAvailabilityPanel copy={copy} availability={dashboard.availability} token={token} onSaved={onSaved} />
        <TutorNoteForm copy={copy} token={token} dashboard={dashboard} onSaved={onSaved} />
        <SessionMessagePanel copy={copy} sessions={dashboard.sessions} messages={dashboard.messages} token={token} onSaved={onSaved} />
        <ParentRequestForm copy={copy} role="tutor" requestType="tutor_note" token={token} onSaved={onSaved} />
      </div>
      <div className="min-w-0 space-y-6">
        <div className="hidden lg:block">
          <RecordList
            icon={ClipboardList}
            title={copy.sessions}
            empty={copy.empty}
            records={dashboard.sessions}
            render={(session) => (
              <SessionRow
                key={session.session_id}
                copy={copy}
                session={session}
                role="tutor"
                token={token}
                onSaved={onSaved}
              />
            )}
          />
        </div>
        <RecordList
          icon={FileText}
          title={copy.notes}
          empty={copy.empty}
          records={dashboard.notes}
          render={(note) => <NoteRow key={note.note_id} note={note} />}
        />
        <RecordList
          icon={Star}
          title={copy.parentFeedback}
          empty={copy.empty}
          records={dashboard.parent_feedback}
          render={(feedback) => <FeedbackRow key={feedback.feedback_id} feedback={feedback} />}
        />
        <RecordList
          icon={ClipboardList}
          title={copy.requestHistory}
          empty={copy.empty}
          records={dashboard.requests}
          render={(request) => <RequestRow key={request.request_id} request={request} />}
        />
      </div>
    </div>
  )
}

function TutorAvailabilityPanel({ copy, availability = [], token, onSaved }) {
  const emptyValues = {
    availability_id: "",
    weekday: "monday",
    start_time: "16:00",
    end_time: "17:00",
    format: "online",
    location: "",
    status: "open",
    notes: "",
  }
  const [values, setValues] = useState(emptyValues)
  const [status, setStatus] = useState("")
  const [savingId, setSavingId] = useState("")

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function saveAvailability(nextValues, successMessage = copy.availabilitySaved) {
    setSavingId(nextValues.availability_id || "new")
    setStatus("")
    const result = await upsertPortalTutorAvailability({ token, values: nextValues })
    setSavingId("")

    if (result.ok) {
      setStatus(successMessage)
      onSaved?.()
      return true
    }

    setStatus(getPortalErrorMessage(copy, result.code))
    return false
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const saved = await saveAvailability(values)
    if (saved) {
      setValues(emptyValues)
    }
  }

  async function toggleAvailability(record) {
    await saveAvailability({
      ...record,
      status: record.status === "paused" ? "open" : "paused",
    })
  }

  function editAvailability(record) {
    setValues({
      availability_id: record.availability_id,
      weekday: record.weekday || "monday",
      start_time: record.start_time || "16:00",
      end_time: record.end_time || "17:00",
      format: record.format || "online",
      location: record.location || "",
      status: record.status || "open",
      notes: record.notes || "",
    })
    setStatus("")
  }

  return (
    <section className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-center gap-3">
        <CalendarClock className="h-5 w-5 text-[#f5c977]" />
        <div>
          <h2 className="font-display text-3xl font-semibold">{copy.availabilityTitle}</h2>
          <p className="mt-1 text-sm leading-6 text-white/58">{copy.availabilityIntro}</p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {availability.length ? availability.map((record) => (
          <div key={record.availability_id} className="flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-white/5 px-3 py-3">
            <div>
              <div className="font-semibold">{humanize(record.weekday)} · {record.start_time} - {record.end_time}</div>
              <div className="mt-1 text-sm text-white/58">{humanize(record.format)}{record.location ? ` · ${record.location}` : ""}</div>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill value={record.status} />
              <Button type="button" variant="outline" size="icon" title={copy.availabilityEdit} aria-label={copy.availabilityEdit} onClick={() => editAvailability(record)} className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                title={record.status === "paused" ? copy.availabilityOpen : copy.availabilityPause}
                aria-label={record.status === "paused" ? copy.availabilityOpen : copy.availabilityPause}
                disabled={savingId === record.availability_id}
                onClick={() => toggleAvailability(record)}
                className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                {record.status === "paused" ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )) : <p className="text-sm leading-7 text-white/60">{copy.availabilityEmpty}</p>}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 border-t border-white/10 pt-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <SelectField label={copy.availabilityDay} value={values.weekday} options={["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]} onChange={(value) => updateValue("weekday", value)} />
          <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            {copy.availabilityStart}
            <Input type="time" value={values.start_time} onChange={(event) => updateValue("start_time", event.target.value)} required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            {copy.availabilityEnd}
            <Input type="time" value={values.end_time} onChange={(event) => updateValue("end_time", event.target.value)} required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <SelectField label={copy.sessionFormat} value={values.format} options={["online", "in_person", "either"]} onChange={(value) => updateValue("format", value)} />
          <SelectField label={copy.availabilityStatus} value={values.status} options={["open", "limited", "full", "paused"]} onChange={(value) => updateValue("status", value)} />
          <label className="block text-sm font-semibold text-white/84">
            {copy.location}
            <Input value={values.location} onChange={(event) => updateValue("location", event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
        </div>
        <Button type="submit" disabled={Boolean(savingId)} className="mt-4 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f]">
          <CalendarPlus className="h-4 w-4" />
          {values.availability_id ? copy.availabilitySave : copy.availabilityAdd}
        </Button>
      </form>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </section>
  )
}

function OperatorDashboard({ copy, dashboard, locale, token, onSaved }) {
  const safeDashboard = normalizeOperatorDashboard(dashboard)

  return (
    <div className="mt-6 space-y-6">
      <TodayBoard copy={copy} today={safeDashboard.today} />
      <TeamPriorityBoard copy={copy} queues={safeDashboard.work_queues} automation={safeDashboard.automation} />
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="min-w-0 space-y-6">
          <MetricStrip metrics={safeDashboard.metrics} />
          <ParentCreationPanel copy={copy} token={token} onSaved={onSaved} />
          <ParentManagementPanel copy={copy} dashboard={safeDashboard} token={token} onSaved={onSaved} />
          <TutorAccessPanel copy={copy} tutors={safeDashboard.tutor_records || safeDashboard.tutors} token={token} onSaved={onSaved} />
          <PlanEnrollmentPanel copy={copy} dashboard={safeDashboard} locale={locale} token={token} onSaved={onSaved} />
          <ScheduleSessionForm copy={copy} dashboard={safeDashboard} token={token} onSaved={onSaved} />
          <TestDataCleanupPanel copy={copy} records={safeDashboard.test_data} token={token} onSaved={onSaved} />
        </div>
        <div className="min-w-0 space-y-6">
          <RecordList
            icon={CalendarClock}
            title={copy.sessions}
            empty={copy.empty}
            records={safeDashboard.sessions}
            render={(session) => <SessionRow key={session.session_id} copy={copy} session={session} role="operator" token={token} onSaved={onSaved} />}
          />
          <RecordList
            icon={Star}
            title={copy.parentFeedback}
            empty={copy.empty}
            records={safeDashboard.parent_feedback}
            render={(feedback) => <FeedbackRow key={feedback.feedback_id} feedback={feedback} />}
          />
          <RecordList
            icon={MessageSquareText}
            title={copy.messagesTitle}
            empty={copy.empty}
            records={safeDashboard.messages}
            render={(message) => <MessageRow key={message.message_id} message={message} />}
          />
          <RecordList
            icon={MessageSquareText}
            title={copy.requestQueue}
            empty={copy.empty}
            records={safeDashboard.requests}
            render={(request) => <OperatorRequestRow key={request.request_id} copy={copy} request={request} token={token} onSaved={onSaved} />}
          />
        </div>
      </div>
    </div>
  )
}

function normalizeOperatorDashboard(dashboard) {
  const source = dashboard && typeof dashboard === "object" ? dashboard : {}
  const arrayKeys = [
    "parent_candidates",
    "tutors",
    "tutor_records",
    "sessions",
    "requests",
    "parent_feedback",
    "test_data",
    "messages",
    "plans",
    "plan_enrollments",
    "credit_ledger",
  ]

  return arrayKeys.reduce(
    (normalized, key) => ({
      ...normalized,
      [key]: Array.isArray(source[key]) ? source[key] : [],
    }),
    {
      ...source,
      metrics: source.metrics && typeof source.metrics === "object" ? source.metrics : {},
      work_queues: source.work_queues && typeof source.work_queues === "object" ? source.work_queues : {},
      automation: source.automation && typeof source.automation === "object" ? source.automation : {},
    },
  )
}

function TodayBoard({ copy, today = {} }) {
  const sections = [
    { key: "calls", title: copy.todayCalls, icon: Phone, records: today.calls || [] },
    { key: "confirmations", title: copy.todayConfirmations, icon: CalendarCheck, records: today.confirmations || [] },
    { key: "sessions_today", title: copy.todaySessions, icon: CalendarDays, records: today.sessions_today || [] },
    { key: "reminders", title: copy.todayReminders, icon: RefreshCw, records: today.reminders || [] },
  ]

  return (
    <section className="border-y border-white/10 bg-[#061735]/75 py-6 text-white">
      <div className="flex items-center gap-3">
        <CalendarClock className="h-5 w-5 text-[#f5c977]" />
        <div>
          <h2 className="font-display text-3xl font-semibold">{copy.todayTitle}</h2>
          <p className="mt-1 text-sm leading-6 text-white/58">{copy.todayIntro}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
        {sections.map(({ key, title, icon: Icon, records }) => (
          <div key={key} className="border-l-2 border-white/10 pl-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/88">
              <Icon className="h-4 w-4 text-[#f5c977]" />
              {title}
              <span className="text-white/45">{records.length}</span>
            </div>
            <div className="mt-3 space-y-2">
              {records.length ? records.slice(0, 4).map((record) => {
                const titleValue = record.parent_name || record.student_name || record.title || record.email || "-"
                const detail = record.start_at ? `${formatDateTime(record.start_at)} | ${record.tutor_name || ""}` : (record.student_level_subject || record.detail || "")
                return record.phone ? (
                  <a key={record.session_id || record.lead_id || titleValue} href={`tel:${record.phone}`} className="block rounded-xl bg-white/5 px-3 py-2 hover:bg-white/10">
                    <div className="truncate text-sm font-semibold text-white/82">{titleValue}</div>
                    <div className="mt-1 line-clamp-2 text-xs leading-5 text-white/55">{detail}</div>
                  </a>
                ) : (
                  <div key={record.session_id || record.lead_id || titleValue} className="rounded-xl bg-white/5 px-3 py-2">
                    <div className="truncate text-sm font-semibold text-white/82">{titleValue}</div>
                    <div className="mt-1 line-clamp-2 text-xs leading-5 text-white/55">{detail}</div>
                  </div>
                )
              }) : <p className="text-sm leading-6 text-white/52">{copy.queueEmpty}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function TeamPriorityBoard({ copy, queues = {}, automation = {} }) {
  const queueDefinitions = [
    { key: "callbacks", title: copy.queueCallbacks, icon: Phone },
    { key: "matching", title: copy.queueMatching, icon: UsersRound },
    { key: "confirmations", title: copy.queueConfirmations, icon: CalendarCheck },
    { key: "calendar", title: copy.queueCalendar, icon: CalendarClock },
    { key: "notes", title: copy.queueNotes, icon: FileText },
    { key: "payments", title: copy.queuePayments, icon: CreditCard },
    { key: "messages", title: copy.queueMessages, icon: MessageSquareText },
  ]

  return (
    <section className="panel-soft rounded-[24px] p-5 text-white">
      <div>
        <h2 className="font-display text-3xl font-semibold">{copy.priorityTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-white/58">{copy.priorityIntro}</p>
      </div>
      <div className="mt-5 grid gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
        {queueDefinitions.map(({ key, title, icon: Icon }) => {
          const records = Array.isArray(queues[key]) ? queues[key] : []
          return (
            <div key={key} className="border-l-2 border-white/10 pl-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/88">
                <Icon className="h-4 w-4 text-[#f5c977]" />
                {title}
                <span className="text-white/45">{records.length}</span>
              </div>
              <div className="mt-3 space-y-2">
                {records.length ? records.map((record) => {
                  const content = (
                    <>
                      <div className="truncate text-sm font-semibold text-white/82">{record.title}</div>
                      {record.detail ? <div className="mt-1 line-clamp-2 text-xs leading-5 text-white/55">{record.detail}</div> : null}
                      {record.status ? <div className="mt-2"><StatusPill value={record.status} /></div> : null}
                    </>
                  )

                  return record.href ? (
                    <a key={record.id} href={record.href} className="block rounded-xl bg-white/5 px-3 py-2 hover:bg-white/10">
                      {content}
                    </a>
                  ) : (
                    <div key={record.id} className="rounded-xl bg-white/5 px-3 py-2">
                      {content}
                    </div>
                  )
                }) : <p className="text-sm leading-6 text-white/52">{copy.queueEmpty}</p>}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-6 grid gap-3 border-t border-white/10 pt-4 text-sm text-white/64 sm:grid-cols-2 xl:grid-cols-4">
        <div><span className="font-semibold text-white/84">{copy.automationReminders}:</span> {automation.reminder_cadence_minutes || 15} min, {copy.automationReminderDetail}</div>
        <div><span className="font-semibold text-white/84">{copy.automationCalendar}:</span> {copy.automationCalendarDetail}</div>
        <div><span className="font-semibold text-white/84">{copy.automationDigest}:</span> {automation.daily_digest_hour || "07:30"}, {copy.automationDigestDetail}</div>
        <div><span className="font-semibold text-white/84">{copy.automationPayments}:</span> {automation.payment_mode === "stripe_checkout" ? copy.paymentModeCheckout : copy.paymentModeUnavailable}</div>
      </div>
    </section>
  )
}

function ParentCreationPanel({ copy, token, onSaved }) {
  const [values, setValues] = useState({
    parent_name: "",
    student_name: "",
    email: "",
    phone: "",
    student_level_subject: "",
    main_concern: "",
    format: "",
  })
  const [createPortalAccess, setCreatePortalAccess] = useState(false)
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function createParent(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")
    const result = await createPortalParent({
      token,
      values: {
        ...values,
        create_portal_access: createPortalAccess ? "yes" : "no",
        privacy_consent: privacyConsent ? "yes" : "no",
      },
    })
    setIsSaving(false)

    if (result.ok) {
      setValues({
        parent_name: "",
        student_name: "",
        email: "",
        phone: "",
        student_level_subject: "",
        main_concern: "",
        format: "",
      })
      setCreatePortalAccess(false)
      setPrivacyConsent(false)
      setStatus(result.access_status === "active" ? copy.parentCreatedWithAccess : copy.parentCreated)
      onSaved?.()
      return
    }

    setStatus(getPortalErrorMessage(copy, result.code))
  }

  return (
    <section className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-center gap-3">
        <UserPlus className="h-5 w-5 text-[#f5c977]" />
        <h2 className="font-display text-3xl font-semibold">{copy.teamCreateParentTitle}</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-white/58">{copy.createParentIntro}</p>
      <form onSubmit={createParent} className="mt-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-white/84">
            {copy.parentName}
            <Input value={values.parent_name} onChange={(event) => updateValue("parent_name", event.target.value)} required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.email}
            <Input value={values.email} onChange={(event) => updateValue("email", event.target.value)} type="email" required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.phone}
            <Input value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.childName}
            <Input value={values.student_name} onChange={(event) => updateValue("student_name", event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.studentLevelSubject}
            <Input value={values.student_level_subject} onChange={(event) => updateValue("student_level_subject", event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
        </div>
        <label className="mt-3 block text-sm font-semibold text-white/84">
          {copy.mainConcern}
          <Textarea value={values.main_concern} onChange={(event) => updateValue("main_concern", event.target.value)} className="mt-2 min-h-20 rounded-2xl border-white/15 bg-white/5 text-white" />
        </label>
        <label className="mt-3 block text-sm font-semibold text-white/84">
          {copy.preferredFormat}
          <Input value={values.format} onChange={(event) => updateValue("format", event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
        </label>
        <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-white/76">
          <input type="checkbox" checked={createPortalAccess} onChange={(event) => setCreatePortalAccess(event.target.checked)} className="mt-1 h-4 w-4 accent-[#f5c977]" />
          <span>{copy.createParentAccess}</span>
        </label>
        {createPortalAccess ? (
          <label className="mt-3 flex items-start gap-3 text-sm leading-6 text-white/76">
            <input type="checkbox" checked={privacyConsent} onChange={(event) => setPrivacyConsent(event.target.checked)} required className="mt-1 h-4 w-4 accent-[#f5c977]" />
            <span>{copy.createParentConsent}</span>
          </label>
        ) : null}
        <Button type="submit" disabled={isSaving} className="mt-4 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
          {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
          {copy.createParent}
        </Button>
      </form>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </section>
  )
}

function ParentManagementPanel({ copy, dashboard, token, onSaved }) {
  const parents = dashboard.parent_candidates || []
  const [leadId, setLeadId] = useState(parents[0]?.lead_id || "")
  const [values, setValues] = useState({
    parent_name: "",
    email: "",
    phone: "",
    student_level_subject: "",
    main_concern: "",
    format: "",
  })
  const [tutorId, setTutorId] = useState("")
  const [leadStatus, setLeadStatus] = useState("")
  const [callbackNotes, setCallbackNotes] = useState("")
  const [confirmationEmail, setConfirmationEmail] = useState("")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const selectedParent = parents.find((parent) => parent.lead_id === leadId)

  useEffect(() => {
    if (!parents.length) {
      return
    }

    const parent = parents.find((candidate) => candidate.lead_id === leadId) || parents[0]
    if (parent.lead_id !== leadId) {
      setLeadId(parent.lead_id)
    }
    setValues({
      parent_name: parent.parent_name || "",
      email: parent.email || "",
      phone: parent.phone || "",
      student_level_subject: parent.student_level_subject || "",
      main_concern: parent.main_concern || "",
      format: parent.format || "",
    })
    setTutorId(parent.assigned_tutor?.split("|").at(-1)?.trim() || "")
    setLeadStatus(parent.lead_status || "callback_needed")
    setCallbackNotes(parent.callback_notes || "")
    setConfirmationEmail("")
    setStatus("")
  }, [leadId, parents])

  if (!parents.length || !selectedParent) {
    return null
  }

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function saveParent(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")
    const result = await upsertPortalParent({
      token,
      values: { lead_id: selectedParent.lead_id, ...values },
    })
    setIsSaving(false)
    if (result.ok) {
      setStatus(copy.parentSaved)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  async function updateAccess(accessStatus) {
    setIsSaving(true)
    setStatus("")
    const result = await setPortalParentAccess({
      token,
      leadId: selectedParent.lead_id,
      accessStatus,
    })
    setIsSaving(false)
    if (result.ok) {
      setStatus(copy.parentAccessUpdated)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  async function assignTutor() {
    setIsSaving(true)
    setStatus("")
    const result = await assignPortalTutor({ token, leadId: selectedParent.lead_id, tutorId })
    setIsSaving(false)
    if (result.ok) {
      setStatus(copy.tutorAssigned)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  async function saveCallFollowUp(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")
    const result = await updatePortalLeadFollowUp({
      token,
      leadId: selectedParent.lead_id,
      leadStatus,
      callbackNotes,
    })
    setIsSaving(false)
    if (result.ok) {
      setStatus(copy.callFollowUpSaved)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  async function deleteParent() {
    const confirmed = window.confirm(`${copy.deleteParent}: ${selectedParent.parent_name}?`)
    if (!confirmed) {
      return
    }

    setIsSaving(true)
    setStatus("")
    const result = await deletePortalParent({
      token,
      leadId: selectedParent.lead_id,
      confirmationEmail,
    })
    setIsSaving(false)
    if (result.ok) {
      setStatus(copy.parentDeleted)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  const accessIsActive = selectedParent.access_status === "active"
  const parentIntentLabel = {
    exam: copy.parentIntentExam,
    homework: copy.parentIntentHomework,
    ongoing: copy.parentIntentOngoing,
  }[selectedParent.parent_intent]

  return (
    <section className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-center gap-3">
        <UserCog className="h-5 w-5 text-[#f5c977]" />
        <h2 className="font-display text-3xl font-semibold">{copy.parentManagement}</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-white/58">{copy.parentManagementIntro}</p>
      {parentIntentLabel ? (
        <p className="mt-3 text-sm text-[#f5c977]">
          <span className="font-semibold text-white/80">{copy.parentIntentLabel}:</span> {parentIntentLabel}
        </p>
      ) : null}
      <label className="mt-5 block text-sm font-semibold text-white/84">
        {copy.chooseParentAccount}
        <select
          value={leadId}
          onChange={(event) => setLeadId(event.target.value)}
          className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
        >
          {parents.map((parent) => (
            <option key={parent.lead_id} value={parent.lead_id}>
              {parent.parent_name || parent.email} | {parent.assigned_tutor || parent.lead_status || "-"}
            </option>
          ))}
        </select>
      </label>

      <form onSubmit={saveParent}>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-white/84">
            {copy.parentName}
            <Input value={values.parent_name} onChange={(event) => updateValue("parent_name", event.target.value)} required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.email}
            <Input value={values.email} onChange={(event) => updateValue("email", event.target.value)} type="email" required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.phone}
            <Input value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.studentLevelSubject}
            <Input value={values.student_level_subject} onChange={(event) => updateValue("student_level_subject", event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
        </div>
        <label className="mt-3 block text-sm font-semibold text-white/84">
          {copy.mainConcern}
          <Textarea value={values.main_concern} onChange={(event) => updateValue("main_concern", event.target.value)} className="mt-2 min-h-20 rounded-2xl border-white/15 bg-white/5 text-white" />
        </label>
        <label className="mt-3 block text-sm font-semibold text-white/84">
          {copy.preferredFormat}
          <Input value={values.format} onChange={(event) => updateValue("format", event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
        </label>
        <Button type="submit" disabled={isSaving} className="mt-4 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
          <ArrowRight className="h-4 w-4" />
          {copy.saveParent}
        </Button>
      </form>

      <form onSubmit={saveCallFollowUp} className="mt-5 border-t border-white/10 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-white/84">{copy.callFollowUp}</div>
            <p className="mt-1 text-sm leading-6 text-white/58">{copy.callFollowUpIntro}</p>
          </div>
          {selectedParent.phone ? (
            <Button asChild variant="outline" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <a href={`tel:${selectedParent.phone}`}>
                <Phone className="h-4 w-4" />
                {copy.callParent}
              </a>
            </Button>
          ) : null}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold text-white/84">
            {copy.leadStatus}
            <select value={leadStatus} onChange={(event) => setLeadStatus(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
              {["callback_needed", "waiting_parent", "ready_to_match", "matched", "booked", "active", "closed"].map((option) => (
                <option key={option} value={option}>{humanize(option)}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-white/84">
            {copy.callbackNotes}
            <Textarea value={callbackNotes} onChange={(event) => setCallbackNotes(event.target.value)} className="mt-2 min-h-20 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
        </div>
        <Button type="submit" disabled={isSaving} className="mt-3 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
          {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Phone className="h-4 w-4" />}
          {copy.saveCallFollowUp}
        </Button>
      </form>

      <div className="mt-5 border-t border-white/10 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold text-white/84">{copy.parentAccess}</div>
          <StatusPill value={selectedParent.access_status} />
        </div>
        <Button
          type="button"
          disabled={isSaving}
          onClick={() => updateAccess(accessIsActive ? "disabled" : "active")}
          variant="outline"
          className="mt-3 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
        >
          <CircleCheck className="h-4 w-4" />
          {accessIsActive ? copy.deactivateParent : copy.activateParent}
        </Button>
      </div>

      <div className="mt-5 border-t border-white/10 pt-5">
        <label className="block text-sm font-semibold text-white/84">
          {copy.assignedTutor}
          <select
            value={tutorId}
            onChange={(event) => setTutorId(event.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
          >
            <option value="">{copy.chooseTutor}</option>
            {(dashboard.tutors || []).map((tutor) => (
              <option key={tutor.tutor_id} value={tutor.tutor_id}>{tutor.tutor_name}</option>
            ))}
          </select>
        </label>
        <Button type="button" disabled={isSaving || !tutorId} onClick={assignTutor} className="mt-3 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
          <UserPlus className="h-4 w-4" />
          {copy.assignTutor}
        </Button>
      </div>

      <FamilyStudentsPanel
        copy={copy}
        students={selectedParent.students || []}
        role="operator"
        token={token}
        parentEmail={selectedParent.email}
        tutors={dashboard.tutors || []}
        onSaved={onSaved}
        embedded
      />
      <ActivityTimeline copy={copy} activity={selectedParent.relationship_history || []} embedded />

      <div className="mt-5 border-t border-red-300/20 pt-5">
        <label className="block text-sm font-semibold text-red-100/84">
          {copy.confirmationEmail}
          <Input value={confirmationEmail} onChange={(event) => setConfirmationEmail(event.target.value)} type="email" className="mt-2 h-11 border-red-300/20 bg-red-500/10 text-white" />
        </label>
        <Button type="button" disabled={isSaving || !confirmationEmail} onClick={deleteParent} className="mt-3 rounded-full bg-red-400/20 text-red-50 hover:bg-red-400/30">
          <Trash2 className="h-4 w-4" />
          {copy.deleteParent}
        </Button>
      </div>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </section>
  )
}

function TutorAccessPanel({ copy, tutors = [], token, onSaved }) {
  const [tutorId, setTutorId] = useState(tutors[0]?.tutor_id || "")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [confirmationEmail, setConfirmationEmail] = useState("")
  const [calendarId, setCalendarId] = useState("")
  const [newTutor, setNewTutor] = useState({
    tutor_name: "",
    email: "",
    subjects: "",
    levels: "",
    formats: "online",
    languages: "fr",
    weekly_capacity: "4",
    zones: "",
    hourly_rate_cad: "28",
    notes: "",
    calendar_id: "",
  })
  const selectedTutor = tutors.find((tutor) => tutor.tutor_id === tutorId)

  useEffect(() => {
    if (!tutors.some((tutor) => tutor.tutor_id === tutorId) && tutors[0]?.tutor_id) {
      setTutorId(tutors[0].tutor_id)
    }
    setConfirmationEmail("")
    setCalendarId(selectedTutor?.calendar_id || "")
  }, [selectedTutor?.calendar_id, tutorId, tutors])

  function updateNewTutor(key, value) {
    setNewTutor((current) => ({ ...current, [key]: value }))
  }

  async function createTutor(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")
    const result = await createPortalTutor({ token, values: newTutor })
    setIsSaving(false)

    if (result.ok) {
      setTutorId(result.tutor_id)
      setNewTutor({
        tutor_name: "",
        email: "",
        subjects: "",
        levels: "",
        formats: "online",
        languages: "fr",
        weekly_capacity: "4",
        zones: "",
        hourly_rate_cad: "28",
        notes: "",
        calendar_id: "",
      })
      setStatus(copy.tutorCreatedAndInvited)
      onSaved?.()
      return
    }

    setStatus(result.tutor_created
      ? `${copy.tutorCreatedInvitePending} ${getPortalErrorMessage(copy, result.code)}`
      : getPortalErrorMessage(copy, result.code))
    if (result.tutor_created) {
      setTutorId(result.tutor_id)
      onSaved?.()
    }
  }

  async function inviteTutor() {
    if (!selectedTutor || selectedTutor.status !== "active") {
      return
    }

    setIsSaving(true)
    setStatus("")
    const result = await invitePortalTutor({ token, tutorId: selectedTutor.tutor_id })
    setIsSaving(false)
    if (result.ok) {
      setStatus(copy.tutorInvited)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  async function saveTutorCalendar() {
    if (!selectedTutor) {
      return
    }
    setIsSaving(true)
    setStatus("")
    const result = await updatePortalTutorCalendar({ token, tutorId: selectedTutor.tutor_id, calendarId })
    setIsSaving(false)
    if (result.ok) {
      setStatus(copy.calendarSaved)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  async function deleteTutor() {
    if (!selectedTutor) {
      return
    }

    const confirmed = window.confirm(`${copy.deleteTutor}: ${selectedTutor.tutor_name}?`)
    if (!confirmed) {
      return
    }

    setIsSaving(true)
    setStatus("")
    const result = await deletePortalTutor({
      token,
      tutorId: selectedTutor.tutor_id,
      confirmationEmail,
    })
    setIsSaving(false)
    if (result.ok) {
      setTutorId("")
      setConfirmationEmail("")
      setStatus(copy.tutorDeleted)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  return (
    <section className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-center gap-3">
        <UsersRound className="h-5 w-5 text-[#f5c977]" />
        <h2 className="font-display text-3xl font-semibold">{copy.tutorManagement}</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-white/58">{copy.tutorManagementIntro}</p>
      <form onSubmit={createTutor} className="mt-4">
        <h3 className="text-base font-semibold text-white">{copy.tutorCreateTitle}</h3>
        <p className="mt-1 text-sm leading-6 text-white/58">{copy.tutorCreateIntro}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-white/84">
            {copy.tutorName}
            <Input value={newTutor.tutor_name} onChange={(event) => updateNewTutor("tutor_name", event.target.value)} required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.email}
            <Input value={newTutor.email} onChange={(event) => updateNewTutor("email", event.target.value)} type="email" required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.tutorSubjects}
            <Input value={newTutor.subjects} onChange={(event) => updateNewTutor("subjects", event.target.value)} placeholder="Mathématiques, sciences" required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.tutorLevels}
            <Input value={newTutor.levels} onChange={(event) => updateNewTutor("levels", event.target.value)} placeholder="Secondaire 4, 5" required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <SelectField label={copy.sessionFormat} value={newTutor.formats} options={["online", "in_person", "either"]} onChange={(value) => updateNewTutor("formats", value)} />
          <SelectField label={copy.tutorLanguage} value={newTutor.languages} options={["fr", "en", "bilingual"]} onChange={(value) => updateNewTutor("languages", value)} />
          <label className="block text-sm font-semibold text-white/84">
            {copy.tutorWeeklyCapacity}
            <Input value={newTutor.weekly_capacity} onChange={(event) => updateNewTutor("weekly_capacity", event.target.value)} type="number" min="1" max="40" required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.tutorZones}
            <Input value={newTutor.zones} onChange={(event) => updateNewTutor("zones", event.target.value)} placeholder="Montréal ou en ligne" className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.calendarId}
            <Input value={newTutor.calendar_id} onChange={(event) => updateNewTutor("calendar_id", event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-white/84">
            {copy.tutorRate}
            <Input value={newTutor.hourly_rate_cad} onChange={(event) => updateNewTutor("hourly_rate_cad", event.target.value)} type="number" min="28" step="1" className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.tutorNotes}
            <Textarea value={newTutor.notes} onChange={(event) => updateNewTutor("notes", event.target.value)} className="mt-2 min-h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
          </label>
        </div>
        <Button type="submit" disabled={isSaving} className="mt-4 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f]">
          <UserPlus className="h-4 w-4" />
          {copy.createTutor}
        </Button>
      </form>

      {tutors.length && selectedTutor ? (
        <div className="mt-5 border-t border-white/10 pt-5">
          <h3 className="text-base font-semibold text-white">{copy.tutorExistingTitle}</h3>
          <label className="mt-3 block text-sm font-semibold text-white/84">
            {copy.chooseTutor}
            <select value={tutorId} onChange={(event) => setTutorId(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
              {tutors.map((tutor) => (
                <option key={tutor.tutor_id} value={tutor.tutor_id}>{tutor.tutor_name} | {tutor.status} | {tutor.calendar_email}</option>
              ))}
            </select>
          </label>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm text-white/62">{copy.tutorStatus}</span>
            <div className="flex items-center gap-2">
              <StatusPill value={selectedTutor.status} />
              <StatusPill value={selectedTutor.access_status} />
            </div>
          </div>
          <div className="mt-3 rounded-[18px] border border-white/10 bg-white/5 px-3 py-3 text-sm leading-6 text-white/72">
            <div className="font-semibold text-white">{selectedTutor.tutor_name}</div>
            <div>{selectedTutor.calendar_email}</div>
            <div className="mt-2">{selectedTutor.subjects || "-"} | {selectedTutor.levels || "-"}</div>
            <div>{humanize(selectedTutor.formats || "online")} | {selectedTutor.zones || "-"} | {humanize(selectedTutor.languages || "fr")}</div>
            <div>{copy.tutorCapacity}: {selectedTutor.active_students || "0"}/{selectedTutor.weekly_capacity || "0"}</div>
            {selectedTutor.notes ? <div className="mt-2 text-white/58">{selectedTutor.notes}</div> : null}
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <label className="block text-sm font-semibold text-white/84">
              {copy.calendarId}
              <Input value={calendarId} onChange={(event) => setCalendarId(event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
            </label>
            <p className="mt-2 text-sm leading-6 text-white/58">{copy.calendarIdHelp}</p>
            <Button type="button" disabled={isSaving} onClick={saveTutorCalendar} className="mt-3 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
              <CalendarCheck className="h-4 w-4" />
              {copy.availabilitySave}
            </Button>
          </div>
          {selectedTutor.status === "active" ? (
            <Button type="button" disabled={isSaving} onClick={inviteTutor} className="mt-4 w-full rounded-full bg-white/10 px-5 py-6 text-white hover:bg-white/15">
              <Mail className="h-4 w-4" />
              {copy.inviteTutor}
            </Button>
          ) : null}
          <div className="mt-5 border-t border-red-300/20 pt-5">
            <label className="block text-sm font-semibold text-red-100/84">
              {copy.confirmationTutorEmail}
              <Input value={confirmationEmail} onChange={(event) => setConfirmationEmail(event.target.value)} type="email" className="mt-2 h-11 border-red-300/20 bg-red-500/10 text-white" />
            </label>
            <Button type="button" disabled={isSaving || !confirmationEmail} onClick={deleteTutor} className="mt-3 rounded-full bg-red-400/20 text-red-50 hover:bg-red-400/30">
              <Trash2 className="h-4 w-4" />
              {copy.deleteTutor}
            </Button>
          </div>
        </div>
      ) : null}
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </section>
  )
}

function SessionMessagePanel({ copy, sessions = [], messages = [], token, onSaved }) {
  const [sessionId, setSessionId] = useState(sessions[0]?.session_id || "")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const selectedMessages = messages.filter((entry) => entry.session_id === sessionId)

  useEffect(() => {
    if (!sessions.some((session) => session.session_id === sessionId) && sessions[0]?.session_id) {
      setSessionId(sessions[0].session_id)
    }
  }, [sessions, sessionId])

  if (!sessions.length) {
    return null
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")
    const result = await sendPortalSessionMessage({ token, sessionId, message })
    setIsSaving(false)
    if (result.ok) {
    setMessage("")
      setStatus(result.delivery_status === "email_notified" ? copy.messageSent : copy.messageSentPortal)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  return (
    <section className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-center gap-3">
        <MessageSquareText className="h-5 w-5 text-[#f5c977]" />
        <h2 className="font-display text-3xl font-semibold">{copy.messagesTitle}</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-white/58">{copy.responseSla}</p>
      <label className="mt-5 block text-sm font-semibold text-white/84">
        {copy.messageSession}
        <select value={sessionId} onChange={(event) => setSessionId(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
          {sessions.map((session) => (
            <option key={session.session_id} value={session.session_id}>{formatDateTime(session.start_at)} | {session.tutor_name || session.parent_name}</option>
          ))}
        </select>
      </label>
      {selectedMessages.length ? (
        <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
          {selectedMessages.map((entry) => <MessageRow key={entry.message_id} message={entry} />)}
        </div>
      ) : null}
      <form onSubmit={handleSubmit} className="mt-3">
        <Textarea value={message} onChange={(event) => setMessage(event.target.value)} required className="min-h-24 rounded-2xl border-white/15 bg-white/5 text-white" placeholder={copy.messagePlaceholder} />
        <Button type="submit" disabled={isSaving} className="mt-3 rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
          {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          {copy.sendMessage}
        </Button>
      </form>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </section>
  )
}

function ScheduleSessionForm({ copy, dashboard, token, onSaved }) {
  const [values, setValues] = useState({
    parent_email: "",
    tutor_id: "",
    student_id: "",
    student_name: "",
    student_level_subject: "",
    start_at: "",
    duration_minutes: "60",
    session_type: "first_session",
    format: "online",
    location: "",
    recurrence_weeks: "1",
    plan_enrollment_id: "",
  })
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const selectedParent = (dashboard.parent_candidates || []).find((candidate) => candidate.email === values.parent_email)
  const eligiblePlanEnrollments = useMemo(() => (
    (dashboard.plan_enrollments || []).filter((enrollment) => {
      if (enrollment.status !== "active") {
        return false
      }
      if (values.parent_email && enrollment.parent_email !== values.parent_email) {
        return false
      }
      if (values.student_id && enrollment.student_id !== values.student_id) {
        return false
      }
      if (values.tutor_id && enrollment.tutor_id !== values.tutor_id) {
        return false
      }
      return enrollment.plan_type !== "pack" || Number(enrollment.credits_remaining) > 0
    })
  ), [dashboard.plan_enrollments, values.parent_email, values.student_id, values.tutor_id])
  const selectedPlanEnrollment = eligiblePlanEnrollments.find((enrollment) => enrollment.enrollment_id === values.plan_enrollment_id) || null

  useEffect(() => {
    if (values.plan_enrollment_id && !selectedPlanEnrollment) {
      setValues((current) => ({ ...current, plan_enrollment_id: "" }))
    }
  }, [selectedPlanEnrollment, values.plan_enrollment_id])

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  function selectParent(email) {
    const parent = (dashboard.parent_candidates || []).find((candidate) => candidate.email === email)
    const assignedTutorId = parent?.students?.[0]?.assigned_tutor_id || parent?.assigned_tutor?.split("|").at(-1)?.trim() || ""
    setValues((current) => ({
      ...current,
      parent_email: email,
      tutor_id: assignedTutorId || "",
      student_id: parent?.students?.[0]?.student_id || "",
      student_name: parent?.students?.[0]?.student_name || current.student_name,
      student_level_subject: current.student_level_subject || parent?.student_level_subject || "",
      format: current.format || parent?.format || "online",
      plan_enrollment_id: "",
    }))
  }

  function selectPlanEnrollment(enrollmentId) {
    const enrollment = eligiblePlanEnrollments.find((candidate) => candidate.enrollment_id === enrollmentId)
    const eligibleTypes = String(enrollment?.eligible_session_types || enrollment?.plan?.eligible_session_types || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)

    setValues((current) => ({
      ...current,
      plan_enrollment_id: enrollmentId,
      session_type: eligibleTypes.length && !eligibleTypes.includes(current.session_type)
        ? eligibleTypes[0]
        : current.session_type,
    }))
  }

  function selectSessionType(sessionType) {
    const eligibleTypes = String(selectedPlanEnrollment?.eligible_session_types || selectedPlanEnrollment?.plan?.eligible_session_types || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)

    setValues((current) => ({
      ...current,
      session_type: sessionType,
      plan_enrollment_id: current.plan_enrollment_id && eligibleTypes.length && !eligibleTypes.includes(sessionType)
        ? ""
        : current.plan_enrollment_id,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")

    const startsAt = values.start_at ? new Date(values.start_at) : null
    const result = await createPortalSession({
      token,
      values: {
        ...values,
        start_at: startsAt && !Number.isNaN(startsAt.getTime()) ? startsAt.toISOString() : "",
      },
    })

    setIsSaving(false)
    if (result.ok) {
      setStatus(copy.sessionCreated)
      setValues((current) => ({
        ...current,
        student_name: "",
        start_at: "",
        location: "",
        plan_enrollment_id: "",
      }))
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-center gap-3">
        <CalendarPlus className="h-5 w-5 text-[#f5c977]" />
        <h2 className="font-display text-3xl font-semibold">{copy.scheduleSession}</h2>
      </div>

      <label className="mt-5 block text-sm font-semibold text-white/84">
        {copy.chooseParent}
        <select
          value={values.parent_email}
          onChange={(event) => selectParent(event.target.value)}
          required
          className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
        >
          <option value="">{copy.chooseParent}</option>
          {(dashboard.parent_candidates || []).map((parent) => (
            <option key={parent.email} value={parent.email}>
              {parent.parent_name || parent.email} · {parent.student_level_subject || parent.email}
            </option>
          ))}
        </select>
      </label>

      {selectedParent?.students?.length ? (
        <label className="mt-3 block text-sm font-semibold text-white/84">
          {copy.chooseStudent}
          <select
            value={values.student_id}
            onChange={(event) => {
              const student = selectedParent.students.find((candidate) => candidate.student_id === event.target.value)
              setValues((current) => ({
                ...current,
                student_id: event.target.value,
                student_name: student?.student_name || current.student_name,
                student_level_subject: student?.student_level_subject || current.student_level_subject,
                tutor_id: student?.assigned_tutor_id || current.tutor_id,
                plan_enrollment_id: "",
              }))
            }}
            className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
          >
            {selectedParent.students.map((student) => <option key={student.student_id} value={student.student_id}>{student.student_name} | {student.student_level_subject || "-"}</option>)}
          </select>
        </label>
      ) : null}

      <label className="mt-3 block text-sm font-semibold text-white/84">
        {copy.chooseTutor}
        <select
          value={values.tutor_id}
          onChange={(event) => setValues((current) => ({ ...current, tutor_id: event.target.value, plan_enrollment_id: "" }))}
          required
          className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
        >
          <option value="">{copy.chooseTutor}</option>
          {(dashboard.tutors || []).map((tutor) => (
            <option key={tutor.tutor_id} value={tutor.tutor_id}>
              {tutor.tutor_name} · {tutor.subjects || tutor.levels || tutor.available_slots}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-white/84">
          {copy.sessionDate}
          <Input
            value={values.start_at}
            onChange={(event) => updateValue("start_at", event.target.value)}
            type="datetime-local"
            required
            className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white"
          />
        </label>
        <SelectField
          label={copy.duration}
          value={values.duration_minutes}
          options={["60", "75", "90", "120"]}
          onChange={(value) => updateValue("duration_minutes", value)}
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-white/84">
          {copy.studentName}
          <Input
            value={values.student_name}
            onChange={(event) => updateValue("student_name", event.target.value)}
            className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white"
          />
        </label>
        <label className="block text-sm font-semibold text-white/84">
          {copy.studentLevelSubject}
          <Input
            value={values.student_level_subject}
            onChange={(event) => updateValue("student_level_subject", event.target.value)}
            required
            className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white"
          />
        </label>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <SelectField label={copy.sessionType} value={values.session_type} options={["first_session", "weekly_follow_up", "exam_sprint", "catch_up", "one_time"]} onChange={selectSessionType} />
        <SelectField label={copy.sessionFormat} value={values.format} options={["online", "in_person", "either"]} onChange={(value) => updateValue("format", value)} />
        <SelectField label={copy.recurrence} value={values.recurrence_weeks} options={["1", "2", "3", "4"]} onChange={(value) => updateValue("recurrence_weeks", value)} />
      </div>

      {eligiblePlanEnrollments.length ? (
        <label className="mt-3 block text-sm font-semibold text-white/84">
          {copy.planSessionLink}
          <select
            value={values.plan_enrollment_id}
            onChange={(event) => selectPlanEnrollment(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
          >
            <option value="">{copy.planSessionLinkNone}</option>
            {eligiblePlanEnrollments.map((enrollment) => (
              <option key={enrollment.enrollment_id} value={enrollment.enrollment_id}>
                {enrollment.plan_name || enrollment.plan?.name || humanize(enrollment.plan_type)}{enrollment.plan_type === "pack" ? ` · ${enrollment.credits_remaining} crédits` : ""}
              </option>
            ))}
          </select>
          <span className="mt-2 block text-xs font-normal leading-5 text-white/50">{copy.planSessionLinkHelp}</span>
        </label>
      ) : null}

      <label className="mt-3 block text-sm font-semibold text-white/84">
        {copy.location}
        <Input
          value={values.location}
          onChange={(event) => updateValue("location", event.target.value)}
          className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white"
        />
      </label>

      <Button type="submit" disabled={isSaving} className="mt-4 w-full rounded-full bg-[#f5c977] px-5 py-6 text-[#071631] hover:bg-[#f7d38f]">
        <CalendarPlus className="h-4 w-4" />
        {copy.createSession}
      </Button>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </form>
  )
}

function PlanEnrollmentPanel({ copy, dashboard, locale, token, onSaved }) {
  const plans = dashboard.plans || []
  const parents = dashboard.parent_candidates || []
  const tutors = dashboard.tutors || []
  const enrollments = dashboard.plan_enrollments || []
  const packEnrollments = useMemo(
    () => enrollments.filter((enrollment) => enrollment.plan_type === "pack" && enrollment.status === "active"),
    [enrollments],
  )
  const midpointReadyEnrollments = useMemo(
    () => packEnrollments.filter((enrollment) => enrollment.plan_id === "PLAN-PACK10-600" &&
      Number(enrollment.credits_total || 0) >= 5 &&
      Number(enrollment.credits_reserved || 0) + Number(enrollment.credits_used || 0) >= 5),
    [packEnrollments],
  )
  const [planId, setPlanId] = useState("")
  const [parentEmail, setParentEmail] = useState("")
  const [studentId, setStudentId] = useState("")
  const [tutorId, setTutorId] = useState("")
  const [weekday, setWeekday] = useState("monday")
  const [scheduledTime, setScheduledTime] = useState("16:00")
  const [packCadence, setPackCadence] = useState("weekly")
  const [midpointEnrollmentId, setMidpointEnrollmentId] = useState("")
  const [paymentRequest, setPaymentRequest] = useState(null)
  const [adjustmentEnrollmentId, setAdjustmentEnrollmentId] = useState("")
  const [creditAmount, setCreditAmount] = useState("")
  const [creditReason, setCreditReason] = useState("")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const selectedPlan = plans.find((plan) => plan.plan_id === planId) || plans[0] || null
  const selectedParent = parents.find((parent) => parent.email === parentEmail) || parents[0] || null
  const students = selectedParent?.students || []
  const isPack = selectedPlan?.plan_type === "pack"
  const isLegacyScheduledPlan = selectedPlan?.plan_type === "weekly" || ["weekly", "biweekly"].includes(selectedPlan?.cadence)
  const cadence = isLegacyScheduledPlan
    ? (selectedPlan?.cadence === "biweekly" ? "biweekly" : "weekly")
    : packCadence
  const hasScheduledCadence = ["weekly", "biweekly"].includes(cadence)

  useEffect(() => {
    if (!planId && plans[0]?.plan_id) {
      setPlanId(plans[0].plan_id)
    }
  }, [planId, plans])

  useEffect(() => {
    if (!selectedPlan) {
      return
    }
    setPackCadence(["weekly", "biweekly"].includes(selectedPlan.cadence) ? selectedPlan.cadence : "weekly")
  }, [selectedPlan?.plan_id])

  useEffect(() => {
    if (!parentEmail && parents[0]?.email) {
      setParentEmail(parents[0].email)
    }
  }, [parentEmail, parents])

  useEffect(() => {
    if (!selectedParent) {
      return
    }
    if (!students.some((student) => student.student_id === studentId)) {
      setStudentId(students[0]?.student_id || "")
    }
    const selectedStudent = students.find((student) => student.student_id === studentId)
    const assignedTutorId = selectedStudent?.assigned_tutor_id || selectedParent.assigned_tutor?.split("|").at(-1)?.trim() || ""
    const hasRecordedActiveMatch = assignedTutorId && tutors.some((tutor) => tutor.tutor_id === assignedTutorId)
    if (tutorId !== assignedTutorId) {
      setTutorId(hasRecordedActiveMatch ? assignedTutorId : "")
    }
  }, [selectedParent, studentId, students, tutorId, tutors])

  useEffect(() => {
    if (!packEnrollments.some((enrollment) => enrollment.enrollment_id === adjustmentEnrollmentId)) {
      setAdjustmentEnrollmentId(packEnrollments[0]?.enrollment_id || "")
    }
  }, [adjustmentEnrollmentId, packEnrollments])

  useEffect(() => {
    if (!midpointReadyEnrollments.some((enrollment) => enrollment.enrollment_id === midpointEnrollmentId)) {
      setMidpointEnrollmentId(midpointReadyEnrollments[0]?.enrollment_id || "")
    }
  }, [midpointEnrollmentId, midpointReadyEnrollments])

  function selectPlanParent(email) {
    const parent = parents.find((candidate) => candidate.email === email)
    const nextStudent = parent?.students?.[0]
    const assignedTutorId = nextStudent?.assigned_tutor_id || parent?.assigned_tutor?.split("|").at(-1)?.trim() || ""
    setParentEmail(email)
    setStudentId(nextStudent?.student_id || "")
    setTutorId(assignedTutorId && tutors.some((tutor) => tutor.tutor_id === assignedTutorId) ? assignedTutorId : "")
  }

  function selectPlanStudent(nextStudentId) {
    const student = students.find((candidate) => candidate.student_id === nextStudentId)
    setStudentId(nextStudentId)
    if (student?.assigned_tutor_id) {
      setTutorId(student.assigned_tutor_id)
    } else {
      const parent = parents.find((candidate) => candidate.email === parentEmail)
      const parentTutorId = parent?.assigned_tutor?.split("|").at(-1)?.trim() || ""
      setTutorId(parentTutorId && tutors.some((tutor) => tutor.tutor_id === parentTutorId) ? parentTutorId : "")
    }
  }

  function selectPlanDefinition(nextPlanId) {
    setPlanId(nextPlanId)
  }

  async function createEnrollment(event) {
    event.preventDefault()
    if (!selectedPlan || !selectedParent || !studentId || !tutorId) {
      setStatus(copy.planDetailsRequired)
      return
    }

    setIsSaving(true)
    setStatus("")
    setPaymentRequest(null)
    const result = await createPortalPlanEnrollment({
      token,
      values: {
        plan_id: selectedPlan.plan_id,
        parent_email: selectedParent.email,
        student_id: studentId,
        tutor_id: tutorId,
        status: isPack ? "pending" : "active",
        cadence,
        scheduled_weekday: hasScheduledCadence ? weekday : "",
        scheduled_time: hasScheduledCadence ? scheduledTime : "",
        timezone: "America/Toronto",
        start_at: new Date().toISOString(),
      },
    })

    if (result.ok || (isPack && result.code === "PLAN_ENROLLMENT_EXISTS" && result.enrollment_id)) {
      if (result.ok) {
        emitPortalTrackingEvent("methode:plan-enrollment-created", {
          source: "operator-portal",
          locale,
          plan_type: selectedPlan.plan_type || "",
          cadence: result.plan_enrollment?.cadence || cadence,
          status: result.plan_enrollment?.status || (isPack ? "pending" : "active"),
        })
      }

      if (isPack) {
        const paymentStage = selectedPlan.plan_id === "PLAN-PACK4-250"
          ? "momentum_initial"
          : selectedPlan.plan_id === "PLAN-PACK10-600"
            ? "progression_initial"
            : ""
        const paymentResult = paymentStage
          ? await createPortalPlanPaymentRequest({
              token,
              enrollmentId: result.enrollment_id,
              paymentStage,
            })
          : { ok: false, code: "PLAN_PAYMENT_STAGE_INVALID" }
        setIsSaving(false)
        if (!paymentResult.ok) {
          setStatus(getPortalErrorMessage(copy, paymentResult.code))
          onSaved?.()
          return
        }
        setPaymentRequest({
          ...paymentResult.payment,
          payment_url: getSafeHostedCheckoutUrl(paymentResult.checkout_url || paymentResult.payment_url || paymentResult.payment?.checkout_url || paymentResult.payment?.payment_url),
        })
        setStatus(copy.planPaymentRequestCreated)
      } else {
        setIsSaving(false)
        setStatus(copy.planEnrollmentSaved)
      }
      onSaved?.()
      return
    }

    setIsSaving(false)
    setStatus(getPortalErrorMessage(copy, result.code))
  }

  async function requestMidpointPayment(event) {
    event.preventDefault()
    if (!midpointEnrollmentId) {
      setStatus(copy.planPaymentStageNotReady)
      return
    }

    setIsSaving(true)
    setStatus("")
    setPaymentRequest(null)
    const result = await createPortalPlanPaymentRequest({
      token,
      enrollmentId: midpointEnrollmentId,
      paymentStage: "progression_midpoint",
    })
    setIsSaving(false)

    if (result.ok) {
      setPaymentRequest({
        ...result.payment,
        payment_url: getSafeHostedCheckoutUrl(result.checkout_url || result.payment_url || result.payment?.checkout_url || result.payment?.payment_url),
      })
      setStatus(copy.planPaymentRequestCreated)
      onSaved?.()
      return
    }

    setStatus(getPortalErrorMessage(copy, result.code))
  }

  async function adjustCredits(event) {
    event.preventDefault()
    const amount = Number(creditAmount)
    if (!creditReason.trim()) {
      setStatus(copy.planCreditReasonRequired)
      return
    }
    if (!adjustmentEnrollmentId || !Number.isInteger(amount) || !amount) {
      return
    }

    setIsSaving(true)
    setStatus("")
    const result = await adjustPortalPlanCredits({
      token,
      enrollmentId: adjustmentEnrollmentId,
      values: { available_delta: amount, entry_type: "adjustment", reason: creditReason },
    })
    setIsSaving(false)

    if (result.ok) {
      setCreditAmount("")
      setCreditReason("")
      setStatus(copy.planCreditSaved)
      onSaved?.()
      return
    }

    setStatus(getPortalErrorMessage(copy, result.code))
  }

  if (!plans.length) {
    return (
      <section className="panel-soft rounded-[24px] p-5 text-white">
        <h2 className="font-display text-3xl font-semibold">{copy.planSetupTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-white/58">{copy.planNoPlans}</p>
      </section>
    )
  }

  return (
    <section className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-start gap-3">
        <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c977]" />
        <div>
          <h2 className="font-display text-3xl font-semibold">{copy.planSetupTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-white/58">{copy.planSetupIntro}</p>
        </div>
      </div>

      <form onSubmit={createEnrollment} className="mt-5 space-y-3">
        <label className="block text-sm font-semibold text-white/84">
          {copy.planChoose}
          <select value={selectedPlan?.plan_id || ""} onChange={(event) => selectPlanDefinition(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
            {plans.map((plan) => <option key={plan.plan_id} value={plan.plan_id}>{plan.name} · {plan.price_cad} $</option>)}
          </select>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-white/84">
            {copy.planChooseParent}
            <select value={selectedParent?.email || ""} onChange={(event) => selectPlanParent(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
              {parents.map((parent) => <option key={parent.lead_id} value={parent.email}>{parent.parent_name || parent.email}</option>)}
            </select>
          </label>
          <label className="block text-sm font-semibold text-white/84">
            {copy.planChooseStudent}
            <select value={studentId} onChange={(event) => selectPlanStudent(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
              {students.map((student) => <option key={student.student_id} value={student.student_id}>{student.student_name}</option>)}
            </select>
          </label>
        </div>
        <label className="block text-sm font-semibold text-white/84">
          {copy.planChooseTutor}
          <select value={tutorId} disabled className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-70">
            <option value="">{copy.chooseTutor}</option>
            {tutors.filter((tutor) => tutor.tutor_id === tutorId).map((tutor) => <option key={tutor.tutor_id} value={tutor.tutor_id}>{tutor.tutor_name}</option>)}
          </select>
        </label>
        {isPack ? (
          <label className="block text-sm font-semibold text-white/84">
            {copy.planCadence}
            <select value={packCadence} onChange={(event) => setPackCadence(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
              {Object.entries(copy.planCadenceOptions).filter(([value]) => ["weekly", "biweekly"].includes(value)).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <span className="mt-2 block text-xs font-normal leading-5 text-white/52">{copy.planCadenceHelp}</span>
          </label>
        ) : null}
        {hasScheduledCadence ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <SelectField label={copy.planWeekday} value={weekday} options={["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]} onChange={setWeekday} />
            <label className="block text-sm font-semibold text-white/84">
              {copy.planTime}
              <Input type="time" value={scheduledTime} onChange={(event) => setScheduledTime(event.target.value)} required className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
            </label>
          </div>
        ) : null}
        <Button type="submit" disabled={isSaving || !parents.length || !students.length || !tutors.length} className="w-full rounded-full bg-[#f5c977] px-5 py-6 text-[#071631] hover:bg-[#f7d38f]">
          {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
          {copy.planActivate}
        </Button>
      </form>

      {paymentRequest ? (
        <div className="mt-5 rounded-2xl border border-[#f5c977]/22 bg-[#f5c977]/8 p-4">
          <h3 className="font-semibold text-white">{copy.planPaymentRequestTitle}</h3>
          <p className="mt-1 text-sm text-white/68">{paymentRequest.amount_cad} $ · {paymentRequest.offer}</p>
          <p className="mt-2 text-sm leading-6 text-white/68">{copy.planPaymentRequestCreated}</p>
          {paymentRequest.payment_url ? (
            <a href={paymentRequest.payment_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-semibold text-[#f5c977] underline underline-offset-4">
              {copy.planPaymentRequestOpen}
            </a>
          ) : null}
        </div>
      ) : null}

      <form onSubmit={requestMidpointPayment} className="mt-6 border-t border-white/10 pt-5">
        <h3 className="font-semibold text-white">{copy.planMidpointTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-white/58">{copy.planMidpointIntro}</p>
        {midpointReadyEnrollments.length ? (
          <>
            <label className="mt-3 block text-sm font-semibold text-white/84">
              {copy.planSelectEnrollment}
              <select value={midpointEnrollmentId} onChange={(event) => setMidpointEnrollmentId(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
                {midpointReadyEnrollments.map((enrollment) => <option key={enrollment.enrollment_id} value={enrollment.enrollment_id}>{enrollment.parent_name || enrollment.student_name || enrollment.enrollment_id}</option>)}
              </select>
            </label>
            <Button type="submit" disabled={isSaving || !midpointEnrollmentId} variant="outline" className="mt-3 rounded-full border-[#f5c977]/35 bg-[#f5c977]/8 text-[#f5c977] hover:bg-[#f5c977]/15 hover:text-[#f5c977]">
              {copy.planMidpointAction}
            </Button>
          </>
        ) : <p className="mt-3 text-sm text-white/52">{copy.planMidpointNone}</p>}
      </form>

      {packEnrollments.length ? (
        <form onSubmit={adjustCredits} className="mt-6 border-t border-white/10 pt-5">
          <h3 className="font-semibold text-white">{copy.planAdjustTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-white/58">{copy.planAdjustHelp}</p>
          <label className="mt-3 block text-sm font-semibold text-white/84">
            {copy.planSelectEnrollment}
            <select value={adjustmentEnrollmentId} onChange={(event) => setAdjustmentEnrollmentId(event.target.value)} className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
              {packEnrollments.map((enrollment) => <option key={enrollment.enrollment_id} value={enrollment.enrollment_id}>{enrollment.parent_name || enrollment.student_name || enrollment.enrollment_id} · {enrollment.credits_remaining} crédits</option>)}
            </select>
          </label>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-white/84">
              {copy.planCreditAmount}
              <Input value={creditAmount} onChange={(event) => setCreditAmount(event.target.value)} type="number" step="1" className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
            </label>
            <label className="block text-sm font-semibold text-white/84">
              {copy.planCreditReason}
              <Input value={creditReason} onChange={(event) => setCreditReason(event.target.value)} className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white" />
            </label>
          </div>
          <Button type="submit" disabled={isSaving || !adjustmentEnrollmentId || !creditAmount || !creditReason.trim()} variant="outline" className="mt-3 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            {copy.planAdjustTitle}
          </Button>
        </form>
      ) : null}
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </section>
  )
}

function BookingPanel({ copy, dashboard, locale, token, onSaved }) {
  const slots = dashboard.bookable_slots || []
  const students = dashboard.students || []
  const matching = dashboard.matching || {}
  const [studentId, setStudentId] = useState(students[0]?.student_id || "")
  const [studentName, setStudentName] = useState(dashboard.sessions?.[0]?.student_name || "")
  const [sessionType, setSessionType] = useState(dashboard.sessions?.length ? "weekly_follow_up" : "first_session")
  const [slotId, setSlotId] = useState("")
  const [paymentUrl, setPaymentUrl] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentDeadline, setPaymentDeadline] = useState("")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const selectedStudent = students.find((student) => student.student_id === studentId)
  const matchingTutorId = selectedStudent?.assigned_tutor_id || matching.tutor_id
  const visibleSlots = matchingTutorId ? slots.filter((slot) => slot.tutor_id === matchingTutorId) : []
  const selectedSlot = visibleSlots.find((slot) => slot.slot_id === slotId)
  const linkedPlanEnrollment = findPlanEnrollmentForBooking(dashboard, studentId, sessionType, matchingTutorId)
  const usesProgramCredit = linkedPlanEnrollment?.plan_type === "pack" && Number(linkedPlanEnrollment.credits_remaining) > 0

  useEffect(() => {
    if (students.length && !students.some((student) => student.student_id === studentId)) {
      setStudentId(students[0].student_id)
    }
  }, [studentId, students])

  useEffect(() => {
    if (selectedStudent?.student_name) {
      setStudentName(selectedStudent.student_name)
    }
    setSlotId("")
  }, [selectedStudent?.student_id])

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")

    const result = await bookPortalSession({
      token,
      values: {
        slot_id: slotId,
        student_id: studentId,
        student_name: studentName,
        session_type: sessionType,
        ...(linkedPlanEnrollment ? { plan_enrollment_id: linkedPlanEnrollment.enrollment_id } : {}),
      },
    })

    setIsSaving(false)
    if (result.ok) {
      emitPortalTrackingEvent("methode:session-confirmed", {
        source: "parent-portal",
        locale,
        session_type: sessionType,
        payment_mode: result.payment_mode || "",
      })
      const checkoutUrl = getSafeHostedCheckoutUrl(result.checkout_url || result.payment_url)
      setPaymentUrl(checkoutUrl)
      setPaymentAmount(result.amount_cad || "")
      setPaymentDeadline(result.checkout_expires_at || result.due_date || "")
      setStatus(result.payment_mode === "plan_credit" ? copy.bookingCreditSuccess : copy.bookingSuccess)
      setSlotId("")
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel-gold min-w-0 rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c977]" />
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-semibold">
            {matchingTutorId ? copy.bookingTitle : copy.matchingPendingTitle}
          </h2>
          <p className="mt-1 text-sm text-white/68">
            {matchingTutorId ? (usesProgramCredit ? copy.bookingCreditIntro : copy.bookingIntro) : copy.matchingPendingIntro}
          </p>
        </div>
      </div>

      {!matchingTutorId ? (
        <div className="mt-5 space-y-3">
          <p className="text-sm leading-7 text-white/68">{students.length ? copy.matchingPendingIntro : copy.bookingAddChild}</p>
          <a href={`tel:${siteConfig.phone}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#f5c977] hover:text-white">
            <Phone className="h-4 w-4" />
            {copy.matchingPendingCall}
          </a>
        </div>
      ) : visibleSlots.length ? (
        <>
          {students.length ? (
            <label className="mt-5 block text-sm font-semibold text-white/84">
              {copy.bookingChooseChild}
              <select value={studentId} onChange={(event) => setStudentId(event.target.value)} required className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white">
                {students.map((student) => <option key={student.student_id} value={student.student_id}>{student.student_name} | {student.student_level_subject || "-"}</option>)}
              </select>
            </label>
          ) : (
            <label className="mt-3 block text-sm font-semibold text-white/84">
              {copy.bookingStudentName}
              <Input value={studentName} onChange={(event) => setStudentName(event.target.value)} required className="mt-2 h-12 rounded-2xl border-white/15 bg-white/5 text-white" />
            </label>
          )}
          <BookableSlotCalendar copy={copy} slots={visibleSlots} selectedSlotId={slotId} onSelect={setSlotId} />
          <label className="mt-3 block text-sm font-semibold text-white/84">
            {copy.sessionType}
            <select
              value={sessionType}
              onChange={(event) => setSessionType(event.target.value)}
              className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
            >
              {["first_session", "weekly_follow_up", "exam_sprint", "catch_up", "one_time"].map((option) => (
                <option key={option} value={option}>{humanize(option)}</option>
              ))}
            </select>
          </label>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-[#f5c977]/18 bg-[#f5c977]/8 px-3 py-2.5 text-sm">
            <span className="text-white/64">{copy.bookingPrice}</span>
            <span className="font-semibold text-[#f8d58d]">
              {usesProgramCredit
                ? copy.bookingProgramCredit
                : `${getPaymentLinkDefaultAmountCad(sessionType)} $ CAD`}
            </span>
          </div>
          {usesProgramCredit ? (
            <p className="mt-2 text-xs leading-5 text-[#f8d58d]">{copy.bookingPlanCredit}</p>
          ) : null}
          {selectedSlot ? (
            <p className="mt-3 text-sm leading-6 text-white/68">
              {selectedSlot.tutor_name} | {humanize(selectedSlot.format || "online")}
              {selectedSlot.location ? ` | ${selectedSlot.location}` : ""}
            </p>
          ) : null}
          <Button
            type="submit"
            disabled={isSaving || !slotId}
            className="mt-4 w-full rounded-full bg-[#f5c977] px-5 py-6 text-[#071631] hover:bg-[#f7d38f]"
          >
            {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
            {isSaving ? copy.bookingLoading : (usesProgramCredit ? copy.bookWithProgramCredit : copy.bookSession)}
          </Button>
          <p className="mt-3 text-xs leading-5 text-white/58">{usesProgramCredit ? copy.bookingProgramCreditNotice : copy.bookingPaymentNotice}</p>
        </>
      ) : (
        <p className="mt-5 text-sm leading-7 text-white/68">{copy.bookingNoSlots}</p>
      )}

      {paymentUrl ? (
        <div className="mt-3">
          {paymentDeadline ? <p className="mb-2 text-xs leading-5 text-white/62">{copy.paymentDueOneHour} · {copy.paymentDueUntil} {formatDateTime(paymentDeadline)}</p> : null}
          <Button asChild className="w-full rounded-full bg-white text-[#071631] hover:bg-white/90">
            <a href={paymentUrl} target="_blank" rel="noreferrer">
              <CreditCard className="h-4 w-4" />
              {paymentAmount ? `${copy.pay} ${paymentAmount} $` : copy.pay}
            </a>
          </Button>
        </div>
      ) : null}
      {status ? <p className="mt-4 text-sm leading-6 text-white/76">{status}</p> : null}
    </form>
  )
}

function BookableSlotCalendar({ copy, slots = [], selectedSlotId, onSelect }) {
  const grouped = slots.reduce((all, slot) => {
    const date = coerceDate(slot.start_at)
    const key = date ? date.toLocaleDateString("en-CA") : slot.start_at
    all[key] = [...(all[key] || []), slot]
    return all
  }, {})

  return (
    <div className="mt-5">
      <div className="text-sm font-semibold text-white/84">{copy.chooseSlot}</div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {Object.entries(grouped).slice(0, 8).map(([dateKey, daySlots]) => (
          <div key={dateKey} className="rounded-[18px] border border-white/10 bg-white/5 p-3">
            <div className="text-sm font-semibold text-white">{formatCalendarDate(daySlots[0]?.start_at)}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {daySlots.map((slot) => (
                <Button
                  key={slot.slot_id}
                  type="button"
                  variant={selectedSlotId === slot.slot_id ? "default" : "outline"}
                  onClick={() => onSelect(slot.slot_id)}
                  className={selectedSlotId === slot.slot_id
                    ? "rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]"
                    : "rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"}
                >
                  {formatCalendarTime(slot.start_at)}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ParentFeedbackForm({ copy, dashboard, token, onSaved }) {
  const eligibleSessions = dashboard.feedback_eligible_sessions || []
  const [values, setValues] = useState({
    session_id: eligibleSessions[0]?.session_id || "",
    rating: "5",
    clarity_rating: "5",
    student_confidence: "steady",
    follow_up_needed: "no",
    comment: "",
  })
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const selectedSessionStillEligible = eligibleSessions.some((session) => session.session_id === values.session_id)
    if (!selectedSessionStillEligible && eligibleSessions[0]?.session_id) {
      setValues((current) => ({ ...current, session_id: eligibleSessions[0].session_id }))
    }
  }, [eligibleSessions, values.session_id])

  if (!eligibleSessions.length) {
    return null
  }

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")
    const result = await submitParentFeedback({ token, values })
    setIsSaving(false)

    if (result.ok) {
      setStatus(copy.feedbackSent)
      setValues((current) => ({ ...current, comment: "" }))
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-center gap-3">
        <Star className="h-5 w-5 text-[#f5c977]" />
        <h2 className="font-display text-3xl font-semibold">{copy.feedbackTitle}</h2>
      </div>
      <label className="mt-5 block text-sm font-semibold text-white/84">
        {copy.feedbackSession}
        <select
          value={values.session_id}
          onChange={(event) => updateValue("session_id", event.target.value)}
          className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
        >
          {eligibleSessions.map((session) => (
            <option key={session.session_id} value={session.session_id}>
              {formatDateTime(session.start_at)} | {session.tutor_name}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <SelectField label={copy.sessionRating} value={values.rating} options={["5", "4", "3", "2", "1"]} onChange={(value) => updateValue("rating", value)} />
        <SelectField label={copy.clarityRating} value={values.clarity_rating} options={["5", "4", "3", "2", "1"]} onChange={(value) => updateValue("clarity_rating", value)} />
        <SelectField label={copy.studentConfidence} value={values.student_confidence} options={confidenceOptions} onChange={(value) => updateValue("student_confidence", value)} />
        <SelectField label={copy.followUpNeeded} value={values.follow_up_needed} options={["no", "yes"]} onChange={(value) => updateValue("follow_up_needed", value)} />
      </div>
      <label className="mt-3 block text-sm font-semibold text-white/84">
        {copy.feedbackComment}
        <Textarea
          value={values.comment}
          onChange={(event) => updateValue("comment", event.target.value)}
          className="mt-2 min-h-24 rounded-2xl border-white/15 bg-white/5 text-white"
        />
      </label>
      <Button type="submit" disabled={isSaving} className="mt-4 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f]">
        {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {copy.submitFeedback}
      </Button>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </form>
  )
}

function ParentSessionNoteForm({ copy, dashboard, token, onSaved }) {
  const sessions = dashboard.sessions || []
  const [sessionId, setSessionId] = useState(dashboard.next_session?.session_id || sessions[0]?.session_id || "")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const selectedSession = sessions.find((session) => session.session_id === sessionId)

  if (!sessions.length) {
    return null
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")
    const result = await sendPortalSessionMessage({
      token,
      sessionId,
      message: [
        `${copy.sessionPrepTitle}${selectedSession ? ` · ${formatDateTime(selectedSession.start_at)}` : ""}`,
        message,
      ].filter(Boolean).join("\n\n"),
    })
    setIsSaving(false)

    if (result.ok) {
      setMessage("")
      setStatus(copy.sessionPrepSent)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel-soft min-w-0 rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex min-w-0 items-start gap-3">
        <MessageSquareText className="mt-0.5 h-5 w-5 shrink-0 text-[#f5c977]" />
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-semibold">{copy.sessionPrepTitle}</h2>
          <p className="mt-1 text-sm leading-6 text-white/58">{copy.sessionPrepIntro}</p>
        </div>
      </div>
      <label className="mt-5 block text-sm font-semibold text-white/84">
        {copy.parentNoteSession}
        <select
          value={sessionId}
          onChange={(event) => setSessionId(event.target.value)}
          required
          className="mt-2 h-12 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
        >
          {sessions.map((session) => (
            <option key={session.session_id} value={session.session_id}>
              {formatDateTime(session.start_at)} | {session.tutor_name}
            </option>
          ))}
        </select>
      </label>
      <Textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
        className="mt-3 min-h-24 rounded-2xl border-white/15 bg-white/5 text-white"
        placeholder={copy.sessionPrepMessage}
      />
      <Button type="submit" disabled={isSaving} className="mt-4 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f]">
        {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {copy.sendRequest}
      </Button>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </form>
  )
}

function TestDataCleanupPanel({ copy, records = [], token, onSaved }) {
  const [status, setStatus] = useState("")
  const [deletingId, setDeletingId] = useState("")
  const [isDeletingAll, setIsDeletingAll] = useState(false)

  async function removeRecord(record) {
    const confirmed = window.confirm(`${copy.deleteTest}: ${record.label}?`)
    if (!confirmed) {
      return
    }

    setDeletingId(record.record_id)
    setStatus("")
    const result = await deletePortalTestRecord({
      token,
      recordType: record.record_type,
      recordId: record.record_id,
    })
    setDeletingId("")

    if (result.ok) {
      setStatus(copy.testDeleted)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  async function removeAllRecords() {
    const confirmed = window.confirm(copy.deleteAllTestConfirm)
    if (!confirmed) {
      return
    }

    setIsDeletingAll(true)
    setStatus("")
    const result = await deletePortalTestRecords({ token, records })
    setIsDeletingAll(false)

    if (result.ok) {
      setStatus(result.skipped ? `${copy.testAllDeleted} ${result.skipped} ${copy.testRecordNotFound}` : copy.testAllDeleted)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  return (
    <section className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-center gap-3">
        <Trash2 className="h-5 w-5 text-[#f5c977]" />
        <h2 className="font-display text-3xl font-semibold">{copy.testData}</h2>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/58">{copy.testDataHelp}</p>
      {records.length ? (
        <Button type="button" disabled={isDeletingAll || Boolean(deletingId)} onClick={removeAllRecords} className="mt-4 rounded-full bg-red-400/20 text-red-50 hover:bg-red-400/30">
          {isDeletingAll ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          {copy.deleteAllTest}
        </Button>
      ) : null}
      <div className="mt-4 space-y-2">
        {records.length ? records.map((record) => (
          <div key={`${record.record_type}-${record.record_id}`} className="flex items-center justify-between gap-3 rounded-[14px] border border-white/10 bg-white/5 px-3 py-2">
            <div className="min-w-0 text-sm text-white/76">{record.label}</div>
            <Button
              type="button"
              disabled={isDeletingAll || deletingId === record.record_id}
              onClick={() => removeRecord(record)}
              title={copy.deleteTest}
              aria-label={copy.deleteTest}
              className="h-9 w-9 shrink-0 rounded-full bg-red-400/15 p-0 text-red-100 hover:bg-red-400/25"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )) : <p className="text-sm leading-7 text-white/60">{copy.noTestData}</p>}
      </div>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </section>
  )
}

function metricIconFor(key) {
  if (key.includes("payment")) return CreditCard
  if (key.includes("message")) return MessageSquareText
  if (key.includes("note")) return FileText
  if (key.includes("request") || key.includes("lead")) return ClipboardList
  if (key.includes("session") || key.includes("calendar")) return CalendarDays
  if (key.includes("tutor")) return UsersRound
  return CircleCheck
}

function MetricStrip({ metrics = {}, compact = false }) {
  const compactKeys = ["sessions", "payments_due", "messages_to_reply", "messages_waiting", "requests", "requests_open"]
  const entries = compact
    ? compactKeys
      .filter((key) => Object.prototype.hasOwnProperty.call(metrics, key))
      .map((key) => [key, metrics[key]])
      .filter(([key, value]) => key === "sessions" || Number(value) > 0)
      .slice(0, 4)
    : Object.entries(metrics)

  if (!entries.length) {
    return null
  }

  return (
    <section className="panel-soft min-w-0 overflow-hidden rounded-[22px] p-1 text-white">
      <div className={`grid gap-px overflow-hidden rounded-[18px] bg-white/10 ${entries.length === 1 ? "grid-cols-1" : "grid-cols-2"} ${compact ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {entries.map(([key, value]) => {
          const Icon = metricIconFor(key)
          return (
            <div key={key} className="min-w-0 bg-[#102341]/35 px-3 py-3 text-left sm:px-4 sm:py-4">
              <div className="flex min-w-0 items-center gap-2">
                <Icon className="h-3.5 w-3.5 shrink-0 text-[#f5c977]" />
                <div className="min-w-0 break-words text-[0.6rem] font-semibold uppercase leading-3 tracking-[0.07em] text-white/48 sm:text-xs sm:leading-normal sm:tracking-[0.14em]">{humanize(key)}</div>
              </div>
              <div className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{String(value || 0)}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function NextSessionCard({ copy, session, role, actionHref }) {
  const participant = role === "tutor"
    ? session?.student_name || session?.parent_name || session?.student_level_subject
    : session?.tutor_name || session?.format

  return (
    <div className="panel-gold rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <CalendarCheck className="h-5 w-5 shrink-0 text-[#f5c977]" />
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{copy.nextSession}</h2>
        </div>
        {session?.session_status ? <StatusPill value={session.session_status} /> : null}
      </div>
      {session ? (
        <div className="mt-4">
          <div className="text-lg font-semibold">{session.student_level_subject || session.session_type}</div>
          <div className="mt-2 text-sm leading-7 text-white/72">
            {formatDateTime(session.start_at)} · {participant || ""}
          </div>
          {(session.format || session.location) ? (
            <div className="mt-2 text-sm text-white/64">
              {session.format ? humanize(session.format) : ""}{session.format && session.location ? " · " : ""}{session.location || ""}
            </div>
          ) : null}
          {actionHref ? (
            <a href={actionHref} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/88 transition hover:bg-white/14 hover:text-white">
              {copy.manageSession}
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-sm leading-7 text-white/72">{copy.noNextSession}</p>
      )}
    </div>
  )
}

function RecordList({ icon: Icon, title, empty, records = [], render }) {
  return (
    <section className="panel-soft rounded-[24px] p-4 text-white sm:p-5">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-[#f5c977]" />
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
      </div>
      <div className="mt-5 space-y-3">
        {records.length ? records.map(render) : <p className="text-sm leading-7 text-white/60">{empty}</p>}
      </div>
    </section>
  )
}

function SessionRow({ copy, session, role, token, onSaved }) {
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showChange, setShowChange] = useState(false)
  const [changeMessage, setChangeMessage] = useState("")
  const [showReschedule, setShowReschedule] = useState(false)
  const [rescheduleStart, setRescheduleStart] = useState(() => toDateTimeLocal(session.start_at))
  const [rescheduleDuration, setRescheduleDuration] = useState(() => getSessionDurationMinutes(session))
  const canRespond = Boolean(role && token && ["requested", "proposed"].includes(session.session_status))
  const startsAt = coerceDate(session.start_at)
  const isOperator = role === "operator"
  const canCancel = Boolean(role && token && startsAt && startsAt.getTime() > Date.now() && ["proposed", "confirmed", "calendar_created"].includes(session.session_status))
  const canReschedule = Boolean(isOperator && token && startsAt && startsAt.getTime() > Date.now() && ["requested", "proposed", "confirmed", "calendar_created"].includes(session.session_status))
  const sessionParticipant = role === "tutor"
    ? session.parent_name || session.student_name
    : session.tutor_name || ""
  const isOnlineSession = session.format === "online"
  const meetUrl = isOnlineSession ? getSafeGoogleMeetUrl(session.google_meet_url) : ""
  const isMeetPending = isOnlineSession && session.calendar_conference_status === "pending" && !meetUrl

  async function respond(response) {
    setIsSaving(true)
    setStatus("")

    const result = await respondToPortalSession({
      role,
      token,
      sessionId: session.session_id,
      response,
      message: changeMessage,
    })

    setIsSaving(false)
    if (result.ok) {
      setStatus(response === "confirm" ? copy.sessionConfirmed : copy.sessionChangeRequested)
      setShowChange(false)
      setChangeMessage("")
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  async function cancelSession() {
    if (!window.confirm(isOperator ? copy.operatorCancellationConfirm : copy.cancellationPolicy)) {
      return
    }

    setIsSaving(true)
    setStatus("")
    const result = await cancelPortalSession({
      role,
      token,
      sessionId: session.session_id,
      reason: isOperator ? "Cancelled by the team in the portal." : "Cancellation requested in portal.",
    })
    setIsSaving(false)
    if (result.ok) {
      setStatus(result.cancellation_status === "cancelled"
        ? (isOperator ? copy.operatorCancellationConfirmed : copy.cancellationConfirmed)
        : copy.cancellationReview)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  async function rescheduleSession() {
    const nextStart = new Date(rescheduleStart)
    if (!rescheduleStart || Number.isNaN(nextStart.getTime())) {
      setStatus(copy.sessionDetailsRequired)
      return
    }

    setIsSaving(true)
    setStatus("")
    const result = await reschedulePortalSession({
      token,
      sessionId: session.session_id,
      startAt: nextStart.toISOString(),
      durationMinutes: Number(rescheduleDuration),
    })
    setIsSaving(false)
    if (result.ok) {
      setShowReschedule(false)
      setStatus(copy.sessionRescheduled)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  return (
    <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{session.student_level_subject || session.session_type}</div>
          <div className="mt-1 text-sm leading-6 text-white/64">{formatDateTime(session.start_at)}</div>
        </div>
        <StatusPill value={session.session_status} />
      </div>
      <div className="mt-3 grid gap-2 text-sm text-white/62 sm:grid-cols-2">
        <div>{session.student_name || session.parent_name || ""}</div>
        <div>{sessionParticipant}</div>
      </div>
      {(session.format || session.location) ? (
        <div className="mt-3 text-sm leading-6 text-white/62">
          {session.format ? humanize(session.format) : ""}{session.format && session.location ? " · " : ""}{session.location || ""}
        </div>
      ) : null}
      {isMeetPending ? (
        <div className="mt-3 flex items-center gap-2 text-sm text-[#f5c977]">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          {copy.meetPreparing}
        </div>
      ) : null}
      {meetUrl ? (
        <Button asChild variant="outline" className="mt-3 rounded-full border-[#f5c977]/35 bg-[#f5c977]/8 text-[#f5c977] hover:bg-[#f5c977]/15 hover:text-[#f5c977]">
          <a href={meetUrl} target="_blank" rel="noreferrer">
            <CalendarCheck className="h-4 w-4" />
            {copy.joinGoogleMeet}
          </a>
        </Button>
      ) : null}
      {(session.parent_confirmed_at || session.tutor_confirmed_at) ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {session.parent_confirmed_at ? <StatusPill value={copy.parentConfirmed} /> : null}
          {session.tutor_confirmed_at ? <StatusPill value={copy.tutorConfirmed} /> : null}
        </div>
      ) : null}
      {canRespond ? (
        <div className="mt-4 border-t border-white/10 pt-4">
          {!showChange ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                disabled={isSaving}
                onClick={() => respond("confirm")}
                className="w-full rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f] sm:w-auto"
              >
                <CircleCheck className="h-4 w-4" />
                {copy.confirmSession}
              </Button>
              <Button
                type="button"
                disabled={isSaving}
                onClick={() => setShowChange(true)}
                variant="outline"
                className="w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <CalendarClock className="h-4 w-4" />
                {copy.requestChange}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Textarea
                value={changeMessage}
                onChange={(event) => setChangeMessage(event.target.value)}
                required
                className="min-h-24 rounded-2xl border-white/15 bg-white/5 text-white"
                placeholder={copy.requestMessage}
              />
              <div className="flex flex-wrap gap-2">
                <Button type="button" disabled={isSaving || !changeMessage.trim()} onClick={() => respond("request_change")} className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
                  <ArrowRight className="h-4 w-4" />
                  {copy.sendRequest}
                </Button>
                <Button type="button" disabled={isSaving} onClick={() => setShowChange(false)} variant="outline" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  {copy.cancel}
                </Button>
              </div>
            </div>
          )}
          {!session.parent_confirmed_at || !session.tutor_confirmed_at ? (
            <p className="mt-3 text-sm text-white/56">{copy.confirmationWaiting}</p>
          ) : null}
        </div>
      ) : null}
      {canReschedule ? (
        <div className="mt-4 border-t border-white/10 pt-4">
          {!showReschedule ? (
            <Button
              type="button"
              disabled={isSaving}
              onClick={() => setShowReschedule(true)}
              variant="outline"
              className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Pencil className="h-4 w-4" />
              {copy.rescheduleSession}
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm font-semibold text-white/84">
                  {copy.rescheduleDate}
                  <Input
                    type="datetime-local"
                    value={rescheduleStart}
                    onChange={(event) => setRescheduleStart(event.target.value)}
                    className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white"
                  />
                </label>
                <label className="text-sm font-semibold text-white/84">
                  {copy.rescheduleDuration}
                  <Input
                    type="number"
                    min="30"
                    max="240"
                    step="15"
                    value={rescheduleDuration}
                    onChange={(event) => setRescheduleDuration(event.target.value)}
                    className="mt-2 h-11 rounded-2xl border-white/15 bg-white/5 text-white"
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" disabled={isSaving || !rescheduleStart} onClick={rescheduleSession} className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
                  {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  {copy.rescheduleSave}
                </Button>
                <Button type="button" disabled={isSaving} onClick={() => setShowReschedule(false)} variant="outline" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                  {copy.cancel}
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : null}
      {canCancel ? (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-sm leading-6 text-white/56">{isOperator ? copy.operatorCancellationConfirm : copy.cancellationPolicy}</p>
          <Button
            type="button"
            disabled={isSaving}
            onClick={cancelSession}
            variant="outline"
            className="mt-3 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <CalendarClock className="h-4 w-4" />
            {copy.cancelSession}
          </Button>
        </div>
      ) : null}
      {session.payment_status === "payment_requested" ? (
        <div className="mt-4 flex items-center gap-2 text-sm text-[#f5c977]">
          <CreditCard className="h-4 w-4" />
          {copy.paymentReady}
        </div>
      ) : null}
      {status ? <p className="mt-3 text-sm leading-6 text-white/68">{status}</p> : null}
    </div>
  )
}

function PaymentRow({ copy, locale, payment, token, onSaved }) {
  const [currentPayment, setCurrentPayment] = useState(payment)
  const isPaid = ["paid", "demo_paid", "waived"].includes(currentPayment.payment_status)
  const paymentUrl = getSafeHostedCheckoutUrl(currentPayment.checkout_url || currentPayment.payment_url)
  const isOverdue = currentPayment.payment_status === "overdue"
  const canReissue = isOverdue && Boolean(currentPayment.can_reissue)
  const isReleasedBooking = isOverdue && Boolean(currentPayment.session_id)
  const paymentLabel = locale === "en" ? currentPayment.display_name_en : currentPayment.display_name_fr
  const paymentAmount = payment.amount_cad ? formatCadAmount(payment.amount_cad, locale) : "—"
  const creditCount = Number(currentPayment.credit_unlock_count || 0)
  const creditText = creditCount > 0
    ? (locale === "en" ? `Unlocks ${creditCount} credits` : `Débloque ${creditCount} crédits`)
    : ""
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState("")
  const paymentDeadline = currentPayment.checkout_expires_at || currentPayment.due_date

  async function reissuePaymentCheckout() {
    if (!canReissue || !currentPayment.payment_id) {
      return
    }

    setIsSaving(true)
    setStatus("")
    const result = await reissuePortalPaymentCheckout({ token, paymentId: currentPayment.payment_id })
    setIsSaving(false)
    const checkoutUrl = getSafeHostedCheckoutUrl(result.checkout_url || result.payment_url)
    if (result.ok && checkoutUrl) {
      setCurrentPayment((current) => ({
        ...current,
        payment_status: "payment_requested",
        can_reissue: false,
        checkout_url: checkoutUrl,
        payment_url: checkoutUrl,
        checkout_expires_at: result.checkout_expires_at || result.due_date,
        due_date: result.checkout_expires_at || result.due_date,
      }))
      setStatus(copy.paymentReissueSuccess)
      onSaved?.()
      return
    }

    setStatus(getPortalErrorMessage(copy, result.code))
  }

  return (
    <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{paymentLabel || (locale === "en" ? "Tutoring session" : "Séance de tutorat")}</div>
          {creditText ? <div className="mt-1 text-sm text-[#f5c977]">{creditText}</div> : null}
          <div className="mt-1 text-sm text-white/64">
            {copy.amount}: {paymentAmount}
          </div>
        </div>
        <StatusPill value={currentPayment.payment_status || "not_requested"} />
      </div>
      {currentPayment.payment_status === "payment_requested" ? (
        <p className="mt-3 text-sm leading-6 text-[#f5c977]">
          {copy.paymentDueOneHour}{paymentDeadline ? ` · ${copy.paymentDueUntil} ${formatDateTime(paymentDeadline)}` : ""}
        </p>
      ) : null}
      {paymentUrl && !isPaid ? (
        <Button
          asChild
          className="mt-4 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f]"
        >
          <a href={paymentUrl} target="_blank" rel="noreferrer">
            <CreditCard className="h-4 w-4" />
            {copy.pay}
          </a>
        </Button>
      ) : null}
      {isOverdue ? (
        <div className="mt-4 rounded-2xl border border-[#f5c977]/20 bg-[#f5c977]/8 p-3 text-sm leading-6 text-white/76">
          <p>{copy.paymentLinkExpired}</p>
          {isReleasedBooking ? <p className="mt-2 text-white/62">{copy.bookingReleased}</p> : null}
          {canReissue ? (
            <Button type="button" disabled={isSaving} onClick={reissuePaymentCheckout} className="mt-3 rounded-full bg-[#f5c977] px-4 text-[#071631] hover:bg-[#f7d38f]">
              {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              {copy.requestNewPaymentLink}
            </Button>
          ) : null}
        </div>
      ) : null}
      {status ? <p className="mt-3 text-sm leading-6 text-white/68">{status}</p> : null}
    </div>
  )
}

function NoteRow({ note }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{note.subject_level || note.student_name || note.session_id}</div>
          <div className="mt-1 text-sm text-white/64">{formatDate(note.session_date || note.created_at)}</div>
        </div>
        <StatusPill value={note.risk_level || note.next_recommendation} />
      </div>
      {note.parent_summary ? <p className="mt-3 text-sm leading-7 text-white/72">{note.parent_summary}</p> : null}
      {note.homework_next ? (
        <p className="mt-3 rounded-2xl bg-white/5 px-3 py-2 text-sm leading-6 text-white/68">
          {note.homework_next}
        </p>
      ) : null}
      {note.next_goal ? <p className="mt-3 text-sm leading-6 text-white/68">{note.next_goal}</p> : null}
      {note.student_confidence ? <StatusPill value={note.student_confidence} /> : null}
    </div>
  )
}

function FeedbackRow({ feedback }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{feedback.tutor_name || feedback.parent_name || feedback.session_id}</div>
          <div className="mt-1 text-sm text-white/64">{formatDate(feedback.created_at)}</div>
        </div>
        <div className="inline-flex items-center gap-1 text-sm font-semibold text-[#f5c977]">
          <Star className="h-4 w-4 fill-current" />
          {feedback.rating || "-"}/5
        </div>
      </div>
      {feedback.comment ? <p className="mt-3 text-sm leading-7 text-white/72">{feedback.comment}</p> : null}
      {feedback.follow_up_needed === "yes" ? <StatusPill value="follow_up" /> : null}
    </div>
  )
}

function MessageRow({ message }) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-white/5 px-3 py-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/52">
        <span className="font-semibold text-white/82">{message.sender_name || humanize(message.sender_role)}</span>
        <span>{formatDateTime(message.created_at)}</span>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/72">{message.message}</p>
      {message.message_status ? <StatusPill value={message.message_status} /> : null}
    </div>
  )
}

function RequestRow({ request }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{request.subject || humanize(request.request_type)}</div>
          <div className="mt-1 text-sm text-white/52">{formatDate(request.created_at)}</div>
        </div>
        <StatusPill value={request.status} />
      </div>
      {request.message ? <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/72">{request.message}</p> : null}
      {request.owner ? <p className="mt-3 text-xs text-white/48">{request.owner}</p> : null}
    </div>
  )
}

function OperatorRequestRow({ copy, request, token, onSaved }) {
  const [nextStatus, setNextStatus] = useState(request.status || "new")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave() {
    setIsSaving(true)
    setStatus("")
    const result = await updatePortalRequestStatus({ token, requestId: request.request_id, status: nextStatus })
    setIsSaving(false)

    if (result.ok) {
      setStatus(copy.requestUpdated)
      onSaved?.()
    } else {
      setStatus(getPortalErrorMessage(copy, result.code))
    }
  }

  return (
    <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{request.subject || humanize(request.request_type)}</div>
          <div className="mt-1 text-sm text-white/52">{request.email || formatDate(request.created_at)}</div>
        </div>
        <StatusPill value={request.status} />
      </div>
      {request.message ? <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/72">{request.message}</p> : null}
      <div className="mt-4 flex flex-wrap items-end gap-3 border-t border-white/10 pt-4">
        <label className="min-w-40 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
          {copy.requestStatus}
          <select
            value={nextStatus}
            onChange={(event) => setNextStatus(event.target.value)}
            className="mt-2 h-10 w-full rounded-xl border border-white/15 bg-[#0b1b3a] px-3 text-sm normal-case tracking-normal text-white"
          >
            {["new", "in_review", "done", "closed"].map((option) => <option key={option} value={option}>{humanize(option)}</option>)}
          </select>
        </label>
        <Button type="button" disabled={isSaving || nextStatus === request.status} onClick={handleSave} className="rounded-full bg-[#f5c977] text-[#071631] hover:bg-[#f7d38f]">
          <CircleCheck className="h-4 w-4" />
          {copy.requestSave}
        </Button>
      </div>
      {status ? <p className="mt-3 text-sm leading-6 text-white/68">{status}</p> : null}
    </div>
  )
}

function ParentRequestForm({ copy, role, requestType = "parent_question", token, onSaved }) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")

    const result = await createPortalRequest({
      role,
      token,
      values: {
        request_type: requestType,
        subject,
        message,
      },
    })

    setIsSaving(false)
    if (result.ok) {
      setSubject("")
      setMessage("")
      setStatus(copy.requestSent)
      onSaved?.()
    } else {
      setStatus(copy.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-center gap-3">
        <MessageSquareText className="h-5 w-5 text-[#f5c977]" />
        <h2 className="font-display text-3xl font-semibold">{copy.requestTitle}</h2>
      </div>
      <Input
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        required
        className="mt-5 h-12 rounded-2xl border-white/15 bg-white/5 text-white"
        placeholder={copy.requestSubject}
      />
      <Textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
        className="mt-3 min-h-32 rounded-2xl border-white/15 bg-white/5 text-white"
        placeholder={copy.requestMessage}
      />
      <Button
        type="submit"
        disabled={isSaving}
        className="mt-4 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f]"
      >
        <ArrowRight className="h-4 w-4" />
        {copy.sendRequest}
      </Button>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </form>
  )
}

function TutorNoteForm({ copy, token, dashboard, onSaved }) {
  const defaultSessionId = dashboard.sessions_needing_notes?.[0]?.session_id || dashboard.sessions?.[0]?.session_id || ""
  const [values, setValues] = useState({
    session_id: defaultSessionId,
    attendance: "present",
    focus_worked: "",
    wins: "",
    stuck_points: "",
    homework_next: "",
    parent_summary: "",
    risk_level: "green",
    next_recommendation: "keep_weekly",
    student_confidence: "steady",
    next_goal: "",
  })
  const [status, setStatus] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const sessionOptions = useMemo(() => {
    const preferred = dashboard.sessions_needing_notes || []
    return preferred.length ? preferred : dashboard.sessions || []
  }, [dashboard.sessions, dashboard.sessions_needing_notes])

  useEffect(() => {
    if (!values.session_id && defaultSessionId) {
      setValues((current) => ({ ...current, session_id: defaultSessionId }))
    }
  }, [defaultSessionId, values.session_id])

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatus("")

    const result = await submitPortalSessionNote({ token, values })
    setIsSaving(false)

    if (result.ok) {
      setStatus([
        copy.noteSent,
        result.parent_update_sent ? copy.parentUpdateSent : "",
        result.next_session_id ? copy.nextSessionProposed : "",
      ].filter(Boolean).join(" "))
      setValues((current) => ({
        ...current,
        focus_worked: "",
        wins: "",
        stuck_points: "",
        homework_next: "",
        parent_summary: "",
        next_goal: "",
      }))
      onSaved?.()
    } else {
      setStatus(copy.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel-soft rounded-[24px] p-5 text-white">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-[#f5c977]" />
        <h2 className="font-display text-3xl font-semibold">{copy.noteTitle}</h2>
      </div>

      <select
        value={values.session_id}
        onChange={(event) => updateValue("session_id", event.target.value)}
        required
        className="mt-5 h-12 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm text-white"
      >
        <option value="">{copy.chooseSession}</option>
        {sessionOptions.map((session) => (
          <option key={session.session_id} value={session.session_id}>
            {formatDateTime(session.start_at)} · {session.student_level_subject || session.student_name}
          </option>
        ))}
      </select>

      <div className="mt-3 grid gap-3 sm:grid-cols-4">
        <SelectField label={copy.attendance} value={values.attendance} options={attendanceOptions} onChange={(value) => updateValue("attendance", value)} />
        <SelectField label={copy.riskLevel} value={values.risk_level} options={riskOptions} onChange={(value) => updateValue("risk_level", value)} />
        <SelectField label={copy.recommendation} value={values.next_recommendation} options={recommendationOptions} onChange={(value) => updateValue("next_recommendation", value)} />
        <SelectField label={copy.studentConfidence} value={values.student_confidence} options={confidenceOptions} onChange={(value) => updateValue("student_confidence", value)} />
      </div>

      <PortalTextarea label={copy.focusWorked} value={values.focus_worked} onChange={(value) => updateValue("focus_worked", value)} />
      <PortalTextarea label={copy.wins} value={values.wins} onChange={(value) => updateValue("wins", value)} />
      <PortalTextarea label={copy.stuckPoints} value={values.stuck_points} onChange={(value) => updateValue("stuck_points", value)} />
      <PortalTextarea label={copy.homeworkNext} value={values.homework_next} onChange={(value) => updateValue("homework_next", value)} />
      <PortalTextarea label={copy.nextGoal} value={values.next_goal} onChange={(value) => updateValue("next_goal", value)} />
      <PortalTextarea label={copy.parentSummary} value={values.parent_summary} onChange={(value) => updateValue("parent_summary", value)} />

      <Button
        type="submit"
        disabled={isSaving}
        className="mt-4 rounded-full bg-[#f5c977] px-5 text-[#071631] hover:bg-[#f7d38f]"
      >
        {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {copy.submitNote}
      </Button>
      {status ? <p className="mt-4 text-sm leading-6 text-white/68">{status}</p> : null}
    </form>
  )
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-2xl border border-white/15 bg-[#0b1b3a] px-3 text-sm normal-case tracking-normal text-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {humanize(option)}
          </option>
        ))}
      </select>
    </label>
  )
}

function PortalTextarea({ label, value, onChange }) {
  return (
    <label className="mt-3 block text-sm font-semibold text-white/84">
      {label}
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        className="mt-2 min-h-24 rounded-2xl border-white/15 bg-white/5 text-white"
      />
    </label>
  )
}

function StatusPill({ value }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/65">
      {humanize(value || "pending")}
    </span>
  )
}

function getParentOfferTitle(offer, locale = "fr") {
  if (!offer?.code) {
    return locale === "en" ? "Tutoring block" : "Bloc de tutorat"
  }

  return getPricingCopy(locale).offers[offer.code]?.title || (locale === "en" ? "Tutoring block" : "Bloc de tutorat")
}

function formatParentOfferSummary(offer, locale = "fr") {
  if (!offer) {
    return locale === "en" ? "Your tutoring format" : "Votre format de tutorat"
  }

  const title = getParentOfferTitle(offer, locale)
  const sessionLabel = locale === "en"
    ? `${offer.sessionCount} ${offer.sessionCount === 1 ? "session" : "sessions"} of ${offer.durationMinutes} minutes`
    : `${offer.sessionCount} ${offer.sessionCount === 1 ? "séance" : "séances"} de ${offer.durationMinutes} minutes`
  return `${title} · ${sessionLabel} · ${formatCadAmount(offer.totalPriceCad, locale)}`
}

function formatParentOfferPricing(offer, locale = "fr") {
  if (!offer) {
    return locale === "en" ? "Details confirmed with the team" : "Détails confirmés avec l'équipe"
  }

  const sessions = locale === "en"
    ? `${offer.sessionCount} ${offer.sessionCount === 1 ? "session" : "sessions"}`
    : `${offer.sessionCount} ${offer.sessionCount === 1 ? "séance" : "séances"}`
  const perSession = locale === "en"
    ? `${formatCadAmount(offer.perSessionPriceCad, locale)} per session`
    : `${formatCadAmount(offer.perSessionPriceCad, locale)} par séance`
  const payments = locale === "en"
    ? offer.installmentCount === 1
      ? `one payment of ${formatCadAmount(offer.installmentPriceCad, locale)}`
      : `${offer.installmentCount} payments of ${formatCadAmount(offer.installmentPriceCad, locale)}`
    : offer.installmentCount === 1
      ? `un paiement de ${formatCadAmount(offer.installmentPriceCad, locale)}`
      : `${offer.installmentCount} paiements de ${formatCadAmount(offer.installmentPriceCad, locale)}`
  return `${sessions} · ${formatCadAmount(offer.totalPriceCad, locale)} · ${perSession} · ${payments}`
}

function getProgramPendingText(offer, locale = "fr") {
  if (!offer) {
    return locale === "en" ? "The team confirms payment before activating the block's credits." : "L'équipe confirme le paiement avant d'activer les crédits du bloc."
  }

  const firstCreditCount = offer.code === "progression_block" ? 5 : offer.sessionCount
  return locale === "en"
    ? `The team confirms the ${formatCadAmount(offer.installmentPriceCad, locale)} payment, then activates ${firstCreditCount} credits before the first booking.`
    : `L'équipe confirme le paiement de ${formatCadAmount(offer.installmentPriceCad, locale)}, puis active ${firstCreditCount} crédits avant la première réservation.`
}

function getProgramCreditText(offer, locale = "fr") {
  const creditsPerPayment = offer?.code === "progression_block" ? 5 : Number(offer?.sessionCount || 0)
  const grantText = locale === "en"
    ? `${offer?.installmentCount === 1 ? "The verified payment grants" : "Each verified payment grants"} ${creditsPerPayment} credits.`
    : `${offer?.installmentCount === 1 ? "Le paiement vérifié accorde" : "Chaque paiement vérifié accorde"} ${creditsPerPayment} crédits.`
  const policyText = locale === "en"
    ? ` With ${pricing.cancellation.noticeHours} hours' notice, rescheduling is guaranteed; later requests are reviewed without automatically removing a credit.`
    : ` Avec ${pricing.cancellation.noticeHours} h de préavis, le report est garanti; sous ce délai, la demande est étudiée sans retirer automatiquement un crédit.`
  return `${grantText}${policyText}`
}

function findPlanEnrollmentForBooking(dashboard = {}, studentId = "", sessionType = "", tutorId = "") {
  const enrollments = Array.isArray(dashboard.plan_enrollments) ? dashboard.plan_enrollments : []
  const candidates = enrollments.filter((enrollment) => {
    if (!isPortalRecord(enrollment) || enrollment.status !== "active") {
      return false
    }
    if (studentId && enrollment.student_id && enrollment.student_id !== studentId) {
      return false
    }
    if (tutorId && String(enrollment.tutor_id || "") !== String(tutorId)) {
      return false
    }
    if (enrollment.plan_type === "pack" && Number(enrollment.credits_remaining) <= 0) {
      return false
    }

    const plan = isPortalRecord(enrollment.plan) ? enrollment.plan : {}
    const eligibleTypes = String(enrollment.eligible_session_types || plan.eligible_session_types || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
    return eligibleTypes.includes(sessionType)
  })

  return candidates.sort((left, right) => {
    const leftCanUseCredit = left.plan_type === "pack" && Number(left.credits_remaining) > 0
    const rightCanUseCredit = right.plan_type === "pack" && Number(right.credits_remaining) > 0
    return Number(rightCanUseCredit) - Number(leftCanUseCredit)
  })[0] || null
}

function getParentOfferSnapshot(dashboard = {}, preferredPlanType = "") {
  const sessions = Array.isArray(dashboard.sessions) ? dashboard.sessions : []
  const activeSessions = sessions
    .filter((session) => session && !["cancelled", "no_show", "completed"].includes(session.session_status))
    .sort((left, right) => String(left.start_at || "").localeCompare(String(right.start_at || "")))
  const nextSession = isPortalRecord(dashboard.next_session) ? dashboard.next_session : activeSessions[0] || null
  const isCurrentPlan = (candidate) => isPortalRecord(candidate) &&
    (!candidate.status || ["active", "pending", "paused"].includes(candidate.status))
  const enrollmentCandidates = [
    dashboard.plan_enrollment,
    dashboard.parent_plan?.plan_enrollment,
    ...(Array.isArray(dashboard.plan_enrollments) ? dashboard.plan_enrollments : []),
  ].filter(isCurrentPlan)
  const plan = (
    (preferredPlanType
      ? enrollmentCandidates.find((candidate) => candidate.plan_type === preferredPlanType)
      : null) ||
    enrollmentCandidates[0] ||
    [
      dashboard.parent_plan,
      dashboard.plan,
      dashboard.subscription,
      dashboard.membership,
      dashboard.progress_program,
      dashboard.program,
    ].find(isCurrentPlan)
  ) || {}
  const planDefinition = isPortalRecord(plan.plan) ? plan.plan : {}
  const planType = [
    plan.plan_type,
    planDefinition.plan_type,
    plan.type,
    plan.offer,
    plan.name,
    plan.plan_name,
    plan.status,
    dashboard.plan_type,
    dashboard.current_plan,
    dashboard.program_type,
    dashboard.program,
  ].filter((value) => typeof value === "string").join(" ").toLowerCase()
  const recordedCreditsTotal = firstPortalNumber(
    plan.credits_total,
    plan.total_credits,
    plan.sessions_total,
    dashboard.credits_total,
    dashboard.total_credits,
    dashboard.program_credits_total,
  )
  const creditsRemaining = firstPortalNumber(
    plan.credits_remaining,
    plan.remaining_credits,
    plan.sessions_remaining,
    dashboard.credits_remaining,
    dashboard.remaining_credits,
    dashboard.program_credits_remaining,
    dashboard.credits,
  )
  const planId = String(plan.plan_id || planDefinition.plan_id || "").trim()
  const legacyOfferCode = !planId
    ? [plan.offer, plan.plan_name, plan.name, dashboard.current_plan]
        .find((value) => ["progression_block_10", "weekly_follow_up_10"].includes(String(value || "").trim()))
    : ""
  const offer = getOfferByPlanId(planId) || (legacyOfferCode ? getOffer(legacyOfferCode) : null)
  const cadence = String(plan.cadence || planDefinition.cadence || "").toLowerCase()
  const hasProgram = Number(offer?.sessionCount || 0) > 1 ||
    /program|programme|pack|bundle|progression|progress/.test(planType) ||
    (recordedCreditsTotal !== null && recordedCreditsTotal > 0) ||
    (creditsRemaining !== null && creditsRemaining > 0)
  const isWeekly = !hasProgram && (
    ["weekly", "biweekly"].includes(cadence) ||
    /weekly|hebdo|follow[_\s-]?up|recurr/.test(planType) ||
    nextSession?.session_type === "weekly_follow_up"
  )
  const isRhythm = ["weekly", "biweekly"].includes(cadence) || isWeekly
  const isTargeted = !hasProgram && !isWeekly && ["one_time", "catch_up", "exam_sprint"].includes(nextSession?.session_type)
  const startsAt = coerceDate(nextSession?.start_at)
  const noticeHours = firstPortalNumber(
    plan.cancellation_notice_hours,
    planDefinition.cancellation_notice_hours,
  ) || pricing.cancellation.noticeHours
  const planDeadline = coerceDate(
    plan.next_change_deadline ||
    plan.modification_deadline_at ||
    plan.modification_window?.next_change_deadline ||
    plan.modification_window?.modification_deadline_at,
  )
  const creditsReady = hasProgram && recordedCreditsTotal !== null && recordedCreditsTotal > 0
  const catalogueCreditsTotal = offer?.sessionCount || recordedCreditsTotal
  const recordedCreditsUsed = firstPortalNumber(
    plan.credits_used,
    dashboard.credits_used,
    dashboard.program_credits_used,
  )

  return {
    nextSession,
    offer: offer || (!hasProgram ? getOfferByPlanId("PLAN-FIRST-60") : null),
    planId,
    hasProgram,
    creditsReady,
    creditsTotal: creditsReady ? Math.max(0, Math.round(catalogueCreditsTotal)) : null,
    creditsRemaining: creditsReady && creditsRemaining !== null ? Math.max(0, Math.round(creditsRemaining)) : null,
    creditsUsed: creditsReady
      ? Math.max(0, Math.round(recordedCreditsUsed ?? Math.max(0, recordedCreditsTotal - (creditsRemaining ?? recordedCreditsTotal))))
      : null,
    enrollmentId: plan.enrollment_id || "",
    enrollmentStatus: plan.status || "",
    planType: plan.plan_type || planDefinition.plan_type || "",
    cadence,
    isRhythm,
    eligibleSessionTypes: String(plan.eligible_session_types || planDefinition.eligible_session_types || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    changeDeadline: planDeadline || (startsAt
      ? new Date(startsAt.getTime() - noticeHours * 60 * 60 * 1000)
      : null),
    kind: hasProgram ? "program" : isWeekly ? "weekly" : isTargeted ? "targeted" : "first",
  }
}

function getPortalSessionMaterials(dashboard = {}, sessionId = "") {
  if (!sessionId) {
    return []
  }

  const sources = [
    dashboard.session_materials,
    dashboard.materials,
    dashboard.attachments,
    dashboard.documents,
  ]
  const materials = sources.find(Array.isArray) || []

  return materials
    .filter((material) => isPortalRecord(material))
    .filter((material) => material.session_id === sessionId)
    .slice(0, 5)
}

function isPortalRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function firstPortalNumber(...values) {
  for (const value of values) {
    if (typeof value !== "number" && typeof value !== "string") {
      continue
    }

    const parsed = Number(value)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return null
}

function formatDateTime(value) {
  const date = coerceDate(value)
  if (!date) {
    return value || "—"
  }

  return new Intl.DateTimeFormat(getPortalLocale(), {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

function formatDate(value) {
  const date = coerceDate(value)
  if (!date) {
    return value || "—"
  }

  return new Intl.DateTimeFormat(getPortalLocale(), {
    dateStyle: "medium",
  }).format(date)
}

function formatCalendarDate(value) {
  const date = coerceDate(value)
  if (!date) {
    return value || "—"
  }

  return new Intl.DateTimeFormat(getPortalLocale(), {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(date)
}

function formatCalendarDay(date) {
  return new Intl.DateTimeFormat(getPortalLocale(), {
    weekday: "short",
    day: "numeric",
  }).format(date)
}

function formatCalendarTime(value) {
  const date = coerceDate(value)
  if (!date) {
    return "—"
  }

  return new Intl.DateTimeFormat(getPortalLocale(), {
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

function isSameCalendarDay(left, right) {
  if (!left || !right) {
    return false
  }

  return left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
}

function coerceDate(value) {
  if (!value) {
    return null
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function toDateTimeLocal(value) {
  const date = coerceDate(value)
  if (!date) {
    return ""
  }

  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
  return local.toISOString().slice(0, 16)
}

function getSessionDurationMinutes(session) {
  const start = coerceDate(session.start_at)
  const end = coerceDate(session.end_at)
  if (!start || !end) {
    return "60"
  }

  return String(Math.max(30, Math.min(240, Math.round((end.getTime() - start.getTime()) / 60000) || 60)))
}

function buildStripePaymentUrl(paymentLink, paymentId) {
  if (!paymentLink || !paymentId) {
    return paymentLink || ""
  }

  try {
    const url = new URL(paymentLink)
    url.searchParams.set("client_reference_id", paymentId)
    return url.toString()
  } catch {
    return paymentLink
  }
}

function getSafeHostedCheckoutUrl(value) {
  try {
    const url = new URL(String(value || ""))
    return url.protocol === "https:" && url.hostname === "checkout.stripe.com" && url.pathname.startsWith("/c/")
      ? url.toString()
      : ""
  } catch {
    return ""
  }
}

function getSafeGoogleMeetUrl(value) {
  try {
    const url = new URL(String(value || ""))
    return url.protocol === "https:" && url.hostname === "meet.google.com" ? url.toString() : ""
  } catch {
    return ""
  }
}

function humanize(value = "") {
  const normalized = String(value).trim().toLowerCase()
  const locale = getPortalLocale().startsWith("fr") ? "fr" : "en"
  return portalLabels[locale][normalized] || normalized.replaceAll("_", " ")
}

function getPortalLocale() {
  if (typeof document !== "undefined" && document.documentElement.lang?.startsWith("en")) {
    return "en-CA"
  }

  return "fr-CA"
}

const portalLabels = {
  fr: {
    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",
    online: "En ligne",
    in_person: "En personne",
    either: "Au choix",
    open: "Ouvert",
    limited: "Limité",
    full: "Complet",
    paused: "En pause",
    requested: "Demandée",
    proposed: "Proposée",
    confirmed: "Confirmée",
    calendar_created: "Agenda créé",
    completed: "Terminée",
    cancelled: "Annulée",
    no_show: "Absence",
    payment_requested: "Paiement à régler",
    not_requested: "Non demandé",
    callback_needed: "Rappel à faire",
    waiting_parent: "En attente du parent",
    ready_to_match: "Prêt pour matching",
    demo_paid: "Paiement simulé",
    paid: "Payé",
    waived: "Annulé",
    awaiting_reply: "Réponse attendue",
    answered: "Répondu",
    overdue_alerted: "Équipe avisée",
    new: "Nouvelle",
    in_review: "En cours",
    done: "Terminée",
    closed: "Fermée",
    parent_question: "Question parent",
    parent_session_note: "Note parent",
    schedule_change: "Ajustement de séance",
    payment_question: "Question paiement",
    tutor_note: "Demande tuteur",
    technical_help: "Aide technique",
    tutor_access_request: "Accès tuteur",
    follow_up: "Suivi demandé",
    first_session: "Première séance",
    weekly_follow_up: "Séance du bloc de progression",
    exam_sprint: "Préparation examen",
    catch_up: "Mise à niveau",
    one_time: "Ponctuelle",
    present: "Présent",
    late: "En retard",
    green: "Bon suivi",
    watch: "À surveiller",
    high: "Prioritaire",
    lower: "En baisse",
    steady: "Stable",
    higher: "En hausse",
    sessions: "Séances",
    requests: "Demandes",
    notes: "Résumés",
    notes_submitted: "Notes envoyées",
    notes_due: "Notes à faire",
    messages_waiting: "Messages à répondre",
    messages_to_reply: "Messages à répondre",
    bookable_windows: "Créneaux ouverts",
    payments_due: "Paiements à régler",
    requests_open: "Demandes ouvertes",
    open_requests: "Demandes ouvertes",
    parents: "Parents",
    active_tutors: "Tuteurs actifs",
    sessions_to_confirm: "Séances à confirmer",
    parent_feedback: "Retours parents",
    messages_needing_reply: "Messages à répondre",
    average_rating: "Satisfaction moyenne",
    callbacks_to_make: "Rappels à faire",
    leads: "Demandes",
  },
  en: {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    online: "Online",
    in_person: "In person",
    either: "Either",
    open: "Open",
    limited: "Limited",
    full: "Full",
    paused: "Paused",
    requested: "Requested",
    proposed: "Proposed",
    confirmed: "Confirmed",
    calendar_created: "Calendar created",
    completed: "Completed",
    cancelled: "Cancelled",
    no_show: "No-show",
    payment_requested: "Payment due",
    not_requested: "Not requested",
    callback_needed: "Callback needed",
    waiting_parent: "Waiting for parent",
    ready_to_match: "Ready to match",
    demo_paid: "Simulated payment",
    paid: "Paid",
    waived: "Waived",
    awaiting_reply: "Reply needed",
    answered: "Answered",
    overdue_alerted: "Team alerted",
    new: "New",
    in_review: "In progress",
    done: "Done",
    closed: "Closed",
    parent_question: "Parent question",
    parent_session_note: "Parent note",
    schedule_change: "Session change",
    payment_question: "Payment question",
    tutor_note: "Tutor request",
    technical_help: "Technical help",
    tutor_access_request: "Tutor access",
    follow_up: "Follow-up needed",
    first_session: "First session",
    weekly_follow_up: "Progress-block session",
    exam_sprint: "Exam sprint",
    catch_up: "Catch-up",
    one_time: "One-time",
    present: "Present",
    late: "Late",
    green: "On track",
    watch: "Watch",
    high: "Priority",
    lower: "Lower",
    steady: "Steady",
    higher: "Higher",
    sessions: "Sessions",
    requests: "Requests",
    notes: "Summaries",
    notes_submitted: "Notes submitted",
    notes_due: "Notes due",
    messages_waiting: "Replies needed",
    messages_to_reply: "Replies needed",
    bookable_windows: "Bookable windows",
    payments_due: "Payments due",
    requests_open: "Open requests",
    open_requests: "Open requests",
    parents: "Parents",
    active_tutors: "Active tutors",
    sessions_to_confirm: "Sessions to confirm",
    parent_feedback: "Parent feedback",
    messages_needing_reply: "Replies needed",
    average_rating: "Average rating",
    callbacks_to_make: "Callbacks to make",
    leads: "Leads",
  },
}
