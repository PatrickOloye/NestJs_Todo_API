import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, ApiBearerAuth } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const usage = "Todo Api with tasks and Authentication. For usage on local host, please ensure that Mtsql server, mysql wrokbench or anyother datbase resource to connect to mysql server is used as MySql server DB APi DB is for the development of this APi"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('TODO API by SHAWN OLOYE')
    .setDescription(usage)
    .setVersion('1.0')
    .addTag('todo')
    .addBearerAuth()
    .setBasePath('/api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      
    }),
  )
  await app.listen(3000);
}
bootstrap();
