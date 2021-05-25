import styled from 'styled-components';

export const EquipmentViewWrapper = styled.div`
	max-width: 1124px;
	margin: auto;
	height: 100vh;
`;

const headerText = "Equipment list..."

export const EquipmentView = () => {
	return (
		<EquipmentViewWrapper>
			<span>{headerText}</span>
		</EquipmentViewWrapper>
	);
};
