// resources/js/Pages/Mobile/Mobiles.jsx

import React, { useState, useEffect, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Mobiles() {
    const { shops, mobiles } = usePage().props;

    // Memoize mobilesMap to prevent it from being recreated on every render
    const mobilesMap = useMemo(() => {
        return mobiles.reduce((acc, group) => {
            const shopId = Object.keys(group)[0];
            acc[shopId] = group[shopId];
            return acc;
        }, {});
    }, [mobiles]);

    const [selectedShopId, setSelectedShopId] = useState("");
    const [filteredMobiles, setFilteredMobiles] = useState([]);

    // Effect to filter mobiles based on selectedShopId
    useEffect(() => {
        if (selectedShopId) {
            setFilteredMobiles(mobilesMap[selectedShopId] || []);
        } else {
            // Flatten all mobiles if 'All Shops' is selected
            const allMobiles = Object.values(mobilesMap).flat();
            setFilteredMobiles(allMobiles);
        }
    }, [selectedShopId, mobilesMap]);

    // Initialize selectedShopId to 'All Shops' when shops data changes
    useEffect(() => {
        if (shops.length > 0) {
            setSelectedShopId(""); // Default to 'All Shops'
            // Alternatively, set to the first shop's ID:
            // setSelectedShopId(shops[0].id);
        }
    }, [shops]);

    const handleShopChange = (e) => {
        setSelectedShopId(e.target.value);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Mobiles
                </h2>
            }
        >
            <Head title="Mobiles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {shops.length > 0 ? (
                                <>
                                    <div className="flex justify-between items-center mb-4">
                                        <h1 className="text-2xl font-bold text-gray-800">
                                            Mobiles List
                                        </h1>
                                        <Link href={route("mobiles.create")}>
                                            <PrimaryButton className="gap-1">
                                                Add New Mobile
                                            </PrimaryButton>
                                        </Link>
                                    </div>
                                    {/* Shop Selection Dropdown */}
                                    <div className="mb-4">
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

                                    {/* Mobiles Table */}
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white border">
                                            <thead>
                                                <tr>
                                                    {selectedShopId == "" && (
                                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Shop Name
                                                        </th>
                                                    )}
                                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                                        Brand
                                                    </th>
                                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Model
                                                    </th>
                                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        IMEI
                                                    </th>
                                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        IMEI2
                                                    </th>
                                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        SKU
                                                    </th>
                                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Price
                                                    </th>
                                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Stock Status
                                                    </th>
                                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                { filteredMobiles > 1 && filteredMobiles.length > 0 ? (
                                                    filteredMobiles.map(
                                                        (mobile) => {
                                                            const shop =
                                                                shops.find(
                                                                    (s) =>
                                                                        s.id ===
                                                                        mobile.shop_id
                                                                );
                                                            return (
                                                                <tr
                                                                    key={
                                                                        mobile.id
                                                                    }
                                                                >
                                                                    {selectedShopId ==
                                                                        "" && (
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                                                                            {shop
                                                                                ? shop.name
                                                                                : "N/A"}
                                                                        </td>
                                                                    )}
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize flex items-center justify-center">
                                                                        <img
                                                                            src={
                                                                                "/brands/" +
                                                                                mobile.brand +
                                                                                ".png"
                                                                            }
                                                                            className="h-6"
                                                                            alt=""
                                                                        />
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                                                                        {
                                                                            mobile.model
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                        {
                                                                            mobile.imei
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                        {mobile.imei2
                                                                            ? mobile.imei2
                                                                            : "N/A"}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                        {
                                                                            mobile.sku
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                        $
                                                                        {
                                                                            mobile.price
                                                                        }
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                                                                        {mobile.stock_status.replace(
                                                                            "_",
                                                                            " "
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                        <Link
                                                                            href={
                                                                                "#"
                                                                            }
                                                                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                                        >
                                                                            Edit
                                                                        </Link>
                                                                        <Link
                                                                            as="button"
                                                                            href={route(
                                                                                "mobiles.destroy",
                                                                                mobile.id
                                                                            )}
                                                                            method="delete"
                                                                            className="text-red-600 hover:text-red-900"
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                if (
                                                                                    !confirm(
                                                                                        "Are you sure you want to delete this mobile?"
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
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="9"
                                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                                                        >
                                                            No mobiles found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <p className="text-xl font-semibold">
                                        Create a shop first
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
