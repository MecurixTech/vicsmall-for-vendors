export type review = {
  id: number;
  type: string;
  product: {
    name: string;
    category: string;
    imgSrc: string;
  };
  rating: number;
  reviewMessage: string;
  submittedOn: string;
  customer: string;
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
