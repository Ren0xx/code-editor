import { Grid2 as Grid } from "@mui/material";
import CodeEditor from "@/components/CodeEditor";

const MainLayout = () => {
	return (
		<main>
			<Grid container>
				<Grid size={3}>
					<h1>Side bar</h1>
				</Grid>
				<Grid size={9}>
					<CodeEditor />
				</Grid>
			</Grid>
		</main>
	);
};

export default MainLayout;

