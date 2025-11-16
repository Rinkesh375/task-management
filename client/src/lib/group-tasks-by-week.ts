"use client";
import type { TaskGroups, TaskWithID, WeekEntry } from "@/types/task";
import { startOfWeekISO } from "./week-utils";

export function groupTasksByWeek(tasks: TaskWithID[]) {
  const groups: TaskGroups = {};
  let totalTasks = 0;
  let completedTasks = 0;
  tasks.forEach((t) => {
    const key = startOfWeekISO(new Date(t.date));
    totalTasks++;
    if (t.status === "Completed") completedTasks++;
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });

  const weekEntries: WeekEntry[] = Object.entries(groups).sort(
    (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
  );

  return {
    weekEntries,
    groups,
    tasksWeeklyProgoress:
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100),
    totalTasks,
  };
}
