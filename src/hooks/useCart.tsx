import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const stockPromise = api.get(`/stock/${productId}`);
      const productPromise = api.get(`/products/${productId}`);

      const responses = await Promise.all([stockPromise, productPromise]);

      const stock = responses[0].data;
      const product = responses[1].data;

      if (cart.some(p => p.id === productId)) {
        const productInCart = cart.find(p => p.id === productId);
        if (!productInCart) return;

        if (productInCart.amount < stock.amount) {
          productInCart.amount += 1;
          updateProductAmount({ productId, amount: (productInCart.amount ?? 0) });
        } else {
          throw new Error('Quantidade solicitada fora de estoque');
        }
      } else {
        product.amount = 1;
        setCart(cart.concat([product]));
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      const product = cart.find(p => p.id === productId);

      if (!product) return;

      setCart(cart.map(p => {
        if (p.id === productId) {
          p.amount = amount;
        }

        return p;
      }));

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
