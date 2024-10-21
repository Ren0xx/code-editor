import { saveCodeToFile } from "@/app/utils/helperFunctions";
import { Button } from "@mui/material";
import { useAppSelector } from "@/lib/hooks";

const SideSection = () => {
	const { language } = useAppSelector((state) => state.settings);
	const { code } = useAppSelector((state) => state.code);

	const handleClick = () => {
		saveCodeToFile(language, code);
	};
	return (
		<div>
			<Button onClick={handleClick} variant='contained'>
				Save code as file
			</Button>
		</div>
	);
};

export default SideSection;

