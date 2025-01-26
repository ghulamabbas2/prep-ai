import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type StatsProps = {
  date: string;
  totalInterviews: number;
  completedQuestion: number;
  unasweredQuestion: number;
  completionRate: number;
};

const DashboardStatsChart = ({ stats }: { stats: StatsProps[] }) => {
  const sortedStats = stats.sort(
    (a, b) => new Date(a.date)?.getTime() - new Date(b.date)?.getTime()
  );
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={sortedStats}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          label={{ value: "Date", position: "insideBottom", offset: -5 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="totalInterviews"
          fill="#8884d8"
          name={"Total Interviews"}
        />
        <Bar
          dataKey="completedQuestion"
          fill="#ffc658"
          name={"Completed Questions"}
        />
        <Bar
          dataKey="unasweredQuestion"
          fill="#82ca9d"
          name={"Unaswered Questions"}
        />
        <Bar
          dataKey="completionRate"
          fill="#ff7300"
          name={"Completion Rate %"}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardStatsChart;
