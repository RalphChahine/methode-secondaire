import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"

export default function TutorSessionDetail({ copy, session, onBack, children }) {
  return (
    <PortalDetailPanel
      title={copy.manageSession}
      description={session?.student_name || session?.student_level_subject || copy.studentName}
      onBack={onBack}
      backLabel={copy.back}
    >
      {children}
    </PortalDetailPanel>
  )
}
