import { useContext } from 'react';
import { EquipmentContext } from '../../shared/provider/EquipmentProvider';
import { Card } from '../../components/card/Card'
import { EquipmentProps } from '../../shared/types/EquipmentProps'
import { LabelDefinitionType } from '../../shared/types/LabelDefenitionType';
import styled from 'styled-components';

export const MyLoanWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 300px);;
	grid-gap: 1em;
	max-width: 1124px;
	margin: auto;
	padding: 1em;
	height: 100vh;
`

const objectKeys: LabelDefinitionType<EquipmentProps, keyof EquipmentProps>[] = [
	{ key: 'id' },
	{ key: 'title' },
	{ key: 'description' },
	{ key: 'brand' },
	{ key: 'serialnumber' },
	{ key: 'category' }
]

function z (){
	console.log('x')
}

export const MyLoanView = () => {
	const [equipment] = useContext(EquipmentContext);
	const data: EquipmentProps[] = equipment

	return (
		<MyLoanWrapper>
			{data?.map((item) => {
				return <Card key={item.serialnumber} item={item} columns={objectKeys} x={z}/>
			})}
		</MyLoanWrapper>
	);
};
