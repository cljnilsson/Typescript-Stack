import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { Field, ObjectType, InputType, ID } from "type-graphql";
import {Min, Max, IsDate, max} from "class-validator";
import Role from "./Role";
import CustomBase from "./customBase";

@Entity()
@ObjectType()
export default class User extends CustomBase {
  @Column({})
  @Min(2)
  @Max(16)
  @Field(() => String)
  name: string;

  @Column()
  @Min(6)
  @Max(999)
  @Field(() => String)
  password: string;

  @Column()
  @Min(6)
  @Max(199)
  @Field(() => String)
  token: string = "";

  @ManyToOne(() => Role, role => role.users, {nullable: false, eager: true})
  @Field(() => Role)
  role: Role
}