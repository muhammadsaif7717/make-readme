import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"

export function AppSidebar() {
  return (
    <Sidebar className="mt-19.25">
      <SidebarHeader />
      <SidebarContent>
        <Button>Click me</Button>
        <Button>Click me</Button>
        <SidebarGroup />
        <Button>Click me</Button>
        <Button>Click me</Button>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}