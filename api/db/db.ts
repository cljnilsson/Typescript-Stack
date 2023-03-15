import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from './models/User';

const db = new DataSource({
	type: 'sqlite',
	database: './db.sqlite3',
	entities: [User],
	synchronize: true
})

db.initialize();
export default db;
