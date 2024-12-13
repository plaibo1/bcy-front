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
}
