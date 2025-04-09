import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = 5001;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', 
    methods: 'GET,POST,PATCH,DELETE',  
  });
  await app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
}
bootstrap();
