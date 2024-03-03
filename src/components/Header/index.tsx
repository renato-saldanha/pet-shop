import { CarrinhoContext } from "@/context/CarinhoContext";
import Link from "next/link";
import { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";

export default function Header() {
  const { quantidadeCarrinho } = useContext(CarrinhoContext)

  return (
    <div>
      <nav className="flex items-center justify-between px-7 py-2 bg-amber-600 text-white">
        <Link href="/" className="font-bold text-2xl"> Home </Link>
        <Link href="/carrinho" className="relative"> <FiShoppingCart size={24} />
          {quantidadeCarrinho > 0 && <p className="absolute flex -top-3 font-bold -right-3 rounded-full w-5 h-5 bg-white text-slate-600 text-center justify-center items-center" >
            {quantidadeCarrinho}
          </p>
          }
        </Link>
      </nav>
    </div>
  )
}