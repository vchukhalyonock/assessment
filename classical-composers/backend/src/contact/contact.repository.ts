import {BadRequestException, Injectable} from "@nestjs/common";
import {Contact} from "./entities/contact.entity";
import * as contacts from "./data/contacts.json";

@Injectable()
export class ContactRepository {
    private readonly contactDataSource: Contact[] = [];

    constructor() {
        this.contactDataSource = this.loadContacts();
    }

    private loadContacts(): Contact[] {
        return contacts.map(contact => ({
            id: contact.id,
            email: contact.email,
            phone: contact.phone,
            address: contact.address,
        }))
    }

    getContact(id: number): Contact {
        const contact = this.contactDataSource.find(contact => contact.id === id);
        if(!contact) throw new BadRequestException("No contact found");
        return contact;
    }
}
