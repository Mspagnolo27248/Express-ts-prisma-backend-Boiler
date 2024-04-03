import { Router, Request, Response } from "express";
import { BlendRequirements, PrismaClient } from "@prisma/client";
/**
 * @swagger
 * tags:
 *   name: BlendRequirements
 *   description: Operations related to blend requirements
 *
 * /blend-requirements:
 *   get:
 *     summary: Retrieve all blend requirements.
 *     description: Retrieve a list of all blend requirements.
 *     tags: [BlendRequirements]
 *     responses:
 *       200:
 *         description: A list of blend requirements.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlendRequirement'
 *       500:
 *         description: Internal server error.
 *
 *   post:
 *     summary: Create a new blend requirement.
 *     description: Create a new blend requirement record.
 *     tags: [BlendRequirements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlendRequirement'
 *     responses:
 *       201:
 *         description: The newly created blend requirement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlendRequirement'
 *       500:
 *         description: Internal server error.
 *
 * /blend-requirements/{FinishedProductCode}/{ComponentProductCode}:
 *   delete:
 *     summary: Delete a specific blend requirement.
 *     description: Delete a blend requirement record based on the finished and component product codes.
 *     tags: [BlendRequirements]
 *     parameters:
 *       - in: path
 *         name: FinishedProductCode
 *         required: true
 *         description: The finished product code of the blend requirement to be deleted.
 *         schema:
 *           type: string
 *       - in: path
 *         name: ComponentProductCode
 *         required: true
 *         description: The component product code of the blend requirement to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success message indicating the blend requirement was deleted.
 *       404:
 *         description: Blend requirement not found.
 *       500:
 *         description: Internal server error.
 *
 *   put:
 *     summary: Update blend requirement.
 *     description: Update a blend requirement record.
 *     tags: [BlendRequirements]
 *     parameters:
 *       - in: path
 *         name: FinishedProductCode
 *         required: true
 *         description: The finished product code associated with the blend requirement.
 *         schema:
 *           type: string
 *       - in: path
 *         name: ComponentProductCode
 *         required: true
 *         description: The component product code associated with the blend requirement.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlendRequirement'
 *     responses:
 *       200:
 *         description: The updated blend requirement.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlendRequirement'
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     BlendRequirement:
 *       type: object
 *       properties:
 *         Finished_ProductCode:
 *           type: string
 *         Component_ProductCode:
 *           type: string
 *         Finished_ProductDesc:
 *           type: string
 *         Component_ProductDesc:
 *           type: string
 *         BlendPercent:
 *           type: number
 */

const prisma = new PrismaClient();
const blendRequirements = Router();

blendRequirements
  .route("/")

  .get(async (req: Request, res: Response) => {
    const blendRequirements = await prisma.blendRequirements.findMany();
    res.send(JSON.stringify(blendRequirements));
  })

  .post(async (req: Request, res: Response) => {
    try {
      const blendRequirementData = req.body;
      const createdBlendRequirement = await prisma.blendRequirements.create({
        data: {
          Finished_ProductCode: blendRequirementData.Finished_ProductCode,
          Component_ProductCode: blendRequirementData.Component_ProductCode,
          Finished_ProductDesc: blendRequirementData.Finished_ProductDesc,
          Component_ProductDesc: blendRequirementData.Component_ProductDesc,
          BlendPercent: parseFloat(blendRequirementData.BlendPercent),
        },
      });
      res.status(201).json(createdBlendRequirement);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Internal server error",
          error: (error as Error).message,
        });
    }
  });

blendRequirements.delete(
  "/:FinishedProductCode/:ComponentProductCode",
  async (req: Request, res: Response) => {
    const { FinishedProductCode, ComponentProductCode } = req.params;
    try {
      const deleteResult = await prisma.blendRequirements.delete({
        where: {
          Finished_ProductCode_Component_ProductCode: {
            Finished_ProductCode: FinishedProductCode,
            Component_ProductCode: ComponentProductCode,
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

blendRequirements.put(
  "/:FinishedProductCode/:ComponentProductCode",
  async (req, res) => {
    try {
      const { FinishedProductCode, ComponentProductCode } = req.params;
      const newData = req.body;
      const updatedData = await prisma.blendRequirements.update({
        where: {
          Finished_ProductCode_Component_ProductCode: {
            Finished_ProductCode: FinishedProductCode,
            Component_ProductCode: ComponentProductCode,
          },
        },
        data: {
          Finished_ProductCode: newData.Finished_ProductCode,
          Component_ProductCode: newData.Component_ProductCode,
          Finished_ProductDesc: newData.Finished_ProductDesc,
          Component_ProductDesc: newData.Component_ProductDesc,
          BlendPercent: parseFloat(newData.BlendPercent),
        }, // Assuming newData is an object containing the fields to be updated
      });
      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default blendRequirements;
