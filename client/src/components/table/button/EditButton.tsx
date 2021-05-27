import UserAPIService from "../../../shared/api/service/UserAPIService";
import { UserProps } from "../../../shared/types/UserProps";
import styled from "styled-components";

export const StyledEditButton = styled.button`
  background-color: #5880c1;
  color: white;
  padding: 8px 16px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
  opacity: 0.9;
`;

export const EditButton = (props: {
  active: boolean;
  setActive: (active: boolean) => void;
  setInput: (input: UserProps) => void;
  id: string;
  input: UserProps;
  editId: string;
  setEdit: (edit: string) => void;
  setSearchResults: (users: Array<UserProps>) => void;
}) => {
  const activateEditMode = () => {
    if (props.active === true) {
      return;
    } else {
      props.setActive(!props.active);
      props.setEdit(props.id);
      fetchUserData();
    }
  };

  const displayEditOrDeleteButton = () => {
    if (props.active && props.id === props.editId) {
      return (
        <StyledEditButton
          onClick={() => {
            submitUserUpdate(props.editId);
          }}
        >
          Submit
        </StyledEditButton>
      );
    } else {
      return (
        <StyledEditButton onClick={() => activateEditMode()}>
          Edit
        </StyledEditButton>
      );
    }
  };

  const fetchUserData = async () => {
    try {
      const { data } = await UserAPIService.getUser(props.id);
      props.setInput({
        ...props.input,
        firstname: data[0].firstname,
        lastname: data[0].lastname,
        schoolclass: data[0].schoolclass,
        email: data[0].email,
        username: data[0].username,
        password: data[0].password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitUserUpdate = async (editId: string) => {
    try {
      if (
        props.input.firstname !== "" &&
        props.input.lastname !== "" &&
        props.input.email !== ""
      ) {
        await UserAPIService.editUser(
          editId,
          props.input.firstname,
          props.input.lastname,
          props.input.schoolclass,
          props.input.email,
          props.input.username,
          props.input.password
        );
        const { data } = await UserAPIService.getUsers();
        props.setSearchResults(data);
        props.setInput({
          ...props.input,
          _id: "",
          firstname: "",
          lastname: "",
          email: "",
        });
        props.setActive(!props.active);
        props.setEdit("");
      } else {
        alert("No empty fields allowed.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return displayEditOrDeleteButton();
};
