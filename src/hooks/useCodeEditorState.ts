import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeCurrentCode } from "@/lib/code/codeSlice";

const useCodeEditorState = () => {
	const { editorTheme: theme } = useAppSelector((state) => state.settings);
	const { code, language } = useAppSelector((state) => state.code.activeFile);
	const editorOptions = useAppSelector((state) => state.settings.options);

	const dispatch = useAppDispatch();

	const handleCodeChange = (newCode: string) => {
		dispatch(changeCurrentCode(newCode));
	};

	return { theme, code, language, editorOptions, handleCodeChange };
};

export default useCodeEditorState;

