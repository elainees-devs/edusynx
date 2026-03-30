import React from "react";
import type { IStrand } from "../../types";

interface Props {
	strands: IStrand[];
	page?: number;
	limit?: number;
	onSort?: () => void;
	onEdit?: (id: string, data: Partial<IStrand>) => void;
	onDelete?: (strand: IStrand) => void;
}

const StrandTable: React.FC<Props> = ({ strands, onEdit, onDelete }) => {
	return (
		<table className="min-w-full border">
			<thead>
				<tr>
					<th className="border px-2 py-1">Code</th>
					<th className="border px-2 py-1">Title</th>
					<th className="border px-2 py-1">Description</th>
					<th className="border px-2 py-1">Actions</th>
				</tr>
			</thead>
			<tbody>
				{strands.map((strand) => (
					<tr key={strand._id}>
						<td className="border px-2 py-1">{strand.code}</td>
						<td className="border px-2 py-1">{strand.title}</td>
						<td className="border px-2 py-1">{strand.description || "-"}</td>
						<td className="border px-2 py-1 space-x-2">
							{onEdit && (
								<button
									className="text-blue-600 hover:underline"
									onClick={() => onEdit(strand._id, strand)}
								>
									Edit
								</button>
							)}
							{onDelete && (
								<button
									className="text-red-600 hover:underline"
									onClick={() => onDelete(strand)}
								>
									Delete
								</button>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default StrandTable;
