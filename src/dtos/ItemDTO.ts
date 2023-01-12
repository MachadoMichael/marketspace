import { PaymentMethodDTO } from "./MethodDTO";
export interface ItemDTO {
  name: string;
  value: string;
  isNew: boolean;
  uri: string[];
  isActive: boolean;
  user?: string;
  id: string;
  canExchange: boolean;
  paymentMethods: PaymentMethodDTO[];
}
