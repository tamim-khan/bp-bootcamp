import { Router } from "express";
import {
  ISaleService,
  SaleRequestDTO,
} from "../services/interfaces/ISaleService";
import SaleService from "../services/implementations/SaleService";

const saleRouter: Router = Router();

const saleService: ISaleService = new SaleService();

/* Create a new sale */
saleRouter.post("/", async (req, res) => {
  const request: SaleRequestDTO = req.body;
  try {
    const newEntity = await saleService.createSale(request);
    res.status(201).json(newEntity);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/* Get previous sales */
saleRouter.get("/", async (req, res) => {
  const quantity = req.query.quantity as any;
  try {
    const sales = await saleService.getSales(quantity as number);
    res.status(200).json(sales);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default saleRouter;
