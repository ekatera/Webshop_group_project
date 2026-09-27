import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const customerSchema = z.object({
  firstName: z.string().min(2, "First name must contain at least 2 characters"),
  lastName: z.string().min(2, "Last name must contain at least 2 characters"),
  address: z.string().min(5, "Enter a valid address"),
  postalCode: z.string().min(3, "Enter a valid postal code"),
  city: z.string().min(2, "Enter a valid city"),
});

export type CustomerData = z.infer<typeof customerSchema>;

type CustomerFormProps = {
  onComplete: (data: CustomerData) => void;
};

const CustomerForm = ({ onComplete }: CustomerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerData>({
    resolver: zodResolver(customerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onComplete)}>
      <h3>Customer information</h3>

      <label>
        First name
        <input {...register("firstName")} />
      </label>
      {errors.firstName && <p>{errors.firstName.message}</p>}

      <label>
        Last name
        <input {...register("lastName")} />
      </label>
      {errors.lastName && <p>{errors.lastName.message}</p>}

      <label>
        Address
        <input {...register("address")} />
      </label>
      {errors.address && <p>{errors.address.message}</p>}

      <label>
        Postal code
        <input {...register("postalCode")} />
      </label>
      {errors.postalCode && <p>{errors.postalCode.message}</p>}

      <label>
        City
        <input {...register("city")} />
      </label>
      {errors.city && <p>{errors.city.message}</p>}

      <button type="submit">Continue to shipping</button>
    </form>
  );
};

export default CustomerForm;