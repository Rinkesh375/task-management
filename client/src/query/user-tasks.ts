"use server";
import type { Task } from "@/types/task";
import server from "../lib/axiosInstance";

export async function getUserTasks(query?: string) {
  try {
    // If time remains, we will implement user-based task fetching and creation.
    let url = `/tasks?user=691839459172f2a39380b2d2`;

    if (query && query.trim() !== "") {
      url += `&q=${encodeURIComponent(query)}`;
    }

    const response = await server.get(url);
    return response.data;
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
