import Link from "next/link";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

import CopiarPortapapeles from "./copiar-portapapeles";

export default async function QuestionPage({params: {id}}) {
  const scSupabase = createServerComponentClient({
    cookies,
  });

  const pregunta = await scSupabase
    .from("preguntas")
    .select()
    .eq("id", id)
    .single()
    .then(({data}) => data);

  return (
    <article className="grid gap-4">
      <Link href="/">← Volver atrás</Link>
      <section>
        <h2 className="rounded-t-lg bg-pink-500 p-4 text-xl font-bold">Preguntas</h2>
        <h1 className="rounded-b-lg bg-white p-4 text-xl text-black">{pregunta.text}</h1>
      </section>
      <CopiarPortapapeles />
    </article>
  );
}
