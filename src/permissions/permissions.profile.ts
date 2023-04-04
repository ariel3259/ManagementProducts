import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { PermissionsResponse } from './dto/permissions.response';
import { Injectable } from '@nestjs/common';
import { Permissions } from './permissions.model';

@Injectable()
export class PermissionsProfiles extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Permissions, PermissionsResponse);
    };
  }
}
