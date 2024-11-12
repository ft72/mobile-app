// resources/js/Pages/Shops/Index.jsx

import React, { useState, useEffect, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton"; // If needed
import TextInput from "@/Components/TextInput"; // If needed
import { CameraIcon } from "@heroicons/react/24/solid"; // If needed
// Import other necessary components

export default function ShopsIndex() {
    const { shops } = usePage().props;

    const [selectedShopId, setSelectedShopId] = useState("");
    const [selectedShop, setSelectedShop] = useState(null);

    // Initialize selectedShopId to 'All Shops' or first shop
    useEffect(() => {
        if (shops.length > 0) {
            setSelectedShopId(""); // Default to 'All Shops'
            setSelectedShop(null);
        }
    }, [shops]);

    const handleShopChange = (e) => {
        const shopId = e.target.value;
        setSelectedShopId(shopId);
        if (shopId === "") {
            setSelectedShop(null);
        } else {
            const shop = shops.find((s) => s.id === parseInt(shopId));
            setSelectedShop(shop);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Shops
                </h2>
            }
        >
            <Head title="Shops" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Shops List
                                </h1>
                                <Link href={route("shops.create")}>
                                    <PrimaryButton className="gap-1">
                                        Create New Shop
                                    </PrimaryButton>
                                </Link>
                            </div>

                            {shops.length > 0 ? (
                                <>
                                    {/* Shop Selection Dropdown */}
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Select Shop
                                        </label>
                                        <select
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={selectedShopId}
                                            onChange={handleShopChange}
                                        >
                                            <option value="">All Shops</option>
                                            {shops.map((shop) => (
                                                <option
                                                    key={shop.id}
                                                    value={shop.id}
                                                >
                                                    {shop.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Shop Profile Section */}
                                    {selectedShop && (
                                        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                                            <h2 className="text-xl font-semibold mb-2">
                                                Shop Profile
                                            </h2>
                                            <p>
                                                <strong>Name:</strong>{" "}
                                                {selectedShop.name}
                                            </p>
                                            <p>
                                                <strong>Address:</strong>{" "}
                                                {selectedShop.address}
                                            </p>
                                            <p>
                                                <strong>Contact:</strong>{" "}
                                                {selectedShop.contact || "N/A"}
                                            </p>
                                            <p>
                                                <strong>Description:</strong>{" "}
                                                {selectedShop.description ||
                                                    "N/A"}
                                            </p>
                                            <p>
                                                <strong>Status:</strong>{" "}
                                                {selectedShop.status}
                                            </p>
                                            <p>
                                                <strong>Opening Hours:</strong>{" "}
                                                {selectedShop.opening_hours
                                                    ? JSON.parse(
                                                          selectedShop.opening_hours
                                                      ).map(
                                                          (entry, index) =>
                                                              `${
                                                                  Object.keys(
                                                                      entry
                                                                  )[0]
                                                              }: ${
                                                                  Object.values(
                                                                      entry
                                                                  )[0]
                                                              }${
                                                                  index <
                                                                  Object.keys(
                                                                      JSON.parse(
                                                                          selectedShop.opening_hours
                                                                      )
                                                                  ).length -
                                                                      1
                                                                      ? ", "
                                                                      : ""
                                                              }`
                                                      )
                                                    : "N/A"}
                                            </p>
                                            {/* Add more details or actions as needed */}
                                        </div>
                                    )}

                                    {/* Shops Table */}
                                    {selectedShopId == "" && (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full bg-white border">
                                                <thead>
                                                    <tr>
                                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Name
                                                        </th>
                                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Address
                                                        </th>
                                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Contact
                                                        </th>
                                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {shops.map((shop) => (
                                                        <tr key={shop.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {shop.name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {shop.address}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {shop.contact ||
                                                                    "N/A"}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {shop.status}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <Link
                                                                    href={route(
                                                                        "shops.edit",
                                                                        shop.id
                                                                    )}
                                                                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <Link
                                                                    as="button"
                                                                    href={"#"}
                                                                    method="delete"
                                                                    className="text-red-600 hover:text-red-900"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            !confirm(
                                                                                "Are you sure you want to delete this shop?"
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
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <p className="text-xl font-semibold">
                                        You have no shops. Create one to get
                                        started.
                                    </p>
                                    <Link href={route("shops.create")}>
                                        <PrimaryButton>
                                            Create Shop
                                        </PrimaryButton>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
