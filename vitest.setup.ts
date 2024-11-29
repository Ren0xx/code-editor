import "@testing-library/jest-dom";

import { vi } from "vitest";

vi.mock("next/navigation", () => ({
	useRouter: vi.fn(() => ({
		push: vi.fn(),
		replace: vi.fn(),
	})),
	useSearchParams: vi.fn(() => ({
		get: vi.fn(),
	})),
	usePathname: vi.fn(() => "/"),
}));
