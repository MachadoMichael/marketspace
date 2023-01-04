import { PaymentMethodDTO } from "./methodDTO";
export interface ItemDTO {
  name: string;
  value: string;
  isNew: boolean;
  uri: string[];
  user?: string;
  id: string;
  canExchange: boolean;
  paymentMethods: PaymentMethodDTO[];
}
