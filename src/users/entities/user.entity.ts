import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
