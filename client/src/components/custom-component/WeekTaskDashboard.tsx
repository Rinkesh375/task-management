"use client";
import Header from "./Header";
import WeekCard from "./WeekCard";
import TasksSection from "./TasksSection";
import { FormType, Task, TaskWithID } from "@/types/task";
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
  const [tasks, setTasks] = useState<TaskWithID[]>(initialTasks);
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState<FormType>(FormType.Create);


  const { groups, weekEntries, tasksWeeklyProgoress, totalTasks } =
    useMemo(() => {
      return { ...groupTasksByWeek(tasks) };
    }, [tasks]);

  const currentWeekKey = useMemo(() => startOfWeekISO(new Date()), []);

  const selectedWeekTasks = groups[currentWeekKey] ?? [];

  const fetchTasks = async (query:string) => {
    try {
      const data = await getUserTasks(query);
      setTasks(data);
    } catch (error) { }
  };



  const updateFormModal = (value: boolean, formType: FormType) => {
    setOpenForm(value);
    setFormType(formType);
  };

  return (
    <>
      <Header onSearch={fetchTasks} />
      <div className="mt-4 flex gap-3  pb-3">
        {weekEntries.length === 0 ? (
          <div className="text-sm text-slate-500">
            No tasks yet — add your first task
          </div>
        ) : (
          weekEntries.map(([weekStart, wkTasks]) => {
            const open = wkTasks.filter((x) => x.status !== "Completed").length;
            const closed = wkTasks.filter(
              (x) => x.status === "Completed"
            ).length;
            return (
              <WeekCard
                key={weekStart}
                weekStartISO={weekStart}
                open={open}
                closed={closed}
                active={weekStart === currentWeekKey}
                tasksWeeklyProgoress={tasksWeeklyProgoress}
                totalTasks={totalTasks}
                fetchTasks={fetchTasks}
              />
            );
          })
        )}
      </div>

      <div className="mt-6 pb-10">
        <TasksSection
          initialTasks={selectedWeekTasks}
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
