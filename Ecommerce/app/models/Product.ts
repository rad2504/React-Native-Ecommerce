export type Product = {
  gender: any;
  createdAt: string | number | Date;
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
  isFavorite: boolean;
};