import { useState } from 'react';
import { PROVINCES } from '../../constants/provinces';
import Button from '../buttons/Button';
import ImportIcon from '../icons/ImportIcon';
import Modal from '../shared/Modal';
import ImportCodesProvince from './ImportCodesProvince';
import ImportFile from './ImportFile';

const ImportCodes = () => {
	const { modalContent, closeModal, openLoadModal } = useModal();

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className="flex flex-col gap-6 mx-36">
				<div className="flex justify-center">
					<Button icon={ImportIcon} onClick={openLoadModal}>
						Cargar fichero
					</Button>
				</div>
				<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
					{PROVINCES.map(item => {
						return <ImportCodesProvince key={item.province} {...item} />;
					})}
				</div>
			</section>
		</>
	);
};

const useModal = () => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openLoadModal = () => {
		setModalContent(<ImportFile />);
	};

	return {
		modalContent,
		closeModal,
		openLoadModal,
	};
};

export default ImportCodes;
