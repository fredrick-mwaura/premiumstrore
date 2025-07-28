
export interface Product {
  id: string;
  name: string;
  productId: string;
  price: number;
  quantity: number;
  sale: number;
  stock: string;
  startDate: string;
  image: string;
}

export const initialProducts: Product[] = [

  {
    id: "2",
    name: "jeans trouser girl",
    productId: "#1",
    price: 1349.50,
    quantity: 875,
    sale: 254,
    stock: "low stock",
    startDate: "2025-1-18",
    image: "/girls_trouser1.png"
  },
  {
    id: "3",
    name: "Jeans jacket fir in",
    productId: "#2",
    price: 1675.00,
    quantity: 420,
    sale: 160,
    stock: "in stock",
    startDate: "2025-1-11",
    image: "/jacket.png"
  },
  {
    id: "4",
    name: "side close ladies trouser",
    productId: "#3",
    price: 1425.75,
    quantity: 680,
    sale: 340,
    stock: "In stock",
    startDate: "2025-1-10",
    image: "/side-close.png"
  },
  {
    id: "5",
    name: "Hypoallergenic Cat Food",
    productId: "#4",
    price: 1899.00,
    quantity: 325,
    sale: 120,
    stock: "in stock",
    startDate: "2025-1-11",
    image: "/Adidas_foot.png"
  },
  {
    id: "6",
    name: "Small Breed Dog",
    productId: "#5",
    price: 1520.00,
    quantity: 950,
    sale: 181,
    stock: "in stock",
    startDate: "2025-1-15",
    image: "/side-close.png"
  },
  {
    id: "7",
    name: "open shoe-grey",
    productId: "#6",
    price: 1399.95,
    quantity: 720,
    sale: 112,
    stock: "low stock",
    startDate: "2025-1-10",
    image: "/open shoe.png"
  },
  {
    id: "8",
    name: "football Formula",
    productId: "#7",
    price: 1645.50,
    quantity: 550,
    sale: 220,
    stock: "in stock",
    startDate: "2025-1-15",
    image: "/football_footware.png"
  },
  {
    id: "9",
    name: "Dental Care Dog Treats",
    productId: "#8",
    price: 875.00,
    quantity: 1500,
    sale: 305,
    stock: "in stock",
    startDate: "2025-1-15",
    image: "/Adidas_foot.png"
  },
  {
    id: "10",
    name: "football footware - CR7",
    productId: "#9",
    price: 1475.25,
    quantity: 920,
    sale: 197,
    stock: "In stock",
    startDate: "2025-1-10",
    image: "/football_footware.png"
  },
  {
    id: "1",
    name: "denim trouser",
    productId: "#10",
    price: 1599.99,
    quantity: 1250,
    sale: 154,
    stock: "in stock",
    startDate: "2025-1-15",
    image: "/image.png"
  }
];
