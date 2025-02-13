const KIND_CLASSNAME = {
	'C.E.I.P.': 'bg-red-200',
	'I.E.S.': 'bg-orange-200',
	'S.E.P.': 'bg-amber-200',
	'C.E.E.E.': 'bg-lime-200',
	'C.E.PER.': 'bg-green-200',
	'C.E.PR.': 'bg-green-500',
	'C.P.M.': 'bg-emerald-200',
	'C.P.R.': 'bg-teal-200',
	'C.E.M.': 'bg-cyan-200',
	'C.P.D.': 'bg-sky-200',
	'I.P.E.P.': 'bg-indigo-200',
	'C.C': 'bg-indigo-300',
	'E.A.': 'bg-purple-200',
	'E.E.': 'bg-fuchsia-200',
	'E.I.': 'bg-pink-200',
	'E.O.E.': 'bg-rose-200',
	'E.O.I.': 'bg-yellow-200',
	'S.I.P.E.P.': 'bg-lime-400',
	'C.P.I.F.P.': 'bg-amber-400',
	Otro: 'bg-gray-200',
};

const CenterType = ({ center = 'Otro' }) => {
	return (
		<span
			className={`text-base font-medium text-black text-center rounded-md px-4 py-1 flex flex-col ${KIND_CLASSNAME[center]}`}>
			{center}
		</span>
	);
};

export default CenterType;
