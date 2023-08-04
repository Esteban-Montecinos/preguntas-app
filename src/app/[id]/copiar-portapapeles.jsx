"use client";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CopiarPortapapeles() {
  async function handleClick() {
    const image = await toast.promise(fetch(`${location.pathname}/opengraph-image`).then(
      (res) => res.blob()
    ),
    {
      pending: 'Copiando imagen 🤔',
      success: 'Imagen copiada 🤩',
      error: 'Error al copiar imagen 🤯'
    })
    await navigator.clipboard.write([
      new ClipboardItem({ [image.type]: image }),
    ]);
    
  }
  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="bg-emerald-500 text-white rounded-lg p-4 text-xl hover:bg-emerald-600 transition-colors"
      >
        Copiar al portapapeles
      </button>
      <ToastContainer/>
    </>
  );
}
