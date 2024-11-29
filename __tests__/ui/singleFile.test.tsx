import { renderWithProviders } from "@/utils/test-utils";
import { fireEvent, screen, within } from "@testing-library/react";
import SingleFile from "@/components/Files/SingleFile";
import { vi } from "vitest";

const mockDispatch = vi.fn();
const mockPush = vi.fn();

vi.mock("@/lib/hooks", () => ({
	useAppSelector: vi.fn((selector) =>
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
		selector({ code: { activeFile: { name: "test1" } } })
	),
	useAppDispatch: () => mockDispatch,
}));

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));

describe("SingleFile", () => {
	test("Renders file name with appropriate styling for active file", () => {
		renderWithProviders(<SingleFile fileName='test1' fileIndex={0} />);
		const button = screen.getByRole("button", { name: "test1" });

		expect(button).toHaveClass("MuiButton-containedPrimary"); // Active file
	});

	test("Renders file name with appropriate styling for inactive file", () => {
		renderWithProviders(<SingleFile fileName='test2' fileIndex={1} />);
		const button = screen.getByRole("button", { name: "test2" });

		expect(button).toHaveClass("MuiButton-outlinedSecondary"); // Not active file
	});

	test("Dispatches changeActiveFile on click", () => {
		renderWithProviders(<SingleFile fileName='test2' fileIndex={1} />);
		const button = screen.getByRole("button", { name: "test2" });

		fireEvent.click(button);

		expect(mockDispatch).toHaveBeenCalledWith({
			type: "code/changeActiveFile",
			payload: 1,
		});
	});

	test("Opens context menu on right click", () => {
		renderWithProviders(<SingleFile fileName='test1' fileIndex={0} />);
		const button = screen.getByRole("button", { name: "test1" });

		fireEvent.contextMenu(button);

		expect(screen.getByRole("menu")).toBeInTheDocument();
	});

	test("Handles Rename menu option", () => {
		renderWithProviders(<SingleFile fileName='test1' fileIndex={0} />);
		const button = screen.getByRole("button", { name: "test1" });

		// Open menu
		fireEvent.contextMenu(button);

		const renameOption = within(screen.getByRole("menu")).getByText(
			"Rename"
		);
		fireEvent.click(renameOption);

		expect(mockPush).toHaveBeenCalledWith("/rename/0?name=test1");
	});

	test("Handles Delete menu option", () => {
		renderWithProviders(<SingleFile fileName='test1' fileIndex={0} />);
		const button = screen.getByRole("button", { name: "test1" });

		// Open menu
		fireEvent.contextMenu(button);

		const deleteOption = within(screen.getByRole("menu")).getByText(
			"Delete"
		);
		fireEvent.click(deleteOption);

		expect(mockPush).toHaveBeenCalledWith("/delete/0");
	});
});

