import type { AuthChecker } from "type-graphql";
import User from "../db/models/User";
import jwt from "jsonwebtoken";

interface Context {
	token?: string;
}

export const authChecker: AuthChecker<Context> = async (
	{ context: { token } }
) => {
	console.log(token);
	if(!token) {
		return false;
	}

	try {
		const bearerToken = token?.split(" ")[1];
		if(bearerToken) {
			jwt.verify(bearerToken, "shhhhh");
			return true;
		} else {
			return false;
		}
	  } catch (err) {
		return false;
	  }

/*
	if (user.roles.some((role) => roles.includes(role))) {
		// grant access if the roles overlap
		return true;
	}
*/
};
