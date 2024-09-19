import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComposerService } from './composer.service';
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CURRENT_VERSION} from "../consts";
import {ComposerListResponseDto} from "./dto/composer-list-response.dto";
import {ComposerResponseDto} from "./dto/composer-response.dto";
import {ComposerContactReponseDto} from "./dto/composer-contact-reponse.dto";

@Controller({
  path: 'composer',
  version: [CURRENT_VERSION],
})
@ApiTags('Composer')
export class ComposerController {
  constructor(private readonly composerService: ComposerService) {}

  @Get()
  @ApiOkResponse({ type: ComposerListResponseDto, description: 'Get all composers' })
  findAll(): ComposerListResponseDto {
    return this.composerService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ComposerResponseDto })
  findOne(@Param('id') id: string): ComposerResponseDto {
    return this.composerService.findOne(+id);
  }

  @Get(':id/contacts')
  @ApiOkResponse({ type: ComposerContactReponseDto })
  getContacts(@Param('id') id: string): ComposerContactReponseDto {
    return this.composerService.getContacts(+id);
  }
}
