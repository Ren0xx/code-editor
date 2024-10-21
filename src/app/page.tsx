import { api, HydrateClient } from "@/trpc/server";
import MainLayout from "@/components/MainLayout";
export default async function Home() {
	// void api.post.getLatest.prefetch();

	return (
		<HydrateClient>
			<MainLayout />
		</HydrateClient>
	);
}

