import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function ShopCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        address: "",
        contact: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/shop/create");
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create New Shop
                </h2>
            }
        >
            <Head title="Create Shop" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">
                                        Shop Name
                                    </label>
                                    <TextInput
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.name && (
                                        <div className="text-red-600">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">
                                        Address
                                    </label>
                                    <TextInput
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.address && (
                                        <div className="text-red-600">
                                            {errors.address}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">
                                        Contact
                                    </label>
                                    <TextInput
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={data.contact}
                                        onChange={(e) =>
                                            setData("contact", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.contact && (
                                        <div className="text-red-600">
                                            {errors.contact}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.description && (
                                        <div className="text-red-600">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <PrimaryButton
                                        type="submit"
                                        className="flex"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Creating..."
                                            : "Create Shop"}
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
