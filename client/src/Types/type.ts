

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  offerPrice?: number;
  images: string[];
  category: string;
  subCategory?: string;
  sizes: string[];
  stock: number;
  rating: number;
  reviews: number;
  bestseller: boolean;
  isNew: boolean;
}

export interface CartItem {
    product:Product;
    selectedSize:string;
    quantity:number;
}

export interface Address {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  additionalPhone?: string; // optional

  label: string; // Home, Work, Office
  address: string;
  city: string;
  state: string;
  zip: string;

  isDefault: boolean;

  lat?: number;
  lng?: number;
}