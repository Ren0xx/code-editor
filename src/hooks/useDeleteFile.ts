import { api } from "@/trpc/react";
const useDeleteFile = (onSuccess?: () => Promise<void>) => {
	const { mutateAsync } = api.file.deleteFile.useMutation({
		onSuccess: () => {
			if (onSuccess) void onSuccess();
		},
	});
	const deleteFile = async (id: number) => {
		return await mutateAsync(id);
	};
	return { deleteFile };
};

export default useDeleteFile;

