// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe())
//   const config = new DocumentBuilder()
//   .setTitle('instafusion Apps')
//   .setDescription('The instafusion Api Description')
//   .setVersion('1.0')
//   .addBearerAuth(
//     { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
//     'access-token',
//   )
//   .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('swagger', app, document);
//   await app.listen(3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Updated import statements

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());

  // Create Swagger configuration using the DocumentBuilder
  const config = new DocumentBuilder()
    .setTitle('Instafusion Apps')
    .setDescription('The instafusion API Description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  // Generate the Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI at the '/swagger' endpoint
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();