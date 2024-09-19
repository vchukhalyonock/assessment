import * as Handlebars from 'handlebars';
import {messageTemplates} from "./templates";
import {EMAIL_FROM, SEND_EMAIL_API_URL} from "./consts";
import {Customer} from "./interfaces/customer";
import {Email} from "./types";
import {postData} from "./utils";

export async function sendMessage(contact: Customer, accountNumberLast4: string) {
	const message = makeTemplate(contact, accountNumberLast4);

	const emailPayload: Email = {
		from: EMAIL_FROM,
		to: [],
		messageBody: message
	}

	if(contact.mobile) prepareSMS(contact,emailPayload);

	await postData(SEND_EMAIL_API_URL, process.env.API_KEY, emailPayload);
}

function prepareSMS(contact: Customer, emailPayload: Email) {
	const {email, mobile,mobileCarrier } = contact;

	switch (mobileCarrier) {
		case 'at&t':
			emailPayload.to.push(email + '@text.att.net');
			break;

		case 'tmobile':
			emailPayload.to.push(mobile + '@tmomail.net');
			break;

		default:
			emailPayload.to.push(mobile + 'text.att.net');
			emailPayload.to.push(mobile + '@tmomail.net');
			emailPayload.to.push(mobile + '@vtext.com');
			break;
	}
}

function makeTemplate(contact: Customer, accountNumberLast4: string): string {
	let message = '';
	let template: HandlebarsTemplateDelegate<Record<string, string>>;

	if (contact.paymentMethods.card !== undefined && contact.paymentMethods.card.last4.toString() === accountNumberLast4) {
		template = Handlebars.compile(messageTemplates[0]);
		message = template({
			contactName: contact.name,
			cardBrand: contact.paymentMethods.card.brand,
			cardLast4: contact.paymentMethods.card.last4.toString(),
		});
	} else if (contact.paymentMethods.eu_pay_by_bank !== undefined && contact.paymentMethods.eu_pay_by_bank.iban_last_4 == accountNumberLast4) {
		let euBank = contact.paymentMethods.eu_pay_by_bank;
		template = Handlebars.compile(messageTemplates[1]);
		message = template({
			contactName: contact.name,
			organizationName: euBank.organization_name,
			ibanLast4: euBank.iban_last_4,
		});
	} else {
		let bankAccount = contact.paymentMethods.usBankAccount;
		template = Handlebars.compile(messageTemplates[2]);
		message = template({
			contactName: contact.name,
			bankName: bankAccount.bankName,
			accountNumberLast4Digits: bankAccount.accountNumberLastFourDigits,
		});
	}

	return message;
}

