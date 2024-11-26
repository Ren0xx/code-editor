import { Box, Button, Typography } from "@mui/material";

type ConfirmationFormProps = {
	actionName: string;
	confirmationText: string;
	title: string;
	handleClick: () => void;
	style?: object;
};
const ConfirmationForm = (props: ConfirmationFormProps) => {
	const { actionName, confirmationText, title, handleClick, style } = props;
	return (
		<Box
			sx={{
				...style,
				display: "flex",
				flexDirection: "column",
				gap: 2,
			}}>
			<Typography id='modal-modal-title' variant='h5' component='h2'>
				{title}
			</Typography>
			<Typography id='modal-modal-description' sx={{ mt: 2 }}>
				{confirmationText}
			</Typography>
			<Button onClick={handleClick} variant='contained' color='error'>
				{actionName}
			</Button>
		</Box>
	);
};
export default ConfirmationForm;