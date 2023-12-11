import { db } from "../connection";

export default class  DbService{
    static get employeeBasicDetailCollection(){
        return db?.collection('employeeBasicDetail')
    }
    static get employeeAttandanceCollection(){
        return db?.collection('employeesAttandance')
    }
    static get employeeRequests(){
        return db?.collection('employeeRequests')
    }
}