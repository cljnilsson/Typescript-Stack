import { Query, Resolver, FieldResolver, Mutation, Arg, Root, UseMiddleware} from "type-graphql"
import type {MiddlewareFn} from "type-graphql";
//import { UserInput, User } from "./users.schema"
import User from "./db/models/User";
import Role from "./db/models/Role";
import RoleInput from "./inputs/roleInput";
import db from "./db/db";

@Resolver(() => Role)
export class RoleResolver {
    @Query(() => [Role])
    async getRoles(): Promise<Role[]> {
        return Role.find();
    }

    @Query(() => Role)
    async getRole(@Arg("id") id: number): Promise<Role | null> {
        return Role.findOneBy({id: id})
    }

    @Mutation(() => Role)
    async createRole(@Arg("input") input: RoleInput): Promise<Role> {
        const r = new Role();
        r.name = input.name;
        await r.save();
        return r;
    }
    /*
    @Mutation(() => User)
    async updateUser(
        @Arg("id") id: number,
        @Arg("input") input: UserInput
    ): Promise<User> {
        const user = this.users.find(u => u.id === id)
        
        if (!user) {
            throw new Error("User not found")
        }

        const updatedUser = {
            ...user,
            ...input,
        }

        this.users = this.users.map(u => (u.id === id ? updatedUser : u))

        return updatedUser
    }*/
}