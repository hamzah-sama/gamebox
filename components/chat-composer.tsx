import { ArrowUpIcon, ChevronDownIcon, GripIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group"
import { Button } from "./ui/button"
import { createGame, sendMessage } from "@/lib/games/action"

interface Props {
  // when set, the composer adds a message to this game instead of creating a new one
  gameId?: string
}

export const ChatComposer = ({ gameId }: Props) => {
  const models = ["Kimi 3", "Claude Opus 5", "Gpt-5", "Gemini 3 Pro"]

  return (
    <div className="flex w-full flex-col gap-6">
      <form action={gameId ? sendMessage.bind(null, gameId) : createGame}>
        <InputGroup className="bg-popover">
          <InputGroupTextarea
            name="prompt"
            required
            placeholder="Describe the game you want to build..."
            rows={1}
            className="field-sizing-content max-h-48 min-h-10"
          />
          <InputGroupAddon align="block-end">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <InputGroupButton>
                    <GripIcon />
                    Kimi 3
                    <ChevronDownIcon />
                  </InputGroupButton>
                }
              />
              <DropdownMenuContent>
                {models.map((model) => (
                  <DropdownMenuItem key={model}>{model}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="ml-auto rounded-full"
              size="icon-lg"
              type="submit"
            >
              <ArrowUpIcon />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  )
}
