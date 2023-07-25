import { supabase } from "@/services/clientSupabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

async function getPregunta(id) {
  const pregunta = await supabase
    .from("preguntas")
    .select()
    .eq("id", id)
    .single()
    .then(({ data }) => data);
  return pregunta;
}

export default async function Page({ params: { id } }) {
  const pregunta = await getPregunta(id);

  async function handleSubmit(formData) {
    "use server";
    const id = formData.get("id");
    const respuesta = formData.get("respuesta");

    const { error } = await supabase
      .from("preguntas")
      .update({ respuesta })
      .eq("id", id);
      revalidatePath("/admin");
      redirect("/admin")
  }
  return (
    <article className="grid gap-4">
      <Link
        href="/admin"
        className="rounded-lg text-center bg-gray-200 p-2 w-40 hover:bg-gray-300 transition-colors"
      >
        ← Volver atrás
      </Link>
      <form action={handleSubmit} className="grid gap-4">
        <section className="grid">
          <p className="rounded-t-lg bg-emerald-500 p-4 text-white text-xl font-medium">
            {pregunta.text}
          </p>
          <input name="id" type="hidden" value={pregunta.id} />
          <input
            name="respuesta"
            placeholder="Me pregunto si..."
            className="rounded-b-lg bg-white p-4 text-black text-xl"
          />
        </section>
        <button
          type="submit"
          className="bg-emerald-500 text-white rounded-lg p-4 text-xl hover:bg-emerald-600 transition-colors"
        >
          Responder pregunta
        </button>
      </form>
    </article>
  );
}
