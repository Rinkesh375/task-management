"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Edit3 } from "lucide-react";
import { FormType, Task, TaskWithID } from "@/types/task";

export default function TaskCard({
  task,
  onToggle,
  onDelete,
  updateData,
}: {
  task: TaskWithID;
  onToggle: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (task: Task) => void;
  updateData: (id: string, payload: Task) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-200">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.status === "Completed"}
          onCheckedChange={() => onToggle(task._id, task.status)}
          className={`
  h-6 w-6 border-2 border-primary-blue
  ${
    task.status === "Completed" &&
    "data-[state=checked]:bg-white data-[state=checked]:border-primary-blue data-[state=checked]:text-primary-blue"
  }
`}
        />

        <span
          className={`text-base ${
            task.status === "Completed"
              ? "line-through text-slate-400"
              : "text-slate-800"
          }`}
        >
          {task.title}
        </span>
      </div>

      <div className="flex items-center gap-3 pr-1">
        <Button
          variant="ghost"
          size="icon"
          className=" text-slate-300 hover:text-red-500"
          onClick={() => onDelete(task._id)}
        >
          <Trash2 className="size-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className=" text-slate-300 hover:text-slate-700"
          onClick={() => {
            updateData(task._id, {
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
              startTime: task.startTime,
              endTime: task.endTime,
              date: task.date,
            });
          }}
        >
          <Edit3 className="size-6" />
        </Button>
      </div>
    </div>
  );
}
