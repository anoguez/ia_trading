import * as fs from "fs";
import * as dotenv from "dotenv";

(() => {
  const configFile = `config/.${process.env.DEPLOYCONTEXT || "dev"}.env`;
  if (!fs.existsSync(configFile)) {
    throw new Error(`Config file "${configFile}" not found.`);
  }
  dotenv.config({ path: configFile });
})();

import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { LogService } from "./_core/log/log.service";
import { LogInterceptor } from "./_core/log/log.interceptor";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(LogService));
  app.useGlobalInterceptors(app.get(LogInterceptor));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );
  
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  if (process.env.NODE_ENV !== "prod") {
    const options = new DocumentBuilder()
      .setTitle("IA Trading")
      .setDescription("IA trading")
      .setVersion("1.0")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("docs", app, document);
  }

  await app.listen(80);
}

bootstrap().catch(err => {
  // tslint:disable-next-line
  console.error(err);
  process.exit(-1);
});
