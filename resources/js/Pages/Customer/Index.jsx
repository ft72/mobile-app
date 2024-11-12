// resources/js/Pages/Customers/Index.jsx

import React, { useState, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CustomersIndex() {
    const { customers } = usePage().props;

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Filtered Customers based on search
    const filteredCustomers = useMemo(() => {
        let data = customers.data;

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            data = data.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(query) ||
                    (customer.email && customer.email.toLowerCase().includes(query)) ||
                    (customer.contact && customer.contact.toLowerCase().includes(query)) ||
                    (customer.address && customer.address.toLowerCase().includes(query))
            );
        }

        return data;
    }, [searchQuery, customers.data]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Customers
                </h2>
            }
        >
            <Head title="Customers" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Header and Create Button */}
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Customers List
                                </h1>
                                <Link href={route("customers.create")}>
                                    <PrimaryButton className="gap-1">
                                        Add New Customer
                                    </PrimaryButton>
                                </Link>
                            </div>

                            {/* Search Bar */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name, email, contact, or address"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Customers Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Contact
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Address
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Orders Count
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Order
                                            </th>
                                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredCustomers.length > 0 ? (
                                            filteredCustomers.map((customer) => (
                                                <tr key={customer.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.email || "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.contact || "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.address || "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.orders.length}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.orders.length > 0
                                                            ? new Date(
                                                                  customer.orders[0].created_at
                                                              ).toLocaleDateString()
                                                            : "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route("customers.edit", customer.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            as="button"
                                                            href={route("customers.destroy", customer.id)}
                                                            method="delete"
                                                            className="text-red-600 hover:text-red-900"
                                                            onClick={(e) => {
                                                                if (
                                                                    !confirm(
                                                                        "Are you sure you want to delete this customer?"
                                                                    )
                                                                ) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            Delete
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                                                >
                                                    No customers found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {customers.links.length > 3 && (
                                <div className="mt-4">
                                    {customers.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-1 border rounded-md mr-2 ${
                                                link.active
                                                    ? "bg-indigo-500 text-white"
                                                    : "bg-white text-indigo-500 hover:bg-indigo-100"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}