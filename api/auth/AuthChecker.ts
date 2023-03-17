import type { AuthChecker } from "type-graphql";
import type User from "../db/models/User";

interface Context {
	token?: string;
}

// create auth checker function
export const authChecker: AuthChecker<Context> = (
	{ context: { token } },
	roles
) => {
	console.log(token);
	return false;
/*
	if (roles.length === 0) {
		// if `@Authorized()`, check only if user exists
		return user !== undefined;
	}
	// there are some roles defined now

	if (!user) {
		// and if no user, restrict access
		return false;
	}

	if (user.roles.some((role) => roles.includes(role))) {
		// grant access if the roles overlap
		return true;
	}

	// no roles matched, restrict access
	return false;*/
};
