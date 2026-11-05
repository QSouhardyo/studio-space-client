"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
    MapPin,
    Users,
    Pencil,
    Trash2,
    Plus,
    X,
    Building2,
} from "lucide-react";

import { toast } from "sonner";
import EditStudioDialog from "./EditStudioDialog";
import DeleteStudioDialog from "./DeleteStudioDialog";

const MyListingsCard = ({ myLists }) => {



    return (
        <div className="min-h-screen bg-[#f7f9f7] px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#235b45]">
                            Dashboard
                        </p>

                        <h1 className="text-3xl font-bold text-gray-900">
                            My Studio Listings
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Manage your creative spaces and studio information.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/add-studio"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#235b45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#194532]"
                    >
                        <Plus size={18} />
                        Add New Studio
                    </Link>

                </div>

                {/* Listing Count */}
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-[#235b45]">
                        <Building2 size={24} />
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Total Listings
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900">
                            {myLists.length}
                        </h2>
                    </div>

                </div>

                {/* Table */}
                {myLists.length === 0 ? (

                    <div className="rounded-2xl border border-gray-100 bg-white px-5 py-16 text-center shadow-sm">

                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-[#235b45]">
                            <Building2 size={30} />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">
                            No Studios Found
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                            You have not added any creative spaces yet.
                            Start by listing your first studio.
                        </p>

                        <Link
                            href="/dashboard/add-studio"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#235b45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#194532]"
                        >
                            <Plus size={18} />
                            Add Your First Studio
                        </Link>

                    </div>

                ) : (

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[900px] text-left">

                                {/* Table Header */}
                                <thead className="border-b border-gray-100 bg-gray-50">

                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Studio
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Location
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Hourly Rate
                                        </th>

                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Capacity
                                        </th>

                                        <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Actions
                                        </th>
                                    </tr>

                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-gray-100">

                                    {myLists.map((listing) => (

                                        <tr
                                            key={listing._id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            {/* Studio Information */}
                                            <td className="px-6 py-4">

                                                <div className="flex items-center gap-3">

                                                    {listing.image ? (
                                                        <img
                                                            src={listing.image}
                                                            alt={listing.name}
                                                            className="h-12 w-14 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-12 w-14 items-center justify-center rounded-lg bg-green-50 text-[#235b45]">
                                                            <Building2 size={22} />
                                                        </div>
                                                    )}

                                                    <div className="max-w-48">
                                                        <p className="truncate text-sm font-bold text-gray-900">
                                                            {listing.name}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            Studio ID: {listing._id}
                                                        </p>
                                                    </div>

                                                </div>

                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4">

                                                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-[#235b45]">
                                                    {listing.category || "N/A"}
                                                </span>

                                            </td>

                                            {/* Location */}
                                            <td className="px-6 py-4">

                                                <div className="flex max-w-40 items-center gap-1.5 text-sm text-gray-600">
                                                    <MapPin size={15} className="shrink-0 text-gray-400" />

                                                    <span className="truncate">
                                                        {listing.location || "N/A"}
                                                    </span>
                                                </div>

                                            </td>

                                            {/* Hourly Rate */}
                                            <td className="px-6 py-4">

                                                <p className="text-sm font-bold text-gray-900">
                                                    ${listing.hourRate || 0}
                                                    <span className="font-normal text-gray-400">
                                                        /hr
                                                    </span>
                                                </p>

                                            </td>

                                            {/* Capacity */}
                                            <td className="px-6 py-4">

                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Users size={16} className="text-gray-400" />
                                                    {listing.capacity || 0} People
                                                </div>

                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">

                                                <div className="flex items-center justify-center gap-2">
                                                    <EditStudioDialog listing={listing}></EditStudioDialog>
                                                    <DeleteStudioDialog
                                                        listing={listing}></DeleteStudioDialog>



                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                )}

            </div>



        </div>
    );
};

export default MyListingsCard;
