import { Snackbar as MaterialSnackbar } from "@mui/material";
import { type SnackbarOrigin } from "@mui/material";

type SnackbarProps = {
	message: string;
	open: boolean;
	handleClose: () => void;
	origin?: SnackbarOrigin;
};
const Snackbar = (props: SnackbarProps) => {
	const { message, open, handleClose } = props;
	let { origin } = props;
	if (!origin) {
		origin = { vertical: "bottom", horizontal: "right" };
	}
	const autoHideDurationInMs = 4000;
	return (
		<MaterialSnackbar
			open={open}
			message={message}
			onClose={handleClose}
			autoHideDuration={autoHideDurationInMs}
			anchorOrigin={origin}
		/>
	);
};

export default Snackbar;

