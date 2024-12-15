import { Link as MuiLink } from "@mui/material";
import Link from "next/link";

const SharedFilesLink = () => {
	return (
		<MuiLink href='/sharedFiles' component={Link} variant="h5">
			Shared Files
		</MuiLink>
	);
};

export default SharedFilesLink;

