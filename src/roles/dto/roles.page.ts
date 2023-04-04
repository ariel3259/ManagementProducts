import { Page } from 'src/types/page';
import { Roles } from '../roles.model';

export class RolesPage extends Page<Roles> {
  constructor(roles: Roles[], totalItems: number) {
    super(roles, totalItems);
  }
}