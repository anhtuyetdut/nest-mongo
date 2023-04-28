export class CartItemDto {
  products: {
    product: string;
    number: Number;
  };
}

export class CartItemUpdateDto {
  cartId: string;

  number: number;
}
