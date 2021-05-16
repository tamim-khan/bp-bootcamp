import { Router } from "express";
import ProductService from "../services/implementations/productService";
import { IProductService } from "../services/interfaces/IProductService";

const productRouter: Router = Router();

const productService: IProductService = new ProductService();

/* Get all entities */
productRouter.get("/", async (_req, res) => {
  try {
    const entities = await productService.getProducts();
    res.status(200).json(entities);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const newEntity = await productService.createProduct(req.body);
    res.status(200).json(newEntity);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

/* Get entity by id */
// productRouter.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const entity = await productService.getProduct(id);
//     res.status(200).json(entity);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

export default productRouter;
