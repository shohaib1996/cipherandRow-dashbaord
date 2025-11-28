import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const statsData = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    change: "+12.5%",
    trend: "up",
    trendText: "Trending up this month",
    description: "Visitors for the last 6 months",
  },
  {
    title: "New Customers",
    value: "1,234",
    change: "-20%",
    trend: "down",
    trendText: "Down 20% this period",
    description: "Acquisition needs attention",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    change: "+12.5%",
    trend: "up",
    trendText: "Strong user retention",
    description: "Engagement exceed targets",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    change: "+4.5%",
    trend: "up",
    trendText: "Steady performance increase",
    description: "Meets growth projections",
  },
];

export function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div
              className={`flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${
                stat.trend === "up"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{stat.change}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="mt-4 flex items-center space-x-2">
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <p className="text-sm font-medium leading-none">
                {stat.trendText}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
