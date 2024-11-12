// resources/js/Pages/Customers/Create.jsx

import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CreateCustomer() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        contact: "",
        email: "",
        address: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("customers.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Customer
                </h2>
            }
        >
            <Head title="Create Customer" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.name && (
                                        <div className="text-red-600">{errors.name}</div>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.email && (
                                        <div className="text-red-600">{errors.email}</div>
                                    )}
                                </div>

                                {/* Contact */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">
                                        Contact
                                    </label>
                                    <input
                                        type="text"
                                        value={data.contact}
                                        onChange={(e) => setData("contact", e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.contact && (
                                        <div className="text-red-600">{errors.contact}</div>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData("address", e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                                    ></textarea>
                                    {errors.address && (
                                        <div className="text-red-600">{errors.address}</div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        {processing ? "Creating..." : "Create Customer"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
