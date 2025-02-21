import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { CatalogoService } from './contact/catalogo.service';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Cargar variables de entorno

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: 64441,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        synchronize: false, 
        options: { encrypt: false }, 
        autoLoadEntities: true, 
      }),
    }),
  ],
  providers: [ContactService, CatalogoService, DatabaseService],
  controllers: [ContactController],
})
export class AppModule {}