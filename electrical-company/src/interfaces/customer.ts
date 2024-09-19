import {PaymentMethods} from "../types";

export interface Customer {
    id: number;
    name: string;
    email?: string;
    mobile?: string;
    mobileCarrier?: string;
    paymentMethods: PaymentMethods;
}
