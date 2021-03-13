import { Color } from "./color";

export interface ColorResponseModel{
    data:Color[],
    success:boolean,
    message:string
}