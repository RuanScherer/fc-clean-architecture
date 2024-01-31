import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list products use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product1 = ProductFactory.create("a", "iPhone", 5000);
    await productRepository.create(product1 as Product);

    const product2 = ProductFactory.create("a", "Apple Watch", 2000);
    await productRepository.create(product2 as Product);

    const output = await usecase.execute({});

    expect(output.products).toEqual([
      {
        id: product1.id,
        name: "iPhone",
        price: 5000,
      },
      {
        id: product2.id,
        name: "Apple Watch",
        price: 2000,
      },
    ]);
  });
});
