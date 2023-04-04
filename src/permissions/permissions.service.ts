import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permissions } from './permissions.model';
import { WhereOptions } from 'sequelize';
import { Page } from 'src/types/page';
import { PermissionsPage } from './dto/permissions.page';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permissions)
    private readonly permissionsRepository: typeof Permissions,
  ) {}

  async getAll(offset?: number, limit?: number): Promise<Page<Permissions>> {
    const where: WhereOptions<Permissions> = {
      status: true,
    };
    const [permissions, totalItems]: [Permissions[], number] =
      await Promise.all([
        this.permissionsRepository.findAll({
          offset: offset ? offset : 0,
          limit: limit ? limit : 10,
          where,
        }),
        this.permissionsRepository.count({ where }),
      ]);
    return new PermissionsPage(permissions, totalItems);
  }
}
