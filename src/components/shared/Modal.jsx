import { useRef } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '../buttons/IconButton';
import CloseIcon from '../icons/CloseIcon';

const Modal = ({ className, onClose, children }) => {
	const modalRef = useRef(null);

	const onClickHandlerModal = ev => {
		ev.stopPropagation();

		if (!modalRef.current.contains(ev.target)) {
			onClose();
		}
	};

	if (!children) {
		return;
	}

	return createPortal(
		<div
			className="fixed flex items-center justify-center inset-0 max-h-full max-w-full z-10 bg-slate-400 bg-opacity-60"
			onClick={onClickHandlerModal}>
			<div
				className={`relative flex rounded-lg shadow-xl inset-0 overflow-y-auto bg-white ${
					className || ''
				}}`}
				ref={modalRef}>
				<div className="absolute top-1 right-1">
					<IconButton icon={CloseIcon} onClick={onClose} />
				</div>
				{children}
			</div>
		</div>,
		document.getElementById('portal')
	);
};

export default Modal;
