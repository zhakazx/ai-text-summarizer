'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/components/ui/copy-button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FileText, Loader2 } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function Home() {
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [format, setFormat] = useState('short-paragraph')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize')
      return
    }

    setIsLoading(true)
    setError('')
    setSummary('')

    // Convert hyphenated format to underscore format for API
    const formatMap: Record<string, string> = {
      'short-paragraph': 'short_paragraph',
      'detailed-paragraph': 'detailed_paragraph',
      'bulleted-key-points': 'bulleted'
    }
    const apiFormat = formatMap[format] || format

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, format: apiFormat }),
      })

      if (!response.ok) {
        throw new Error('Failed to summarize text')
      }

      const data = await response.json()
      setSummary(data.summary)
    } catch (err) {
      setError('Failed to summarize text. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background dark:from-slate-900 dark:to-slate-800">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="text-primary">
                AI Text Summarizer
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform long text into concise, meaningful summaries using advanced AI technology
            </p>
          </div>
        </div>

        {/* Controls Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-muted/20 shadow-lg">
            <CardContent>
              <div className="flex flex-col justify-center items-center space-y-6">
                <div>
                  <p className="text-sm text-center text-muted-foreground mb-2">Choose summary formats</p>
                  <RadioGroup value={format} onValueChange={setFormat} className="flex flex-wrap justify-center gap-2">
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="short-paragraph" id="short-paragraph" />
                        <Label htmlFor="short-paragraph" className="cursor-pointer font-medium">Short Paragraph</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="detailed-paragraph" id="detailed-paragraph" />
                        <Label htmlFor="detailed-paragraph" className="cursor-pointer font-medium">Detailed Paragraph</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="bulleted-key-points" id="bulleted-key-points" />
                        <Label htmlFor="bulleted-key-points" className="cursor-pointer font-medium">Bulleted Key Points</Label>
                      </div>
                  </RadioGroup>
                </div>
                <div className="w-full flex justify-center">
                  <Button 
                    onClick={handleSummarize} 
                    disabled={isLoading || !text.trim()}
                    className="w-full max-w-sm bg-primary text-foregroundhover:primary/70 shadow-lg hover:shadow-xl transition-all duration-200 transform"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Summarizing...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-5 w-5" />
                        Summarize
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-1">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <FileText className="h-5 w-5 text-foreground" />
                </div>
                <span className="font-bold">
                  Input Text
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Enter the text you want to summarize..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] resize-none border-2 border-muted-foreground/20 bg-background/50 focus:border-none"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${text.length > 0 ? 'bg-primary animate-pulse' : 'bg-gray-300'}`}></div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {text.length} characters
                    </span>
                  </div>
                  {error && (
                    <span className="text-destructive text-sm font-medium bg-destructive/10 px-2 py-1 rounded">
                      {error}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-1">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary transition-transform">
                    <FileText className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="font-bold">
                    Summary
                  </span>
                </div>
                {summary && (
                  <div className="flex items-center gap-2">
                    <CopyButton text={summary} />
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {summary ? (
                <div className="relative">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed min-h-[300px] p-4 bg-background/50 backdrop-blur-sm rounded-lg border">
                      {summary}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/10">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <FileText className="h-16 w-16 mx-auto opacity-30" />
                    </div>
                    <div>
                      <p className="font-medium">Ready for your summary</p>
                      <p className="text-sm opacity-75">Add some text and click summarize</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
