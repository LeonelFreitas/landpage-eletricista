import React, { useState } from "react";
import { Link } from "react-router-dom";

const MultiStepForm = () => {
  const [step, setStep] = useState(1); // Controle da etapa atual
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
    horarioContato: "",
    comoConheceu: "",
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
    console.log("Dados do formulário:", formData);
  };

  return (
    <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg text-gray-900">
      <form onSubmit={handleSubmit}>
        {/* Etapa 1: Informações Pessoais */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Informações Pessoais</h2>
            <div className="mb-4">
              <label className="block font-medium">Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Telefone</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        )}

        {/* Etapa 2: Endereço */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Endereço do Serviço</h2>
            <div className="mb-4">
              <label className="block font-medium">Rua</label>
              <input
                type="text"
                name="endereco.rua"
                value={formData.endereco.rua}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Número</label>
              <input
                type="text"
                name="endereco.numero"
                value={formData.endereco.numero}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Bairro</label>
              <input
                type="text"
                name="endereco.bairro"
                value={formData.endereco.bairro}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Cidade</label>
              <input
                type="text"
                name="endereco.cidade"
                value={formData.endereco.cidade}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">CEP</label>
              <input
                type="text"
                name="endereco.cep"
                value={formData.endereco.cep}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        )}

        {/* Etapa 3: Tipo de Serviço */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Tipo de Serviço</h2>
            <div className="mb-4">
              <label className="block font-medium">Selecione o Serviço</label>
              <select
                name="tipoServico"
                value={formData.tipoServico}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Selecione</option>
                <option value="Instalação elétrica residencial">
                  Instalação elétrica residencial
                </option>
                <option value="Instalação elétrica predial">
                  Instalação elétrica predial
                </option>
                <option value="Manutenção elétrica">Manutenção elétrica</option>
                <option value="Troca de fiação">Troca de fiação</option>
                <option value="Instalação de chuveiros e torneiras elétricas">
                  Instalação de chuveiros e torneiras elétricas
                </option>
                <option value="Instalação de tomadas e interruptores">
                  Instalação de tomadas e interruptores
                </option>
                <option value="Montagem de quadros de distribuição">
                  Montagem de quadros de distribuição
                </option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            {formData.tipoServico === "Outros" && (
              <div className="mb-4">
                <label className="block font-medium">Detalhamento</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                ></textarea>
              </div>
            )}
          </div>
        )}

        {/* Etapa 4: Urgência */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Urgência do Serviço</h2>
            <div className="mb-4">
              <label className="block font-medium">Selecione a Urgência</label>
              <select
                name="urgencia"
                value={formData.urgencia}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Selecione</option>
                <option value="Emergência">Emergência</option>
                <option value="Urgente">Urgente</option>
                <option value="Planejado">Planejado</option>
              </select>
            </div>
          </div>
        )}

        {/* Botões de Navegação */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Voltar
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Enviar
            </button>
          )}
        </div>
      </form>
      <Link
        to="/orcamento"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Solicitar Orçamento
      </Link>
    </div>
  );
};

export default MultiStepForm;