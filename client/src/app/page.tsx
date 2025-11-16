import WeekTaskDashboard from "@/components/custom-component/WeekTaskDashboard";
import { getUserTasks } from "@/query/user-tasks";

export default async function Page() {
  const tasks = await getUserTasks("");

  return (
    <main className="min-h-screen p-4 md:p-8">
      <WeekTaskDashboard initialTasks={tasks} />
    </main>
  );
}
