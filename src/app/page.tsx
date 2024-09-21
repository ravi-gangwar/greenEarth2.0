"use client"
import { trpc } from "./_trpc/client";

export default function Home() {
  const getTodos = trpc.getTodos.useQuery();
  return (
    <main>
      <div>{JSON.stringify(getTodos.data)}</div>
    </main>
  );
}
