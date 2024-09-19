import {UsBankAccount} from "./interfaces/us-bank-account";
import {EuBank} from "./interfaces/eu-bank";

export type Card = {
    brand: string;
    last4: number;
}

export type PaymentMethods = {
    card: Card;
    usBankAccount?: UsBankAccount;
    eu_pay_by_bank?: EuBank;
    defaultPaymentMethod: string;
}

export type Email = {
    from: string;
    to: string[];
    messageBody: string;
}

export type ErrorResponse = {
    statusCode: number;
    statusMessage: string;
    unrecoverable: boolean;
}
