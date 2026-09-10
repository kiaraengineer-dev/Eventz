import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Save } from "lucide-react";

import Input from "../../../shared/components/ui/Input";
import Button from "../../../shared/components/ui/Button";
import Label from "../../../shared/components/ui/Label";

import eventService from "../services/event.service";
import type { EventType } from "../types/event.types";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  

  useEffect(() => {
    const loadEvent = async () => {
      try {
        if (!id) return;

        const event: EventType = await eventService.getEventById(Number(id));

        setFormData({
          title: event.title,
          description: event.description,
          category: event.category,
          location: event.location,
          eventDate: event.eventDate,
          eventTime: event.eventTime,
          imageUrl: event.imageUrl,
          price: String(event.price),
          totalTickets: String(event.totalTickets),
        });
      } catch (error) {
        console.error("Erro ao carregar evento:", error);
        alert("Não foi possível carregar o evento.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, navigate]);


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
      if (!id) return;

      setSaving(true);

      await eventService.updateEvent(Number(id), {
        ...formData,
        price: Number(formData.price),
        totalTickets: Number(formData.totalTickets),
       
      });

      alert("Evento atualizado com sucesso!");

      navigate(`/events/${id}`);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      alert("Erro ao atualizar evento.");
    } finally {
      setSaving(false);
    }
  };

 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl sm:text-xl font-semibold">Carregando evento...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-100 py-10 sm:py-9 px-6 sm:px-6">
      <div className="max-w-4xl mx-auto">
        

        <button
          type="button"
          onClick={() => navigate(`/events/${id}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition mb-6 sm:mb-5 text-sm sm:text-base"
        >
          <ArrowLeft size={20} />

          <span>Voltar para o evento</span>
        </button>

        <div className="bg-white rounded-3xl sm:rounded-3xl shadow-xl overflow-hidden">
          

          <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-indigo-800 px-8 sm:px-7 py-8 sm:py-7 text-white">
            <div className="flex items-center gap-5 sm:gap-4">
              <div className="w-14 h-14  sm:w-13 sm:w-13 shrink-0 rounded-xl bg-indigo-700 flex items-center justify-center">
                <CalendarDays size={30} className="text-orange-400" />
              </div>

              <div>
                <h1 className="text-3xl sm:text-2xl font-bold">Editar Evento</h1>

                <p className="mt-2 sm:mt-1 sm:text-sm text-blue-100">
                  Atualize as informações do seu evento.
                </p>
              </div>
            </div>
          </div>

          

          <div className="p-8 sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-5">
            

              <Input
                label="Título do evento"
                name="title"
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
                  className="w-full mt-2 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base"
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

                    <option value="Gastronomia">Gastronomia</option>
                  </select>
                </div>

                <Input
                  label="Local"
                  name="location"
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
                  value={formData.price}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Quantidade de ingressos"
                  type="number"
                  name="totalTickets"
                  value={formData.totalTickets}
                  onChange={handleChange}
                  required
                />
              </div>

              

              <Button
                type="submit"
                disabled={saving}
                className="w-full justify-center"
              >
                <span className="flex items-center justify-center gap-2">
                  <Save size={18} />

                  {saving ? "Salvando..." : "Salvar alterações"}
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
