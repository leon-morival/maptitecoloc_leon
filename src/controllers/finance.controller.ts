import { Request, Response } from "express";
import { FinanceService } from "../services/finance.service";

const financeService = new FinanceService();

export const addCharge = async (req: Request, res: Response): Promise<void> => {
  try {
    const { description, amount, colocId, paidById, date } = req.body;
    const finance = await financeService.addCharge(
      description,
      amount,
      colocId,
      paidById,
      new Date(date)
    );
    res.status(201).json(finance);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error adding charge", error });
  }
};

export const getFinanceHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { colocId } = req.params;
    const finances = await financeService.getFinanceHistory(Number(colocId));
    res.json(finances);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error fetching finance history", error });
  }
};
