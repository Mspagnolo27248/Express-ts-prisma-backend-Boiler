import  { Router, Request, Response } from "express";
import  {PrismaClient, UnitYields}  from "@prisma/client";
/**
 * @swagger
 * tags:
 *   name: UnitYields
 *   description: Operations related to unit yields
 * /unit-yields:
 *   get:
 *     summary: Retrieve all unit yields.
 *     description: Retrieve a list of all unit yields.
 *     tags: [UnitYields]
 *     responses:
 *       200:
 *         description: A list of unit yields.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UnitYield'
 *       500:
 *         description: Internal server error.
 *   post:
 *     summary: Create a new unit yield.
 *     description: Create a new unit yield record.
 *     tags: [UnitYields]
 *     responses:
 *       200:
 *         description: The newly created unit yield.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnitYield'
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Delete all unit yields.
 *     description: Delete all unit yield records.
 *     tags: [UnitYields]
 *     responses:
 *       200:
 *         description: Success message indicating deletion.
 *       500:
 *         description: Internal server error.
 * /unit-yields/{unit}/{chargeProductCode}/{finishedProductCode}:
 *   put:
 *     summary: Update unit yield.
 *     description: Update a unit yield record.
 *     tags: [UnitYields]
 *     parameters:
 *       - in: path
 *         name: unit
 *         required: true
 *         description: The unit associated with the unit yield.
 *         schema:
 *           type: string
 *       - in: path
 *         name: chargeProductCode
 *         required: true
 *         description: The charge product code associated with the unit yield.
 *         schema:
 *           type: string
 *       - in: path
 *         name: finishedProductCode
 *         required: true
 *         description: The finished product code associated with the unit yield.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UnitYield'
 *     responses:
 *       200:
 *         description: The updated unit yield.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnitYield'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UnitYield:
 *       type: object
 *       properties:
 *         Unit:
 *           type: string
 *         Charge_ProductCode:
 *           type: string
 *         Charge_ProductDesc:
 *           type: string
 *         Finished_ProductCode:
 *           type: string
 *         Finished_ProductDesc:
 *           type: string
 *         OutputPercent:
 *           type: number
 */


const prisma = new PrismaClient();
const unitYields = Router();


unitYields.route("/")
.get( async (req: Request, res: Response) => { 
  try {
    const data = await getUnitYields();
    res.status(200).json(data);
} catch (error) {
    res.status(500).json({ error: "Internal server error" });
}
  })
  
  .post((req, res) => {
    // Handle POST create user request
  })

  .delete( (req, res) => {
    // Handle DELETE create user request
  });

  unitYields.put("/:unit/:chargeProductCode/:finishedProductCode", async (req: Request, res: Response) => {
    try {
      const { unit, chargeProductCode, finishedProductCode } = req.params;
      const newData  = req.body; // Assuming the new data to be updated is sent in the request body
      const updatedUnitYields = await prisma.unitYields.update({
        where: {
          Unit_Charge_ProductCode_Finished_ProductCode: {
            Unit: unit,
            Charge_ProductCode: chargeProductCode,
            Finished_ProductCode: finishedProductCode
          }
        },
        data: { Unit:newData.Unit,
                Charge_ProductCode:newData.Charge_ProductCode,
                Charge_ProductDesc:newData.Charge_ProductDesc,
                Finished_ProductCode:newData.Finished_ProductCode,
                Finished_ProductDesc:newData.Finished_ProductDesc,
                OutputPercent:parseFloat(newData.OutputPercent)
               }, // Assuming newData is an object containing the fields to be updated
      });
      res.status(200).json(updatedUnitYields);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  


export default  unitYields;


//Database Contollers
async function getUnitYields(filter?:Partial<UnitYields>|null):Promise<UnitYields[]>{
  if(filter){
    return  await prisma.unitYields.findMany({where:filter});
  }
    return  await prisma.unitYields.findMany();  
    

}