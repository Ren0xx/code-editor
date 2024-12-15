import { useAppDispatch } from "@/lib/hooks";
import { changeTheme } from "@/lib/settings/settingsSlice";
import { type EditorTheme } from "@/types/stateTypes";

const useThemeChange = () => {
	const dispatch = useAppDispatch();

	const changeEditorTheme = (theme: EditorTheme) => {
		dispatch(changeTheme(theme));
	};
	return { changeEditorTheme };
};

export default useThemeChange;

