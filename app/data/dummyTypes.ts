export type Review = {
  id: number;
  product_name: string;
  customer_name: string;
  rating: number;
  review: string;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  about_me: string;
  store_name: string;
  is_vendor: boolean;
};

export type Invoice = {
  order_id: string;
  customer_email: string;
  amount: string;
  status: string;
  created_at: string;
};

export type Order = {
  order_id: string;
  customer: string;
  amount: string;
  status: string;
  created_at: string;
};
