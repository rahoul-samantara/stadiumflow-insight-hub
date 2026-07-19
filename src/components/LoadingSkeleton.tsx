import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8 w-full">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2 mb-2" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <Skeleton className="h-5 w-1/4" />
          </CardHeader>
          <CardContent className="pl-2">
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="ml-4 space-y-1">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px] mt-1" />
                  </div>
                  <Skeleton className="ml-auto h-4 w-[50px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col h-full gap-4 p-4 w-full">
      <div className="flex-1 space-y-6 overflow-y-auto pr-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${
              i % 2 === 0 ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            <Skeleton
              className={`h-4 w-[200px] ${i % 2 === 0 ? "bg-primary-foreground/20" : ""}`}
            />
            <Skeleton
              className={`h-4 w-[150px] ${i % 2 === 0 ? "bg-primary-foreground/20" : ""}`}
            />
          </div>
        ))}
      </div>
      <div className="flex w-full items-center space-x-2 pt-4 border-t">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
}

export function NavigationSkeleton() {
  return (
    <div className="flex h-14 items-center justify-between border-b px-4 lg:px-6 w-full">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-5 w-[120px] hidden md:block" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}
