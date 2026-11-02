import { suggestions } from "@/lib/games/suggestions"
import { Button } from "./ui/button"

export const ChatSuggestions = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.label}
          variant="outline"
          size="sm"
          className="rounded-full font-normal text-muted-foreground"
        >
          <suggestion.icon />
          {suggestion.label}
        </Button>
      ))}
    </div>
  )
}
