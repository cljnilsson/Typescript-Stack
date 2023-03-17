import { InputType, Field } from "type-graphql";

@InputType()
export default class UserInput {
    @Field(() => String)
    name: string

    @Field(() => String)
    password: string

    @Field(() => String)
    role: string
}