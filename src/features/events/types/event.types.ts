export interface EventType {
  id: number;
  title: string;
  description: string;
  location: string;
  eventDate: string;
  eventTime: string;
  category: string;
  imageUrl: string;
  price: number;
  totalTickets: number;
  availableTickets: number;
  provider: "EVENTZ" | "TICKETMASTER" | "SYMPLA";
  purchaseUrl: string | null;

}

export interface CreateEventRequest {
  title: string;
  description: string;
  location: string;
  eventDate: string;
  eventTime: string;
  category: string;
  imageUrl: string;
  price: number;
  totalTickets: number;
}

export interface UpdateEventRequest {
  title: string;
  description: string;
  location: string;
  eventDate: string;
  eventTime: string;
  category: string;
  imageUrl: string;
  price: number;
  totalTickets: number;
}
