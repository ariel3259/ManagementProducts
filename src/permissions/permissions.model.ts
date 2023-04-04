import { Column, Model, Table } from 'sequelize-typescript';
import { AutoMap } from '@automapper/classes'

@Table({ underscored: true })
export class Permissions extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  @AutoMap()
  permissionsId: number;
 
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