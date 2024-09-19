import customers from './customer-list.json';
import {Customer} from "./interfaces/customer";

export function getAllCustomers(): Customer[] {
    return customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        mobile: customer.mobile,
        paymentMethods: {
            defaultPaymentMethod: customer.paymentMethods.defaultPaymentMethod,
            card: customer.paymentMethods.card,
            usBankAccount: customer.paymentMethods?.usBankAccount ?? undefined,
            euBankAccount: customer.paymentMethods?.eu_pay_by_bank ?? undefined,
        }
    }));
}
