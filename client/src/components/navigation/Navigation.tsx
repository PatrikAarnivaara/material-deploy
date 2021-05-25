import { Desktop } from './desktop/Desktop';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { Mobile } from './mobile/Mobile';
import styled from 'styled-components';

export const StyledNavigation = styled.div``;

export const Navigation = () => {
	const { width } = useWindowDimensions();

	const handleViewPortSize = () => {
		return width <= 600 ? <Mobile /> : <Desktop />;
	};

	return <StyledNavigation>{handleViewPortSize()}</StyledNavigation>;
};
