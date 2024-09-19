import { Injectable } from '@nestjs/common';
import {ComposerRepository} from "./composer.repository";
import {ComposerListResponseDto} from "./dto/composer-list-response.dto";
import {ComposerResponseDto} from "./dto/composer-response.dto";
import {ContactService} from "../contact/contact.service";
import {ComposerContactReponseDto} from "./dto/composer-contact-reponse.dto";
import {ComposerSearchDto} from "./dto/composer-search.dto";
import {Composer} from "./entities/composer.entity";

@Injectable()
export class ComposerService {

  constructor(
      private readonly composerRepository: ComposerRepository,
      private readonly contactService: ContactService,
  ) {
  }

  findAll(): ComposerListResponseDto {
    return {
      list: this.addContacts(this.composerRepository.findAll())
    }
  }

  findOne(id: number): ComposerResponseDto {
    const composer = this.composerRepository.getOne(id);
    const contact = this.contactService.getContactById(composer.id);
    return {
      ...composer,
      contact
    }
  }

  getContacts(id: number): ComposerContactReponseDto {
    return { contacts: this.contactService.getContactById(id) }
  }

  search(dto: ComposerSearchDto): ComposerListResponseDto {
    return {
      list: this.addContacts(this.composerRepository.search(dto)),
    }
  }

  private addContacts(composers: Composer[]): ComposerResponseDto[] {
    return composers.map(composer => ({ ...composer, contact: this.contactService.getContactById(composer.id)}))
  }
}
