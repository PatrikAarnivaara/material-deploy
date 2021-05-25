import styled from 'styled-components';

type StyledModalProps = {
	show: boolean;
};

export const Model = styled.div<StyledModalProps>`
	z-index: auto;
	display: ${({ show }) => (show ? 'block' : 'none')};
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
`;
/* Top and right should be controlled by props */
export const Container = styled.div`
	z-index: 300;
	position: fixed;
	height: auto;
	top: 60px;
	right: 20px;
	transform: 'translate(-50%,-50%)';
`;
