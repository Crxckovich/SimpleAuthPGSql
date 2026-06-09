import type {IRole} from "../../role/interfaces/role.interface.ts";

export interface IUser {
    username: string;
    password: string;
    roles: IRole[];
}