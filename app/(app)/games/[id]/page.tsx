import { notFound } from "next/navigation"
import { GameChat } from "@/components/game-chat"
import { getGame } from "@/lib/games/queries"

interface Props {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
  const { id } = await params
  const game = await getGame(id)

  if (!game) {
    notFound()
  }

  return (
    <div className="flex h-svh flex-col py-4">
      <GameChat
        key={game.id}
        gameId={game.id}
        initialMessages={game.messages}
      />
    </div>
  )
}

export default Page
