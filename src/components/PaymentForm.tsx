import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const paymentSchema = z.object({
  paymentMethod: z.enum(
    ["creditCard", "swish", "invoice"],
    { error: "Please select a payment method" }
  ),
});

export type PaymentData = z.infer<typeof paymentSchema>;

type PaymentFormProps = {
  onComplete: (data: PaymentData) => void | Promise<void>;
};

const PaymentForm = ({ onComplete }: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onComplete)}>
      <h3>Payment</h3>

      <label>
        <input
          type="radio"
          value="creditCard"
          {...register("paymentMethod")}
        />
        Credit card
      </label>

      <label>
        <input
          type="radio"
          value="swish"
          {...register("paymentMethod")}
        />
        Swish
      </label>

      <label>
        <input
          type="radio"
          value="invoice"
          {...register("paymentMethod")}
        />
        Invoice
      </label>

      {errors.paymentMethod && (
        <p>{errors.paymentMethod.message}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default PaymentForm;