import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Box, Button } from "@mui/material";
export default function SignInOrOutButton() {
	const { isSignedIn } = useUser();

	const commonStyles = {
		position: "sticky",
		mt: "auto",
		px: 2,
	};

	return (
		<Box sx={commonStyles}>
			{isSignedIn ? (
				<SignOutButton>
					<Button variant='contained' fullWidth={true}>
						Sign Out
					</Button>
				</SignOutButton>
			) : (
				<SignInButton mode='modal'>
					<Button variant='contained' fullWidth={true}>
						Sign In
					</Button>
				</SignInButton>
			)}
		</Box>
	);
}

