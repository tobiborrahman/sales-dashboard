export interface Sale {
  _id: string;
  date: string;
  price: number;
  customerEmail: string;
  customerPhone: string;
}

export interface TotalSale {
  day: string;
  totalSale: number;
}

export interface PaginationData {
  before: string;
  after: string;
}

export interface DashboardData {
  results: {
    TotalSales: TotalSale[];
    Sales: Sale[];
  };
  pagination: PaginationData;
}

export type SortField = 'date' | 'price' | null;
export type SortDirection = 'asc' | 'desc';

export interface FilterParams {
  startDate: string;
  endDate: string;
  minPrice?: number;
  customerEmail?: string;
  customerPhone?: string;
}

export interface PageHistory {
  data: DashboardData;
  token?: string;
}