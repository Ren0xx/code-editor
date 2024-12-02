import { api } from "@/trpc/react";
import { type Language } from "@/types/stateTypes";

const useShareCode = () => {
	const { mutateAsync } = api.file.shareFile.useMutation({});
	const shareFile = async (
		name: string,
		content: string,
		language?: Language
	) => {
		return await mutateAsync({
			name,
			content,
			language,
		});
	};
	return { shareFile };
};

export default useShareCode;

