import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Add New Item</Button>
      </div>
      <Separator className="my-6" />
      
      <Tabs defaultValue="wardrobe" className="space-y-6">
        <TabsList>
          <TabsTrigger value="wardrobe">My Wardrobe</TabsTrigger>
          <TabsTrigger value="outfits">Outfit Recommendations</TabsTrigger>
          <TabsTrigger value="style">Style Advice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="wardrobe" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Clothing Items</CardTitle>
                <CardDescription>Manage your clothing collection</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {/* Sample items - replace with actual data */}
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md bg-muted" />
                      <div>
                        <p className="font-medium">Blue Denim Jacket</p>
                        <p className="text-sm text-muted-foreground">Casual</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md bg-muted" />
                      <div>
                        <p className="font-medium">Black T-Shirt</p>
                        <p className="text-sm text-muted-foreground">Basic</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Accessories</CardTitle>
                <CardDescription>Manage your accessories</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {/* Sample items - replace with actual data */}
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md bg-muted" />
                      <div>
                        <p className="font-medium">Silver Watch</p>
                        <p className="text-sm text-muted-foreground">Formal</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md bg-muted" />
                      <div>
                        <p className="font-medium">Leather Belt</p>
                        <p className="text-sm text-muted-foreground">Casual</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Shoes</CardTitle>
                <CardDescription>Manage your footwear</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {/* Sample items - replace with actual data */}
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md bg-muted" />
                      <div>
                        <p className="font-medium">White Sneakers</p>
                        <p className="text-sm text-muted-foreground">Casual</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md bg-muted" />
                      <div>
                        <p className="font-medium">Black Oxfords</p>
                        <p className="text-sm text-muted-foreground">Formal</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="outfits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Recommendations</CardTitle>
              <CardDescription>AI-generated outfit suggestions based on your style</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Sample outfit - replace with actual data */}
                <div className="space-y-4">
                  <h3 className="font-medium">Casual Day Out</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="aspect-square rounded-md bg-muted" />
                    <div className="aspect-square rounded-md bg-muted" />
                    <div className="aspect-square rounded-md bg-muted" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perfect for a casual day out with friends. Combines comfort with style.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Business Casual</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="aspect-square rounded-md bg-muted" />
                    <div className="aspect-square rounded-md bg-muted" />
                    <div className="aspect-square rounded-md bg-muted" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Professional yet comfortable for the office. Maintains a polished look.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="style" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Style Insights</CardTitle>
              <CardDescription>Personalized style advice and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium">Your Style Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on your wardrobe, you tend to prefer classic pieces with modern touches.
                    Your color palette is primarily neutral with occasional bold accents.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Recommendations</h3>
                  <ul className="mt-2 list-disc pl-4 text-sm text-muted-foreground">
                    <li>Consider adding more layering pieces for versatility</li>
                    <li>Your wardrobe could benefit from more statement accessories</li>
                    <li>Try incorporating more texture through knitwear and fabrics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 