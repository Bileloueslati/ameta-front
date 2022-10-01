import { User } from "./api";
import { Date, ID } from "./common";

export interface Sheet {
  id: number;
  atvylRef: string;
  from: string;
  to: string;
  shipementDate: Date;
  createdAt: Date;
  way: string;
  plate: string;
  updatedAt: Date;
  user: Partial<User>;
  sheetContainers: SheetContainer[];
}

export type SheetContainer = {
  id: ID;
  sender: string;
  consignee: string;
  packaging: number;
  volumem3: number;
  delTerms: string;
};
