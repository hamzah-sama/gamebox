"use client"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gamepad2Icon } from "lucide-react"
import { cn } from "cn"
import type { GameSummary } from "@/lib/db/schema"

interface Props {
  children: React.ReactElement
  games: GameSummary[]
}

export const GamePopOver = ({ children, games }: Props) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={children} />
      <PopoverContent side="right" className="w-60 gap-1 p-1.5" align='end'>
        <p className="px-2 pt-1 pb-1.5 text-xs font-medium text-muted-foreground">
          Recent Games
        </p>
        {games.length === 0 ? (
          <p className="px-2 pb-2 text-xs text-muted-foreground">
            Your games will live here
          </p>
        ) : (
          // h-8 per item + gap-0.5 → 5 items = 5 * 2rem + 4 * 0.125rem = 10.5rem
          <div className="flex max-h-[10.5rem] flex-col gap-0.5 overflow-y-auto overscroll-contain scrollbar-thin">
            {games.map((game) => {
              const isActive = pathname === `/games/${game.id}`
              return (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group/game flex h-8 shrink-0 items-center gap-2 rounded-md px-2 text-muted-foreground transition-all duration-150 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none",
                    isActive && "bg-accent font-medium text-accent-foreground"
                  )}
                >
                  <Gamepad2Icon
                    className={cn(
                      "size-4 shrink-0 opacity-60 transition-all duration-150 group-hover/game:scale-110 group-hover/game:text-primary group-hover/game:opacity-100",
                      isActive && "text-primary opacity-100"
                    )}
                  />
                  <span className="truncate transition-transform duration-150 group-hover/game:translate-x-0.5">
                    {game.title}
                  </span>
                </Link>
              )
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
