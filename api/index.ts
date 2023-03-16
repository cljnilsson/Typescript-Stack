import "reflect-metadata"
import { buildSchema } from "type-graphql"
import express from "express"
import { graphqlHTTP } from "express-graphql"
import { UsersResolver } from "./users.resolvers"
import cors from "cors";
import {adminJs} from "./db/db";
import AdminJSExpress from '@adminjs/express'

async function main() {
    const schema = await buildSchema({
        validate: {
            forbidUnknownValues: false
        },
        resolvers: [UsersResolver],
        emitSchemaFile: true,
    })

    const app = express();

    app.use( cors() );
    const router = AdminJSExpress.buildRouter(adminJs)
    app.use(adminJs.options.rootPath, router)
    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schema,
            graphiql: true,
        })
    )

    app.listen(8000)

    console.log("Running a GraphQL API server at http://localhost:8000/graphql")
}

main()