import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ComposerModule } from './composer/composer.module';
import { ContactModule } from './contact/contact.module';

@Module({
	imports: [ComposerModule, ContactModule],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {
}
