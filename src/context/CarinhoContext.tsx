import { ProdutoProps } from "@/pages";
import { list } from "postcss";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export interface CarrinhoProps extends ProdutoProps {
  quantidade: number
  total: number
}

interface CarrinhoProvideProps {
  children: ReactNode
}

interface CarrinhoContextData {
  carrinho: CarrinhoProps[]
  quantidadeCarrinho: number
  setCarrinho: Dispatch<SetStateAction<CarrinhoProps[]>>
  adicionarItem: (item: ProdutoProps) => void
  removerItem: (item: ProdutoProps) => void
  finalizarCompra: () => void
  totalCarrinho: number
}

export const CarrinhoContext = createContext({} as CarrinhoContextData)

function CarrinhoProvider({ children }: CarrinhoProvideProps) {
  const [carrinho, setCarrinho] = useState<CarrinhoProps[]>([])
  const [totalCarrinho, setTotalCarrinho] = useState(0)

  function adicionarItem(produto: ProdutoProps) {
    const carrinhoIndex = carrinho.findIndex(i => i.id === produto.id)

    if (carrinhoIndex === -1) {
      const dados = {
        ...produto,
        quantidade: 1,
        total: produto.preco * 1
      }

      setCarrinho(carrinho => [...carrinho, dados])
      atualizarTotalCarrinho([...carrinho, dados])
      return
    }

    let listaCarrinho = carrinho
    listaCarrinho[carrinhoIndex].quantidade = listaCarrinho[carrinhoIndex].quantidade + 1
    listaCarrinho[carrinhoIndex].total = listaCarrinho[carrinhoIndex].quantidade * listaCarrinho[carrinhoIndex].total
    setCarrinho(listaCarrinho)
    atualizarTotalCarrinho(listaCarrinho)
  }

  function removerItem(item: ProdutoProps) {
    const carrinhoIndex = carrinho.findIndex(i => i.id === item.id)

    if (carrinho[carrinhoIndex].quantidade === 1) {
      let listaCarrinho = carrinho.filter(i => i.id !== item.id)
      setCarrinho(listaCarrinho)
      atualizarTotalCarrinho(listaCarrinho)
      return
    }

    let listaCarrinho = carrinho
    listaCarrinho[carrinhoIndex].quantidade = listaCarrinho[carrinhoIndex].quantidade - 1
    listaCarrinho[carrinhoIndex].total = listaCarrinho[carrinhoIndex].quantidade * listaCarrinho[carrinhoIndex].preco
    setCarrinho(listaCarrinho)
    atualizarTotalCarrinho(listaCarrinho)
  }

  function atualizarTotalCarrinho(carrinho: CarrinhoProps[]) {
    let listaCarrinho = carrinho
    let totalCarrinho = listaCarrinho.reduce((obj, acc) => { return obj + acc.total }, 0)
    setTotalCarrinho(totalCarrinho)
  }

  function finalizarCompra() {
    setCarrinho([])
    setTotalCarrinho(0)
  }

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        quantidadeCarrinho: carrinho.length,
        adicionarItem,
        removerItem,
        totalCarrinho,
        finalizarCompra
      }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export default CarrinhoProvider;