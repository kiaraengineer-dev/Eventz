import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, Ticket, Eye } from "lucide-react";

import Input from "../../../shared/components/ui/Input";
import Button from "../../../shared/components/ui/Button";
import Label from "../../../shared/components/ui/Label";

import { useEvents } from "../../../shared/components/context/EventContext";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { createEvent } = useEvents();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    eventDate: "",
    eventTime: "",
    imageUrl: "",
    price: "",
    totalTickets: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createEvent({
        ...formData,
        price: Number(formData.price),
        totalTickets: Number(formData.totalTickets),
      });

      alert("Evento criado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar evento.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8  sm:py-12 px-5 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
       

        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl sm:rounded-3xl shadow-xl overflow-hidden">
            {/* CABEÇALHO */}
            <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-indigo-800 px-6 sm:px-8 py-7 text-white">
              <div className="flex items-center gap-5 sm:gap-6">
                <div className="w-14 h-14 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-indigo-700 flex items-center justify-center">
                  <CalendarDays size={30} className="sm:block text-orange-400" />
                </div>

                <div>
                  <h1 className="text-3xl sm:text-3xl font-bold">Criar Evento</h1>

                  <p className="mt-2 sm:mt-2 text-sm sm:text-base text-blue-100">
                    Preencha os dados abaixo para cadastrar seu evento na
                    plataforma.
                  </p>
                </div>
              </div>
            </div>

           
            <div className="p-8 sm:p-9 md:p-7 xl:p-9">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                
                <Input
                  label="Título do evento"
                  name="title"
                  placeholder="Ex.: Workshop React"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                
                <div>
                  <Label>Descrição</Label>

                  <textarea
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva seu evento, atrações, objetivos, público-alvo, etc..."
                    className="w-full mt-2 border border-gray-200 rounded-xl p-4 sm:p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-non text-sm sm:text-base"
                    required
                  />
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label>Categoria</Label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full mt-2 border border-gray-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
                      required
                    >
                      <option value="">Selecione uma categoria</option>

                      <option value="Música">Música</option>
                      <option value="Teatro">Teatro</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Esporte">Esporte</option>
                      <option value="Festival">Festival</option>
                      <option value="Cinema">Cinema</option>
                      <option value="Gastronomia">Gastronomia</option>
                      <option value="Artes">Artes</option>
                       <option value="Online">Online</option>
                       <option value= "Outros">Outros</option>

                    </select>
                  </div>

                  <Input
                    label="Local"
                    name="location"
                    placeholder="Ex.: Teatro Castro Alves, Salvador - BA"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Data"
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Horário"
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                
                <Input
                  label="Imagem do evento"
                  name="imageUrl"
                  placeholder="Cole a URL da imagem do evento"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Preço do ingresso (R$)"
                    type="number"
                    step="0.01"
                    name="price"
                    placeholder="0,00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Quantidade de ingressos"
                    type="number"
                    name="totalTickets"
                    placeholder="100"
                    value={formData.totalTickets}
                    onChange={handleChange}
                    required
                  />
                </div>

                
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4  sm:p-4 text-sm text-indigo-700">
                  Após salvar, seu evento será publicado e ficará visível para
                  todos os usuários da plataforma.
                </div>

                
                <Button type="submit">
                  <span className="flex items-center justify-center gap-2">
                    <Ticket size={18} />
                    Salvar Evento
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>

       

        <div>
          <div className="bg-white rounded-3xl sm:rounded-3xl shadow-xl overflow-hidden sticky top-6 lg:top-6">
            
            <div className="p-6 sm:p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Eye size={20} className="text-indigo-600" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Prévia do evento
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Veja como seu evento aparecerá para o público.
                  </p>
                </div>
              </div>
            </div>

            
            <div className="p-6 sm:p-6">
              {/* IMAGEM */}
              <div className="relative h-56 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900 to-blue-950">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt={formData.title || "Imagem do evento"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/60">
                    <div className="text-center">
                      <CalendarDays size={45} className="mx-auto mb-3" />

                      <p>Imagem do evento</p>
                    </div>
                  </div>
                )}

                
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                  EVENTZ
                </div>
              </div>

              
              <div className="pt-5">
                <h3 className="text-2xl sm:text-2xl font-bold text-gray-900">
                  {formData.title || "Título do evento"}
                </h3>

                
                <div className="mt-3">
                  <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium">
                    {formData.category || "Categoria"}
                  </span>
                </div>

                
                <div className="flex items-center gap-2 mt-5 text-gray-600">
                  <MapPin size={18} />

                  <span>{formData.location || "Local do evento"}</span>
                </div>

                
                <div className="flex items-center gap-2 mt-3 text-gray-600">
                  <CalendarDays size={18} />

                  <span>
                    {formData.eventDate || "Data"}
                    {" • "}
                    {formData.eventTime || "--:--"}
                  </span>
                </div>

                
                <p className="mt-5 sm:text-base text-gray-600 leading-relaxed line-clamp-4">
                  {formData.description ||
                    "A descrição do seu evento aparecerá aqui. Fale sobre as atrações, objetivos e tudo que seu público precisa saber."}
                </p>

                
                <div className="border-t my-6" />

                
                <div className="flex justify-between">
                  <div>
                    <p className="text-2xl  sm:text-2xl font-bold text-gray-900">
                      R$ {formData.price || "0,00"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">Ingresso</p>
                  </div>

                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {formData.totalTickets || "0"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">Disponíveis</p>
                  </div>
                </div>

                
                <button
                  type="button"
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Ticket size={18} />
                  Comprar ingresso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
