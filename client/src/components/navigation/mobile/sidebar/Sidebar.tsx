import './Sidebar.css';
import { useHistory } from 'react-router-dom';
import RoutingPath from '../../../../routes/RoutingPath';

export const Sidebar = (props: { drawerIsOpen: boolean; drawerHandler: (open: boolean) => void }) => {
	const history = useHistory();
	return (
		<nav className={props.drawerIsOpen ? 'side-drawer open' : 'side-drawer'}>
			<h1 onClick={() => props.drawerHandler(false)}>X</h1>
			<nav>
				<ul>
					<li onClick={() => history.push(RoutingPath.equipmentView)}>equipment</li>
					<li onClick={() => history.push(RoutingPath.myLoanView)}>my loans</li>
				</ul>
			</nav>
		</nav>
	);
};
