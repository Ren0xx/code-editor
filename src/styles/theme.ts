"use client";

import { createTheme } from "@mui/material/styles";
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
			main: "#3f51b5",
		},
		secondary: {
			main: "#33359575",
		},
		divider: "#ffffff",
		background: { default: "#1f1f39" },
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

