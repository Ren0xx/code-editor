import { renderWithProviders } from "@/utils/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import AddFileFromLinkForm from "@/components/Forms/AddFileFromLinkForm";
import { vi } from "vitest";

const mockHandleAddFile = vi.fn();
const mockFetchFileData = vi.fn();

vi.mock("@/hooks/useAddFileFromLink", () => ({
	default: () => ({
		handleAddFile: mockHandleAddFile,
	}),
}));

vi.mock("@/hooks/useGetFileDataFromLink", () => ({
	default: () => ({
		fetchFileData: mockFetchFileData,
	}),
}));

describe("AddFileFromLinkForm", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should display `Must be a valid share link` when wrong format", async () => {
		renderWithProviders(<AddFileFromLinkForm />);

		const testUUID = "wrong_format";

		fireEvent.input(screen.getByLabelText(/Share Link/i), {
			target: { value: testUUID },
		});

		fireEvent.submit(
			screen.getByRole("button", { name: /Add File from Link/i })
		);

		const errorMessage = await screen.findByText(
			/Must be a valid share link/i
		);
		expect(errorMessage).toBeInTheDocument();
	});
	it("shouldn't display error when share link is in the correct format", async () => {
		renderWithProviders(<AddFileFromLinkForm />);

		const testUUID = "08edc730-2982-47cb-9c69-e6687f244e69";

		fireEvent.input(screen.getByLabelText(/Share Link/i), {
			target: { value: testUUID },
		});

		fireEvent.submit(
			screen.getByRole("button", { name: /Add File from Link/i })
		);

		expect(screen.queryByText(/Must be a valid share link/i)).toBeNull();
	});

	it("displays `An unexpected error occurred` when fetchFileData throws an error", async () => {
		mockFetchFileData.mockRejectedValueOnce(
			new Error("Unexpected error") // Symulacja błędu niespodziewanego
		);

		renderWithProviders(<AddFileFromLinkForm />);

		fireEvent.input(screen.getByLabelText(/Share Link/i), {
			target: { value: "08edc730-2982-47cb-9c69-e6687f244e69" },
		});

		fireEvent.submit(
			screen.getByRole("button", { name: /Add File from Link/i })
		);

		const errorMessage = await screen.findByText(
			/An unexpected error occurred/i
		);
		expect(errorMessage).toBeInTheDocument();
	});
	it("displays `Invalid or missing file data` when fetchFileData returns no data", async () => {
		mockFetchFileData.mockResolvedValue({ data: undefined }); // Brak danych

		renderWithProviders(<AddFileFromLinkForm />);

		fireEvent.input(screen.getByLabelText(/Share Link/i), {
			target: { value: "08edc730-2982-47cb-9c69-e6687f244e69" },
		});

		fireEvent.submit(
			screen.getByRole("button", { name: /Add File from Link/i })
		);

		const errorMessage = await screen.findByText(
			/Invalid or missing file data/i
		);
		expect(errorMessage).toBeInTheDocument();
	});
	it("displays `File not found` when handleAddFile returns 'File not found'", async () => {
		mockFetchFileData.mockResolvedValue({
			data: { name: "test", content: "", language: "javascript" },
		});
		mockHandleAddFile.mockResolvedValue("File not found");

		renderWithProviders(<AddFileFromLinkForm />);

		fireEvent.input(screen.getByLabelText(/Share Link/i), {
			target: { value: "08edc730-2982-47cb-9c69-e6687f244e69" },
		});

		fireEvent.submit(
			screen.getByRole("button", { name: /Add File from Link/i })
		);

		const errorMessage = await screen.findByText(/File not found/i);
		expect(errorMessage).toBeInTheDocument();
	});

	it("displays `File with that name already exists` when handleAddFile returns such an error", async () => {
		mockFetchFileData.mockResolvedValue({
			data: { name: "test", content: "", language: "javascript" },
		});
		mockHandleAddFile.mockResolvedValue(
			"File with that name already exists"
		);

		renderWithProviders(<AddFileFromLinkForm />);

		fireEvent.input(screen.getByLabelText(/Share Link/i), {
			target: { value: "08edc730-2982-47cb-9c69-e6687f244e69" },
		});

		fireEvent.submit(
			screen.getByRole("button", { name: /Add File from Link/i })
		);

		const errorMessage = await screen.findByText(
			/File with that name already exists/i
		);
		expect(errorMessage).toBeInTheDocument();
	});
});

