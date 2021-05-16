export interface ProductRequestDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrls: [string];
}

export interface ProductResponseDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrls: [string];
}

export interface IProductService {
  /**
   * retrieve the Product with the given id
   * @param id Product id
   * @returns requested Product
   * @throws Error if retrieval fails
   */
  getProduct(id: string): Promise<ProductResponseDTO>;

  createProduct(product: ProductRequestDTO): Promise<ProductResponseDTO>;

  /**
   * retrieve all Products
   * @param
   * @returns returns array of Products
   * @throws Error if retrieval fails
   */
  getProducts(): Promise<ProductResponseDTO[]>;
}
