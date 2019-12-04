export class Product {
  id: number = 0;
  name: string = '';
  category: string = '';
  code: string = '';
  price: number = 0;
  details?: Details[];
}

export class Details {
  id: number = 0;
  key: string = '';
  value: string = '';
  product_id: number = 0;
}
