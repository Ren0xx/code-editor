"use client";

import { alpha, createTheme } from "@mui/material/styles";
const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#323F8C",
		},
		secondary: {
			main: alpha("#2C387E", 0.8),
		},
	},
	typography: {
		button: {
			textTransform: "none",
		},
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
	},
});
const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#323F8C",
		},
		secondary: {
			main: alpha("#2C387E", 0.3),
		},
		divider: "#ffffff",
	},

	typography: {
		button: {
			textTransform: "none",
		},
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
	},
});
export { lightTheme, darkTheme };

