import { useState } from 'react';
import { StyledContainer, StyledTable } from './StyledTable.styles';
import { Searchbar } from '../searchbar/Searchbar'
import { EditButton } from '../table/button/EditButton'
import { DeleteButton } from '../table/button/DeleteButton'
import { UserProps } from '../../shared/types/UserProps'

export const Table = (props: { list: Array<UserProps> }) => {
    const initialState: UserProps = { _id: '', firstname: "", lastname: "", email: "", schoolclass: "", username: "", password: '' }
    const [input, setInput] = useState<UserProps>(initialState)
    const [edit, setEdit] = useState<string>('')
    const [active, setActive] = useState<boolean>(false)
    const [searchResults, setSearchResults] = useState(props.list);

    const displayData = () => {
        return (searchResults?.map((item: UserProps) => (
            <tr key={item._id} >
                <td>{
                    item._id === edit ?
                        < input
                            placeholder={"First name"}
                            name={'firstname'}
                            value={input.firstname}
                            onChange={handleTableEdit} />
                        :
                        item.firstname}</td>

                <td >{
                    item._id === edit ?
                        < input
                            placeholder={'Last name'}
                            name={'lastname'}
                            value={input.lastname}
                            onChange={handleTableEdit} />
                        :
                        item.lastname}</td>

                <td  >{
                    item._id === edit ?
                        <  input
                            placeholder={'E-mail'}
                            name={'email'}
                            value={input.email}
                            onChange={handleTableEdit} />
                        :
                        item.email}</td>
                <td >
                    <EditButton id={item._id} editId={edit} active={active} setActive={setActive} setInput={setInput} setEdit={setEdit} input={input} />
                    <DeleteButton id={item._id} editId={edit} active={active} setActive={setActive} setEdit={setEdit} /></td>
            </tr>
        )))
    }

    const handleTableEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInput({ ...input, [event.target.name]: value })
    }

    return (
        <StyledContainer>
            {/* TODO: remove inline-styling */}
            <div style={{ alignContent: "center", justifyContent: "center", margin: 0 }}>
                <Searchbar list={props.list} setSearchResults={setSearchResults} />
            </div>
            <StyledTable >
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData()}
                </tbody>
            </StyledTable>
        </StyledContainer>
    )
}
