import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const shippingSchema = z.object({
  shippingMethod: z.enum(
    ["DHL", "Schenker", "PostNord"],
    { error: "Please select a shipping method" }
  ),
});

export type ShippingData = z.infer<typeof shippingSchema>;

type ShippingFormProps = {
  onComplete: (data: ShippingData) => void;
};

const ShippingForm = ({ onComplete }: ShippingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
  });

  return (
    <form onSubmit={handleSubmit(onComplete)}>
      <h3>Shipping</h3>

      <label>
        <input
          type="radio"
          value="DHL"
          {...register("shippingMethod")}
        />
        DHL
      </label>

      <label>
        <input
          type="radio"
          value="Schenker"
          {...register("shippingMethod")}
        />
        Schenker
      </label>

      <label>
        <input
          type="radio"
          value="PostNord"
          {...register("shippingMethod")}
        />
        PostNord
      </label>

      {errors.shippingMethod && (
        <p>{errors.shippingMethod.message}</p>
      )}

      <button type="submit">Continue to payment</button>
    </form>
  );
};

export default ShippingForm;