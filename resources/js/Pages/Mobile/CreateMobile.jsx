import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import Quagga from "quagga";
import { CameraIcon } from "@heroicons/react/24/solid";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function MobileCreate(shops) {
    const { data, setData, post, processing, errors } = useForm({
        shop_id: "",
        brand: "",
        model: "",
        imei: "",
        imei2: "",
        sku: "",
        price: "",
        stock_status: "in_stock",
    });

    const mobileBrands = [
        "Apple",
        "Samsung",
        "Huawei",
        "Nokia",
        "Sony",
        "Xiaomi",
        "Oppo",
        "Vivo",
        "OnePlus",
        "Google",
        "LG",
        "Motorola",
        "HTC",
        "Realme",
        "Asus",
        "Lenovo",
    ];

    const [isScanning, setIsScanning] = useState(false);
    const [scanningField, setScanningField] = useState(null);

    const handleScanClick = (field) => {
        setScanningField(field);
        setIsScanning(true);
    };

    useEffect(() => {
        if (isScanning) {
            Quagga.init(
                {
                    inputStream: {
                        type: "LiveStream",
                        constraints: {
                            facingMode: "environment",
                        },
                    },
                    decoder: {
                        readers: [
                            "code_128_reader",
                            "ean_reader",
                            "upc_reader",
                        ],
                    },
                },
                function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    Quagga.start();
                }
            );

            Quagga.onDetected((result) => {
                if (result && result.codeResult && result.codeResult.code) {
                    setData(scanningField, result.codeResult.code);
                    handleCloseScanner();
                }
            });
        }

        return () => {
            if (isScanning) {
                Quagga.stop();
                Quagga.offDetected();
            }
        };
    }, [isScanning]);

    const handleCloseScanner = () => {
        setIsScanning(false);
        setScanningField(null);
    };

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        post("/mobiles");
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Mobile
                </h2>
            }
        >
            <Head title="Add Mobile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {(shops && shops.shops.length > 0 && (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Shop Stock
                                        </label>
                                        <select
                                            name="shop_id"
                                            id="shop_id"
                                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full"
                                            value={data.shop_id}
                                            onChange={(e) =>
                                                setData(
                                                    "shop_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                Select a Shop
                                            </option>{" "}
                                            {/* Default empty option */}
                                            {shops.shops.map((shop) => (
                                                <option
                                                    key={shop.id}
                                                    value={shop.id}
                                                >
                                                    {shop.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.shop_id && (
                                            <div className="text-red-600">
                                                {errors.shop_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Brand */}
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Brand
                                        </label>
                                        <select
                                            value={data.brand}
                                            onChange={(e) =>
                                                setData("brand", e.target.value)
                                            }
                                            required
                                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full"
                                        >
                                            <option value="">
                                                Select a Brand
                                            </option>
                                            {mobileBrands.map((brand) => (
                                                <option
                                                    key={brand}
                                                    value={brand}
                                                >
                                                    {brand}
                                                </option>
                                            ))}
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors.brand && (
                                            <div className="text-red-600">
                                                {errors.brand}
                                            </div>
                                        )}
                                    </div>

                                    {/* Model */}
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Model
                                        </label>
                                        <TextInput
                                            type="text"
                                            value={data.model}
                                            onChange={(e) =>
                                                setData("model", e.target.value)
                                            }
                                            required
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                        {errors.model && (
                                            <div className="text-red-600">
                                                {errors.model}
                                            </div>
                                        )}
                                    </div>

                                    {/* IMEI */}
                                    <div className="flex flex-row items-end gap-4">
                                        <div className="flex-1">
                                            <label className="block text-gray-700 font-bold mb-2">
                                                IMEI
                                            </label>
                                            <TextInput
                                                type="text"
                                                value={data.imei}
                                                onChange={(e) =>
                                                    setData(
                                                        "imei",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                        <SecondaryButton
                                            type="button"
                                            onClick={() =>
                                                handleScanClick("imei")
                                            }
                                            className="text-primary"
                                        >
                                            <CameraIcon className="w-6 h-6" />
                                        </SecondaryButton>
                                        {errors.imei && (
                                            <div className="text-red-600">
                                                {errors.imei}
                                            </div>
                                        )}
                                    </div>

                                    {/* IMEI 2 */}
                                    <div className="flex flex-row items-end gap-4">
                                        <div className="flex-1">
                                            <label className="block text-gray-700 font-bold mb-2">
                                                IMEI 2
                                            </label>
                                            <TextInput
                                                type="text"
                                                value={data.imei2}
                                                onChange={(e) =>
                                                    setData(
                                                        "imei2",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                        <SecondaryButton
                                            type="button"
                                            onClick={() =>
                                                handleScanClick("imei2")
                                            }
                                            className="text-primary"
                                        >
                                            <CameraIcon className="w-6 h-6" />
                                        </SecondaryButton>
                                        {errors.imei2 && (
                                            <div className="text-red-600">
                                                {errors.imei2}
                                            </div>
                                        )}
                                    </div>

                                    {/* SKU */}
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">
                                            SKU
                                        </label>
                                        <TextInput
                                            type="text"
                                            value={data.sku}
                                            onChange={(e) =>
                                                setData("sku", e.target.value)
                                            }
                                            required
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                        {errors.sku && (
                                            <div className="text-red-600">
                                                {errors.sku}
                                            </div>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Price
                                        </label>
                                        <TextInput
                                            type="number"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            required
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                        {errors.price && (
                                            <div className="text-red-600">
                                                {errors.price}
                                            </div>
                                        )}
                                    </div>

                                    {/* Stock Status */}
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Stock Status
                                        </label>
                                        <select
                                            value={data.stock_status}
                                            onChange={(e) =>
                                                setData(
                                                    "stock_status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full p-2 border border-gray-300 rounded"
                                        >
                                            <option value="in_stock">
                                                In Stock
                                            </option>
                                            <option value="sold">Sold</option>
                                            <option value="reserved">
                                                Reserved
                                            </option>
                                        </select>
                                        {errors.stock_status && (
                                            <div className="text-red-600">
                                                {errors.stock_status}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <PrimaryButton
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Adding..."
                                                : "Add Mobile"}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )) || (
                                <div className="flex justify-between">
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

            {/* Scanner Modal */}
            {isScanning && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="bg-white p-4 rounded-lg max-w-sm">
                        <h3 className="text-lg font-bold mb-2">
                            Scan {scanningField === "imei" ? "IMEI" : "IMEI 2"}{" "}
                            Barcode
                        </h3>
                        <div
                            id="interactive"
                            className="viewport"
                            style={{ width: "300px", height: "400px" }}
                        ></div>
                        <SecondaryButton onClick={handleCloseScanner}>
                            Close
                        </SecondaryButton>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
