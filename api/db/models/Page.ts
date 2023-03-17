import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ObjectType, InputType, ID } from "type-graphql"
import CustomBase from "./customBase";

@Entity()
@ObjectType()
export default class Page extends CustomBase {
  @Column()
  @Field(() => String)
  post: string;
}