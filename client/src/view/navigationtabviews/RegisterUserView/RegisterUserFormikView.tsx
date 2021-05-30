/** @format */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RegisterWrapper, RegisterForm } from "./StyledRegisterUserView.styles";
import UserAPIService from "../../../shared/api/service/UserAPIService";
import { RegisterFormInputs } from "../../../shared/types/RegisterFormInputs";

const schema = yup.object().shape({
  firstname: yup.string().max(255).required("First name is required"),
  lastname: yup.string().max(255).required("Last name is required"),
  schoolclass: yup
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

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export const RegisterUserFormikView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema), 
  });

  console.log(register)

  const onSubmit = async (inputData: RegisterFormInputs) => {
    await sleep(2000);
    try {
      const { data } = await UserAPIService.createUser(inputData);
      console.log(data)
      alert(JSON.stringify(data));
    } catch (error) {
      alert("There is an error");
      console.log(error)
    }
  };

  return (
    <RegisterWrapper>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input {...register("firstname")} />
        <p>{errors.firstname?.message}</p>

        <label>Last Name</label>
        <input {...register("lastname")} />
        <p>{errors.lastname?.message}</p>

        <label>School Class</label>
        <input {...register("schoolclass")} />
        <p>{errors.schoolclass?.message}</p>

        <label>E-mail</label>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>

        <label>Username</label>
        <input {...register("username")} />
        <p>{errors.username?.message}</p>

        <label>Password</label>
        <input {...register("password")} type='password' />
        <p>{errors.password?.message}</p>

        <input type='submit' />
      </RegisterForm>
    </RegisterWrapper>
  );
};
