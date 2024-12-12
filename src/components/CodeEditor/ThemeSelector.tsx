import { type EditorTheme, themeOptions } from "@/types/stateTypes";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from "@mui/material";
type ThemeSelectorProps = {
	theme: EditorTheme;
	handleThemeChange: (e: SelectChangeEvent) => void;
};
const ThemeSelector = (props: ThemeSelectorProps) => {
	const { theme, handleThemeChange } = props;
	return (
		<FormControl>
			<InputLabel id='theme-select-label'>Theme</InputLabel>
			<Select
				labelId='theme-select-label'
				value={theme}
				onChange={handleThemeChange}>
				{themeOptions.map((theme) => (
					<MenuItem key={theme} value={theme}>
						{theme}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default ThemeSelector;
