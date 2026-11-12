export const products = [
  { id: 1, name: 'T-shirt with Tape Details', price: 120, oldPrice: null, rating: 4.5, image: '/Images/cloth-1.png' },
  { id: 2, name: 'Skinny Fit Jeans', price: 240, oldPrice: 260, rating: 3.5, image: '/Images/cloth-2.png' },
  { id: 3, name: 'Checkered Shirt', price: 180, oldPrice: null, rating: 4.5, image: '/Images/cloth-3.png' },
  { id: 4, name: 'Sleeve Striped T-shirt', price: 130, oldPrice: 160, rating: 4.5, image: '/Images/cloth-4.png' },
] 

export const topSelling = [
  { id: 11, name: 'Vertical Striped Shirt', price: 212, oldPrice: 232, rating: 5.0, image: '/Images/cloth-5.png' },
  { id: 12, name: 'Courage Graphic T-shirt', price: 145, oldPrice: null, rating: 4.5, image: '/Images/cloth-6.png' },
  { id: 13, name: 'Loose Fit Bermuda Shorts', price: 80, oldPrice: null, rating: 3.0, image: '/Images/cloth-7.png' },
  { id: 14, name: 'Faded Skinny Jeans', price: 210, oldPrice: null, rating: 4.5, image: '/Images/cloth-8.png' },
]

export const related = [
  { id: 21, name: "Polo with Contrast Trims", price: 212, oldPrice: 242, rating: 4, image: "/Images/cloth-1.png" },
  { id: 22, name: "Gradient Graphic T-shirt", price: 145, oldPrice: null, rating: 3.5, image: "/Images/cloth-2.png" },
  { id: 23, name: "Polo with Tipping Details", price: 180, oldPrice: null, rating: 4.5, image: "/Images/cloth-1.png" },
  { id: 24, name: "Black Striped T-shirt", price: 120, oldPrice: 150, rating: 5, image:"/Images/cloth-2.png" },
]

export const casualProducts = [
  { id: 31, name: "Gradient Graphic T-shirt", price: 145, oldPrice: null, rating: 3.5, image: "/Images/cloth-9.png" },
  { id: 32, name: "Polo with Tipping Details", price: 180, oldPrice: null, rating: 4.5, image: "/Images/cloth-10.png" },
  { id: 33, name: "Black Striped T-shirt", price: 120, oldPrice: 150, rating: 5, image: "/Images/cloth-11.png" },
  { id: 34, name: "Skinny Fit Jeans", price: 240, oldPrice: 260, rating: 3.5, image: "/Images/cloth-2.png" },
  { id: 35, name: "Checkered Shirt", price: 180, oldPrice: null, rating: 4.5, image: "/Images/cloth-1.png" },
  { id: 36, name: "Sleeve Striped T-shirt", price: 130, oldPrice: 160, rating: 4.5, image: "/Images/cloth-2.png" },
  { id: 37, name: "Vertical Striped Shirt", price: 212, oldPrice: 232, rating: 5, image: "/Images/cloth-1.png" },
  { id: 38, name: "Courage Graphic T-shirt", price: 145, oldPrice: null, rating: 4, image: "/Images/cloth-2.png" },
  { id: 39, name: "Loose Fit Bermuda Shorts", price: 80, oldPrice: null, rating: 3, image: "/Images/cloth-1.png" },
]

export const allProducts = [...products, ...topSelling, ...related, ...casualProducts];