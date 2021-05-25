import styled from 'styled-components';

export const StyledDesktop = styled.div`
	background-color: #f8f6f6;
	/* box-shadow: 0 5px 15px 0 rgb(0 0 0 / 30%); 
	*/
	margin-bottom: 40px;
	header {
		display: grid;
		gap: 1rem;
		grid-template-columns: min-content auto max-content;
		grid-template-areas: 'logo nav user';
		align-items: center;
		padding: 0.5rem;
		height: 65px;
		max-width: 1124px;
		margin-left: auto;
		margin-right: auto;
		font-size: 1rem;
		
	}
	img {
		grid-area: logo;
		width: 40px;
		height: auto;
		cursor: pointer;
		margin-left: 1em;
		margin-right: 2em;
	}
	nav {
		align-self: center;
		justify-self: left;
		ul {
			grid-area: nav;
			display: grid;
			grid-auto-flow: column;
			grid-auto-columns: max-content;
			gap: 2em;
			text-transform: capitalize;
			list-style-type: none;
			li {
				display: inline-block;
				cursor: pointer;
			}
		}
	}
	span {
		grid-area: user;
		justify-self: end;
		cursor: pointer;
		margin-right: 2em;
		text-transform: capitalize;
	}
`;
