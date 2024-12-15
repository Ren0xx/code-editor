import useThemeChange from "@/hooks/useThemeChange";
import { type EditorTheme, themeOptions } from "@/types/stateTypes";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from "@mui/material";
type ThemeSelectorProps = {
	editorTheme: EditorTheme;
};
const ThemeSelector = (props: ThemeSelectorProps) => {
	const { editorTheme: theme } = props;
	const { changeEditorTheme } = useThemeChange();

	const handleThemeChange = (e: SelectChangeEvent) => {
		changeEditorTheme(e.target.value as EditorTheme);
	};
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

