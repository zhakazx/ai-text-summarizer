export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-16">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>© 2025 AI Text Summarizer. All rights reserved.</p>
          <p>
            Created with ❤️ by{" "}
            <a 
              href="https://github.com/ZhakaZx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline transition-colors"
            >
              Zhaka Hidayat Yasir (ZhakaZx)
            </a>
          </p>
          <p className="text-xs">
            Free AI-powered text summarization tool for everyone
          </p>
        </div>
      </div>
    </footer>
  )
}