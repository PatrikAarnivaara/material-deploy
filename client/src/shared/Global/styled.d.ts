import 'styled-components';

declare module 'styled-components' {
	export type DefaultTheme = {
		colors: {
			main: string;
			secondary: string;
			surface: string;
		};
	}
}
