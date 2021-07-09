import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common"
import { AppModule } from './app.module';
import * as config from 'config'; // then we can retrieve individual or entire value as object


async function bootstrap() {
  const logger = new Logger("bootstrap") //1st arg is context, bootstrap because functionality
  // logger.warn, logger.debug , logger.verbose and etc
  const app = await NestFactory.create(AppModule);

  if(process.env.NODE_ENV === "development"){
    app.enableCors()
  } //package json da ise start:dev scriptinin onune NODE_ENV=development ekledik 
  
  const serverConfig = config.get("server")// default.yml deki server degerini okuur
  // console.log(serverConfig) //{ port:3000}
  // console.log(config.get("db"))
  const PORT = process.env.PORT || serverConfig.port
  // to provide predefined env variable would be like
  // PORT=3005 yarn start:dev

  await app.listen(PORT);
  logger.log(`Application is listening on port ${PORT}`)
}
bootstrap();
