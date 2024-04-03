import  { Router, Request, Response } from "express";
import  {PrismaClient}  from "@prisma/client";
const prisma = new PrismaClient();
const unitChargeProducts = Router();

unitChargeProducts.get("/", async (req: Request, res: Response) => {

    const unitCharge = await prisma.unitChargeProducts.findMany();

    res.send(unitCharge);
  });
  
  unitChargeProducts.post('/', async (req, res) => {
    // Handle POST create user request
    try {
     
      const { Unit,Charge_ProductCode,Charge_ProductDesc,MaxDailyRate} = req.body;
  
      // Upsert item using Prisma
      const upsertedItem = await prisma.unitChargeProducts.upsert({
        where: { Unit_Charge_ProductCode: { Unit, Charge_ProductCode } }, // Specify the condition to find the item to update or insert
        update: { Unit,Charge_ProductCode,Charge_ProductDesc,MaxDailyRate:parseFloat(MaxDailyRate)}, // Data to update if the item exists
        create: { Unit,Charge_ProductCode,Charge_ProductDesc,MaxDailyRate:parseFloat(MaxDailyRate)} // Data to insert if the item does not exist
      });
  
      res.status(200).json({ message: 'Item upserted successfully', data: upsertedItem });
    } catch (error) {
      console.error('Error upserting item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  unitChargeProducts.put('/', (req, res) => {
    // Handle PUT create user request
  });


  unitChargeProducts.delete("/:Unit/:Charge_ProductCode",  async (req: Request, res: Response) => {
    const { Unit, Charge_ProductCode } = req.params;
    try {
      const deleteResult = await prisma.unitChargeProducts.delete({
        where: {
          Unit_Charge_ProductCode: {
            Unit,
            Charge_ProductCode,
          },
        },
      });
      res.json({
        message: "Blend requirement deleted successfully",
        deleteResult,
      });
    } catch (error) {
      res.status(404).json({ message: "Blend requirement not found" });
      // res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
  }
  );

  export default  unitChargeProducts;