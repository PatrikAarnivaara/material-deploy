import { useContext } from 'react';
import { EquipmentContext } from '../../shared/provider/EquipmentProvider';
import { ColumnDefinitionType } from "../../shared/types/ColumnDefenitionType"
import TableGeneric from '../../components/tablegeneric/TableGeneric'
import { EquipmentProps } from '../../shared/types/EquipmentProps'
import styled from 'styled-components';

export const EquipmentAdminViewWrapper = styled.div`
	max-width: 1124px;
	margin: auto;
	height: 100vh;
`;

const columns: ColumnDefinitionType<EquipmentProps, keyof EquipmentProps>[] = [
    {
        key: 'title',
        header: 'Title',
        width: 150
    },
    {
        key: 'description',
        header: 'Description',
    },
    {
        key: 'brand',
        header: 'Brand'
    },
    {
        key: 'serialnumber',
        header: 'Serial number'
    },
    {
        key: 'category',
        header: 'Category'
    }
]

export const EquipmentAdminView = () => {
    const [equipment] = useContext(EquipmentContext);
    const data: EquipmentProps[] = equipment
    return (
        <EquipmentAdminViewWrapper>
            <TableGeneric data={data} columns={columns} />
        </EquipmentAdminViewWrapper>
    )
}
