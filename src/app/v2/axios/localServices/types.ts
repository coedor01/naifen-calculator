export interface Product {
  name: string;
  level: number;
  energy: number;
  weightUnit: string;
  weight: number;
  price: number;
  brandId?: number | null;
  newBrandName?: string | null;
  needNewBrand: boolean;
}

export interface ReportDetail {
  type: string;
  element: string;
  content: number;
  minContent: number;
  maxContent: number;
  cmp: number;
}

export interface ReportIn {
  standard: string;
  product: Product;
  details: ReportDetail[];
}
