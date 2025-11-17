"use client";
import Header from "./Header";
import WeekCard from "./WeekCard";
import TasksSection from "./TasksSection";
import { FormType, TaskWithID } from "@/types/task";
import { useMemo, useState } from "react";
import { groupTasksByWeek } from "@/lib/group-tasks-by-week";
import { startOfWeekISO } from "@/lib/week-utils";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { getUserTasks } from "@/query/user-tasks";

export default function WeekTaskDashboard({
  initialTasks,
}: {
  initialTasks: TaskWithID[];
}) {
  const [tasks, setTasks] = useState<TaskWithID[]>(initialTasks ?? []);
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState<FormType>(FormType.Create);

  const { left, completedTasks, tasksWeeklyProgoress, totalTasks } =
    useMemo(() => {
      return { ...groupTasksByWeek(tasks) };
    }, [tasks]);

  const fetchTasks = async (query: string) => {
    try {
      const data = await getUserTasks(query);
      setTasks(data);
    } catch (error) {}
  };

  const updateFormModal = (value: boolean, formType: FormType) => {
    setOpenForm(value);
    setFormType(formType);
  };

  return (
    <>
      <Header onSearch={fetchTasks} />
      <div className="mt-4 flex gap-3  pb-3">
        {tasks.length === 0 ? (
          <div className="text-sm text-slate-500">
            No tasks yet — add your first task
          </div>
        ) : (
          <WeekCard
            tasksWeeklyProgoress={tasksWeeklyProgoress}
            totalTasks={totalTasks}
            weekStartISO={startOfWeekISO(new Date())}
            left={left}
            completedTasks={completedTasks}
          />
        )}
      </div>

      <div className="mt-6 pb-10">
        <TasksSection
          initialTasks={tasks}
          openForm={openForm}
          updateFormModal={updateFormModal}
          fetchTasks={fetchTasks}
          formType={formType}
        />
      </div>

      <div className="flex items-center justify-center">
        <Button
          className="h-20 w-20 rounded-full
    bg-primary-blue"
          onClick={() => updateFormModal(true, FormType.Create)}
        >
          <Plus className="w-10 h-10 text-white" />
        </Button>
      </div>
    </>
  );
}
