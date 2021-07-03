import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

interface IUser {
  id?: string;
  username: string;
  password: string;
}

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @Column({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  constructor(props: IUser) {
    super();
    Object.assign(this, props);
  }

  @BeforeInsert()
  private beforeInsert = () => {
    this.id = this.id ? this.id : uuid();
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
  };

  @BeforeUpdate()
  private beforeUpdate = () => {
    this.updatedAt = new Date(Date.now());
  };
}
