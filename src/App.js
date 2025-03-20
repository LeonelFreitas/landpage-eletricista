import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaBolt, FaWrench, FaPhoneAlt, FaTools, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-scroll";
import MultiStepForm from "./components/MultiStepForm";

const ElectricianLandingPage = () => {
  const [showTooltip, setShowTooltip] = useState(true); // Estado para controlar a exibição do tooltip
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu


  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração da animação
      easing: "ease-in-out", // Efeito de transição
      once: true, // Anima apenas uma vez
    });

    // Esconde o tooltip automaticamente após 3 segundos
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4 pl-14">
          {/* Ícone da casa */}
          <img
            src="/house.png" // Caminho para o arquivo na pasta public
            alt="Ícone de casa"
            className="w-8 h-8 md:w-10 md:h-10" // Tamanho do ícone
          />
          <h1 className="text-4xl font-bold tracking-wide">D.Elétrica</h1>
        </div>

        {/* Links do Menu para Desktop */}
        <nav className="hidden md:flex gap-8 mr-20">
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-yellow-400 transition"
          >
            Início
          </Link>
          <Link
            to="services"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-yellow-400 transition"
          >
            Serviços
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-yellow-400 transition"
          >
            Sobre Nós
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-yellow-400 transition"
          >
            Contato
          </Link>
        </nav>

        {/* Menu Hambúrguer para Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)} // Alterna o estado do menu
            className="text-white text-2xl focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />} {/* Ícone de abrir/fechar */}
          </button>
        </div>
      </header>

      {/* Menu Mobile */}
      <div
        className={`fixed top-0 right-0 bg-gradient-to-r from-blue-700 to-blue-900 text-white flex flex-col items-start gap-6 py-6 px-6 shadow-lg transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
          } z-50 w-64 h-screen`}
      >
        {/* Botão de Fechar */}
        <button
          onClick={() => setMenuOpen(false)}
          className="self-end text-2xl focus:outline-none"
        >
          <FaTimes />
        </button>

        {/* Links do Menu */}
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:text-yellow-400 transition text-lg"
          onClick={() => setMenuOpen(false)}
        >
          Início
        </Link>
        <Link
          to="services"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:text-yellow-400 transition text-lg"
          onClick={() => setMenuOpen(false)}
        >
          Serviços
        </Link>
        <Link
          to="about"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:text-yellow-400 transition text-lg"
          onClick={() => setMenuOpen(false)}
        >
          Sobre Nós
        </Link>
        <Link
          to="contact"
          smooth={true}
          duration={500}
          className="cursor-pointer hover:text-yellow-400 transition text-lg"
          onClick={() => setMenuOpen(false)}
        >
          Contato
        </Link>
      </div>

      {/* Hero Section com Filtro e Imagem Desfocada */}
      <section
        id="hero"
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('eletrico.jpeg')", // Caminho da imagem de fundo
        }}
      >
        {/* Filtro escuro e desfocado */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

        {/* Conteúdo com retângulo cinza */}
        <div className="relative z-10 text-center text-white p-8 max-w-3xl">
          <div className="bg-gray-800 bg-opacity-75 p-6 rounded-md shadow-lg">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Soluções Elétricas de Alta Qualidade
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Garantimos segurança, eficiência e atendimento personalizado para todos os nossos serviços.
            </p>
            <a
              href="/orcamento"
              className="bg-[#fcd34d] text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition flex items-center justify-center gap-2 shadow-md w-3/4 mx-auto"
            >
              <FaBolt className="text-xl" /> Solicitar Orçamento
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-8 bg-gray-50 text-center" data-aos="fade-up">
        <h3 className="text-5xl font-extrabold text-blue-700 mb-12">
          Nossos Serviços
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Serviço 1 */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            data-aos="fade-up"
          >
            <FaBolt className="text-blue-600 text-6xl mb-6 mx-auto" />
            <h4 className="text-2xl font-bold mb-4">Instalações Elétricas</h4>
            <p className="text-gray-600">
              Projetos completos para residências, comércios e indústrias com segurança e eficiência.
            </p>
          </div>

          {/* Serviço 2 */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FaWrench className="text-blue-600 text-6xl mb-6 mx-auto" />
            <h4 className="text-2xl font-bold mb-4">Manutenção Preventiva</h4>
            <p className="text-gray-600">
              Evite problemas futuros com revisões periódicas e diagnósticos precisos.
            </p>
          </div>

          {/* Serviço 3 */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaPhoneAlt className="text-blue-600 text-6xl mb-6 mx-auto" />
            <h4 className="text-2xl font-bold mb-4">Atendimento Emergencial</h4>
            <p className="text-gray-600">
              Disponível 24h para resolver problemas elétricos com rapidez e eficiência.
            </p>
          </div>

          {/* Serviço 4 */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FaTools className="text-blue-600 text-6xl mb-6 mx-auto" />
            <h4 className="text-2xl font-bold mb-4">Automação Residencial</h4>
            <p className="text-gray-600">
              Controle sua casa com tecnologias modernas e práticas para mais conforto.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="p-12 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto sobre a empresa */}
          <div data-aos="fade-right">
            <h3 className="text-4xl font-bold mb-6">Sobre Nós</h3>
            <p className="text-lg mb-4">
              Somos uma família dedicada a oferecer serviços elétricos de alta qualidade na região de Volta Redonda há mais de 15 anos.
              Nosso compromisso é com a segurança, eficiência e satisfação dos nossos clientes.
            </p>
            <p className="text-lg mb-4">
              Trabalhamos com paixão e profissionalismo, garantindo que cada projeto seja executado com excelência.
              Seja para instalações elétricas, manutenção ou automação residencial, estamos prontos para atender você!
            </p>
            <p className="text-lg font-semibold">
              Confie na nossa experiência e no nosso compromisso com a sua segurança e conforto.
            </p>
          </div>

          {/* Imagem representativa */}
          <div data-aos="fade-left" className="flex justify-center">
            <img
              src="painel.jpeg" // Caminho para a imagem na pasta public
              alt="Serviços elétricos"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Seção de Contato Melhorada */}
      <section id="contact" className="p-12 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Informações de Contato */}
          <div data-aos="fade-right">
            <h3 className="text-4xl font-bold mb-6">Entre em Contato</h3>
            <p className="text-lg mb-4">
              Precisa de ajuda com serviços elétricos? Entre em contato conosco e nossa equipe estará pronta para atender você!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-2xl text-yellow-400" />
                <p className="text-lg font-medium">(24) 999641 - 4077</p>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-2xl text-yellow-400" />
                <p className="text-lg font-medium">contato@eletricistaexpert.com</p>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-2xl text-yellow-400" />
                <p className="text-lg font-medium">Rua Exemplo, 123 - Centro, RJ</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="p-12 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-gray-800">O que nossos clientes dizem</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
              <p className="text-lg italic mb-4">
                "Serviço excelente! Resolveram meu problema elétrico rapidamente e com muita eficiência."
              </p>
              <h4 className="text-xl font-bold">João Silva</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="100">
              <p className="text-lg italic mb-4">
                "Equipe muito profissional e atenciosa. Recomendo a todos!"
              </p>
              <h4 className="text-xl font-bold">Maria Oliveira</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
              <p className="text-lg italic mb-4">
                "Ótima experiência! Contratarei novamente no futuro."
              </p>
              <h4 className="text-xl font-bold">Carlos Souza</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 text-center">
        <p className="text-sm">© 2025 Dudu Eletricista . Todos os direitos reservados.</p>
        <p className="text-sm">
          Desenvolvido por{" "}
          <a
            href="https://github.com/Leonel"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-yellow-500"
          >
            Leonel Freitas
          </a>
        </p>
      </footer>

      {/* Botão de WhatsApp */}
      <div className="fixed bottom-4 right-4 group flex items-center">
        {/* Tooltip (Fale Conosco) */}
        <span
          className={`mr-2 bg-gray-900 text-white text-sm px-2 py-1 rounded transition-opacity ${showTooltip ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
        >
          Fale Conosco
        </span>

        {/* Botão de WhatsApp */}
        <a
          href="https://wa.me/55249996414077" // Link direto para o WhatsApp com o número
          target="_blank"
          rel="noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 flex items-center justify-center"
        >
          <FaPhoneAlt className="text-2xl" /> {/* Ícone do WhatsApp */}
        </a>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ElectricianLandingPage />} />
        <Route path="/orcamento" element={<MultiStepFormPage />} />
      </Routes>
    </Router>
  );
};

const MultiStepFormPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <h1 className="text-4xl font-bold mb-8">Solicite um Orçamento</h1>
      <MultiStepForm />
    </div>
  );
};

export default App;
