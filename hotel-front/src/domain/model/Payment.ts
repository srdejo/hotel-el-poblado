import { PaymentMethod } from "./PaymentMethod";

export type Payment = {
    id: string;
    stayId: string; // Relación con GuestStay
    amount: number;
    method: PaymentMethod;
    status: "pending" | "completed" ,
    date: Date;
    description: string;
    receivedBy: string;
  };
  