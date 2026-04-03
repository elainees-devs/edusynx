import React, { useEffect, useState, useCallback } from "react";
import type { IStrand } from "../../types";
import { getStrands, updateStrand, deleteStrand } from "../../api/CBCApi";
import { Pagination } from "../../shared";
import { searchConfig } from "../../constants/SearchConfig";
import Swal from "sweetalert2";
import SearchBar from "../../shared/layout/ui/SearchBar";
import { StrandTable } from "../data-table";

const StrandList: React.FC = () => {
	const [strands, setStrands] = useState<IStrand[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);
	const limit = 10;

	// Load strands from API (with backend search & pagination)
	const loadStrands = useCallback(async () => {
		try {
			setLoading(true);
			const res = await getStrands(page, limit);
			setStrands(res.data);
			setTotalPages(res.totalPages || 1);
		} catch (err) {
			console.error("Failed to load strands:", err);
		} finally {
			setLoading(false);
		}
	}, [page, limit]);

	useEffect(() => {
		loadStrands();
	}, [loadStrands]);

	const { placeholder } = searchConfig.strand;

	// EDIT
	const handleEdit = async (id: string, data: Partial<IStrand>) => {
		try {
			const updated = await updateStrand(id, data);
			setStrands((prev) => prev.map((s) => (s._id === id ? updated : s)));
			Swal.fire("Success", "Strand updated", "success");
		} catch {
			Swal.fire("Error", "Update failed", "error");
		}
	};

	// DELETE
	const handleDelete = async (strand: IStrand) => {
		const result = await Swal.fire({
			title: "Delete strand",
			text: `${strand.title}`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Delete",
		});
		if (!result.isConfirmed) return;
		try {
			await deleteStrand(strand._id);
			setStrands((prev) => prev.filter((s) => s._id !== strand._id));
			Swal.fire("Deleted", "Strand removed", "success");
		} catch {
			Swal.fire("Error", "Delete failed", "error");
		}
	};

	// Simple client-side search (if backend search not available)
	const filtered = searchTerm
		? strands.filter((s) =>
				s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
				s.title.toLowerCase().includes(searchTerm.toLowerCase())
			)
		: strands;

	return (
		<div className="p-4 space-y-4">
			<h1 className="text-xl font-semibold">Strands</h1>
			<SearchBar
				placeholder={placeholder}
				value={searchTerm}
				onChange={(val) => {
					setSearchTerm(val);
					setPage(1);
				}}
			/>
			{loading ? (
				<div className="text-center py-6 text-gray-500">Loading strands...</div>
			) : (
				<div className="flex flex-col gap-4">
					<StrandTable
						strands={filtered}
						page={page}
						limit={limit}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
					<Pagination
						page={page}
						totalPages={totalPages}
						onPageChange={(newPage) => setPage(newPage)}
					/>
				</div>
			)}
		</div>
	);
};

export default StrandList;
