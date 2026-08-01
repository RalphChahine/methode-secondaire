import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"

export default function TutorSchedule({ copy, calendar, availabilityPanel }) {
  return (
    <PortalDetailPanel title={copy.calendarTitle} description={copy.tutorScheduleIntro}>
      {calendar}
      {availabilityPanel}
    </PortalDetailPanel>
  )
}
