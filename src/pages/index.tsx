import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { api } from "../services/api";
import { CarrinhoContext } from "@/context/CarinhoContext";
import toast from "react-hot-toast";

export interface ProdutoProps {
  id: number
  decricao: string
  titulo: string
  cover: string
  preco: number
}

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoProps[]>([])
  const { adicionarItem } = useContext(CarrinhoContext)

  function handleAdicionarCarrinho(produto: ProdutoProps) {
    adicionarItem(produto)

    toast.success("Item adicionado ao carrinho.", {
      style: {
        backgroundColor: "#121212",
        color: "#FFF",
        borderRadius: 10
      }
    })
  }

  useEffect(() => {
    async function getProdutos() {
      const response = await api.get("/products")
      setProdutos(response.data)
    }

    getProdutos()
  }, [])

  return (
    <main className="w-full max-w-7xl px-4 mx-auto mt-14">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-5">
        {produtos.map(produto => (
          <section className="w-full" key={produto.id}>
            <Image
              className="w-full rounded-lg mb-2 cursor-pointer transform transition duration-500 hover:scale-110"
              src={produto.cover}
              alt={produto.titulo}
              width={1}
              height={1}
              unoptimized
            />
            <p className="font-bold">{produto.titulo}</p>
            <div className="flex gap-2">
              <p> {produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} </p>
              <BsCartPlus className="cursor-pointer" size={24} onClick={() => handleAdicionarCarrinho(produto)} />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
