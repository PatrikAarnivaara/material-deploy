import { useEffect, useState } from 'react';
import { Table } from '../../components/table/Table'
import UserAPIService from '../../shared/api/service/UserAPIService';
import { UserProps } from '../../shared/types/UserProps'
import styled from 'styled-components';

export const UserAdminViewWrapper = styled.div`
	max-width: 1124px;
	margin: auto;
	height: 100vh;
	padding: 1em;
	`

/* UserAdminView */
export const UserAdminView = () => {
	const [users, setUsers] = useState<UserProps[]>();

	useEffect(() => {
		let isActive: boolean = true;
		const fetchData = async () => {
			try {
				const { data } = await UserAPIService.getUsers()
				if (isActive) {
					setUsers(data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
		return () => {
			isActive = false;
		}
	},[]);


	const displayUserTable = () => {
		if (users) {
			return <Table list={users} setUsers={setUsers}/>
		} else {
			return <h2>LOADING</h2>
		}
	}

	return (
		<UserAdminViewWrapper>
			{displayUserTable()}
		</UserAdminViewWrapper>
	);
};
