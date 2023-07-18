
export interface IProduct {
  id: number,
  name: string,
  discription_product: string,
  image_product: string | null,
  type: string,
  price: number,
  categories_id:
}

export interface ICategories {
  id: number,
  type: string,
  img?: string,
}