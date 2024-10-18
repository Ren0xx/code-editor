import { api, HydrateClient } from "@/trpc/server";
import CodeEditor from "@/components/codeEditor";

export default async function Home() {
	// void api.post.getLatest.prefetch();

	return (
		<HydrateClient>
			<main>
				<CodeEditor />
			</main>
		</HydrateClient>
	);
}

