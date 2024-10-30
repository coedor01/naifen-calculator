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

export interface ProductOut {
  id: number;
  brand: {
    id: number;
    name: string;
  };
  name: string;
  level: number;
  energy: number;
  weight: number;
  weightUnit: string;
  price: number;
}

export interface ReportOut {
  id: number;
  standard: string;
  product: ProductOut;
}
