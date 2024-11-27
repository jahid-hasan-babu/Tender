'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '../../app/redux/store';
import { fetchTenders } from '../../app/redux/slice/tendersSlice';
import { Search, ChevronDown, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

export default function TableData() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { tenders, loading, error } = useSelector((state: RootState) => state.tenders);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All'); // "All", "Ongoing", or "Closed"
    const [departmentFilter, setDepartmentFilter] = useState('All');

    useEffect(() => {
        dispatch(fetchTenders());
    }, [dispatch]);

    const handleViewClick = async (tenderId: number) => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            router.push('/login'); // Redirect to login if no token
            return;
        }

        try {
            const response = await fetch(
                `https://white-camel-643529.hostingersite.com/api/companies/${tenderId}/download-pdf`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `tender_${tenderId}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                alert(`Failed to download: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while downloading the file.');
        }
    };

    const filteredTenders = tenders.filter((tender) => {
        const matchesSearch = tender?.title?.toLowerCase()?.includes(searchTerm.toLowerCase());
        const matchesFilter =
            filter === 'All' ||
            (filter === 'Ongoing' && tender.active_status === 1) ||
            (filter === 'Closed' && tender.active_status !== 1);
        const matchesDepartment =
            departmentFilter === 'All' || tender.department === departmentFilter;
        return matchesSearch && matchesFilter && matchesDepartment;
    });

    const totalPages = Math.ceil(filteredTenders.length / itemsPerPage);
    const currentItems = filteredTenders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const paginationRange = () => {
        const range = [];
        for (let i = 1; i <= totalPages; i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto py-20 px-4 lg:px-0">
            <div className="border border-gray-400 p-3 rounded-md">
                {/* Filters Section */}
                <div className="flex flex-col lg:flex-row lg:justify-between mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
                    {/* Search Bar */}
                    <div className="relative w-full lg:w-auto">
                        <input
                            type="text"
                            placeholder="Search tenders"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 bg-gray-200 border-gray-400 py-2 border rounded-md w-full"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                    </div>

                    {/* Filter Buttons (Status) */}
                    <div className="flex space-x-2 w-full lg:w-auto">
                        {['All', 'Ongoing', 'Closed'].map((status) => (
                            <button
                                key={status}
                                className={`px-4 py-2 rounded-full ${
                                    filter === status
                                        ? 'bg-orange-100 border border-orange-200'
                                        : 'bg-white border border-gray-400'
                                }`}
                                onClick={() => setFilter(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Department Filter */}
                    <div className="relative w-full lg:w-auto">
                        <select
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                            className="appearance-none bg-gray-200 border border-gray-400 rounded-md pl-4 pr-10 py-2 w-full"
                        >
                            <option value="All">Filter by department</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Design">Design</option>
                            <option value="Business Development">Business Development</option>
                            <option value="Management">Management</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                {/* Table */}
                <div>
                    <table className="min-w-full bg-white table-auto border">
                        <thead>
                            <tr className="text-black font-bold text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Number</th>
                                <th className="py-3 px-6 text-left">Title</th>
                                <th className="py-3 px-6 text-left">Department</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-center">Start date</th>
                                <th className="py-3 px-6 text-center">Closing date</th>
                                <th className="py-3 px-6 text-center">Action</th>
                            </tr>
                        </thead>
                        {loading && <p className="text-center text-gray-500">Loading tenders...</p>}
                        {error && <p className="text-center text-red-500">{error}</p>}
                        <tbody className="text-gray-700 font-bold text-sm">
                            {currentItems.map((tender) => (
                                <tr
                                    key={tender.id}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="py-3 px-6">{tender.tender_number}</td>
                                    <td className="py-3 px-6">{tender.title}</td>
                                    <td className="py-3 px-6">{tender.department}</td>
                                    <td className="py-3 px-6">
                                        <span
                                            className={`px-3 py-1 rounded text-xs ${
                                                tender.active_status === 1
                                                    ? 'bg-green-500 text-white-white-50'
                                                    : 'bg-red-500 text-white-white-50'
                                            }`}
                                        >
                                            {tender.active_status === 1 ? 'Ongoing' : 'Closed'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-center">{tender.start_date}</td>
                                    <td className="py-3 px-6 text-center">{tender.closing_date}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            onClick={() => handleViewClick(tender.id)}
                                            className="bg-yellow-500 text-white-white-50 px-3 py-2 rounded"
                                        >
                                            View <FileText className="inline h-4 w-4 ml-2" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-4 space-x-2">
                    <button
                        onClick={prevPage}
                        className="px-2 py-1 bg-gray-200 rounded-md border border-gray-400"
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft />
                    </button>
                    {paginationRange().map((page) => (
                        <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={`px-3 py-1 rounded ${
                                currentPage === page
                                    ? 'bg-yellow-500 text-white'
                                    : 'bg-white border border-gray-400'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={nextPage}
                        className="px-2 py-1 bg-gray-200 rounded-md border border-gray-400"
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
