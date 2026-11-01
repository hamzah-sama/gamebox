import { Appsidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Appsidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
