/** @format */

import { useEffect, useState } from "react";
import styled from "styled-components";
import { UserProps } from "../../shared/types/UserProps";

export const StyledSearchbar = styled.input`
  padding: 8px 10px;
  margin-bottom: 1em;
  padding: 6px;
  font-size: 17px;
  border-radius: 0.25rem;
`;
type SearchbarProps = {
  list: Array<UserProps>;
  setSearchResults: (newArr: Array<UserProps>) => void;
};

export const Searchbar: React.FC<SearchbarProps> = ({
  list,
  setSearchResults,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results: Array<UserProps> = list?.filter((item) => {
      return item.firstname.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(results);
  }, [searchTerm, list, setSearchResults]);

  return (
    <StyledSearchbar
      type='text'
      placeholder='Search'
      value={searchTerm}
      onChange={handleChange}
    />
  );
};
