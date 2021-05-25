import UserAPIService from '../../../shared/api/service/UserAPIService';
import styled from 'styled-components';

export const StyledDeleteButton = styled.button`
    background-color: #f44336;
    color: white;
    padding: 8px 16px;
    margin-left: 8px 0;
    border: none;
    cursor: pointer;
    width: 50%;
    opacity: 0.9;
    `

export const DeleteButton = (props: { id: string, editId: string, active: boolean, setActive: (active: boolean) => void, setEdit: (edit: string) => void }) => {

    /* Add message to confirm DELETE */
    const deleteUser = () => {
        try {
            if (props.active === true) { return }
            else { UserAPIService.deleteUser(props.id) }
        } catch (error) {
            console.log(error)
        }
    }

    const cancelDelete = () => {
        props.setActive(!props.active)
        props.setEdit('')

    }

    const displayDeleteOrCancelButton = () => {
        if (props.active && props.id === props.editId) {
            return <StyledDeleteButton onClick={() => cancelDelete()}>Cancel</StyledDeleteButton>
        } else {
            return <StyledDeleteButton onClick={() => { deleteUser() }}>Delete</StyledDeleteButton>

        }

    }

    return displayDeleteOrCancelButton()
}
