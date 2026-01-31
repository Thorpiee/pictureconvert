"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, CheckCircle, Mail } from "lucide-react"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We're a small team, but we're here to help.
            </p>
          </div>

          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Send a Message</CardTitle>
              <CardDescription>
                We usually reply within 24-48 hours. No tickets, just email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. We'll be in touch soon.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help?"
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Or email us directly at{" "}
              <a href="mailto:support@pictureconvert.com" className="text-primary hover:underline font-medium">
                support@pictureconvert.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
