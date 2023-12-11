import express,{Request,Response} from "express"
import EmployeeService from "../services/employeeServices";
import Joi from "joi";
// import DbService from "../services/dbServices";

const router = express.Router();

router.get("/",(req:Request,res:Response)=>{
    return res.status(200).json({"testing":"working"});
})

router.post("/created", async (req:Request,res:Response)=>{
    if(req.body == undefined) return res.status(400).json({msg:"Request Body is empty"})
    console.log("req",req,req.body)
    const joiSchema = Joi.object({
        name:Joi.string().required(),
        dateOfBirth:Joi.date().required(),
        designation:Joi.string().required()
    })
    const {error , value} = joiSchema.validate(req.body,{
        // stripUnknown:true
    });
    if(error) return res.status(400).json({msg:"Invalid Body"})
    try{
        // console.log("value",value,{...value},req.body,error)
       const response = await EmployeeService.joinNewEmployee({...value});
    //    console.log('empo',response)
        return res.status(200).json({msg:response})

    }catch(e){
        console.log("error",e);
        return res.status(400).json({msg:"Error : ",e})
    }
})


router.post("/arrived/:id",async (req:Request,res:Response)=>{
    const employee_id = req.params.id;
    try{
        const joiSchema = Joi.object({
            myRemarks:Joi.string(),
        })
        const {error,value} = joiSchema.validate(req.body);
        if(error) return res.status(400).json({msg:'Invalid Body'});
        const response = await EmployeeService.putTodayArrivalAttandance({id:employee_id,myRemarks:value.myRemarks})
        return res.status(200).json({msg:response})

    }
    catch(e){
        console.log("error",e);
        return res.status(400).json({msg:"Error : ",e})
    }
})

router.post("/left/:id",async (req:Request,res:Response)=>{
    const employee_id = req.params.id;
    try{
        const joiSchema = Joi.object({
            myRemarks:Joi.string(),
            todayAttandanceId:Joi.string().hex().length(24).required()
        })
        const {error,value} = joiSchema.validate(req.body);
        if(error) return res.status(400).json({msg:'Invalid Body'});
        const response = await EmployeeService.putTodayLeavingAttandance({...value,employee_id:employee_id})
        return res.status(200).json({msg:response})

    }
    catch(e){
        console.log("error",e);
        return res.status(400).json({msg:"Error : ",e})
    }
})

router.post("/requests/:id",async (req:Request,res:Response)=>{
    const employee_id = req.params.id;
    const joiSchema = Joi.object({
        typeOfRequest:Joi.string().required(), // we will put it in request at time of calling on click req for wfh
        message:Joi.string().required()
    })

    const {error,value} = joiSchema.validate(req.body,{
        stripUnknown:true
    })
    if(error) return res.status(400).json({msg:"Invalid Body"});
    try{   
        const response = EmployeeService.processEmployeeRequest({...value,employee_id:employee_id});
        return res.status(200).json({msg:response});
    }catch(e){
        console.log("error",e);
        return res.status(400).json({msg:"Error : ",e})
    }
})

export default router;