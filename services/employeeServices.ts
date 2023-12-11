import { ObjectId } from "mongodb";
import { db } from "../connection";
import DbService from "./dbServices";

export default class EmployeeService{
    static async joinNewEmployee(payload:{name:string,dateOfBirth:Date,designation:string}){
        // db?.collection('').insertOne();
        console.log("data",payload)
        await DbService.employeeBasicDetailCollection?.insertOne({
            name:payload.name,
            dateOfBirth:payload.dateOfBirth,
            designation:payload.designation,
            dateOfJoining: new Date(),
            // _id: new ObjectId()
        })

        return "Created Employee"
    }


    static async putTodayArrivalAttandance(payload:{
        id: ObjectId
        myRemarks:string
    }){
        await DbService.employeeAttandanceCollection?.insertOne({
            // _id:new ObjectId,
            employee_id: payload.id,
            arrived_at : new Date(),
            myArrivalRemarks : payload.myRemarks
        })
        return "Inserted Arrival"
    }

    static async putTodayLeavingAttandance(payload:{
        employee_id: ObjectId
        myRemarks:string,
        todayAttandanceId:ObjectId
    }){
        await DbService.employeeAttandanceCollection?.updateOne({_id:payload.todayAttandanceId},[{$set:{
            left_at : new Date(),
            myLeavingRemarks: payload.myRemarks
        }}])
        return "Inserted Arrival"
    }

    static async processEmployeeRequest(payload:{
        employee_id:ObjectId,
        typeOfRequest:string,
        message:string,
    }){
        await DbService.employeeRequests?.insertOne({

            employee_id: new ObjectId(payload.employee_id),
            typeOfRequest:payload.typeOfRequest,
            message:payload.message,
            status:'Draft'
        })

        return 'Request Raised'

    }
}