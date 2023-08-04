import { supabase } from "@/services/clientSupabase";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function getPreguntas() {
  const preguntas = await supabase
    .from("preguntas")
    .select("*")
    .then(({ data }) => data);
  return preguntas;
}
export default async function Admin() {
  const preguntas = await getPreguntas();
  async function handleSubmit(formData) {
      "use server";
    const id = formData.get("id");

    const { error } = await supabase.from("preguntas").delete().eq("id", id)

    revalidatePath("/admin");
  }
  
  return (
    <article className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(230px,1fr))] items-start">
      {preguntas.map((pregunta) => (
        <section key={pregunta.id} className="grid">
          <Link href={`/admin/${pregunta.id}`} className="grid">
            <p className="rounded-t-lg bg-emerald-500 p-4 text-white text-xl font-medium">
              Preguntas
            </p>
            <p className="rounded-b-lg bg-white p-4 text-black text-xl font-medium">
              {pregunta.text}
            </p>
          </Link>
          {pregunta.respuesta ? (
            <p className="rounded-lg bg-gray-300 opacity-90 mt-2 p-2 text-black text-xl font-medium">
              {pregunta.respuesta}
            </p>
          ) : null}
          <form action={handleSubmit} className="grid mt-2 w-full">
              <input type="hidden" name="id" value={pregunta.id} />

              <button
                type="submit"
                className="bg-red-500 text-white rounded-lg p-2 text-xl hover:bg-red-600 transition-colors"
              >
                Borrar pregunta 🗑️
              </button>
            </form>
        </section>
      ))}
    </article>
  );
}
