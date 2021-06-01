/** @format */

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RegisterFormInputs } from "../../../shared/types/RegisterFormInputs";
import UserAPIService from "../../../shared/api/service/UserAPIService";
import { Spinner } from "../../../components/spinner/Spinner";
import RoutingPath from "../../../routes/RoutingPath";
import {
  RegisterWrapper,
  RegisterForm,
  PasswordWrapper,
} from "./StyledRegisterUserView.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object().shape({
  firstname: yup.string().max(255).required("First name is required"),
  lastname: yup.string().max(255).required("Last name is required"),
  schoolclass: yup
    .string()
    .matches(/\w{2}\d{2}\w{1}/, "must match ab12c")
    .required("School class is required"),
  email: yup.string().email().required("E-mail is required"),
  username: yup
    .string()
    .min(5, "Username is required, min 5 characters")
    .required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "Password must contain at least 6 characters, including UPPER/lowercase and numbers and one special case character(@$!%*#?&)"
    )
    .required(),
});

const eye = <FontAwesomeIcon icon={faEye} />;

/* const sleep = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}; */

export const RegisterUserView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (inputData: RegisterFormInputs) => {
    setIsLoading(true);
    /* await sleep(2000); */
    try {
      const { data } = await UserAPIService.createUser(inputData);
      if (data) {
        setIsLoading(false);
        alert("User account created");
      }
      /* MODAL */
      history.push(RoutingPath.homeView);
    } catch (error) {
      alert("There is an error");
      setIsLoading(false);
      console.log(error);
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

        {/* Make eye a component */}
        <label>Password</label>
        <PasswordWrapper color={showPassword ? "#00fcb6" : ""}>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
          />
          <p>{errors.password?.message}</p>
          <i onClick={togglePasswordVisiblity}>{eye}</i>
        </PasswordWrapper>

        <input type='submit' value='Register' />
      </RegisterForm>
      {isLoading && <Spinner />}
    </RegisterWrapper>
  );
};
