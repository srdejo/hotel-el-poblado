import { RoomStatus } from "./RoomStatus";

export interface Room {
  id: string;
  description: string;
  singleBed?: number;
  doubleBed?: number;
  bunkBed?: number;
  multiple?: boolean;
  airConditioning?: boolean;
  balconyView?: boolean;
  jacuzzi?: boolean;
  status: RoomStatus;
  pricing: {
    onePerson: number;
    twoPeople?: number;
    threeOrMore?: number;
    withAir?: number;
  };
}
