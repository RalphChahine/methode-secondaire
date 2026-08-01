import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"

export default function ParentSessionDetail({ copy, session, onBack, children }) {
  return (
    <PortalDetailPanel
      title={copy.sessionRecapTitle}
      description={session?.student_name || session?.student || copy.studentName}
      onBack={onBack}
    >
      {children}
    </PortalDetailPanel>
  )
}
