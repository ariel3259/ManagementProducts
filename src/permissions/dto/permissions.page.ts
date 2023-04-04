import { Page } from 'src/types/page';
import { Permissions } from '../permissions.model';

export class PermissionsPage extends Page<Permissions> {
  constructor(permissions: Permissions[], totalItems: number) {
    super(permissions, totalItems);
  }
}
