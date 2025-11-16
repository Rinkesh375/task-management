export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum TaskStatus {
  Todo = "Todo",
  InProgress = "In Progress",
  Completed = "Completed",
}

export enum FormType {
  Create = "Create",
  Edit = "Edit",
}

export interface Task {
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface TaskWithID extends Task {
  _id: string;
}

export type TaskGroups = Record<string, TaskWithID[]>;

export type WeekEntry = [string, TaskWithID[]];
