import { Brand } from "./brand";

export interface BrandResponseModel{
    data:Brand[],
    success:boolean,
    message:string
}