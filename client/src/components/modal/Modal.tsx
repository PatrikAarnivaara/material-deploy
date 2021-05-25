import { Model, Container } from './StyledModal.styles';

type ModalProps = {
	show: boolean;
	setShow: (open: boolean) => void;
};

export const Modal: React.FC<ModalProps> = ({ show, setShow, children }) => {
	return (
		<Model show={show}>
			<Container>{children}</Container>
		</Model>
	);
};
