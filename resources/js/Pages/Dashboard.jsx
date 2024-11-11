import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import LineChart from "@/Components/LineChart";

export default function Dashboard({ shops }) {
    const [shopId, setShopId] = useState(null);

    const customerData = [
        { date: "2023-11-01", count: 5 },
        { date: "2023-11-02", count: 8 },
        { date: "2023-11-03", count: 3 },
        { date: "2023-11-04", count: 10 },
        { date: "2023-11-05", count: 7 },
        { date: "2023-11-06", count: 6 },
        { date: "2023-11-07", count: 9 },
    ];

    const totalCustomers = customerData.reduce(
        (sum, data) => sum + data.count,
        0
    );

    // Prepare labels and data for chart
    const labels = customerData.map((data) => {
        const date = new Date(data.date);
        return date.toLocaleDateString("en-US", { weekday: "short" });
    });
    const dataValues = customerData.map((data) => data.count);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Shops
                                </h1>
                                <Link href={route("shops.create")}>
                                    <PrimaryButton className="gap-1">
                                        Create New
                                    </PrimaryButton>
                                </Link>
                            </div>
                            {(shops.length > 0 && (
                                <>
                                    <select
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        defaultValue={shops[0].id}
                                        onChange={(e) =>
                                            setShopId(e.target.value)
                                        }
                                    >
                                        {shops.map((shop) => (
                                            <option
                                                key={shop.id}
                                                value={shop.id}
                                            >
                                                {shop.name}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="mt-6 flex lg:flex-nowrap flex-col lg:flex-row sm:flex-wrap gap-6">
                                        <LineChart
                                            title="Total Customers"
                                            subtitle="Last 7 days"
                                            data={dataValues}
                                            labels={labels}
                                            totalCount={totalCustomers}
                                        />
                                        <LineChart
                                            title="Total Items Sold"
                                            subtitle="Last 7 days"
                                            data={dataValues}
                                            labels={labels}
                                            totalCount={totalCustomers}
                                        />
                                        <LineChart
                                            title="Total Sales"
                                            subtitle="Last 7 days"
                                            data={dataValues}
                                            labels={labels}
                                            totalCount={totalCustomers}
                                        />
                                    </div>
                                </>
                            )) || <p>No shops found</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
