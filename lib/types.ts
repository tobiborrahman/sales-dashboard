export interface Sale {
  id: string;
  date: string;
  price: number;
  email: string;
  phone: string;
  totalSales: number;
}

export interface SalesResponse {
  items: Sale[];
  before?: string;
  after?: string;
}
