import { AdditionalCharge } from "./AdditionalCharge";
import { Guest } from "./Guest";
import { Payment } from "./Payment";
import { Room } from "./Room";

export class GuestStay {
  id!: string;
  roomId!: string;
  room!: Room;
  guests!: Guest[];

  checkInDate!: Date;
  checkOutDate!: Date;

  additionalCharges!: AdditionalCharge[];

  nightlyRate!: number;
  payments!: Payment[];
  comments!: string[];

  static fromJson(data: any): GuestStay {
    const stay = new GuestStay();
    stay.id = data.id;
    stay.roomId = data.roomId; // 👈 se carga el ID, no el objeto completo
    stay.guests = data.guests || [];
    stay.checkInDate = new Date(data.checkInDate);
    stay.checkOutDate = new Date(data.checkOutDate);
    stay.additionalCharges = data.additionalCharges || [];
    stay.nightlyRate = data.nightlyRate;
    stay.comments = data.comments ?? [];
    stay.payments = data.payments.map((p: any) => ({
      ...p,
      date: new Date(p.date),
    }));
    return stay;
  }

  get pendingPayments(): number {
    return this.payments.filter(payment => payment.status == 'pending').reduce((sum, payment) => sum + payment.amount, 0)
  }

  get completedayments(): number {
    return this.payments.filter(payment => payment.status == 'completed').reduce((sum, payment) => sum + payment.amount, 0)
  }
  
  get total(): number {
    return this.payments.reduce((sum, payment) => sum + payment.amount, 0)
  }

  get nights(): number {
    const msPerNight = 1000 * 60 * 60 * 24;
    return Math.ceil(
      (this.checkOutDate.getTime() - this.checkInDate.getTime()) / msPerNight
    );
  }


}
