import api from "./api";
import type {
  EventType,
  CreateEventRequest,
  UpdateEventRequest,
} from "../types/event.types";

class EventService {
  async getAllEvents(): Promise<EventType[]> {
    const response = await api.get("/events");
    return response.data;
  }

  
async getMyEvents(): Promise<EventType[]> {
  const response = await api.get("/events/my-events");
  return response.data;
}


  async getEventById(id: number): Promise<EventType> {
    const response = await api.get(`/events/${id}`);
    return response.data;
  }

  async createEvent(event: CreateEventRequest): Promise<EventType> {
    const response = await api.post("/events", event);
    return response.data;
  }

  async updateEvent(id: number, event: UpdateEventRequest): Promise<EventType> {
    const response = await api.put(`/events/${id}`, event);
    return response.data;
  }

  async deleteEvent(id: number): Promise<void> {
    await api.delete(`/events/${id}`);
  }
}

export default new EventService();
