import { Car } from "./car";

export interface CarResponseModel{
    data:Car[],
    success:boolean,
    message:string
}