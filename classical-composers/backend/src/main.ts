import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {VersioningType} from "@nestjs/common";
import {CURRENT_VERSION} from "./consts";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableVersioning({
		type: VersioningType.URI,
	});

	const config = new DocumentBuilder()
		.setTitle("Test task Composers")
		.setDescription("API")
		.setVersion(CURRENT_VERSION)
		.addTag('API')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(8080);
}

bootstrap();
