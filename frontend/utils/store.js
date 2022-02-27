import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : {
          email: { error: false, value: '', valid: false },
          firstName: { error: false, value: '', valid: false },
          lastName: { error: false, value: '', valid: false },
          address: { error: false, value: '', valid: false },
          apartment: { error: false, value: '', valid: false },
          city: { error: false, value: '', valid: false },
          region: { error: false, value: '', valid: false },
          zipCode: { error: false, value: '', valid: false },
          phone: { error: false, value: '', valid: false },
        },
    shippingCountry: Cookies.get('shippingCountry')
      ? Cookies.get('shippingCountry')
      : { value: '' },
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      Cookies.set('cartItems', JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_EDIT_ITEM': {
      const cartItems = [];

      state.cart.cartItems.forEach((item) => {
        if (item.id === action.payload.id) {
          cartItems.push(action.payload);
          console.log(action.payload);
        } else {
          cartItems.push(item);
        }
      });
      console.log(cartItems);
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { cartItems: [...cartItems] } };
    }

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { cartItems: [...cartItems] } };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      const address = action.payload;
      Cookies.set('shippingAddress', JSON.stringify(address));

      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }

    case 'SAVE_SHIPPING_COUNTRY': {
      const country = action.payload;
      Cookies.set('shippingCountry', JSON.stringify(country));

      return {
        ...state,
        cart: { ...state.cart, shippingCountry: action.payload },
      };
    }

    case 'SAVE_PAYMENT_METHOD': {
      const payment = action.payload;
      Cookies.set('paymentMethod', JSON.stringify(payment));

      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    }

    case 'CART_CLEAR': {
      Cookies.set('cartItems', JSON.stringify([]));

      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
