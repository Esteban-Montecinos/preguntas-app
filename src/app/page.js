import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import {cookies} from "next/headers";
import {createServerActionClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";

export default async function Home() {
  const scSupabase = createServerComponentClient({cookies});
  const preguntas = await scSupabase
    .from("preguntas")
    .select()
    .eq("accepted", true)
    .then(({data}) => data );

  async function addQuestion(formData) {
    "use server";

    const saSupabase = createServerActionClient({cookies});

    const id = Date.now();

    await saSupabase.from("preguntas").insert({text: formData.get("text"), id});

    revalidatePath("/");
    redirect(`/${id}`);
  }

  return (
    <div className="grid gap-12">
      <form action={addQuestion}>
        <h2 className="rounded-t-lg bg-emerald-500 p-4 text-xl text-white font-bold">Preguntas</h2>
        <input
          className="w-full rounded-b-lg bg-white p-4 text-xl text-black"
          name="text"
          placeholder="Me pregunto si..."
        />
        <button
          className="mt-4 w-full rounded-lg bg-emerald-500 p-4 text-lg font-medium text-white transition-colors hover:bg-emerald-600"
          type="submit"
        >
          Enviar pregunta
        </button>
      </form>
      <hr className="opacity-20" />
      {preguntas.length ? (
        <article className="grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4">
          {preguntas.map(({text, id}) => (
            <Link key={id} href={`/${id}`}>
              <section>
                <h2 className="rounded-t-lg bg-emerald-500 p-4 text-xl font-bold">Preguntas</h2>
                <h1 className="rounded-b-lg bg-white p-4 text-xl text-black">{text}</h1>
              </section>
            </Link>
          ))}
        </article>
      ) : (
        <p className="text-center opacity-50">No hay preguntas.</p>
      )}
    </div>
  );
}
