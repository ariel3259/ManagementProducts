import { AutoMap } from '@automapper/classes';

export class RolesRequest {
  @AutoMap()
  description: string;
}