/** @format */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type IFormInputs = {
  firstName: string;
  lastName: string;
  schoolClass: string;
  email: string;
  username: string;
  password: string;
};

const schema = yup.object().shape({
  firstName: yup.string().max(255).required("First name is required"),
  lastName: yup.string().max(255).required("Last name is required"),
  schoolClass: yup
    .string()
    .required("School class is required")
    .matches(/\w{2}\d{2}\w{1}/, "must match ab12c"),
  email: yup.string().email().required("E-mail is required"),
  username: yup
    .string()
    .min(5, "Username is required, min 5 characters")
    .required(),
  password: yup
    .string()
    .min(5, "Password is required, min 5 characters")
    .required(),
});

export const RegisterUserFormikView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <input {...register("lastName")} />
      <p>{errors.lastName?.message}</p>

      <input {...register("schoolClass")} />
      <p>{errors.schoolClass?.message}</p>

      <input {...register("email")} />
      <p>{errors.email?.message}</p>

      <input {...register("username")} />
      <p>{errors.username?.message}</p>

      <input {...register("password")} type='password' />
      <p>{errors.password?.message}</p>

      <input type='submit' />
    </form>
  );
};
