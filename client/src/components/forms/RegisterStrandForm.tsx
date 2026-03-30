import React from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../shared";
import type { IStrand } from "../../types";

interface Props {
	onSubmit: (data: IStrand) => void;
}

const RegisterStrandForm: React.FC<Props> = ({ onSubmit }) => {
	const { register, handleSubmit, reset } = useForm<IStrand>();

	const submitHandler = (data: IStrand) => {
		onSubmit(data);
		reset();
	};

	return (
		<div className="max-w-md mx-auto p-4 border rounded shadow">
			<form onSubmit={handleSubmit(submitHandler)}>
				<div className="mb-4">
					<label className="block mb-1">Code</label>
					<input
						type="text"
						{...register("code", { required: true })}
						className="w-full border px-2 py-1 rounded"
						placeholder="e.g. STRAND-001"
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-1">Title</label>
					<input
						type="text"
						{...register("title", { required: true })}
						className="w-full border px-2 py-1 rounded"
						placeholder="Strand Title"
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-1">Description</label>
					<textarea
						{...register("description")}
						className="w-full border px-2 py-1 rounded"
						placeholder="Optional description"
						rows={3}
					/>
				</div>
				<SubmitButton label="Register Strand" />
			</form>
		</div>
	);
};

export default RegisterStrandForm;
