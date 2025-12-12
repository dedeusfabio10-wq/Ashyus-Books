import { AdminPanel } from '@/components/AdminPanel';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 to-black text-white">
      <Header />
      <main className="container mx-auto px-8 py-20 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-8">
          Ashyus Books
        </h1>
        <p className="text-2xl md:text-3xl text-purple-300 mb-12">
          Fantasia • Romance • Young Adult
        </p>
        <div className="text-xl md:text-2xl text-gray-300">
          <p>Em breve novos lançamentos incríveis…</p>
          <p className="mt-8">Enquanto isso, conheça meus livros nas lojas:</p>
          <a
            href="https://books2read.com/ap/n7qD8R/Ashyus"
            className="inline-block mt-8 px-12 py-6 bg-purple-600 rounded-xl text-2xl hover:bg-purple-500 transition"
            target="_blank"
          >
            Todos os meus livros
          </a>
        </div>
      </main>
      <Footer />
      <AdminPanel />
    </div>
  );
}
