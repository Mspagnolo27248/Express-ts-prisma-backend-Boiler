
import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const productsRouter = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The product ID
 *                   name:
 *                     type: string
 *                     description: The product name
 *                   price:
 *                     type: number
 *                     description: The product price
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name
 *               price:
 *                 type: number
 *                 description: The product price
 *     responses:
 *       '200':
 *         description: The updated product
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Product not found
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     responses:
 *       '204':
 *         description: Product deleted
 *       '404':
 *         description: Product not found
 */

productsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const products = await prisma.products.findMany();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

productsRouter.put('/', (req, res) => {

});



productsRouter.delete('/', (req, res) => {

});

export default productsRouter;
