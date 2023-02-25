import { Role } from "./role.enum";

export class User {
    username:string;
    password:string;
    role:Role;
    createdAt:string;
    email:string;
    fullName:string;
}
