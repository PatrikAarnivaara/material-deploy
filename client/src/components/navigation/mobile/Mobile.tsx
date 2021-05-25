import { useState } from 'react';
import { HamburgerButton } from './hamburgerbutton/HamburgerButton';
import { Sidebar } from './sidebar/Sidebar';
import { Backdrop } from '../../backdrop/Backdrop';
import styled from 'styled-components';

export const StyledMobile = styled.div``;

export const Mobile = () => {
	const [openDrawer, setOpenDrawer] = useState<boolean>(false);
	return (
		<StyledMobile>
			<HamburgerButton drawerHandler={setOpenDrawer} />
			<Sidebar drawerIsOpen={openDrawer} drawerHandler={setOpenDrawer} />
			{!openDrawer || <Backdrop alpha={0.5} drawerHandler={setOpenDrawer}/>}
		</StyledMobile>
	);
};
