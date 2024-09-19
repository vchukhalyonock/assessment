import { Module } from '@nestjs/common';
import { ComposerService } from './composer.service';
import { ComposerController } from './composer.controller';
import {ComposerRepository} from "./composer.repository";
import {ContactModule} from "../contact/contact.module";

@Module({
  controllers: [ComposerController],
  imports: [ContactModule],
  providers: [ComposerService, ComposerRepository],
})
export class ComposerModule {}
