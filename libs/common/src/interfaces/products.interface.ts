// libs/product-common/src/interfaces/product.service.interface.ts
export interface IProductService {
  getProducts(): Promise<any>; // This can return a list of products (or any other structure)
}
