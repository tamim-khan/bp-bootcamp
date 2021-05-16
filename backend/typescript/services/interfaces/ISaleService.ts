import { SaleItem } from "../../models/sale.model";

export type SaleRequestDTO = {
  [key: string]: number;
};

// Example SaleRequestDTO
// {
//   "productId1": 5,
//   "productId2": 3
// }

export interface SaleResponseDTO {
  items: [SaleItem];
}

export interface ISaleService {
  /**
   * retrieve the X most recent sales
   * @param
   * @returns returns array of Sales
   * @throws Error if retrieval fails
   */
  getSales(quantity: number): Promise<SaleResponseDTO[]>;

  /**
   * create an Entity with the fields given in the DTO, return created Entity
   * @param sale data
   * @returns the created sale
   * @throws Error if creation fails
   */
  createSale(sale: SaleRequestDTO): Promise<void>;
}
