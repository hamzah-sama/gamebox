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
import { CoinsIcon, SquarePenIcon } from "lucide-react"
import { Empty, EmptyDescription } from "./ui/empty"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Organization } from "@clerk/nextjs/server"

export const Appsidebar = ({
  ...Props
}: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname()

  return (
    <Sidebar {...Props}>
      <SidebarHeader className="flex-row items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
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
            <Empty className="border p-4">
              <EmptyDescription className="text-xs">
                Your games will live here
              </EmptyDescription>
            </Empty>
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
        <div className="flex items-center justify-center gap-2">
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
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
