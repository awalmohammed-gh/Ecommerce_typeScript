import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import img5 from "./img5.jpg";
import img6 from "./img6.jpg";
import img7 from "./img7.jpg";
import img8 from "./img8.jpg";
import img9 from "./img9.jpg";
import img10 from "./img10.jpg";
import img11 from "./img11.jpg";
import img12 from "./img12.jpg";
import img13 from "./img13.jpg";
import img14 from "./img14.jpg";
import img15 from "./img15.jpg";
import img16 from "./img16.jpg";
import img17 from "./img17.jpg";
import img18 from "./img18.jpg";
import img19 from "./img19.jpg";
import img20 from "./img20.jpg";

//icons
import icon1 from "./icons/t-shirt.png"
import icon2 from "./icons/shirt.png"
import icon3 from "./icons/trouser.png"
import icon4 from "./icons/jacket.png"
import icon5 from "./icons/sweater.png"
import icon6 from "./icons/sneaker.png"




//shop by category one
import shop1 from "./shop1.jpg"
import shop2 from "./shop2.jpg"
import shop3 from "./shop3.jpg"
import shop4 from "./shop4.jpg"
import shop5 from "./shop5.jpg"

// Love by community
import fashion1 from "./fashion1.jpg"
import fashion2 from "./fashion2.jpg"
import fashion3 from "./fashion3.jpg"
import fashion4 from "./fashion4.jpg"
import fashion5 from "./fashion5.jpg"

// transaction
import phone from "./phone.png" 
import card from "./card.png"
import bank from "./bank.png"

export const communityLikes = [fashion1,fashion2,fashion3,fashion4,fashion5]

export const transaction = {
 phone,
 card,
 bank
}

export const categories = [
  { name: "Bottoms", path: "bottoms" },
  { name: "Jeans", path: "jeans" },
  { name: "Formal Pants", path: "formal-pants" },
  { name: "Accessories", path: "accessories" },
  { name: "Hats", path: "hats" },
  { name: "Outerwear", path: "outerwear" },
  { name: "Jackets", path: "jackets" },
  { name: "Tops", path: "tops" },
  { name: "Hoodies", path: "hoodies" },
  { name: "Sweatshirts", path: "sweatshirts" },
  { name: "Shirts", path: "shirts" },
  { name: "T-Shirts", path: "t-shirts" },
  { name: "Cargo Pants", path: "cargo-pants" },
  { name: "Tank Tops", path: "tank-tops" },
];

export const shopCategory = [
  {
    id: 1,
    name: "Shop Women",
    image: shop1,
    path: "women",
  },
  {
    id: 2,
    name: "Shop Men",
    image: shop2,
    path: "men",
  },
  {
    id: 3,
    name: "Shop Kids",
    image: shop3,
    path: "kids",
  },
  {
    id: 4,
    name: "Shop Shoes",
    image: shop4,
    path: "shoes",
  },
  {
    id: 5,
    name: "Accessories",
    image: shop5,
    path: "accessories",
  },
];

export const subCategory= [
  {
    id: 11,
    name: "T-Shirts",
    image: icon1,
    path: "t-shirt",
  },
  {
    id: 12,
    name: "Shirts",
    image: icon2,
    path: "shirt",
  },
  {
    id: 13,
    name: "Trousers",
    image: icon3,
    path: "trouser",
  },
  {
    id: 14,
    name: "Jackets",
    image: icon4,
    path: "jacket",
  },
  {
    id: 15,
    name: "Sweaters",
    image: icon5,
    path: "sweater",
  },
  {
    id:16,
    name: "Shoes",
    image: icon6,
    path: "shoe",
  },
];

