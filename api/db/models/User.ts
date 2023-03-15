import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, ObjectType, InputType, ID } from "type-graphql"

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  email: string;
}