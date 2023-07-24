import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
const supabase = createClient(
  'https://jttjrzbzzecrulatjnku.supabase.co',
  process.env.SUPABASE_KEY,
);

async function getPreguntas() {
  const preguntas= await supabase
  .from('preguntas')
  .select('*').then(({data})=> data)
  return preguntas;
}

export default async function Home() {
  const preguntas = await getPreguntas()

  async function handleSubmit(formData) {
    'use server'
    const pregunta = formData.get("pregunta")
    await supabase.from("preguntas").insert({text: pregunta})
    revalidatePath("/")
  }
  return (
    <div className="grid gap-8">
      <form action={handleSubmit} className="grid gap-4">
        <section className="grid">
          <p className="rounded-t-lg bg-pink-500 p-4 text-white text-xl font-medium">
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
          className="bg-pink-500 text-white rounded-lg p-4 text-xl hover:bg-pink-600 transition-colors"
        >
          Enviar pregunta
        </button>
      </form>
      <article className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] items-start">
        {preguntas.map((pregunta) => (
          <section key={pregunta.id} className="grid">
            <p className="rounded-t-lg bg-pink-500 p-4 text-white text-xl font-medium">
              Preguntas
            </p>
            <p className="rounded-b-lg bg-white p-4 text-black text-xl ">
              {pregunta.text}
            </p>
          </section>
        ))}
      </article>
    </div>
  );
}
