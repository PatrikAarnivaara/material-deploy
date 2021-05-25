import styled from 'styled-components';

type StyledBackdropProps = {
	alpha: number;
}

const StyledBackdrop = styled.div<StyledBackdropProps>`
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	background-color: rgba(0, 0, 0, ${(props) => props.alpha});
`;

export const Backdrop = (props: { alpha: number; drawerHandler: (open: boolean) => void }) => {
	return <StyledBackdrop alpha={props.alpha} onClick={() => props.drawerHandler(false)}></StyledBackdrop>;
};
