"use client"

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
import { createGame } from "@/lib/games/action"

interface Props {
  // when set, the composer sends a chat message instead of creating a new game
  onSend?: (text: string) => void
  disabled?: boolean
}

export const ChatComposer = ({ onSend, disabled }: Props) => {
  const models = ["Kimi 3", "Claude Opus 5", "Gpt-5", "Gemini 3 Pro"]

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!onSend) return

    event.preventDefault()
    const form = event.currentTarget
    const text = String(new FormData(form).get("prompt") ?? "").trim()
    if (!text || disabled) return

    onSend(text)
    form.reset()
  }

  // Enter submits, Shift+Enter adds a new line
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <form action={onSend ? undefined : createGame} onSubmit={handleSubmit}>
        <InputGroup className="bg-popover">
          <InputGroupTextarea
            name="prompt"
            required
            placeholder="Describe the game you want to build..."
            rows={1}
            onKeyDown={handleKeyDown}
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
              disabled={disabled}
            >
              <ArrowUpIcon />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  )
}
