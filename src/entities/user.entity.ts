import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;
  @Column()
  @IsEmail()
  email: string;

  @Column()
  encryptedPassword?: string;

  @Column()
  role: string;
}
