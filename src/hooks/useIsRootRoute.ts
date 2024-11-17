import { usePathname } from "next/navigation";

const useIsRootRoute = () => {
	const pathname = usePathname();
	return pathname === "/";
};

export default useIsRootRoute;

