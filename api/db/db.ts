import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./models/User";
import Role from "./models/Role";
import Page from "./models/Page";
import { Database, Resource } from "@adminjs/typeorm";
import AdminJS from "adminjs";
import { validate } from 'class-validator'

Resource.validate = validate
AdminJS.registerAdapter({ Database, Resource })

const db = new DataSource({
	type: "sqlite",
	database: "./db.sqlite3",
	entities: [User, Role, Page],
	synchronize: true,
});

await db.initialize();

const adminJs = new AdminJS({
	// databases: [MyDataSource],
	resources: [
		{ resource: User, options: { parent: { name: "foobar" } } },
		{ resource: Role, options: { parent: { name: "foobar" } } },
		{ resource: Page, options: { parent: { name: "foobar" } } }
	],
	rootPath: "/admin",
});

export {adminJs, db};
export default db;
