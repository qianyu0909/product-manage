export interface Product {
  id: string
  classify_id: string
  user_id: string
  name: string
  description: string
  image: string
  num: string
  tags: string
  status: string // 1: 已购买  2: 已送人
  storage: string
}

export interface User {
  id: string
  email: string
  password: string
}

export interface Classify {
  id: string
  key: string
  name: string
  user_id: string
}

export interface ShoppingList {
  id: string
  key: string
  user_id: string
  name: string
  num: string
  description: string
}

