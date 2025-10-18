"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  text: string
}

export function CopyButton({ text, className, ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon-sm"
      onClick={handleCopy}
      className={cn("shrink-0", className)}
      {...props}
    >
      {copied ? (
        <Check className="h-3 w-3 text-green-600" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
      <span className="sr-only">
        {copied ? "Copied!" : "Copy to clipboard"}
      </span>
    </Button>
  )
}