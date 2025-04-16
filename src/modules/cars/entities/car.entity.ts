import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Car {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  brand: string;

  @Column({ type: 'varchar', length: 50 })
  model: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'int4', nullable: false })
  year: number;

  @Column({ type: 'int4', default: 0 }) //conteo de cantidad de nuestros carros.
  stock: number;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'bool', default: true })
  isAvailable: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updateAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleteAt?: Date;
}
