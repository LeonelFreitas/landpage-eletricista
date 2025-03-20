import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const [step, setStep] = useState(1); // Controle da etapa atual
  const [isSubmitted, setIsSubmitted] = useState(false); // Controle da tela de confirmação
  const totalSteps = 4; // Total de etapas no formulário
  const navigate = useNavigate(); // Hook para redirecionar o usuário

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

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    e.preventDefault();

    // Validação: Verifica se todos os campos obrigatórios estão preenchidos
    if (
      !formData.nome ||
      !formData.telefone ||
      !formData.email ||
      !formData.endereco.rua ||
      !formData.endereco.numero ||
      !formData.endereco.bairro ||
      !formData.endereco.cidade ||
      !formData.endereco.cep ||
      !formData.tipoServico ||
      !formData.urgencia
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Exibe a tela de confirmação
    setIsSubmitted(true);

    // Redireciona para a página principal após 5 segundos
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white w-full max-w-3xl mx-auto p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6 text-green-600">
          Formulário enviado com sucesso!
        </h2>
        <p className="text-lg text-gray-700">
          Obrigado por entrar em contato. Em breve retornaremos para você.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Você será redirecionado para a página inicial em 5 segundos...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full max-w-3xl mx-auto p-8 rounded-lg shadow-lg text-gray-900">
      {/* Barra de Progresso */}
      <div className="relative w-full h-4 bg-gray-200 rounded-full mb-8">
        <div
          className="absolute top-0 left-0 h-4 bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
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
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(XX) XXXXX-XXXX"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
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
                type="text"
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
              <input
                type="text"
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
              type="button"
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Enviar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;