import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  PERMISSION,
  PermissionType,
} from './../../iam/authorization/constants/permission.constants';
import { ApiKey } from '../api-keys/entities/api-key.entity';
import { ROLE } from '../interfaces/role.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: ROLE, default: ROLE.REGULAR })
  role: ROLE;

  @Column({ enum: PERMISSION, default: [], type: 'json' })
  permissions: PermissionType[];

  @JoinTable()
  @OneToMany(() => ApiKey, (apiKey) => apiKey.user)
  apiKey: ApiKey[];
}
