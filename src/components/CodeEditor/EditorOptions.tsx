import useChangeEditorOptions from "@/hooks/useChangeEditorOptions";
import { Button, Paper } from "@mui/material";

const EditorOptions = () => {
	const {
		changeTabSizeToTwo,
		changeTabSizeToFour,
		increaseFont,
		decreaseFont,
	} = useChangeEditorOptions();
	return (
		<Paper variant='outlined'>
			<h3>Font Size:</h3>
			<Button onClick={increaseFont}>+</Button>
			<Button onClick={decreaseFont}>-</Button>
			<h3>Tab Size:</h3>
			<Button onClick={changeTabSizeToTwo}>2</Button>
			<Button onClick={changeTabSizeToFour}>4</Button>
		</Paper>
	);
};

export default EditorOptions;

