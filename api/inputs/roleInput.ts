import { InputType, Field } from "type-graphql";

@InputType()
export default class RoleInput {
    @Field(() => String)
    name: string
}