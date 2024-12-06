import { api } from "@/trpc/react";
const useGetUsersSharedFiles = () => {
	const {
		data: files,
		isLoading,
		refetch,
	} = api.file.getUsersSharedFiles.useQuery();

	const refetchSharedFiles = async () => {
		await refetch();
	};
	return { files, isLoading, refetchSharedFiles };
};

export default useGetUsersSharedFiles;

