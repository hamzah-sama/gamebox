import { useEffect } from "react"
import Image from "next/image"
import type { ChatStatus, UIMessage } from "ai"
import { Message, MessageAvatar, MessageContent } from "./ui/message"
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerButton,
  MessageScrollerViewport,
  useMessageScroller,
} from "./ui/message-scroller"
import { Bubble, BubbleContent } from "./ui/bubble"

interface Props {
  messages: UIMessage[]
  status: ChatStatus
  error?: Error
}

const getText = (message: UIMessage) =>
  message.parts.map((part) => (part.type === "text" ? part.text : "")).join("")

const Avatar = () => (
  <MessageAvatar className="size-8 self-start rounded-lg bg-transparent">
    <Image
      src="/logo.svg"
      height={32}
      width={32}
      alt="logo"
      className="size-8"
    />
  </MessageAvatar>
)

// Jumps to the bottom whenever the user sends a new message, even if they had scrolled up.
const ScrollOnSend = ({ messages }: { messages: UIMessage[] }) => {
  const { scrollToEnd } = useMessageScroller()
  const lastUserMessageId = messages.findLast(
    (message) => message.role === "user"
  )?.id

  useEffect(() => {
    if (lastUserMessageId) scrollToEnd({ behavior: "smooth" })
  }, [lastUserMessageId, scrollToEnd])

  return null
}

export const ChatThread = ({ messages, status, error }: Props) => {
  // show a placeholder until the first token of the reply arrives
  const isWaiting =
    status === "submitted" ||
    (status === "streaming" && messages.at(-1)?.role !== "assistant")

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* autoScroll keeps following the streamed reply while the user is at the bottom */}
      <MessageScrollerProvider autoScroll defaultScrollPosition="end">
        <ScrollOnSend messages={messages} />
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="mx-auto w-full max-w-3xl px-4 py-8">
              {messages.map((message) => (
                <MessageScrollerItem key={message.id} messageId={message.id}>
                  <Message
                    align={message.role === "assistant" ? "start" : "end"}
                  >
                    {message.role === "assistant" && <Avatar />}
                    <MessageContent>
                      <Bubble
                        variant={
                          message.role === "user" ? "secondary" : "ghost"
                        }
                        align={message.role === "user" ? "end" : "start"}
                      >
                        <BubbleContent className="whitespace-pre-wrap">
                          {getText(message)}
                        </BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
              {isWaiting && (
                <MessageScrollerItem messageId="pending">
                  <Message align="start">
                    <Avatar />
                    <MessageContent>
                      <Bubble variant="ghost" align="start">
                        <BubbleContent className="animate-pulse text-muted-foreground">
                          Thinking…
                        </BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              )}
              {error && (
                <p className="text-center text-sm text-destructive">
                  Something went wrong. Please try again.
                </p>
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}
