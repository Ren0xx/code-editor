import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FileList from "@/components/Files/FileList";

import { renderWithProviders } from "@/utils/test-utils";
import { File } from "@/types/stateTypes";
const fn = vi.fn();

// fn.mock("next/router", () => ({
// 	useRouter() {
// 		return {
// 			route: "/",
// 			pathname: "",
// 			query: "",
// 			asPath: "",
// 		};
// 	},
// }));
test("Renders file list component", () => {
	// const files: File[] = [
	// 	{ name: "test1", language: "javascript", code: "test code" },
	// 	{ name: "test2", language: "javascript", code: "test code" },
	// 	{ name: "test3", language: "javascript", code: "test code" },
	// 	{ name: "test4", language: "javascript", code: "test code" },
	// 	{ name: "test5", language: "javascript", code: "test code" },
	// 	{ name: "test6", language: "javascript", code: "test code" },
	// ];
	renderWithProviders(<FileList files={[]} />);
	expect(
		screen.getByRole("heading", { level: 2, name: "File list" })
	).toBeDefined();
});

