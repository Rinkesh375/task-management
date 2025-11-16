"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FormType, Task } from "@/types/task";
import { defaultFormState } from "@/lib/constant";

export default function TaskForm({
  open,
  onOpenChange,
  onSubmit,
  loading = false,
  formData,
  type,
  setFormData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: Task) => void;
  loading?: boolean;
  formData: Task;
  type: FormType;
  setFormData: React.Dispatch<React.SetStateAction<Task>>;
}) {
  const minDate = new Date().toISOString().split("T")[0];

  const formatDisplayDate = (value: string) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  function handleFormSubmit() {
    if (!formData.title) return alert("Task title is required.");
    if (!formData.startTime || !formData.endTime)
      return alert("Start and End time are required.");
    if (!formData.date) return alert("Please select a date.");

    const now = new Date();
    const selectedDate = new Date(formData.date);
    if (selectedDate < new Date(minDate) && type === FormType.Create)
      return alert("Date cannot be in the past.");

    const start = new Date(`${formData.date}T${formData.startTime}`);
    const end = new Date(`${formData.date}T${formData.endTime}`);

    if (start < now && type === FormType.Create)
      return alert("Start time cannot be in the past.");
    if (end <= start && type === FormType.Create)
      return alert("End time must be after start time.");
    onSubmit(formData);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {type} Task
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          <div>
            <label className="text-sm text-gray-600">Task title</label>
            <Input
              autoFocus={false}
              placeholder="Enter task title"
              value={formData.title}
              className="mt-1"
              name="title"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Set Time</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                min={new Date().toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
              <Input
                type="time"
                value={formData.endTime}
                name="endTime"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Set Date</label>
            <div className="relative mt-2">
              <Input
                type="date"
                name="date"
                min={minDate}
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="absolute inset-0 opacity-0 cursor-pointer z-20"
              />
              <div className="border rounded-lg px-3 py-2 text-gray-700 bg-white shadow-sm pointer-events-none z-10">
                {formData.date
                  ? formatDisplayDate(formData.date)
                  : "Pick a date"}
              </div>
              <div className="absolute right-3 top-2.5 text-gray-500 text-lg pointer-events-none z-10">
                📅
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Priority</label>
            <select
              className="w-full border rounded-lg p-2 mt-1 text-gray-700"
              value={formData.priority}
              name="priority"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Description</label>
            <Textarea
              placeholder="Add Description"
              value={formData.description}
              className="mt-2"
              rows={4}
              name="description"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>

          <Button
            className="w-full bg-[#3F5BF6] hover:bg-[#2e47d8] text-white mt-4"
            onClick={handleFormSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : `${type} task`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
