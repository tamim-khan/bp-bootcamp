import mongoose from "mongoose";
import SaleEntity, { Sale, SaleItem } from "../../models/sale.model";
import ProductEntity, { Product } from "../../models/product.model";
import {
  ISaleService,
  SaleRequestDTO,
  SaleResponseDTO,
} from "../interfaces/ISaleService";

class SaleService implements ISaleService {
  async getSales(quantity: number): Promise<SaleResponseDTO[]> {
    const sales = await SaleEntity.find()
      .sort({ date: -1 })
      .limit(quantity)
      .map((entity) => ({
        items: entity.items,
      })); // sorts by date in desc order
    return [sales];
  }

  async createSale(sale: SaleRequestDTO): Promise<void> {
    let entity: Sale;

    const saleItems: SaleItem[] = [];

    Object.keys(sale).map(function (key, index) {
      saleItems.push({
        productId: key,
        quantity: sale[key],
      });
    });

    if (saleItems.length > 1) {
      // @ts-ignore
      entity.items = saleItems;
    } else {
      throw new Error(`No SaleItems provided`);
    }

    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      for (const saleItem of saleItems) {
        const product: Product | null = await ProductEntity.findById(saleItem.productId, { session });
        if (product == null) {
          throw new Error(`Cannot find product with id=${saleItem.productId}`);
        }
        if (product.quantity < saleItem.quantity) {
          throw new Error(`Insufficient product quantity`);
        } else {
          product.quantity -= saleItem.quantity;
          product?.save({ session });
        }
      }
      SaleEntity.create([entity], { session });
    });
    session.endSession();
  }
}

export default SaleService;
