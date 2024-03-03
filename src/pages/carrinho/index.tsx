import { CarrinhoContext } from "@/context/CarinhoContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function Carrinho() {
  const { carrinho, quantidadeCarrinho, adicionarItem, removerItem, totalCarrinho, finalizarCompra } = useContext(CarrinhoContext)
  const router = useRouter()

  function handleFinalizarCompra() {
    finalizarCompra()

    toast.success("Compra finalizada!", {
      style: {
        backgroundColor: "#121212",
        color: "#FFF",
        borderRadius: 10
      }
    })

    router.push("/")
  }

  return (
    <div className="w-full max-w-7xl px-4 mx-auto">
      <h1 className="font-medium text-2xl text-center my-4" >Meu carrinho</h1>

      {quantidadeCarrinho === 0 && (
        <div className="flex flex-col justify-center items-center">
          <p className="font-medium">Ops seu carrinho está vazio!</p>
          <Link className="bg-slate-600 my-3 p-1 px-3 text-white dibt-medium rounded" href="/" > Ir para às compras </Link>
        </div>
      )}

      {carrinho.map(item => (
        <section className="flex justify-between items-center" key={item.id}>
          <Image className="w-full max-w-40" src={item.cover} alt={item.titulo} width={1} height={1} unoptimized priority />

          <p className="w-full max-w-44">{item.titulo}</p>

          <strong>Preço: {item.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>

          <div className="flex items-center justify-center gap-3">
            <button className="bg-slate-600 text-white rounded-full flex items-center justify-center font-medium cursor-pointer w-7" onClick={() => removerItem(item)}>
              -
            </button>
            {item.quantidade}
            <button className="bg-slate-600 text-white rounded-full flex items-center justify-center font-medium w-7" onClick={() => adicionarItem(item)}>
              +
            </button>
          </div>

          <strong> Subtotal: {item.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </strong>
        </section>
      ))}
      {totalCarrinho > 0 && (
        <div className="mt-10 flex justify-between items-center">
          <strong className=""> Total do Carrinho: {totalCarrinho.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} </strong>
          <button className="bg-slate-600 rounded-md px-4 py-1 text-white font-medium text-2xl" onClick={handleFinalizarCompra}>
            Finalizar compra
          </button>
        </div>
      )}


    </div>
  )
}