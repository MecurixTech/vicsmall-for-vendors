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
