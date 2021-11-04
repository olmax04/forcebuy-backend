import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('games')
export class Games {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  link: string;
}
