import LinkButton from '../buttons/LinkButton';
import BookIcon from '../icons/BookIcon';
import BarcodeIcon from '../icons/CodeIcon';
import FileIcon from '../icons/FileIcon';

const Menu = () => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-col gap-4 mx-auto">
				<LinkButton to="/listas" icon={BookIcon}>
					<div className="flex flex-col gap-2 max-w-xs h-24">
						<span className="text-2xl">Mis listas</span>
						<span className="text-sm">
							Crea listas con los codigos o consulta el historico de tus listas.
						</span>
					</div>
				</LinkButton>
				<LinkButton to="/codigos" icon={BarcodeIcon}>
					<div className="flex flex-col gap-2 max-w-xs h-24">
						<span className="text-2xl">Buscador de Codigos</span>
						<span className="text-sm">
							Busca codigos de centros o localidades para añadirlo a tu lista
						</span>
					</div>
				</LinkButton>
				<LinkButton to="/importar-codigos" icon={FileIcon}>
					<div className="flex flex-col gap-2 max-w-xs h-24">
						<span className="text-2xl">Editar/Importar códigos</span>
						<span className="text-sm">
							Edita o importa codigos de centros y localidades mediante los
							ficheros de la junta.
						</span>
					</div>
				</LinkButton>
			</div>
		</div>
	);
};

export default Menu;
