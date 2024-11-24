"use client";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import CheckedBoxIcon from "@/components/icons/CheckedBoxIcon";
import UncheckedBoxIcon from "@/components/icons/UncheckedBoxIcon";
import { useRouter } from "next/navigation";
import {useState } from "react";
import { setCookie } from "@/utils/cookie";
import criarCartela from "@/utils/criarCartela";

export default function Home() {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [quantidadePorDia, setQuantidadePorDia] = useState(0);
  const [horario, setHorario] = useState("");
  const [jaAberto, setJaAberto] = useState(false);
  const [quantidadeNaCartelaAberta, setQuantidadeNaCartelaAberta] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [erro, setErro] = useState("");
  const dados ={
    nome : nome,
    quantidade : quantidade,
    quantidadePorDia : quantidadePorDia,
    horario: horario,
    jaAberto : jaAberto,
    quantidadeNaCartelaAberta: quantidadeNaCartelaAberta,
  }

  criarCartela(dados);
  const router = useRouter();

  const handleProximaPagina = (e) => {
    e.preventDefault();
    if (pagina == 1) {
      if (nome == "" || quantidade == 0) {
        setErro("Todos os campos devem ser preenchidos");
      } else {
        setErro("");
        setPagina(2);
      }
    }
    if (pagina == 2) {
      if (quantidadePorDia == 0 || horario == "" || jaAberto == true && quantidadeNaCartelaAberta == 0) {
        setErro("Todos os campos devem ser preenchidos");
      } else {
        setErro("");
        setPagina(3);
        handleCriarCookie()
      }
    }
    if (pagina == 3){
      router.push("/"+nome)
    }
  };
  const handlePaginaAnterior = (e) => {
    e.preventDefault();
    if (pagina != 1) {
      setPagina(pagina - 1);
    }
  };
  const handleCriarCookie =()=>{
    const cartela = criarCartela(dados)
    const remedio ={nome: nome,quantidade:quantidade, quantidadePorDia: quantidadePorDia, horario : horario, cartelas: [cartela] }
    setCookie(nome, remedio , { httpOnly: false, secure: false })
  }

  return (
    <div className="">
      <div>
        <form className="from-violet-700 to-indigo-400 via-indigo-600 bg-gradient-to-br rounded m-5 px-4 py-6 flex flex-col gap-2 text-purple-100 font-medium items-center text-center">
          <h1 className="text-xl">Controle de Remédio</h1>
          <span className="text-xs text-red-700">{erro}</span>
          <ul className="flex gap-2">
            <li
              className={`rounded-full size-2 ${
                pagina == 1 ? "bg-purple-900" : "bg-purple-500"
              } border border-purple-200`}
            ></li>
            <li
              className={`rounded-full size-2 ${
                pagina == 2 ? "bg-purple-900" : "bg-purple-500"
              } border border-purple-200`}
            ></li>
            <li
              className={`rounded-full size-2 ${
                pagina == 3 ? "bg-purple-900" : "bg-purple-500"
              } border border-purple-200`}
            ></li>
          </ul>
          {pagina == 1 && (
            <div className="flex flex-col gap-2">
              <label>Nome</label>
              <input
                onChange={(e) => {
                  setNome(e.target.value);
                }}
                className="bg-violet-200 text-black rounded focus:ring-0 focus:outline-none"
              />
              <label>Quantidade de comprimidos por cartela</label>
              <input
                onChange={(e) => {
                  setQuantidade(e.target.value);
                }}
                type="number"
                className="bg-violet-200 text-black rounded focus:ring-0 focus:outline-none"
              />
            </div>
          )}
          {pagina == 2 && (
            <div className="flex flex-col gap-2">
              <label>Quantidade por dia</label>
              <input
                onChange={(e) => {
                  setQuantidadePorDia(e.target.value);
                }}
                type="number"
                className="bg-violet-200 text-black rounded focus:ring-0 focus:outline-none"
              />
              <label>Horário</label>
              <span className="text-xs">(Horario do proximo comprimido)</span>
              <input
                onChange={(e) => setHorario(e.target.value)}
                aria-label="Time"
                type="time"
                className="bg-violet-200 text-black rounded focus:ring-0 focus:outline-none"
              />
              <label>Ja esta aberto?</label>
              <div>
                {jaAberto ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setJaAberto(!jaAberto);
                    }}
                  >
                    <CheckedBoxIcon />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setJaAberto(!jaAberto);
                    }}
                  >
                    <UncheckedBoxIcon />
                  </button>
                )}
              </div>
              {jaAberto && (
              <>
                <label>Quantidade na cartela aberta</label>
                <input
                  onChange={(e) => {
                    setQuantidadeNaCartelaAberta(e.target.value);
                  }}
                  type="number"
                  className="bg-violet-200 text-black rounded focus:ring-0 focus:outline-none"
                />
              </>

              )}
            </div>
          )}
          {pagina == 3 &&(
            <div>
              <h1>Confira os dados</h1>
              <p>Nome: {nome}</p>
              <p>Quantidade de comprimidos por cartela: {quantidade}</p>
              <p>Quantidade de comprimidos por dia: {quantidadePorDia}</p>
              <p>Horario: {horario}</p>
            </div>
          )}
          <div className="flex gap-4">
            <button
              onClick={handlePaginaAnterior}
              className="rounded bg-gradient-to-br from-violet-900 via-indigo-800 to-indigo-600 p-2"
            >
              <ArrowLeftIcon />
            </button>

            <button
              onClick={handleProximaPagina}
              className="rounded bg-gradient-to-br from-violet-900 via-indigo-800 to-indigo-600 p-2"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
