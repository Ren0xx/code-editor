"use client";

import { alpha, createTheme } from "@mui/material/styles";
const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#512da8",
		},
		secondary: {
			main: "#9e9d24",
		},
		divider: "#000000",
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
		// background: { default: "#1f1f39" },
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

