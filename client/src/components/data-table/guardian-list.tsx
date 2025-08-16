// client/src/components/data-table/guardian-list.tsx
import { useEffect, useState } from "react";
import type { Guardian } from "../../types";
import { getAllGuardians } from "../../api";
import { IconButton } from "../../shared";

const GuardianList: React.FC = () => {
    const [guardians, setGuardians] = useState<Guardian[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchGuardians = async () => {
        try {
            const data = await getAllGuardians();
            setGuardians(data);
        } catch (err) {
            setError("Failed to fetch guardians");
            console.error(err);
        } finally {
            setLoading(false);
        }
        };
    
        fetchGuardians();
    }, []);
    
    if (loading) return <div className="p-4">Loading guardians...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;
    
    const handleAddGuardian = () => {
    }
    const handleEditGuardian = () => {
    }
    const handleDeleteGuardian = () => {
    }
    return (
        <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Guardian List</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-gray-100">
                <tr className="text-left text-sm font-semibold text-gray-700">
                <th className="px-4 py-2 border">#</th>
                 <th className="px-4 py-2 border">Family Number</th>
                <th className="px-4 py-2 border">First Name</th>
                <th className="px-4 py-2 border">Middle Name</th>
                <th className="px-4 py-2 border">Last Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone Number</th>
                <th className="px-4 py-2 border">Actions</th>
                </tr>
            </thead>
            <tbody>
                {guardians.map((guardian, index) => (
                <tr key={guardian._id} className="hover:bg-gray-50 text-sm">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{guardian.familyNumber}</td>
                    <td className="px-4 py-2 border">{guardian.firstName}</td>
                    <td className="px-4 py-2 border">{guardian.middleName}</td>         
                    <td className="px-4 py-2 border">{guardian.lastName}</td>   
                    <td className="px-4 py-2 border">{guardian.email}</td>
                    <td className="px-4 py-2 border">{guardian.primaryPhoneNumber}</td>
                    <td className="px-4 py-2 border">
                    <IconButton title="Add Guardian" type="add" onClick={handleAddGuardian} />
                    <IconButton title="Edit Guardian" type="edit" onClick={handleEditGuardian} />
                    <IconButton title="Delete Guardian" type="delete" onClick={handleDeleteGuardian} />

                    </td>
                </tr>
                ))}
            </tbody>    
            </table>
        </div>
        </div>
    );
}
export default GuardianList;
        
            