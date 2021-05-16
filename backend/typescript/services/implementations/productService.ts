import ProductEntity, { Product } from "../../models/product.model";
import Logger from "../../utilities/logger";
import {
  IProductService,
  ProductResponseDTO,
  ProductRequestDTO,
} from "../interfaces/IProductService";

class ProductService implements IProductService {
  async createProduct(product: ProductRequestDTO): Promise<ProductResponseDTO> {
    let newEntity: Product | null;
    try {
      newEntity = await ProductEntity.create(product);
    } catch (error) {
      Logger.error(`Failed to create product. Reason = ${error.message}`);
      throw error;
    }
    return {
      id: newEntity._id.toString(),
      name: newEntity.name,
      description: newEntity.description,
      price: newEntity.price,
      quantity: newEntity.quantity,
      imageUrls: newEntity.imageUrls,
    };
  }

  async getProducts(): Promise<ProductResponseDTO[]> {
    try {
      const entities: Array<Product> = await ProductEntity.find();
      return entities.map((entity) => ({
        id: entity._id.toString(),
        name: entity.name,
        description: entity.description,
        price: entity.price,
        quantity: entity.quantity,
        imageUrls: entity.imageUrls,
      }));
    } catch (error) {
      Logger.error(`Failed to get entities. Reason = ${error.message}`);
      throw error;
    }
  }

  async getProduct(id: string): Promise<ProductResponseDTO> {
    let entity: Product | null;
    try {
      entity = await ProductEntity.findById(id);
      if (!entity) {
        throw new Error(`Entity id ${id} not found`);
      }
    } catch (error) {
      Logger.error(`Failed to get entity. Reason = ${error.message}`);
      throw error;
    }

    return {
      id: entity._id.toString(),
      name: entity.name,
      description: entity.description,
      price: entity.price,
      quantity: entity.quantity,
      imageUrls: entity.imageUrls,
    };
  }
}

export default ProductService;
