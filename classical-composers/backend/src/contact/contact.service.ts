import { Injectable } from '@nestjs/common';
import {ContactRepository} from "./contact.repository";
import {Contact} from "./entities/contact.entity";

@Injectable()
export class ContactService {

  constructor(private readonly contactRepository: ContactRepository) {
  }

  getContactById(id: number): Contact {
    return this.contactRepository.getContact(id);
  }
}
