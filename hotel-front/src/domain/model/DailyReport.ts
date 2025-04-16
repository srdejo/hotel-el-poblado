import { Payment } from "./Payment";

export type DailyReport = {
    date: string; // e.g., '2025-04-09'
    receptionistId: string;
  
    payments: Payment[]; // todos los pagos recibidos por ese usuario ese día
  
    totalByMethod: {
      cash: number;
      transfer: number;
      card: number;
    };
  
    totalReceived: number;
    totalOutstanding: number; // Total adeudado de estadías activas
  };
  