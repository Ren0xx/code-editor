import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@mui/material";
export default function SignInOrOutButton() {
	const { isSignedIn } = useUser();

	return !isSignedIn ? (
		<SignInButton mode='modal'>
			<Button>Sign In</Button>
		</SignInButton>
	) : (
		<SignOutButton>
			<Button>Sign Out</Button>
		</SignOutButton>
	);
}

