import { Customer } from "./customer";

export interface CustomerResponseModel{
    data:Customer[],
    success:boolean,
    message:string
}