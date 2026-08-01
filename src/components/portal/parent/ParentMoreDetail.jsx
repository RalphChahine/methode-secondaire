import PortalDetailPanel from "@/components/portal/shared/PortalDetailPanel"

export default function ParentMoreDetail({ title, description, onBack, children }) {
  return <PortalDetailPanel title={title} description={description} onBack={onBack}>{children}</PortalDetailPanel>
}
