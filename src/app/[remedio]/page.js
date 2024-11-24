"use client";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/cookie";
import { usePathname } from "next/navigation";

export default function PaginaDoRemedio() {
  const [remedio, setRemedio] = useState("");
  const [atualizar, setAtualizar] = useState(1);

  const path = usePathname();
  const nome = path.split("/")[1];
  useEffect(()=>{
    const getUrl = `/api/remedio?nome=${nome}`;
    async function getdata() {
      await fetch(getUrl, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response !=null || response != undefined) {
              setRemedio(response.remedio);
          }})
        .catch((error) => console.error(error));
    }
    getdata();
  },[])
  useEffect(() => {
    const cookie = getCookie(nome);
    setRemedio(cookie);

  }, [nome, atualizar]);

  const atualizarBancoDeDados = async () => {
    if (remedio != "") {
      const res = await fetch("/api/remedio", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          remedio: remedio,
        }),
      });
      const response = await res.json();
      if (res.ok) {
      } else {
      }
    }
  };

  if (remedio !== "") {
    const handleComprimido = (e, comprimido) => {
      e.preventDefault();
      if (comprimido.estado === "naoTomado") {
        remedio.cartelas[0].comprimidos[comprimido.numeroDoComprimido - 1].estado = "Tomado";
        setCookie(nome, remedio, { httpOnly: false, secure: false });
        atualizarBancoDeDados();
        setAtualizar(atualizar + 1);
      } else {
        remedio.cartelas[0].comprimidos[comprimido.numeroDoComprimido - 1].estado =
          "naoTomado";
        setCookie(nome, remedio, { httpOnly: false, secure: false });
        atualizarBancoDeDados();
        setAtualizar(atualizar + 1);
      }
    };
    return (
      <div className="flex flex-col items-center gap-2 p-2">
        <h1 className="text-xl font-medium">{nome}</h1>
        <div className="grid grid-cols-2 mx-6 justify-items-center bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 place-content-evenly rounded-2xl shadow-xl ">
          {remedio?.cartelas[0]?.comprimidos?.map((comprimido) => (
            <button
              onClick={(e) => handleComprimido(e, comprimido)}
              className="flex flex-col items-center border border-dashed border-white h-full w-full px-8 py-2"
              key={comprimido.numeroDoComprimido}
            >
              <span>{comprimido.data}</span>
              <div
                className={`rounded-full size-4 ${
                  comprimido.estado == "naoTomado"
                    ? "bg-gradient-to-bl from-red-200 via-red-400 to-red-300"
                    : "bg-gradient-to-bl from-green-200 via-green-400 to-green-300"
                } shadow-xl`}
              ></div>
              <span>{comprimido.hora}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
}
