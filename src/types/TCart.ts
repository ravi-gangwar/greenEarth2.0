import { ITree } from "./Ttree";

export interface CartItem extends ITree {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  checkoutForm: {
    address: string;
    city: string;
    state: string;
    pin: string;
    paymentMethod: string;
  };
}