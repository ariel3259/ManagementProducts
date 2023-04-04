import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  fromValue,
  ignore,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs'
import { Roles } from './roles.model';
import { RolesRequest } from './dto/roles.request';
import { RolesResponse } from './dto/roles.response';

export class RolesProfile extends AutomapperProfile {

  constructor(@InjectMapper() readonly mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      //Creating map for RolesResponse from Roles
      createMap(mapper, Roles, RolesResponse);
      //Creating map for Roles from RolesRequest
      createMap(
        mapper,
        RolesRequest,
        Roles,
        forMember((dest) => dest.status, fromValue(true)),
        forMember((dest) => dest.createdAt, fromValue(new Date())),
        forMember((dest) => dest.updatedAt, fromValue(new Date())),
        forMember((dest) => dest.createdBy, fromValue('Test')),
        forMember((dest) => dest.updatedBy, fromValue('Test')),
        forMember((dest) => dest.rolesId, ignore()),
      );

    };
  }
}
