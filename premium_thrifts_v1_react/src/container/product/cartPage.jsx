import { Toaster } from "sonner"
import CartView from "./cartView"

const CartPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <CartView />
    </div>
  )
}

export default CartPage
