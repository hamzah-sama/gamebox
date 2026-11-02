import { notFound } from "next/navigation"
import { GameChat } from "@/components/game-chat"
import { getGame, listMessages } from "@/lib/games/queries"

interface Props {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
  const { id } = await params
  const game = await getGame(id)

  if (!game) {
    notFound()
  }

  const messages = await listMessages(game.id)

  return (
    <div className="flex h-svh flex-col py-4">
      <GameChat key={game.id} gameId={game.id} initialMessages={messages} />
    </div>
  )
}

export default Page
