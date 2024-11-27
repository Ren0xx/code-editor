import { api } from "@/trpc/react";

const useGetFileDataFromLink = (shareLink: string) => {
	const { data: fileData, refetch: fetchFileData } =
		api.file.getFileByLinkId.useQuery(shareLink, {
			enabled: false,
		});
	return { fileData, fetchFileData };
};

export default useGetFileDataFromLink;

