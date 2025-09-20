import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="py-16 sm:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="h-12 w-32 mx-auto mb-6" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
          </div>
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-80" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-36" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </section>

      {/* Featured Event Skeleton */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card className="lg:col-span-2">
              <div className="grid gap-0 lg:grid-cols-2">
                <Skeleton className="aspect-video lg:aspect-square" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                  <div className="space-y-2 mb-6">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-10 w-24" />
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Events Grid Skeleton */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-24 mb-8" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="aspect-video" />
                <CardHeader className="p-4">
                  <Skeleton className="h-6 w-20 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
