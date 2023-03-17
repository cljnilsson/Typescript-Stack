import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { Field, ObjectType, InputType, ID } from "type-graphql";
import User from "./User";
import CustomBase from "./customBase";

@Entity()
@ObjectType()
export default class Role extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: number;

	@Column()
	@Field(() => String)
	name: string;

	@Field(() => [User])
	@OneToMany((type) => User, (user) => user.role)
	users: User[];
}
