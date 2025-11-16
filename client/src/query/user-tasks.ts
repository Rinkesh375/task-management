"use server";
import type { Task } from "@/types/task";
import server from "../lib/axiosInstance";

export async function getUserTasks(query: string) {
  try {
    let url = `${process.env.API_URL}/tasks?user=691839459172f2a39380b2d2`;

    if (query?.trim()) {
      url += `&q=${encodeURIComponent(query)}`;
    }

    const res = await fetch(url, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function createUserTask(payload: Task) {
  try {
    const res = await server.post("/tasks", {
      ...payload,
      user: "691839459172f2a39380b2d2",
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserTask(id: string) {
  try {
    const res = await server.delete(`/tasks/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUserTask(id: string, payload: Partial<Task>) {
  try {
    const res = await server.patch(`/tasks/${id}`, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
}
