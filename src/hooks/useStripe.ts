import { loadStripe } from "@stripe/stripe-js";
import { trpc } from "@/app/_trpc/client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useStripe = () => {

    const {mutateAsync: checkout} = trpc.paymentRoutes.checkout.useMutation();
    const {items} = useSelector((state: RootState) => state.cart);
    const handlePayment = async () => {
        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
          );
          if (!stripe) {
            return;
          }
          try {
            const data = await checkout({cart: items});
            if (!data) throw new Error('Something went wrong');
            await stripe.redirectToCheckout({
              sessionId: data.id
            });
          } catch (error) {
            console.log(error);
        }
    }

    return {
        handlePayment
    }

}

export default useStripe;