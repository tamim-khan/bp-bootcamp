import SaleEntity, { Sale, SaleItem } from "../../models/sale.model";
import {
  ISaleService,
  SaleRequestDTO,
  SaleResponseDTO,
} from "../interfaces/ISaleService";
import Logger from "../../utilities/logger";

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
  }
}

export default SaleService;
