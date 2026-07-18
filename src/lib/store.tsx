'use client'

import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react'
import { CartItem, MotorcycleSelection } from '@/types'

interface StoreState {
  cart: CartItem[]
  favorites: string[]
  motorcycle: MotorcycleSelection
}

type StoreAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; variantId?: string } }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; variantId?: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_MOTORCYCLE'; payload: MotorcycleSelection }
  | { type: 'CLEAR_MOTORCYCLE' }
  | { type: 'HYDRATE'; payload: Partial<StoreState> }

const initialState: StoreState = {
  cart: [],
  favorites: [],
  motorcycle: null,
}

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingIndex = state.cart.findIndex(
        item =>
          item.product_id === action.payload.product_id &&
          item.variant_id === action.payload.variant_id
      )
      if (existingIndex >= 0) {
        const newCart = [...state.cart]
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + action.payload.quantity,
        }
        return { ...state, cart: newCart }
      }
      return { ...state, cart: [...state.cart, action.payload] }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          item =>
            !(item.product_id === action.payload.productId &&
              item.variant_id === action.payload.variantId)
        ),
      }
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product_id === action.payload.productId &&
          item.variant_id === action.payload.variantId
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload],
      }
    case 'SET_MOTORCYCLE':
      return { ...state, motorcycle: action.payload }
    case 'CLEAR_MOTORCYCLE':
      return { ...state, motorcycle: null }
    case 'HYDRATE':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const StoreContext = createContext<{
  state: StoreState
  dispatch: Dispatch<StoreAction>
} | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
