import "reflect-metadata"
import { buildSchema } from "type-graphql"
import express from "express"
import { graphqlHTTP } from "express-graphql"
import { UsersResolver } from "./users.resolvers"
import { RoleResolver } from "./roles.resolvers"
import cors from "cors";
import {adminJs} from "./db/db";
import AdminJSExpress from '@adminjs/express'
import { authChecker } from "./auth/AuthChecker";
import jwt from "jsonwebtoken";
import bodyParser from 'body-parser';
import User from "./db/models/User"
import bcrypt from "bcrypt";

async function main() {
    const schema = await buildSchema({
        validate: {
            forbidUnknownValues: false
        },
        resolvers: [UsersResolver, RoleResolver],
        emitSchemaFile: true,
        authChecker: authChecker
    })

    const app = express();

    app.use( cors() );
    app.use(bodyParser.json());
    const router = AdminJSExpress.buildRouter(adminJs)
    app.use(adminJs.options.rootPath, router)
    app.use(
        '/graphql',
        graphqlHTTP(async (req, next) => ({
          schema,
          graphiql: true,
          context: ((req) => {
            return {token: req.headers.authorization};
          })(req)
        })),
    );

    app.post("/login", async (req, res) => {
        console.log(req.body);
        if(req.body.username && req.body.password) {
            const u = await User.findOneBy({name: req.body.username});
            console.log(u);
            if(u) {
                if(bcrypt.compareSync(req.body.password, u.password)) {
                    res.json({token: jwt.sign({ username: u.name, role: u.role }, "shhhhh")});
                } else {
                    res.status(400).json({error: "Wrong credentials!"});
                }
            } else {
                res.status(400).json({error: "Wrong credentials!"});
            }
        } else {
            res.status(400).json({error: "Wrong credentials!"});
        }
    })

    app.listen(8000)

    console.log("Running a GraphQL API server at http://localhost:8000/graphql")
}

main()