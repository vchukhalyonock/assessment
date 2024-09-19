
import { sendMessage } from "./message-service";
import {Customer} from "./interfaces/customer";
import {postData} from "./utils";
import {PAYMENT_URL} from "./consts";
import * as dotenv from "dotenv";
import {getAllCustomers} from "./customer-provider";

dotenv.config();

(async function() {
	const customers =  getAllCustomers();
	for (let i = 0; i < customers.length; i++) {
		let customer = customers[i] as Customer;

		try {
			await processPayment(customer).then(() => {
				console.log('Successfully processed payment for customer', customer.id);
			});
		} catch (e) {
			console.error('The payment failed to process:', e);

			if (e.message === 'Payment Failed') {
				console.error('The payment failed to process:', e);

				const paymentMethod = customer.paymentMethods[customer.paymentMethods.defaultPaymentMethod];
				let last4Digits = '';

				if (customer.paymentMethods.defaultPaymentMethod === 'card') {
					last4Digits = paymentMethod.card.last4;
				} else if (customer.paymentMethods.defaultPaymentMethod === 'usBankAccount') {
					last4Digits = paymentMethod.usBankAccount.accountNumberLast4Digits;
				} else if (customer.paymentMethods.defaultPaymentMethod == 'eu_pay_by_bank') {
					last4Digits = paymentMethod.eu_pay_by_bank.iban_last_4;
				}

				await sendMessage(customer, last4Digits);
			}
		}
	}
})();


async function processPayment(customer: Customer) {
	await postData(PAYMENT_URL, process.env.STRIPE_API_KEY, {
		customerId: customer.id,
		paymentMethod: customer.paymentMethods[customer.paymentMethods.defaultPaymentMethod],
		amount: getCustomerPaymentAmount(customer.id)
	});
}

function getCustomerPaymentAmount(customerId: number) {
	const amount = Math.floor(Math.random() * (100 - 50 + 1) + 50) + Math.random();
	return amount.toFixed(2);
}
