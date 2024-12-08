import { api } from "@/trpc/react";
const useGetUsersSharedFiles = () => {
	const {
		data: files,
		isLoading,
		isError,
		refetch,
	} = api.file.getUsersSharedFiles.useQuery();

	const refetchSharedFiles = async () => {
		await refetch();
	};
	return { files, isLoading, refetchSharedFiles, isError };
};

export default useGetUsersSharedFiles;

