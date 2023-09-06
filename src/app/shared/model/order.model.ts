import { State } from '../store/cart/reducer/cart.reducer';

export class Order {
  constructor(
    public id: string,
    public refId: string,
    public expirationTime: string,
    public cart: State[],
    public isPaid: boolean
  ) {}
}
