import { loadStripe } from "@stripe/stripe-js";
import { trpc } from "@/app/_trpc/client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import Address from "@/types/TAddress";


const useStripe = () => {

    const {mutateAsync: checkout} = trpc.paymentRoutes.checkout.useMutation();
    const {items} = useSelector((state: RootState) => state.cart);
    const handlePayment = async (address: Address) => {
        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
          );
          if (!stripe) {
            return;
          }
          try {
            const data = await checkout({cart: items, address});
            if (!data) throw new Error('Something went wrong');
            await stripe.redirectToCheckout({
              sessionId: data.id
            });
          } catch (error: unknown) {
            if (error instanceof Error && error.message === "INDIAN_REGULATIONS_ERROR") {
                toast.error("Due to Indian regulations, we can only accept payments from registered Indian businesses. Please contact our support for assistance.");
            } else {
                console.log(error);
                toast.error("Failed to process payment. Please try again.");
            }
        }
    }

    return {
        handlePayment
    }

}

export default useStripe;