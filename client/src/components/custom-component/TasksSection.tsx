"use client";

import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { FormType, TaskStatus, type Task, type TaskWithID } from "@/types/task";
import {
  createUserTask,
  deleteUserTask,
  updateUserTask,
} from "@/query/user-tasks";
import { defaultFormState } from "@/lib/constant";


export default function TasksSection({
  initialTasks: tasks,
  openForm,
  updateFormModal,
  fetchTasks,
  formType,
}: {
  initialTasks: TaskWithID[];
  openForm: boolean;
  updateFormModal: (value: boolean, formType: FormType) => void;
  fetchTasks: (query:string) => Promise<void>;
  formType: FormType;
}) {
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string>("");
  const [editData, setEditData] = useState<Task>(defaultFormState);
  const [showAll, setShowAll] = useState(false);

  async function toggleComplete(id: string, status: string) {
    try {
      const newStatus =
        status === TaskStatus.Completed
          ? TaskStatus.InProgress
          : TaskStatus.Completed;
      await updateUserTask(id, { status: newStatus });
      await fetchTasks("");
    } catch {}
  }

  async function deleteTask(id: string) {
    try {
      await deleteUserTask(id);
      await fetchTasks("");
    } catch {}
  }

  async function createTask(payload: Task) {
    try {
      setLoading(true);
      await createUserTask(payload);
      await fetchTasks("");
      closeModal();
    } catch {
    } finally {
      setLoading
    }
  }

  async function updateTaskById(payload: Partial<Task>) {
    try {
      setLoading(true);
      await updateUserTask(editId, payload);
      await fetchTasks("");
      closeModal();
    } catch {
    } finally {
    }
  }

  const updateData = async (id: string, payload: Task) => {
    if (id) setEditId(id);
    setEditData(payload);
    updateFormModal(true, FormType.Edit);
  };

  const closeModal = () => {
    updateFormModal(false, FormType.Create);
    setEditData(defaultFormState);
    setEditId("");
    setLoading(false);
  };

  const visibleTasks = showAll ? tasks : tasks.slice(0, 4);

  return (
    <section>
      <div className="flex justify-between items-center p-3">
        <h2 className="text-xl font-semibold">Today Task</h2>

        {tasks.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-primary-blue font-medium"
          >
            {showAll ? "View Less" : "View All"}
          </button>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {tasks.length === 0 ? (
          <div className="text-sm text-slate-500">No tasks for today</div>
        ) : (
          visibleTasks.map((t) => (
            <TaskCard
              key={t._id}
              task={t}
              onToggle={toggleComplete}
              onDelete={deleteTask}
              updateData={updateData}
            />
          ))
        )}
      </div>

      <TaskForm
        open={openForm}
        onOpenChange={(value: boolean) => {
          updateFormModal(value, FormType.Create);
        }}
        onSubmit={formType === FormType.Edit ? updateTaskById : createTask}
        loading={loading}
        formData={editData}
        type={formType}
        setFormData={setEditData}
      />
    </section>
  );
}
