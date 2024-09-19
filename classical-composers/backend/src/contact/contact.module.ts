import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import {ContactRepository} from "./contact.repository";

@Module({
  providers: [ContactService, ContactRepository],
  exports: [ContactService],
})
export class ContactModule {}
