import CreateProductUseCase from "./create.customer.usecase";

let input: {
  name: string
  price: number
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test create product use case', () => {
  beforeEach(() => {
    input = {
      name: "Notebook",
      price: 100
    };
  })

  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  })

  it("should throw an error when id is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "";
    expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  })

  it("should throw an error when price is equal to or lower than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.price = -1;
    expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
  })
})