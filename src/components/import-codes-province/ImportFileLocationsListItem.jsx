import { useState } from 'react';
import IconButton from '../buttons/IconButton';
import CenterCode from '../center-list/CenterCode';
import ProvinceType from '../center-list/ProvinceType';
import MapIcon from '../icons/MapIcon';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import Modal from '../shared/Modal';
import CodeMap from './CodeMap';
import CodeDeleteForm from './forms/CodeDeleteForm';
import CodeEditForm from './forms/CodeEditForm';

const ImportFileLocationsListItem = ({ id, name, province }) => {
	const {
		modalContent,
		closeModal,
		openMapModal,
		openEditModal,
		openDeleteModal,
	} = useModal({
		code: id,
		name,
		province,
	});

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<tr className="bg-white border-b">
				<td className="px-6 py-4">
					<CenterCode code={id} />
				</td>
				<td className="px-6 py-4">
					<h2 className="text-xl font-medium text-black">
						<ProvinceType province={province} />
					</h2>
				</td>
				<td className="px-6 py-4">
					<h2 className="text-xl font-medium text-black">{name}</h2>
				</td>
				<td className="px-6 py-4 text-center">
					<IconButton icon={MapIcon} color="orange" onClick={openMapModal} />
				</td>
				<td className="flex gap-1 px-6 py-4 text-center">
					<IconButton icon={PencilIcon} color="green" onClick={openEditModal} />
					<IconButton icon={TrashIcon} color="red" onClick={openDeleteModal} />
				</td>
			</tr>
		</>
	);
};

const useModal = ({ code, name, province }) => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openMapModal = () => {
		setModalContent(
			<CodeMap
				code={code}
				name={name}
				province={province}
				closeModal={closeModal}
			/>
		);
	};

	const openEditModal = () => {
		setModalContent(
			<CodeEditForm
				code={code}
				name={name}
				province={province}
				closeModal={closeModal}
			/>
		);
	};

	const openDeleteModal = () => {
		setModalContent(
			<CodeDeleteForm
				code={code}
				name={name}
				province={province}
				closeModal={closeModal}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openMapModal,
		openEditModal,
		openDeleteModal,
	};
};

export default ImportFileLocationsListItem;
