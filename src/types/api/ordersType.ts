export interface IOrder {
  id: string;
  name: string;
  clientId: string;
  categoryId: string;
  status: string;
  costPerLead: number;
  leadCount: number;
  executedLeadCount: number;
  mailsForSend: string[];
  maxDefect: number;
  countLeadsSent: number;
}

export interface IOrderCreate {
  name: string;
  clientId: string;
  categoryId: string;
  status: string;
  costPerLead: number;
  leadCount: number;
  mailsForSend: string[];
  maxDefect: number;
}
