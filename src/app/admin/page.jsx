import {createServerActionClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {revalidatePath} from "next/cache";
import {cookies} from "next/headers";

export default async function AdminPage() {
  const scSupabase = createServerComponentClient({cookies});

  const preguntas = await scSupabase
    .from("preguntas")
    .select()
    .then(({data}) => data );

  async function removeAction(formData) {
    "use server";

    const saSupabase = createServerActionClient({cookies});

    await saSupabase
      .from("preguntas")
      .delete()
      .eq("id", Number(formData.get("id")));

    revalidatePath("/admin");
  }

  async function acceptAction(formData) {
    "use server";

    const saSupabase = createServerActionClient({cookies});

    await saSupabase
      .from("preguntas")
      .update({accepted: true})
      .eq("id", Number(formData.get("id")));

    revalidatePath("/admin");
  }

  return (
    <div className="grid gap-12">
      {preguntas.length ? (
        <article className="grid grid-cols-[repeat(auto-fill,minmax(256px,1fr))] gap-4">
          {preguntas.map(({text, id, accepted}) => (
            <div key={id}>
              <h2
                className={`flex items-center justify-between rounded-t-lg p-4 text-xl font-bold ${
                  accepted ? `bg-green-500` : `bg-orange-500`
                }`}
              >
                <span>Preguntas</span>
                <div className="flex items-center gap-4">
                  <form action={removeAction}>
                    <input name="id" type="hidden" value={id} />
                    <button className="text-3xl leading-none" type="submit">
                      ×
                    </button>
                  </form>
                  <form action={acceptAction}>
                    <input name="id" type="hidden" value={id} />
                    <button type="submit">✓</button>
                  </form>
                </div>
              </h2>
              <h1 className="rounded-b-lg bg-white p-4 text-xl text-black">{text}</h1>
            </div>
          ))}
        </article>
      ) : (
        <p className="text-center opacity-50">No hay preguntas.</p>
      )}
    </div>
  );
}