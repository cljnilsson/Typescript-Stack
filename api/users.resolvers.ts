import { Query, Resolver, FieldResolver, Mutation, Arg, Root, UseMiddleware, Authorized} from "type-graphql"
import type {MiddlewareFn} from "type-graphql";
//import { UserInput, User } from "./users.schema"
import User from "./db/models/User";
import Role from "./db/models/Role";
import UserInput from "./inputs/userInput";
import db from "./db/db";
import bcrypt from 'bcrypt';
const saltRounds = 10;

@Resolver(() => User)
export class UsersResolver {
    /*@FieldResolver()
    getRoles(@Root() user: User) {
        return user.roles;
    }*/

    @Query(() => [User])
    @Authorized()
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

        u.password = bcrypt.hashSync(input.password, saltRounds);;
        u.name = input.name;

        const found = await Role.findOneByOrFail({name: input.role});
        u.role = found;
        await u.save();
        console.log(u);
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