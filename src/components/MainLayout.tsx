"use client";

import Grid from "@mui/material/Grid2";
import CodeEditor from "@/components/CodeEditor";
import SideSection from "@/components/SideSection";

const MainLayout = () => {
	return (
		<main>
			<Grid container>
				<Grid size={3}>
					<h1>Side bar</h1>
					<SideSection />
				</Grid>
				<Grid size={9}>
					<CodeEditor />
				</Grid>
			</Grid>
		</main>
	);
};

export default MainLayout;

