import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permissions } from './permissions.model';
import { PermissionsProfiles } from './permissions.profile';

@Module({
  imports: [SequelizeModule.forFeature([Permissions])],
  providers: [PermissionsService, PermissionsProfiles],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
