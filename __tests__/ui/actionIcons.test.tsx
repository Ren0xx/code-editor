import { fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ActionsIcons from "@/components/Files/ActionsIcons";
import { saveCodeToFile } from "@/utils/helperFunctions";
import { renderWithProviders } from "@/utils/test-utils";
vi.mock("@/utils/helperFunctions", () => ({
	saveCodeToFile: vi.fn(),
}));

vi.mock("@/hooks/useShareCode", () => ({
	default: vi.fn(() => ({
		shareFile: vi
			.fn()
			.mockResolvedValue({ shareLink: "mockLink", success: true }),
	})),
}));

describe("ActionsIcons Component", () => {
	const props = {
		code: 'console.log("Hello, World!");',
		fileName: "testFile.js",
		language: "javascript" as const,
	};

	it("should save code to file and show snackbar", () => {
		const { getByLabelText, getByText } = renderWithProviders(
			<ActionsIcons {...props} />
		);
		const saveButton = getByLabelText("save code as file");

		fireEvent.click(saveButton);

		expect(saveCodeToFile).toHaveBeenCalledWith(props.code, props.fileName);
		expect(getByText("Code saved to file")).toBeInTheDocument();
	});

	it("should copy code to clipboard and show snackbar", async () => {
		const { getByLabelText, getByText } = renderWithProviders(
			<ActionsIcons {...props} />
		);
		const copyButton = getByLabelText("copy code to clipboard");

		Object.assign(navigator, {
			clipboard: {
				writeText: vi.fn().mockResolvedValue(undefined),
			},
		});

		fireEvent.click(copyButton);

		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(props.code);
		expect(getByText("Code copied to clipboard")).toBeInTheDocument();
	});
});

