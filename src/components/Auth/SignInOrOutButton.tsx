import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
export default function SignInOrOutButton() {
	const { isSignedIn } = useUser();

	return !isSignedIn ? <SignInButton /> : <SignOutButton />;
}

