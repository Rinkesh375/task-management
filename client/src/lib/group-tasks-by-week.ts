"use client";
import type { TaskWithID} from "@/types/task";


export function groupTasksByWeek(tasks: TaskWithID[]) {
  let totalTasks = 0;
  let completedTasks = 0;
  tasks.forEach((t) => {
    totalTasks++;
    if (t.status === "Completed") completedTasks++;
  });

  return {
    tasksWeeklyProgoress:
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100),
    left: totalTasks - completedTasks,
    completedTasks,
    totalTasks,
  };
}
