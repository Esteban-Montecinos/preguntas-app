import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {ImageResponse} from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Questioncy";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const rhSupabase = createRouteHandlerClient({cookies});

// Image generation
export default async function Image({params: {id}}) {
  const pregunta = await rhSupabase
    .from("preguntas")
    .select()
    .eq("id", id)
    .single()
    .then(({data}) => data);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(16 185 129)",
            color: "white",
            display:'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>Preguntas</p>
        </div>
        <div
          style={{
            flex: 1,
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>{pregunta.text}</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
