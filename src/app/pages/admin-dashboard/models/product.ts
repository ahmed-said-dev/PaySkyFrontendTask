export interface product {
    id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string
    rating:rating
  }

  export interface rating{
    rate:number,
    count:number
  }
  