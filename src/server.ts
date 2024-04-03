// src/index.js
import express from "express";
import  dotenv from "dotenv";
import  {PrismaClient}  from "@prisma/client";
import router from "./routes/router";
import cors from 'cors';
import { swaggerSpec } from './swaggerConfig'
import swaggerUi from 'swagger-ui-express';

const prisma = new PrismaClient();
dotenv.config();
const app= express();
const port = process.env.PORT || 8001;
app.use(cors());
app.use('/api-docs', 
swaggerUi.serve, swaggerUi.setup(swaggerSpec,{explorer:true}));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Middleware to parse JSON request bodies globally
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});