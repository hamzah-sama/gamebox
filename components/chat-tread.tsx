import Image from "next/image"
import { Message, MessageAvatar, MessageContent } from "./ui/message"
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "./ui/message-scroller"
import { Bubble, BubbleContent } from "./ui/bubble"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}
export const ChatThread = () => {
  const messages: Message[] = [
    {
      id: "1",
      role: "user",
      content: "Hello, how are you?",
    },
    {
      id: "2",
      role: "assistant",
      content: "I'm doing great! How can I help you today?",
    },
    {
      id: "3",
      role: "user",
      content: "Can you explain what React is?",
    },
    {
      id: "4",
      role: "assistant",
      content: "React is a JavaScript library for building user interfaces.",
    },
    {
      id: "5",
      role: "user",
      content: "What are React components?",
    },
    {
      id: "6",
      role: "assistant",
      content:
        "Components are reusable pieces of UI that you can compose to build an application.",
    },
    {
      id: "7",
      role: "user",
      content: "What is the difference between props and state?",
    },
    {
      id: "8",
      role: "assistant",
      content:
        "Props are data passed from a parent component, while state is data managed internally by a component.",
    },
    {
      id: "9",
      role: "user",
      content: "Can you give me a simple example?",
    },
    {
      id: "10",
      role: "assistant",
      content:
        "Sure! A button component can receive its label through props and manage its click count using state.",
    },
  ]

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <MessageScrollerProvider>
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="mx-auto w-full max-w-3xl px-4 py-8">
              {messages.map((message) => (
                <MessageScrollerItem key={message.id} messageId={message.id}>
                  <Message
                    align={message.role === "assistant" ? "start" : "end"}
                  >
                    {message.role === "assistant" && (
                      <MessageAvatar className="size-8 self-start rounded-lg bg-transparent">
                        <Image
                          src="/logo.svg"
                          height={32}
                          width={32}
                          alt="logo"
                          className="size-8"
                        />
                      </MessageAvatar>
                    )}
                    <MessageContent>
                      <Bubble
                        variant={
                          message.role === "user" ? "secondary" : "ghost"
                        }
                        align={message.role === "user" ? "end" : "start"}
                      >
                        <BubbleContent>{message.content}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}
