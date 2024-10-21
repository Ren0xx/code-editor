import { api, HydrateClient } from "@/trpc/server";
import CodeEditor from "@/components/CodeEditor";
import { Grid2 as Grid } from "@mui/material";
import MainLayout from "@/components/MainLayout";
export default async function Home() {
	// void api.post.getLatest.prefetch();

	return (
		<HydrateClient>
			<MainLayout />
		</HydrateClient>
	);
}

