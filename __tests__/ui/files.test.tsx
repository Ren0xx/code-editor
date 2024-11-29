import { screen } from "@testing-library/react";
import FileList from "@/components/Files/FileList";
import { renderWithProviders } from "@/utils/test-utils";
import { type File } from "@/types/stateTypes";

import { expect, test, vi, describe } from "vitest";

const fn = vi.fn();

describe("files list", () => {
	vi.mock("next/navigation", () => {
		const actual = vi.importActual("next/navigation");
		return {
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			...actual,
			useRouter: vi.fn(() => ({
				push: vi.fn(),
			})),
			useSearchParams: vi.fn(() => ({
				get: vi.fn(),
			})),
			usePathname: vi.fn(),
		};
	});
	const files: File[] = [
		{ name: "test1", language: "javascript", code: "test code" },
		{ name: "test2", language: "javascript", code: "test code" },
		{ name: "test3", language: "javascript", code: "test code" },
		{ name: "test4", language: "javascript", code: "test code" },
		{ name: "test5", language: "javascript", code: "test code" },
		{ name: "test6", language: "javascript", code: "test code" },
	];
	test("Displays heading, no files", () => {
		renderWithProviders(<FileList files={[]} />);
		expect(screen.getByRole("heading", { level: 2, name: "File list" }));
		expect(screen.queryByText("test1")).toBeNull();
	});
	test("Renders SingleFile for each file", () => {
		renderWithProviders(<FileList files={files} />);

		files.forEach((file) => {
			expect(screen.getByText(file.name)).toBeInTheDocument();
		});
	});
});

