import { AutoMap } from '@automapper/classes';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ underscored: true })
export class Roles extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @AutoMap()
  rolesId: number;

  @Column
  @AutoMap()
  description: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  createdBy: string;

  @Column
  updatedBy: string;

  @Column
  status: boolean;
}