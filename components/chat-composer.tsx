import {
  ArrowUpIcon,
  BrushIcon,
  CarIcon,
  ChevronDownIcon,
  CrosshairIcon,
  Gamepad2Icon,
  GripIcon,
  PickaxeIcon,
  PlaneIcon,
  ZapIcon,
} from "lucide-react"
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
export const ChatComposer = () => {
  const models = ["Kimi 3", "Claude Opus 5", "Gpt-5", "Gemini 3 Pro"]
  const suggestions = [
    { label: "Voxel survival", icon: PickaxeIcon },
    { label: "Ink samurai duel", icon: BrushIcon },
    { label: "Comic-book firefight", icon: ZapIcon },
    { label: "Realistic battlefield", icon: PlaneIcon },
    { label: "First-fight shooter", icon: CrosshairIcon },
    { label: "Jungle expedition drive", icon: CarIcon },
    { label: "Sunny kingdom platformer", icon: Gamepad2Icon },
  ]
  return (
    <div className="flex w-full flex-col gap-6">
      <InputGroup className="bg-popover">
        <InputGroupTextarea
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
          <Button className="ml-auto rounded-full" size="icon-lg">
            <ArrowUpIcon />
          </Button>
        </InputGroupAddon>
      </InputGroup>

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
    </div>
  )
}
