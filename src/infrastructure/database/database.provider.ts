import { drizzle } from "drizzle-orm/postgres-js";
import { dbCredentialsString } from "../../../drizzle.config.ts";
import * as usersSchema from "./schemas/user/user.schema.ts";
import * as rolesSchema from "./schemas/user/role.schema.ts";

export const db = drizzle(dbCredentialsString, {
  schema: {
    ...usersSchema,
    ...rolesSchema,
  },
  logger: true,
});
