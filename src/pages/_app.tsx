import Header from "@/components/Header";
import CarrinhoProvider from "@/context/CarinhoContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CarrinhoProvider >
      <Toaster
        position="top-center"
        reverseOrder={false} />
      <Header />
      <Component {...pageProps} />
    </CarrinhoProvider>
  )
}
