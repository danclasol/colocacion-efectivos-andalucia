import { useForm } from 'react-hook-form';
import { getProvinceName } from '../../../lib/province';
import Button from '../../buttons/Button';
import CenterCode from '../../center-list/CenterCode';
import InputText from '../../forms/InputText';

const CodeEditForm = ({ code, name, province, closeModal, onSuccess }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting, isValid },
	} = useForm({
		defaultValues: { code, name, coords: '' },
	});

	return (
		<div className="flex flex-col gap-6 items-center w-full px-20 py-10">
			<div className="flex items-center gap-2">
				<CenterCode code={code} />
				<p className="text-center text-lg">{`${name} (${getProvinceName(
					province
				)})`}</p>
			</div>
			<form
				onSubmit={handleSubmit(async data => {
					await handleSubmitForm({
						code,
						data,
						closeModal,
					});
				})}>
				<InputText
					name="code"
					label="Código"
					placeholder="Código"
					register={register}
					validate={{
						required: 'Campo obligatorio',
						minLength: {
							value: 4,
							message: 'Debe tener 9 carácteres.',
						},
					}}
					error={errors.email?.message}
				/>
				<InputText
					name="name"
					label="Nombre"
					placeholder="Nombre"
					register={register}
					validate={{
						required: 'Campo obligatorio',
						minLength: {
							value: 4,
							message: 'Mínimo 4 letras',
						},
					}}
					error={errors.email?.message}
				/>
			</form>
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
							closeModal,
							onSuccess,
						})
					}>
					{isSubmitting ? 'Guardando...' : 'Guardar'}
				</Button>
			</div>
		</div>
	);
};

const handleSubmitForm = async ({ code, data, closeModal, onSuccess }) => {
	// const success = await deleteLocationCode({ id });
	// if (success) {
	// 	onSuccess();
	// 	closeModal();
	// }
};

export default CodeEditForm;
