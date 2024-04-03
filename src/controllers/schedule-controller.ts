import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await prisma.schedule.findMany();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getScheduleById = async (req: Request, res: Response) => {
  try {
    const { unit, date, productCode } = req.params;
    const schedule = await prisma.schedule.findUnique({
      where: { Unit_Date_Charge_ProductCode: { Unit: unit, Date: new Date(date), Charge_ProductCode: productCode } }
    });
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const { Unit, Date: scheduleDate, Charge_ProductCode, Charge_ProductDesc, Qty } = req.body;
    const isoDate = new Date(scheduleDate).toISOString();
    const schedule = await prisma.schedule.create({
      data: {
        Unit,
        Date:isoDate,
        Charge_ProductCode,
        Charge_ProductDesc,
        Qty
      }
    });
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const { unit, date, productCode } = req.params;
    const { Unit,  Date: newDate, Charge_ProductCode, Charge_ProductDesc, Qty } = req.body;
    const schedule = await prisma.schedule.update({
      where: { Unit_Date_Charge_ProductCode: { Unit: unit, Date: new Date(date), Charge_ProductCode: productCode } },
      data: {
        Unit,
        Date: new Date(newDate),
        Charge_ProductCode,
        Charge_ProductDesc,
        Qty
      }
    });
    res.json(schedule);//Comments Test
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const { unit, date, productCode } = req.params;
    await prisma.schedule.delete({
      where: { Unit_Date_Charge_ProductCode: { Unit: unit, Date: new Date(date), Charge_ProductCode: productCode } }
    });
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
