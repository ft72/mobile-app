import React, { useState } from "react";
import { usePage, Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Users() {
    const { users, auth } = usePage().props;
    const [statusData, setStatusData] = useState(
        users.reduce((acc, user) => {
            acc[user.id] = user.verified;
            return acc;
        }, {})
    );
    const [processingId, setProcessingId] = useState(null);

    const handleStatusChange = (userId, newStatus) => {
        setStatusData((prev) => ({
            ...prev,
            [userId]: newStatus,
        }));
    };

    const handleSubmit = (userId) => {
        setProcessingId(userId);
        
        Inertia.post(route("admin.users.updateStatus", userId), {
            verified: statusData[userId],
        }, {
            onSuccess: () => {
                console.log(`Status updated successfully for user ${userId}`);
                setProcessingId(null);
            },
            onError: (errors) => {
                console.error("Error updating status:", errors);
                setProcessingId(null);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User Management
                </h2>
            }
        >
            <div className="p-8">
                <Head title="User Management" />

                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">ID</th>
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">Email</th>
                                    <th className="px-4 py-2 border-b">Phone</th>
                                    <th className="px-4 py-2 border-b">Verified Status</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="text-center">
                                        <td className="px-4 py-2 border-b">{user.id}</td>
                                        <td className="px-4 py-2 border-b">{user.name}</td>
                                        <td className="px-4 py-2 border-b">{user.email}</td>
                                        <td className="px-4 py-2 border-b">{user.phone}</td>
                                        <td className="px-4 py-2 border-b capitalize">{user.verified}</td>
                                        <td className="px-4 py-2 border-b">
                                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(user.id); }} className="flex items-center justify-center gap-2">
                                                <select
                                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-1"
                                                    value={statusData[user.id] || user.verified}
                                                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                                >
                                                    <option value="trial">Trial</option>
                                                    <option value="verified">Verified</option>
                                                    <option value="disabled">Disabled</option>
                                                </select>
                                                <PrimaryButton
                                                    type="submit"
                                                    disabled={processingId === user.id}
                                                >
                                                    {processingId === user.id ? "Updating..." : "Submit"}
                                                </PrimaryButton>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
