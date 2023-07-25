import { supabase } from "@/services/clientSupabase";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getPreguntas() {
  const preguntas = await supabase
    .from("preguntas")
    .select("*")
    .then(({ data }) => data);
  return preguntas;
}

export default async function Home() {
  const preguntas = await getPreguntas();

  async function handleSubmit(formData) {
    "use server";
    const pregunta = formData.get("pregunta");
    const id = Date.now().toString();

    await supabase.from("preguntas").insert({ text: pregunta, id });

    revalidatePath("/")
    redirect(`/${id}`)
  }
  return (
    <div className="grid gap-8">
      <form action={handleSubmit} className="grid gap-4">
        <section className="grid">
          <p className="rounded-t-lg bg-emerald-500 p-4 text-white text-xl font-medium">
            Preguntas
          </p>
          <input
            name="pregunta"
            placeholder="Me pregunto si..."
            className="rounded-b-lg bg-white p-4 text-black text-xl"
          />
        </section>
        <button
          type="submit"
          className="bg-emerald-500 text-white rounded-lg p-4 text-xl hover:bg-emerald-600 transition-colors"
        >
          Enviar pregunta
        </button>
      </form>
      <article className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] items-start">
        {preguntas.map((pregunta) => (
          <Link href={`/${pregunta.id}`} key={pregunta.id} className="grid">
            <p className="rounded-t-lg bg-emerald-500 p-4 text-white text-xl font-medium">
              Preguntas
            </p>
            <p className="rounded-b-lg bg-white p-4 text-black text-xl ">
              {pregunta.text}
            </p>
            {pregunta.respuesta ? (
              <p className="rounded-lg bg-gray-200 mt-2 p-2 text-black text-xl font-medium">
                {pregunta.respuesta}
              </p>
            ) : null}
          </Link>
        ))}
      </article>
    </div>
  );
}
