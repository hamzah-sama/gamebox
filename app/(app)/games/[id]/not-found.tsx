import Link from "next/link"
import { Gamepad2Icon, SquarePenIcon } from "lucide-react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4">
      <Empty className="flex-none">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="size-12 rounded-xl">
            <Gamepad2Icon className="size-6" />
          </EmptyMedia>
          <EmptyTitle className="text-2xl">Game not found</EmptyTitle>
          <EmptyDescription>
            This game doesn&apos;t exist, was deleted, or belongs to another
            organization. Check the active organization or start to create a new game.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button nativeButton={false} render={<Link href="/" />}>
            <SquarePenIcon />
            Create a new Game
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default NotFound
