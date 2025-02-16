"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function URLSummaryCard() {
  const [url, setUrl] = useState("")

  const handleSubmit = async () => {
    // TODO: Implement API call to get summary
    console.log("Summarizing URL:", url)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>URL Summary</CardTitle>
        <CardDescription>
          Enter a URL to get a summary of its content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input 
              placeholder="https://example.com" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={handleSubmit}>Summarize</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: This tool provides a brief summary and may not capture all details from the webpage.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 