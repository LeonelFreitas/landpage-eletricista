import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import InputMask from "react-input-mask";
import TelefoneInput from "./TelefoneInput"; // Caso esteja separado
import ErrorBoundary from "./ErrorBoundary"; // Importa o ErrorBoundary
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPaperPlane } from "react-icons/fa"; // Importa o ícone de envio
import { motion } from "framer-motion";

const MultiStepForm = ({ isSubmitted, setIsSubmitted }) => {
  const [step, setStep] = useState(1); // Controle da etapa atual
  const [isSending, setIsSending] = useState(false); // Controle para evitar envio duplicado
  const [countdown, setCountdown] = useState(10); // Contagem regressiva para redirecionamento
  const totalSteps = 4; // Total de etapas no formulário
  const navigate = useNavigate(); // Hook para redirecionar o usuário

  useEffect(() => {
    if (isSubmitted) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        navigate("/");
      }, 10000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isSubmitted, navigate]);

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      cep: "",
    },
    tipoServico: "",
    descricao: "",
    urgencia: "",
    detalhesServico: "",
  });

  const handleNext = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    if (step === 1 && (!formData.nome || !formData.telefone || !formData.email)) {
      toast.error("Por favor, preencha todos os campos da etapa 1.");
      return;
    }

    if (
      step === 2 &&
      (!formData.endereco.rua ||
        !formData.endereco.numero ||
        !formData.endereco.bairro ||
        !formData.endereco.cidade ||
        !formData.endereco.cep)
    ) {
      toast.error("Por favor, preencha todos os campos da etapa 2.");
      return;
    }

    if (
      step === 3 &&
      (!formData.tipoServico || !formData.urgencia || (formData.tipoServico === "Outros" && !formData.descricao))
    ) {
      toast.error("Por favor, preencha todos os campos da etapa 3.");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        toast.error("Por favor, insira um email válido.");
        return;
      }
    }

    if (name.includes("endereco.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    if (isSending) return; // Evita múltiplos envios

    setIsSending(true); // Define o estado como enviando

    // Parâmetros para o emailjs
    const templateParams = {
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
      rua: formData.endereco.rua,
      numero: formData.endereco.numero,
      bairro: formData.endereco.bairro,
      cidade: formData.endereco.cidade,
      cep: formData.endereco.cep,
      tipoServico: formData.tipoServico,
      urgencia: formData.urgencia,
      detalhesServico: formData.detalhesServico,
    };

    // Adiciona o campo "descricao" apenas se "tipoServico" for "Outros" e "descricao" não estiver vazia
    if (formData.tipoServico === "Outros" && formData.descricao.trim() !== "") {
      templateParams.descricao = formData.descricao;
    }

    // Envio do email usando emailjs
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (response) => {
          console.log("Email enviado com sucesso!", response.status, response.text);
          toast.success("Orçamento enviado com sucesso!");
          setIsSubmitted(true); // Atualiza o estado para indicar que o formulário foi enviado
        },
        (error) => {
          console.error("Erro ao enviar o email:", error);
          toast.error("Ocorreu um erro ao enviar o orçamento. Tente novamente.");
        }
      )
      .finally(() => {
        setIsSending(false); // Reseta o estado após o envio
      });
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white w-full max-w-3xl mx-auto p-8 rounded-lg shadow-lg text-center"
      >
        <div className="flex flex-col items-center">
          {/* Nova Imagem de Sucesso */}
          <img
            src="/confirma.png" // Substitua pelo caminho da sua imagem
            alt="Sucesso"
            className="w-24 h-24 mb-4"
          />

          {/* Mensagem de Sucesso */}
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Orçamento Enviado com Sucesso!
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Obrigado por entrar em contato. Nossa equipe entrará em contato com
            você o mais breve possível para discutir os detalhes do seu orçamento.
          </p>

          {/* Contagem Regressiva */}
          <p className="text-sm text-gray-500 mb-6">
            Você será redirecionado para a página inicial em{" "}
            <span className="font-bold text-gray-700">{countdown}</span> segundos...
          </p>

          {/* Botão para Voltar à Página Inicial */}
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition"
          >
            Voltar para a Página Inicial
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white w-full max-w-3xl mx-auto p-8 rounded-lg shadow-lg text-gray-900">
      
      {/* Barra de Progresso */}
      <div className="relative w-full h-6 bg-gray-300 rounded-full mb-8 shadow-inner">
        <div
          className="absolute top-0 left-0 h-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white drop-shadow-md">
            {Math.round((step / totalSteps) * 100)}%
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Etapa 1: Informações Pessoais */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Informações Pessoais
            </h2>
            <div className="mb-4">
              <label className="block font-medium mb-2">Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Telefone</label>
              <ErrorBoundary>
                <TelefoneInput
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </ErrorBoundary>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu e-mail"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        )}

        {/* Etapa 2: Endereço */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Endereço do Serviço
            </h2>
            <div className="mb-4">
              <label className="block font-medium mb-2">Rua</label>
              <input
                type="text"
                name="endereco.rua"
                value={formData.endereco.rua}
                onChange={handleChange}
                placeholder="Digite o nome da rua"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Número</label>
              <input
                type="number"
                name="endereco.numero"
                value={formData.endereco.numero}
                onChange={handleChange}
                placeholder="Digite o número"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Bairro</label>
              <input
                type="text"
                name="endereco.bairro"
                value={formData.endereco.bairro}
                onChange={handleChange}
                placeholder="Digite o bairro"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Cidade</label>
              <input
                type="text"
                name="endereco.cidade"
                value={formData.endereco.cidade}
                onChange={handleChange}
                placeholder="Digite a cidade"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">CEP</label>
              <InputMask
                mask="99999-999"
                name="endereco.cep"
                value={formData.endereco.cep}
                onChange={handleChange}
                placeholder="Digite o CEP"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        )}

        {/* Etapa 3: Tipo de Serviço e Urgência */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Informações do Serviço
            </h2>
            <div className="mb-4">
              <label className="block font-medium">Selecione o Serviço</label>
              <select
                name="tipoServico"
                value={formData.tipoServico}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione</option>
                <option value="Instalação elétrica">Instalação elétrica</option>
                <option value="Manutenção elétrica">Manutenção elétrica</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            {formData.tipoServico === "Outros" && (
              <div className="mb-4">
                <label className="block font-medium">Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Descreva o serviço"
                ></textarea>
              </div>
            )}
            <div className="mb-4">
              <label className="block font-medium">Urgência</label>
              <select
                name="urgencia"
                value={formData.urgencia}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione</option>
                <option value="Emergência">Emergência</option>
                <option value="Urgente">Urgente</option>
                <option value="Planejado">Planejado</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Detalhes do Serviço</label>
              <textarea
                name="detalhesServico"
                value={formData.detalhesServico || ""}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                placeholder="Descreva os detalhes do serviço"
              ></textarea>
            </div>
          </div>
        )}

        {/* Etapa 4: Revisão e Confirmação */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Revisão e Confirmação
            </h2>
            <p className="mb-4">
              <strong>Nome:</strong> {formData.nome}
            </p>
            <p className="mb-4">
              <strong>Telefone:</strong> {formData.telefone}
            </p>
            <p className="mb-4">
              <strong>E-mail:</strong> {formData.email}
            </p>
            <p className="mb-4">
              <strong>Endereço:</strong> {`${formData.endereco.rua}, ${formData.endereco.numero}, ${formData.endereco.bairro}, ${formData.endereco.cidade}, ${formData.endereco.cep}`}
            </p>
            <p className="mb-4">
              <strong>Tipo de Serviço:</strong> {formData.tipoServico}
            </p>
            <p className="mb-4">
              <strong>Urgência:</strong> {formData.urgencia}
            </p>
            {formData.detalhesServico && (
              <p className="mb-4 text-red-600">
                <strong>Detalhes do Serviço:</strong>{" "}
                {formData.detalhesServico.length > 50
                  ? `${formData.detalhesServico.substring(0, 50)}...`
                  : formData.detalhesServico}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-4">
              Revise as informações acima antes de enviar.
            </p>
          </div>
        )}

        {/* Botões de Navegação */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Voltar
            </button>
          )}
          {step < 4 ? (
            <button
              type="button" // Evita o comportamento de submit
              onClick={(e) => handleNext(e)} // Passa o evento para a função handleNext
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit" // O envio só ocorre ao clicar no botão "Enviar Orçamento"
              className={`bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition flex items-center justify-center gap-2 ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isSending} // Desativa o botão enquanto está enviando
            >
              {isSending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-lg" /> Enviar Orçamento
                </>
              )}
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MultiStepForm;

