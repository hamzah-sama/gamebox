import Image from "next/image"

// Pixel blocks that hop in sequence, like a tiny game boot screen.
const delays = ["0ms", "150ms", "300ms", "450ms"]

const Loading = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-svh flex-col items-center justify-center gap-6 p-4"
    >
      <div className="relative flex size-16 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-2xl bg-primary/10 animation-duration-[1.6s]" />
        <div className="relative flex size-16 items-center justify-center rounded-2xl border bg-popover shadow-sm">
          <Image src="/logo.svg" alt="" width={32} height={32} />
        </div>
      </div>

      <div className="flex h-6 items-end gap-1.5" aria-hidden>
        {delays.map((delay) => (
          <span
            key={delay}
            className="size-2.5 animate-bounce rounded-[3px] bg-primary/80"
            style={{ animationDelay: delay }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-sm font-medium">Loading your game</p>
        <p className="text-xs text-muted-foreground">
          Getting everything ready…
        </p>
      </div>
    </div>
  )
}

export default Loading
