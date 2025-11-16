import { Task, TaskPriority, TaskStatus } from "@/types/task";

export const weekdayNames: string[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export const defaultFormState: Task = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  priority: TaskPriority.Low,
  date: "",
  status: TaskStatus.Todo,
};
