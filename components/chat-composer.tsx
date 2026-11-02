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
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"
import { createGame } from "@/lib/games/action"

interface Props {
  // when set, the composer sends a chat message instead of creating a new game
  onSend?: (text: string) => void
  disabled?: boolean
}

export const ChatComposer = ({ onSend, disabled }: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!onSend) return

    event.preventDefault()
    const form = event.currentTarget
    const text = String(new FormData(form).get("prompt") ?? "").trim()
    if (!text || disabled) return

    onSend(text)
    form.reset()
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <form action={onSend ? undefined : createGame} onSubmit={handleSubmit}>
        <ComposerFields busy={disabled} />
      </form>
    </div>
  )
}

const models = ["Kimi 3", "Claude Opus 5", "Gpt-5", "Gemini 3 Pro"]

// Rendered inside the <form> so useFormStatus can see the pending createGame action.
const ComposerFields = ({ busy }: { busy?: boolean }) => {
  const { pending } = useFormStatus()
  const isBusy = pending || busy

  // Enter submits, Shift+Enter adds a new line
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault()
      if (!isBusy) event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <InputGroup className="bg-popover" aria-busy={isBusy}>
      <InputGroupTextarea
        name="prompt"
        required
        // readOnly (not disabled) so the value is still submitted with the form
        readOnly={pending}
        placeholder="Describe the game you want to build..."
        rows={1}
        onKeyDown={handleKeyDown}
        className="field-sizing-content max-h-48 min-h-10 read-only:opacity-60"
      />
      <InputGroupAddon align="block-end">
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={pending}
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
        {pending && (
          <span className="ml-auto text-xs text-muted-foreground">
            Creating your game…
          </span>
        )}
        <Button
          className={pending ? "rounded-full" : "ml-auto rounded-full"}
          size="icon-lg"
          type="submit"
          disabled={isBusy}
          aria-label={isBusy ? "Sending" : "Send"}
        >
          {isBusy ? <Spinner /> : <ArrowUpIcon />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}
