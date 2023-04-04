import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class PermissionsResponse {
  @AutoMap()
  @ApiProperty()
  permissionsId: number;
  @AutoMap()
  @ApiProperty()
  description: string;
}