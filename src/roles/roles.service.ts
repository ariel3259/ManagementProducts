import { Injectable } from '@nestjs/common';
import { Roles } from './roles.model';
import { InjectModel } from '@nestjs/sequelize';
import { Page } from 'src/types/page';
import { WhereOptions } from 'sequelize';
import { RolesPage } from './dto/roles.page';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles) private readonly rolesRepository: typeof Roles,
  ) {}

  async getAll(offset: number, limit: number): Promise<Page<Roles>> {
    const where: WhereOptions<Roles> = {
      status: true,
    };
    const [roles, totalItems]: [Roles[], number] = await Promise.all([
      this.rolesRepository.findAll({
        offset: offset ?? 0,
        limit: limit ?? 0,
        where,
      }),
      this.rolesRepository.count({ where }),
    ]);
    return new RolesPage(roles, totalItems);
  }

  async save(roles: Roles): Promise<Roles> {
    return await this.rolesRepository.create({ ...roles });
  }

  async update(roles: Roles, rolId: number): Promise<Roles> {
    await this.rolesRepository.update(
      {
        ...roles,
      },
      {
        where: {
          rolesId: rolId,
        },
      },
    );
    return roles;
  }

  async delete(rolId: number): Promise<void> {
    await this.rolesRepository.update(
      {
        status: false,
      },
      {
        where: {
          rolesId: rolId,
          status: true,
        },
      },
    );
  }
}
