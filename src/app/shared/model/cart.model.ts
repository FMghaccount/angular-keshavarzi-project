import { Product } from './product.model';

export class CartItems {
  public amount: number;
  public item: Product;
  public price: number;
  // public isPaid: boolean;
  public title: string;
  // public expirationDate: Date;

  constructor(
    amount: number,
    item: Product,
    price: number,
    // isPaid: boolean,
    title: string
    // expirationDate: Date
  ) {
    this.title = title;
    this.item = item;
    this.price = price;
    // this.isPaid = isPaid;
    this.amount = amount;
    // this.expirationDate = expirationDate;
  }
}
