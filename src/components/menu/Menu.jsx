import LinkButton from '../buttons/LinkButton';
import BookIcon from '../icons/BookIcon';
import BarcodeIcon from '../icons/CodeIcon';
import FileIcon from '../icons/FileIcon';

const Menu = () => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col gap-4 mx-auto">
				<LinkButton to="/listas" icon={BookIcon}>
					Mis listas
				</LinkButton>
				<LinkButton to="/codigos" icon={BarcodeIcon}>
					Buscador Codigos
				</LinkButton>
				<LinkButton to="/importar-codigos" icon={FileIcon}>
					Importar códigos
				</LinkButton>
			</div>
		</div>
	);
};

export default Menu;
