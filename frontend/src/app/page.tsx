import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-8 px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Your AI-Powered Personal Stylist
        </h1>
        <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
          Get personalized outfit recommendations, style advice, and wardrobe management powered by AI.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-muted/50 py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>AI Outfit Recommendations</CardTitle>
                <CardDescription>
                  Get personalized outfit suggestions based on your style preferences and occasion.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your wardrobe and suggests perfect combinations for any event.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wardrobe Management</CardTitle>
                <CardDescription>
                  Organize and track your clothing items with ease.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Keep track of your clothes, accessories, and outfits in one place.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Style Advice</CardTitle>
                <CardDescription>
                  Get expert fashion advice tailored to your personal style.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Receive tips and suggestions to enhance your fashion choices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center space-y-8 px-4 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Ready to Transform Your Style?
        </h2>
        <p className="max-w-[600px] text-lg text-muted-foreground">
          Join thousands of users who have already discovered their perfect style with ClosetGPT.
        </p>
        <Button size="lg" asChild>
          <Link href="/signup">Start Your Style Journey</Link>
        </Button>
      </section>
    </div>
  );
}
