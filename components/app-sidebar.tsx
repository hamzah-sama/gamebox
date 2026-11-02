"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuBadge,
} from "./ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { CoinsIcon, MessageSquareIcon, SquarePenIcon } from "lucide-react"
import { Empty, EmptyDescription } from "./ui/empty"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import type { Game } from "@/lib/db/schema"

interface Props extends React.ComponentProps<typeof Sidebar> {
  games: Game[]
}

export const Appsidebar = ({ games, ...Props }: Props) => {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...Props}>
      <SidebarHeader className="flex-row items-center justify-between group-data-[collapsible=icon]:justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 group-data-[collapsible=icon]:hidden"
        >
          <Image
            src="/logo.svg"
            alt="logo"
            height={20}
            width={20}
            className="size-5"
          />
          <span className="font-logo text-base">Gamebox</span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === "/"}
                render={<Link href="/" />}
              >
                <SquarePenIcon />
                <span>New Game</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Games</SidebarGroupLabel>
          <SidebarGroupContent>
            {games.length === 0 ? (
              <Empty className="border p-2 group-data-[collapsible=icon]:hidden">
                <EmptyDescription className="text-xs">
                  Your games will live here
                </EmptyDescription>
              </Empty>
            ) : (
              <SidebarMenu className="group-data-[collapsible=icon]:hidden">
                {games.map((game) => (
                  <SidebarMenuItem key={game.id}>
                    <SidebarMenuButton
                      isActive={pathname === `/game/${game.id}`}
                      render={<Link href={`/game/${game.id}`} />}
                    >
                      {game.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
            <SidebarMenu className="hidden group-data-[collapsible=icon]:flex">
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MessageSquareIcon />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <CoinsIcon />
              <span>Credits</span>
            </SidebarMenuButton>
            <SidebarMenuBadge>$1.00</SidebarMenuBadge>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center justify-center gap-2 px-2 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <OrganizationSwitcher
              appearance={{
                elements: {
                  rootBox: "w-full! max-w-full",
                  organizationSwitcherTrigger:
                    "w-full! max-w-full justify-between!",
                  organizationPreview: "min-w-0",
                  organizationPreviewTextContainer: "min-w-0",
                  organizationPreviewMainIdentifier: "truncate",
                },
              }}
            />
          </div>
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
