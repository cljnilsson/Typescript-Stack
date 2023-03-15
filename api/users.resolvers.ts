import { Query, Resolver, Mutation, Arg, UseMiddleware } from "type-graphql"
import type {MiddlewareFn} from "type-graphql";
//import { UserInput, User } from "./users.schema"
import User from "./db/models/User";
import UserInput from "./inputs/userInput";
import db from "./db/db";

@Resolver(() => User)
export class UsersResolver {
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        return User.find();
    }

    @Query(() => User)
    async getUser(@Arg("id") id: number): Promise<User | null> {
        return User.findOneBy({id: id})
    }

    @Mutation(() => User)
    async createUser(@Arg("input") input: UserInput): Promise<User> {
        const u = new User();
        u.email = input.email;
        u.name = input.name;
        await u.save();
        return u;
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