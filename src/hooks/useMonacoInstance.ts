import { useEffect, useState } from "react";
import { loader } from "@monaco-editor/react";
import { type MonacoInstance } from "@/types/monacoEditor";

const useMonacoInstance = () => {
	const [monacoInstance, setMonacoInstance] = useState<MonacoInstance | null>(
		null
	);

	useEffect(() => {
		loader
			.init()
			.then((monaco) => {
				setMonacoInstance(monaco);
			})
			.catch((error) => {
				console.error("Failed to initialize Monaco:", error);
			});
	}, []);

	return monacoInstance;
};

export default useMonacoInstance;

