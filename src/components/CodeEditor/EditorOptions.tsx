import useChangeEditorOptions from "@/hooks/useChangeEditorOptions";

import { IconButton, Typography } from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks4Icon from "@mui/icons-material/Looks4";

const EditorOptions = () => {
	const {
		changeTabSizeToTwo,
		changeTabSizeToFour,
		increaseFont,
		decreaseFont,
		tabSize,
	} = useChangeEditorOptions();
	const isTabSizeTwo = tabSize === 2;
	return (
		<div>
			<Typography variant='h6' component='h3'>
				Font Size:
			</Typography>
			<SecondaryContainedButton onClick={decreaseFont}>
				<ArrowDownwardIcon />
			</SecondaryContainedButton>
			<SecondaryContainedButton onClick={increaseFont}>
				<ArrowUpwardIcon />
			</SecondaryContainedButton>

			<Typography variant='h6' component='h3'>
				Tabs Size:
			</Typography>
			<SecondaryContainedButton onClick={changeTabSizeToTwo}>
				<LooksTwoIcon color={!isTabSizeTwo ? "disabled" : "action"} />
			</SecondaryContainedButton>
			<SecondaryContainedButton onClick={changeTabSizeToFour}>
				<Looks4Icon color={isTabSizeTwo ? "disabled" : "action"} />
			</SecondaryContainedButton>
		</div>
	);
};

const SecondaryContainedButton = ({
	onClick,
	children,
}: {
	onClick: () => void;
	children: React.ReactNode;
}) => {
	return <IconButton onClick={onClick}>{children}</IconButton>;
};
export default EditorOptions;

