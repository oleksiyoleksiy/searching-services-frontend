import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type Option = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
}: MultiSelectProps) {
  const [input, setInput] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleRemove = (value: string) => {
    onChange(selected.filter((v) => v !== value))
  }

  const handleSelect = (value: string) => {
    if (!selected.includes(value)) {
      onChange([...selected, value])
    }
    setInput("")
  }

  const filtered = options.filter(
    (o) =>
      o.label.toLowerCase().includes(input.toLowerCase()) &&
      !selected.includes(o.value)
  )

  React.useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  return (
    <div className="w-full" ref={containerRef}>
      <div
        className={cn(
          "flex min-h-[42px] w-full flex-wrap items-center rounded-md border border-input bg-background px-2 py-1 text-sm focus-within:ring-2 focus-within:ring-ring"
        )}
        onClick={() => setOpen(true)}
      >
        {selected.map((val) => {
          const label = options.find((o) => o.value === val)?.label ?? val
          return (
            <div
              key={val}
              className="m-1 flex items-center rounded bg-muted px-2 py-0.5 text-xs"
            >
              {label}
              <button
                type="button"
                onClick={() => handleRemove(val)}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )
        })}
        <input
          type="text"
          className="flex-1 border-none bg-transparent p-1 outline-none placeholder:text-muted-foreground"
          placeholder={selected.length === 0 ? placeholder : ""}
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-sm shadow z-50">
          {filtered.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                handleSelect(option.value)
                setOpen(true)
              }}
              className="cursor-pointer px-3 py-2 hover:bg-accent"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
