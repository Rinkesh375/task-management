"use client";

import { Card, CardContent } from "@/components/ui/card";
import { weekdayNames } from "@/lib/constant";
import { cn } from "@/lib/utils";
import TaskCompleteIcon from "../icons/task-complete";
import TaskPendingIcon from "../icons/task-pending";

export default function WeekCard({
  weekStartISO,
  open,
  closed,
  active = false,
  tasksWeeklyProgoress,
  totalTasks,
  fetchTasks,
}: {
  weekStartISO: string;
  open: number;
  closed: number;
  active?: boolean;
  tasksWeeklyProgoress: number;
  totalTasks: number;
  fetchTasks: (query:string) => Promise<void>;
}) {
  const weekStart = new Date(weekStartISO);
  const days: { label: string; date: Date; isToday: boolean }[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);

    days.push({
      date: d,
      label: weekdayNames[i],
      isToday: new Date().toDateString() === d.toDateString(),
    });
  }

  return (
    <div className="min-w-[250px] flex flex-col">
      <Card className={" rounded-xl shadow-none"}>
        <CardContent className="p-4">
          <div className="flex justify-between text-xs text-gray-500 mb-4">
            {days.map((day, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-1",
                  day.isToday && " font-semibold bg-blue-700 text-white"
                )}
              >
                <span>{day.label}</span>

                <div className="w-7 h-7 flex items-center justify-center  text-sm">
                  {day.date.getDate()}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 rounded-lg ">
            <div className="p-4 bg-blue-50 border-r">
              <div className="flex items-center gap-2">
                <TaskCompleteIcon className="h-6 w-6" />
                <span className="text-gray-700 font-medium">Task Complete</span>
              </div>
              <div className="mt-2 text-3xl font-bold text-blue-700">
                {closed}
              </div>
              <div className="text-xs text-gray-500">This Week</div>
            </div>

            <div className="p-4 bg-red-50">
              <div className="flex items-center gap-2">
                <TaskPendingIcon className="h-6 w-6" />
                <span className="text-gray-700 font-medium">Task Pending</span>
              </div>
              <div className="mt-2 text-3xl font-bold text-red-700">{open}</div>
              <div className="text-xs text-gray-500">This Week</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {!!totalTasks && (
        <div className="w-full mt-4">
          <h2 className="font-semibold text-lg mb-2">Weekly Progress</h2>

          <div className="w-full h-6 rounded bg-blue-100 overflow-hidden">
            <div
              className="h-full bg-dark-blue transition-all duration-300"
              style={{ width: `${tasksWeeklyProgoress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
