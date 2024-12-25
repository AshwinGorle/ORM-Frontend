import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const ShimmerBlock = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
)

const BillShimmer = () => {
  return (
    <div className="flex h-screen">
      {/* Bill Card Shimmer */}
      <div className="w-1/2 p-4 self-center">
        <Card className="w-full max-w-md mx-auto shadow-lg">
          <CardHeader className="space-y-2">
            <ShimmerBlock className="h-6 w-3/4 mx-auto" />
            <ShimmerBlock className="h-4 w-1/2 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <ShimmerBlock className="h-4 w-1/4" />
              <ShimmerBlock className="h-4 w-1/4" />
            </div>
            <ShimmerBlock className="h-px w-full" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <ShimmerBlock className="h-4 w-1/3" />
                  <ShimmerBlock className="h-4 w-1/6" />
                  <ShimmerBlock className="h-4 w-1/6" />
                </div>
              ))}
            </div>
            <ShimmerBlock className="h-px w-full" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <ShimmerBlock className="h-4 w-1/4" />
                  <ShimmerBlock className="h-4 w-1/6" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex-col items-center space-y-2">
            <ShimmerBlock className="h-6 w-1/4" />
            <ShimmerBlock className="h-4 w-1/2" />
          </CardFooter>
        </Card>
      </div>

      {/* Bill Editor Shimmer */}
      <div className="w-1/2 border-l">
        <Card className="h-screen">
          <CardHeader>
            <ShimmerBlock className="h-6 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <ShimmerBlock className="h-4 w-1/4" />
              <ShimmerBlock className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <ShimmerBlock className="h-4 w-1/4" />
              <ShimmerBlock className="h-10 w-full" />
            </div>
            <div className="space-y-4">
              <ShimmerBlock className="h-4 w-1/4" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center space-x-2">
                    <ShimmerBlock className="h-10 w-1/3" />
                    <ShimmerBlock className="h-10 w-1/4" />
                    <ShimmerBlock className="h-10 w-1/4" />
                    <ShimmerBlock className="h-10 w-1/12" />
                  </div>
                ))}
              </div>
              <ShimmerBlock className="h-10 w-1/4" />
            </div>
          </CardContent>
          <CardFooter>
            <ShimmerBlock className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default BillShimmer
