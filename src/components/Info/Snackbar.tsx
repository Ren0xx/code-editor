import { Alert, Snackbar as MaterialSnackbar } from "@mui/material";
import { type SnackbarOrigin } from "@mui/material";
import { type AlertColor } from "@mui/material";

type SnackbarProps = {
	message: string;
	open: boolean;
	handleClose: () => void;
	origin?: SnackbarOrigin;
	alertColor?: AlertColor;
};
const defaultOrigin = { vertical: "bottom", horizontal: "right" } as const;
const defaultColor = "success";
const Snackbar = (props: SnackbarProps) => {
	const {
		message,
		open,
		handleClose,
		origin = defaultOrigin,
		alertColor = defaultColor,
	} = props;

	const autoHideDurationInMs = 4000;
	return (
		<MaterialSnackbar
			open={open}
			onClose={handleClose}
			autoHideDuration={autoHideDurationInMs}
			anchorOrigin={origin}>
			<Alert
				onClose={handleClose}
				severity={alertColor}
				variant='filled'
				sx={{ width: "100%" }}>
				{message}
			</Alert>
		</MaterialSnackbar>
	);
};

export default Snackbar;

