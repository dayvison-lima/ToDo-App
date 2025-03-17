"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // 🔹 Redireciona automaticamente para a página de tarefas
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-blue-600 text-white text-2xl font-bold">
      Redirecionando...
    </div>
  );
}
