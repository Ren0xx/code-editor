import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeFontSizeBy, changeTabSize } from "@/lib/settings/settingsSlice";
import { maximumFontSize, minimumFontSize } from "@/app/utils/constants";

const useChangeEditorOptions = () => {
	const { fontSize } = useAppSelector((state) => state.settings.options);
	const dispatch = useAppDispatch();

	const increaseOrDecreaseBy = 2;

	const increaseFont = () => {
		if (fontSize + increaseOrDecreaseBy > maximumFontSize) return;
		dispatch(changeFontSizeBy(increaseOrDecreaseBy));
	};
	const decreaseFont = () => {
		if (fontSize - increaseOrDecreaseBy < minimumFontSize) return;
		dispatch(changeFontSizeBy(-increaseOrDecreaseBy));
	};
	const changeTabSizeToTwo = () => dispatch(changeTabSize(2));
	const changeTabSizeToFour = () => dispatch(changeTabSize(4));

	return {
		increaseFont,
		decreaseFont,
		changeTabSizeToTwo,
		changeTabSizeToFour,
	};
};

export default useChangeEditorOptions;

