import { Rental } from "./rental";

export interface RentalResponseModel{
    data:Rental[],
    success:boolean,
    message:string
}