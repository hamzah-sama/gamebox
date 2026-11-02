import { auth } from "@clerk/nextjs/server"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Image from "next/image"
import { ChatComposer } from "@/components/chat-composer"
import { ChatSuggestions } from "@/components/chat-suggestions"

const Page = async () => {
  await auth.protect({ unauthenticatedUrl: "/sign-in" })
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6">
      <Empty className="flex-none">
        <EmptyHeader>
          <EmptyMedia>
            <Image src="/logo.svg" alt="logo" height={48} width={48} />
          </EmptyMedia>
          <EmptyTitle className="text-2xl">
            What shoud we build today?
          </EmptyTitle>
          <EmptyDescription>
            Build your own racer, shooters, puzzles and whole worlds using your
            own words. If you can describe it, you can play it.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-2xl">
          <ChatComposer />
          <ChatSuggestions />
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default Page
