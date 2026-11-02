import { Appsidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { listGames } from "@/lib/games/queries"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const games = await listGames() // Assuming ListGames is imported and available in this context
  return (
    <SidebarProvider>
      <Appsidebar games={games} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
