import {
  convertToModelMessages,
  createIdGenerator,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { getGame, listMessages, saveMessages } from "@/lib/games/queries"

export async function POST(req: Request) {
  // `id` is the game id, `message` is the latest message from useChat
  const { id, message }: { id: string; message?: UIMessage } = await req.json()

  // getGame scopes the lookup to the active organization
  const game = await getGame(id)
  if (!game) {
    return new Response("Not found", { status: 404 })
  }

  const history = await listMessages(game.id)

  // Persist the new user message before streaming, so it survives a failed reply
  if (
    message?.role === "user" &&
    !history.some((stored) => stored.id === message.id)
  ) {
    await saveMessages(game.id, [message])
    history.push(message)
  }

  const result = streamText({
    model: anthropic("claude-sonnet-5"),
    messages: await convertToModelMessages(history),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: history,
      generateMessageId: createIdGenerator({ prefix: "msg", size: 16 }),
      onEnd: async ({ messages }) => {
        await saveMessages(game.id, messages)
      },
    }),
  })
}
