import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

interface IScrap {
  id?: string;
  title: string;
  description: string;
  userId: string;
}

@Entity({ name: "scraps" })
export class Scrap extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: "50" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @Column({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @ManyToOne<User>(() => User, user => user.scraps)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  constructor(props: IScrap) {
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
