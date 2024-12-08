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
	},
});
const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#3f51b5",
		},
		secondary: {
			main: "#f50057",
		},
	},
});
export { lightTheme, darkTheme };

