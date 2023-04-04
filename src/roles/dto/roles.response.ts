import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class RolesResponse {
  @AutoMap()
  @ApiProperty()
  rolesId: number;
  @AutoMap()
  @ApiProperty()
  description: string;
}