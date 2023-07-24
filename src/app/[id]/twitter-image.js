import { supabase } from "@/services/clientSupabase";
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const contentType = "image/png";

export default async function Image({ params: { id } }) {
  const pregunta = await supabase
    .from("preguntas")
    .select()
    .eq("id", id)
    .single()
    .then(({ data }) => data);
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
