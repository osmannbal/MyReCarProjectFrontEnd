import { TokenModel } from "./tokenModel";

export interface User extends TokenModel{
    userId:number;
    firstName:string;
    lastName:string;
    email:string;
}