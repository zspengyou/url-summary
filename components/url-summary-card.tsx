"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SummaryResponse {
  summary: string;
  error?: string;
}

export function URLSummaryCard() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<string | null>(null)

  const handleSubmit = async () => {
    // Reset states
    setError(null)
    setSummary(null)
    setLoading(true)

    try {
      const response = await fetch(
        "https://5dgnllzm6imhiiqcpajvwescum0rgotx.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: SummaryResponse = await response.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setSummary(data.summary)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get summary")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>URL Summary</CardTitle>
        <CardDescription>
          Enter a URL to get a summary of its content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input 
              placeholder="https://example.com" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <Button 
              onClick={handleSubmit} 
              disabled={loading || !url}
            >
              {loading ? "Summarizing..." : "Summarize"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: This tool provides a brief summary and may not capture all details from the webpage.
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {summary && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Summary:</h3>
            <p className="text-sm">{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 