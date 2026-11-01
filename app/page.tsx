import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Image from "next/image"

export default function Page() {
  return (
    <Empty className="flex min-h-svh">
      <EmptyHeader>
        <EmptyMedia>
          <Image src="/logo.svg" alt="logo" height={48} width={48} />
        </EmptyMedia>
        <EmptyTitle className="text-2xl">What shoud we build today?</EmptyTitle>
        <EmptyDescription>
          Build your own racer, shooters, puzzles and whole worlds using your own
          words. If you can describe it, you can play it.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
