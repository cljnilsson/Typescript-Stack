import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType, InputType, ID } from "type-graphql"

@Entity()
@ObjectType()
export default class CustomBase extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  created: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updated: Date;
}