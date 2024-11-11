import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function Welcome(user) {
    return (
        <GuestLayout>
            <Head title="Welcome" />

            <div className="py-3">
                <div className="flex flex-col space-y-4">
                    {(user.auth.user && (
                        <>
                            <Link href={route("dashboard")}>
                                <PrimaryButton className="w-full flex justify-center items-center">
                                    Dashboard
                                </PrimaryButton>
                            </Link>
                            <Link href={route("logout")} method="post">
                                <SecondaryButton className="w-full flex justify-center items-center">
                                    Logout
                                </SecondaryButton>
                            </Link>
                        </>
                    )) || (
                        <>
                            <Link href={route("login")}>
                                <PrimaryButton className="w-full flex justify-center items-center">
                                    Login
                                </PrimaryButton>
                            </Link>

                            <Link href={route("register")}>
                                <SecondaryButton className="w-full flex justify-center items-center">
                                    Sign Up
                                </SecondaryButton>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
