import { StrandList } from "../../components";
import { Sidebar, Topbar } from "../../shared";

const ViewStrand: React.FC = () => {
	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
				<Sidebar role={["principal"]} />
			</div>

			{/* Main Content Area */}
			<div className="flex flex-col flex-1 overflow-hidden">
				{/* Topbar */}
				<div className="flex-shrink-0">
					<Topbar role={["principal"]} />
				</div>

				{/* Strand List */}
				<div className="flex-1 overflow-auto p-4">
					<StrandList />
				</div>
			</div>
		</div>
	);
};

export default ViewStrand;
