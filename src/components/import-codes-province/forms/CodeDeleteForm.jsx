import { useState } from 'react';
import { getProvinceName } from '../../../lib/province';
import Button from '../../buttons/Button';
import CenterCode from '../../center-list/CenterCode';

const CodeDeleteForm = ({ code, name, province, closeModal, onSuccess }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<div className="flex flex-col gap-6 items-center w-full px-20 py-10">
			<h3 className="text-center text-2xl font-medium">
				¿Eliminar este código de la aplicación?
			</h3>
			<div className="flex items-center gap-2">
				<CenterCode code={code} />
				<p className="text-center text-lg">{`${name} (${getProvinceName(
					province
				)})`}</p>
			</div>

			<div className="flex flex-colum gap-1 w-full">
				<Button onClick={closeModal} disabled={isSubmitting} kind="blue">
					Cancelar
				</Button>
				<Button
					disabled={isSubmitting}
					kind="red"
					onClick={() =>
						handleSubmitForm({
							code,
							setIsSubmitting,
							closeModal,
							onSuccess,
						})
					}>
					{isSubmitting ? 'Eliminando...' : 'Eliminar'}
				</Button>
			</div>
		</div>
	);
};

const handleSubmitForm = async ({
	code,
	setIsSubmitting,
	closeModal,
	onSuccess,
}) => {
	setIsSubmitting(true);

	// const success = await deleteLocationCode({ id });

	// if (success) {
	// 	onSuccess();
	// 	closeModal();
	// }

	setIsSubmitting(false);
};

export default CodeDeleteForm;
