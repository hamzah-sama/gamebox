import { ChatComposer } from "@/components/chat-composer"
import { ChatThread } from "@/components/chat-tread"

interface Props {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
  const { id } = await params
  return (
    <div className="flex h-svh flex-col py-4">
      <ChatThread />
      <div className="relative shrink-0">
        {/* fades messages out as they scroll beneath the composer */}
        <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-linear-to-t from-background to-transparent" />
        <div className="mx-auto w-full max-w-3xl px-4 pb-4">
          <ChatComposer />
        </div>
      </div>
    </div>
  )
}

export default Page
