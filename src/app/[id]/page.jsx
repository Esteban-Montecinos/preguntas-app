import { supabase } from "@/services/clientSupabase";
import Link from "next/link";
import CopiarPortapapeles from "./copiar-portapapeles";

async function getPregunta(id) {
  const pregunta = await supabase
    .from("preguntas")
    .select()
    .eq("id", id)
    .single()
    .then(({ data }) => data);
  return pregunta;
}

export default async function Pregunta({ params: { id } }) {
  const pregunta = await getPregunta(id);

  return (
    <article className="grid gap-4">
    <Link href="/">← Volver atrás</Link>
      <section key={pregunta.id} className="grid">
        <p className="rounded-t-lg bg-emerald-500 p-4 text-white text-xl font-medium">
          Preguntas
        </p>
        <p className="rounded-b-lg bg-white p-4 text-black text-xl ">
          {pregunta.text}
        </p>
      </section>
      <CopiarPortapapeles/>
    </article>
  );
}
