import  { Router, Request, Response } from "express";
import  {PrismaClient}  from "@prisma/client";
import { createSchedule, updateSchedule } from "../controllers/schedule-controller";
const prisma = new PrismaClient();
const schedule = Router();

schedule.get("/", async (req: Request, res: Response) => {

    const  data = await prisma.schedule.findMany();
    res.send(JSON.stringify(data));
  });
  
 
  schedule.post('/', createSchedule);


  schedule.put('/:unit/:date/:productCode', updateSchedule);


  schedule.delete('/', (req, res) => {
    // Handle DELETE create user request
  });

  ;

  export default schedule;