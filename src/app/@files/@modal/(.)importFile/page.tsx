import Files from "@/app/@files/page";
import ImportFileForm from "@/components/Forms/ImportFileForm";
import { ModalWithChildren } from "@/components/Info/Modals/Modals";

export default function ImportFile() {
	return (
		<>
			<Files />
			<ModalWithChildren>
				<ImportFileForm />
			</ModalWithChildren>
		</>
	);
}

