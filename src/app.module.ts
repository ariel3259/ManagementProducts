import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PermissionsModule } from './permissions/permissions.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { Permissions } from './permissions/permissions.model';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/roles.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      port: parseInt(`${process.env.PORT}`),
      host: process.env.HOST,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      dialect: 'mssql',
      synchronize: false,
      models: [Permissions, Roles],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    PermissionsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
