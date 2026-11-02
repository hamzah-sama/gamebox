"use client"

import { useEffect, useRef } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { ChatThread } from "./chat-tread"
import { ChatComposer } from "./chat-composer"

interface Props {
  gameId: string
  initialMessages: UIMessage[]
}

export const GameChat = ({ gameId, initialMessages }: Props) => {
  const { messages, sendMessage, regenerate, status, error } = useChat({
    id: gameId,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      // history lives in the database, so only the newest message is sent
      prepareSendMessagesRequest: ({ id, messages }) => ({
        body: { id, message: messages.at(-1) },
      }),
    }),
  })

  // A new game starts with only the user's prompt; ask the AI to answer it once.
  const hasRequestedReply = useRef(false)
  useEffect(() => {
    if (hasRequestedReply.current) return
    hasRequestedReply.current = true
    if (initialMessages.at(-1)?.role === "user") {
      regenerate()
    }
  }, [initialMessages, regenerate])

  const isBusy = status === "submitted" || status === "streaming"

  return (
    <>
      <ChatThread messages={messages} status={status} error={error} />
      <div className="relative shrink-0">
        {/* fades messages out as they scroll beneath the composer */}
        <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-linear-to-t from-background to-transparent" />
        <div className="mx-auto w-full max-w-3xl px-4 pb-4">
          <ChatComposer
            onSend={(text) => sendMessage({ text })}
            disabled={isBusy}
          />
        </div>
      </div>
    </>
  )
}
