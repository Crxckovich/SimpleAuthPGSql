import { drizzle } from 'drizzle-orm/postgres-js';
import { dbCredentialsString } from '../../drizzle.config';
import * as usersSchema from "../user/user.schema.ts"
import * as rolesSchema from "../role/role.schema.ts"

export const db = drizzle(dbCredentialsString, {
    schema: {
        ...usersSchema,
        ...rolesSchema,
    },
    logger: true,
});