import {createServerActionClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function AdminLayout({children}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: {session},
  } = await supabase.auth.getSession();

  async function handleLogin(formData) {
    "use server";

    const saSupabase = createServerActionClient({cookies});

    await saSupabase.auth.signInWithPassword({
      email: formData.get("email"),
      password: formData.get("password")
    });
  }

  return session ? (
    children
  ) : (
    <form action={handleLogin}>
      <h2 className="rounded-t-lg bg-emerald-500 text-white p-4 text-xl font-bold">Preguntas</h2>
      <input
        className="w-full bg-white p-4 text-xl text-black"
        name="email"
        placeholder="some@email.com"
      />
      <input
        className="w-full rounded-b-lg bg-white p-4 text-xl text-black"
        name="password"
        placeholder="******"
        type="password"
      />
      <button
        className="mt-4 w-full bg-emerald-500 text-white rounded-lg p-4 text-lg hover:bg-emerald-600 transition-colors"
        type="submit"
      >
        Iniciar sesión
      </button>
    </form>
  );
}