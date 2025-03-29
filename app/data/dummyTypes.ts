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

type DailySale = {
  date: string;
  total_sales: number;
};

type SaleByCategory = {
  category_name: string;
  total_sales: number;
};

type TopProduct = {
  product_name: string;
  total_sales: number;
};

export type Dashboard = {
  total_product_ordered: number;
  total_revenue: number;
  sales_by_category: SaleByCategory[];
  top_products: TopProduct[];
  daily_sales: DailySale[];
  total_products: number;
};

type Product = {
  product_id: string;
  items: [
    {
      product_image: string;
    },
  ];
  product_name: string;
  product_description: string;
  product_tags: string;
  product_sale_price: string;
  product_regular_price: string;
  product_visibility: boolean;
  product_status: boolean;
  product_variant: string;
  created_at: string;
  updated_at: string;
  product_shop: string;
  category: string;
};

export type OrderDetails = {
  order: number;
  product: string;
  quantity: number;
  price: string;
  product_details?: Product;
};