export const products = [
  {
    _id: "prd1a2b3c4d5e",
    name: "White Oversized Tee",
    description:
      "High-rise relaxed denim jeans featuring a subtle acid-wash fade that gives them a vintage worn-in look. The ultra-wide leg creates a dramatic flowy silhouette that pairs perfectly with chunky sneakers or platform boots. Made from breathable cotton blend fabric with slight stretch for all-day comfort and easy movement.",
    price: 320,
    offerPrice: 260,
    images: [img1],
    category: "Bottoms",
    subCategory: "Jeans",
    sizes: ["28", "30", "32", "34", "36"],
    stock: 45,
    rating: 4.5,
    reviews: 128,
    bestseller: true,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd2f3g4h5i6j",
    name: "Black Tee",
    description:
      "Classic tailored suit pants designed with a sharp center crease that maintains a polished professional look. Crafted from smooth non-iron woven fabric that resists wrinkles throughout the day. Features a mid-rise waist and straight slightly tapered leg that creates a clean sophisticated silhouette perfect for office wear or formal events.",
    price: 280,
    offerPrice: null,
    images: [img2],
    category: "Bottoms",
    subCategory: "Formal Pants",
    sizes: ["28", "30", "32", "34", "36", "38"],
    stock: 32,
    rating: 4.7,
    reviews: 95,
    bestseller: false,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd3k7l8m9n0o",
    name: "Green Utility Shirt",
    description:
      "Cozy stretch-fit beanie featuring a deep ribbed knit texture that adds visual interest and elasticity. Includes a fold-over cuff that allows versatile styling options and a soft fleece lining that provides maximum warmth and comfort during cold weather. Lightweight design makes it easy to pack and carry.",
    price: 85,
    offerPrice: 65,
    images: [img3],
    category: "Accessories",
    subCategory: "Hats",
    sizes: [],
    stock: 120,
    rating: 4.3,
    reviews: 67,
    bestseller: false,
    isNew: true,
    targetAudience: "Men",
  },
  {
    _id: "prd4p1q2r3s4t",
    name: "Burgundy Sweatshirt",
    description:
      "Structured yet soft cotton cap with a vintage washed feel that gives it a relaxed worn-in aesthetic. Features contrasting color panels on the visor and front for a bold two-tone look. Adjustable brass buckle closure ensures a perfect fit while the pre-curved brim provides classic dad hat styling and sun protection.",
    price: 100,
    offerPrice: null,
    images: [img4],
    category: "Accessories",
    subCategory: "Hats",
    sizes: [],
    stock: 85,
    rating: 4.6,
    reviews: 143,
    bestseller: true,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd5u5v6w7x8y",
    name: "Tan Hoodie",
    description:
      "Sturdy heavyweight jacket crafted from soft wide-wale corduroy that provides both warmth and durability. Features a classic button-front closure with two large flapped chest pockets for functional storage. Side-entry hand pockets offer additional utility while the relaxed fit makes it perfect for layering over sweaters or hoodies.",
    price: 420,
    offerPrice: 350,
    images: [img5],
    category: "Outerwear",
    subCategory: "Jackets",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 28,
    rating: 4.8,
    reviews: 201,
    bestseller: true,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd6z9a0b1c2d",
    name: "Cream Corduroy Jacket",
    description:
      "Soft and cozy pullover hoodie in a versatile camel and light brown shade that complements any wardrobe. Features a spacious kangaroo pocket for hand warming and an adjustable drawstring hood for customizable coverage. Made from cotton-blend fleece with a relaxed fit that provides ultimate comfort for lounging or casual outings.",
    price: 190,
    offerPrice: 155,
    images: [img6],
    category: "Tops",
    subCategory: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 55,
    rating: 4.4,
    reviews: 89,
    bestseller: false,
    isNew: true,
    targetAudience: "Men",
  },
  {
    _id: "prd7e3f4g5h6i",
    name: "Yankees Cap",
    description:
      "Classic crewneck sweatshirt in a rich burgundy and maroon shade that adds a pop of sophisticated color to any outfit. Made from heavyweight cotton-blend fleece that provides warmth and durability. Ribbed cuffs and hem ensure a snug comfortable fit that keeps the shape intact while making it ideal for layering or standalone wear.",
    price: 175,
    offerPrice: null,
    images: [img7],
    category: "Tops",
    subCategory: "Sweatshirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 40,
    rating: 4.4,
    reviews: 76,
    bestseller: false,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd8j7k8l9m0n",
    name: "TNF Beanie",
    description:
      "A durable, long-sleeve utility and casual button-down shirt designed for everyday style. Perfect for transitional weather, featuring structured double stitching, clean chest pocket details, and a relaxed tailored fit that layers effortlessly over basic tees.",
    price: 210,
    offerPrice: 180,
    images: [img8],
    category: "Tops",
    subCategory: "Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 38,
    rating: 4.3,
    reviews: 54,
    bestseller: false,
    isNew: true,
    targetAudience: "Men",
  },
  {
    _id: "prd9o1p2q3r4s",
    name: "Black Trousers",
    description:
      "Essential crewneck short-sleeve t-shirt with a clean classic fit that never goes out of style. Made from soft premium cotton with reinforced stitching for enhanced durability. The versatile design makes it a wardrobe staple suitable for everyday casual wear that can be dressed up or down effortlessly.",
    price: 120,
    offerPrice: null,
    images: [img9],
    category: "Tops",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 75,
    rating: 4.2,
    reviews: 112,
    bestseller: false,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd0t5u6v7w8x",
    name: "Baggy Gray Jeans",
    description:
      "Oversized fit short-sleeve t-shirt featuring deep ribbed texture that adds visual dimension to the fabric. Drop shoulder design creates a relaxed streetwear-inspired look that is both trendy and comfortable. The breathable fabric and extra roomy silhouette make it perfect for achieving that effortless cool aesthetic.",
    price: 135,
    offerPrice: null,
    images: [img10],
    category: "Tops",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
    rating: 4.5,
    reviews: 67,
    bestseller: true,
    isNew: true,
    targetAudience: "Men",
  },
  {
    _id: "prd1y9z0a1b2c",
    name: "Denim Jorts",
    description:
      "Wide-leg cargo pants designed with multiple utility pockets that provide both style and functionality. The relaxed baggy fit with elastic waistband and adjustable drawstring ensures maximum comfort throughout the day. Made from durable fabric that holds its shape while delivering that sought-after streetwear aesthetic.",
    price: 290,
    offerPrice: 250,
    images: [img11],
    category: "Bottoms",
    subCategory: "Cargo Pants",
    sizes: ["28", "30", "32", "34", "36", "38"],
    stock: 35,
    rating: 4.6,
    reviews: 88,
    bestseller: true,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd2d3e4f5g6h",
    name: "Black Track Jacket",
    description:
      "Sleeveless tank top with stretchy ribbed knit construction that hugs the body comfortably. The form-fitting silhouette features a flattering scoop neckline that adds a touch of elegance. Lightweight and breathable fabric makes it perfect for layering or wearing alone during warm weather.",
    price: 95,
    offerPrice: null,
    images: [img12],
    category: "Tops",
    subCategory: "Tank Tops",
    sizes: ["S", "M", "L", "XL"],
    stock: 60,
    rating: 4.1,
    reviews: 43,
    bestseller: false,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd3i7j8k9l0m",
    name: "Tan Hoodie",
    description:
      "Traditional A-shirt vest crafted from soft pure cotton for ultimate breathability and comfort. The sleeveless design features ribbed neckline and armholes that maintain their shape wear after wear. Perfect as an undershirt or standalone casual top for those laid-back days.",
    price: 80,
    offerPrice: 65,
    images: [img13],
    category: "Tops",
    subCategory: "Tank Tops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 70,
    rating: 4.0,
    reviews: 38,
    bestseller: false,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd4n1o2p3q4r",
    name: "Gray Sweatshirt",
    description:
      "Sleeveless shirt featuring wide armholes and a relaxed muscle fit that showcases your physique. Made from lightweight breathable fabric with dropped armholes that allow unrestricted movement. The casual gym-inspired design transitions seamlessly from workout sessions to everyday wear.",
    price: 105,
    offerPrice: null,
    images: [img14],
    category: "Tops",
    subCategory: "Tank Tops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 45,
    rating: 4.2,
    reviews: 56,
    bestseller: false,
    isNew: true,
    targetAudience: "Men",
  },
  {
    _id: "prd5s5t6u7v8w",
    name: "Pink Utility Shirt",
    description:
      "Comfortable low-rise boxer briefs made with soft stretch fabric that moves with your body. The contoured pouch design provides excellent support while the elastic waistband ensures a secure fit. Breathable moisture-wicking material keeps you fresh and comfortable all day long.",
    price: 65,
    offerPrice: 50,
    images: [img15],
    category: "Underwear",
    subCategory: "Boxers",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 100,
    rating: 4.3,
    reviews: 72,
    bestseller: false,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd6x9y0z1a2b",
    name: "Denim Jacket",
    description:
      "Wide-leg jean shorts with a relaxed baggy fit that captures the essence of 90s streetwear style. Made from soft durable denim with frayed hem details that add a touch of edge. The comfortable loose silhouette makes these jorts perfect for casual summer days and laid-back weekend looks.",
    price: 240,
    offerPrice: 200,
    images: [img16],
    category: "Bottoms",
    subCategory: "Shorts",
    sizes: ["28", "30", "32", "34", "36"],
    stock: 42,
    rating: 4.4,
    reviews: 63,
    bestseller: false,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd7c3d4e5f6g",
    name: "Olive Flannel",
    description:
      "Classic crewneck sweatshirt featuring a bold logo print that makes a statement. Made from premium heavyweight cotton-blend fleece that provides exceptional warmth and durability. The ribbed cuffs and hem ensure a secure fit while the logo adds a touch of brand personality to any outfit.",
    price: 195,
    offerPrice: null,
    images: [img17],
    category: "Tops",
    subCategory: "Sweatshirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 50,
    rating: 4.5,
    reviews: 82,
    bestseller: true,
    isNew: true,
    targetAudience: "Men",
  },
  {
    _id: "prd8h7i8j9k0l",
    name: "Cream Knit Sweater",
    description:
      "Trendy pullover hoodie featuring eye-catching graphic prints that express your unique style. The soft cotton-blend fleece fabric provides ultimate comfort while the kangaroo pocket offers convenient storage. Adjustable drawstring hood and relaxed fit make this hoodie perfect for everyday casual wear.",
    price: 210,
    offerPrice: 175,
    images: [img18],
    category: "Tops",
    subCategory: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 38,
    rating: 4.7,
    reviews: 94,
    bestseller: true,
    isNew: false,
    targetAudience: "Men",
  },
  {
    _id: "prd9m1n2o3p4q",
    name: "Beige Chinos",
    description:
      "Ultra-baggy jeans with a dramatic barrel-leg silhouette that creates a bold fashion statement. The balloon-fit design features gathered detailing that adds volume and texture to your outfit. Made from quality denim with a comfortable high-rise waist that makes these pants perfect for avant-garde streetwear looks.",
    price: 350,
    offerPrice: 300,
    images: [img19],
    category: "Bottoms",
    subCategory: "Jeans",
    sizes: ["28", "30", "32", "34", "36"],
    stock: 25,
    rating: 4.6,
    reviews: 57,
    bestseller: false,
    isNew: true,
    targetAudience: "Men",
  },
  {
    _id: "prd0r5s6t7u8v",
    name: "Brown Cargo Pants",
    description:
      "Classic denim shorts with a comfortable fit that works for any casual occasion. Made from durable cotton denim with a versatile length that hits just above the knee. Features practical pockets and a relaxed silhouette that makes these jorts a warm-weather essential for your wardrobe.",
    price: 180,
    offerPrice: null,
    images: [img20],
    category: "Bottoms",
    subCategory: "Shorts",
    sizes: ["28", "30", "32", "34", "36"],
    stock: 48,
    rating: 4.1,
    reviews: 44,
    bestseller: false,
    isNew: false,
    targetAudience: "Men",
  },
];



