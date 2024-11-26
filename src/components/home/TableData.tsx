'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/redux/store';
import { fetchTenders } from '../../app/redux/slice/tendersSlice';
import { Search, ChevronDown, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

export default function TableData() {
    const dispatch = useDispatch<AppDispatch>();
    const { tenders, loading, error } = useSelector((state: RootState) => state.tenders);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All'); // "All", "Ongoing", or "Closed"
    const [departmentFilter, setDepartmentFilter] = useState('All');

    useEffect(() => {
        dispatch(fetchTenders());
    }, [dispatch]);

 const filteredTenders = tenders.filter((tender) => {
    const matchesSearch = tender?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
        filter === 'All' ||
        (filter === 'Ongoing' && tender.active_status === 1) ||
        (filter === 'Closed' && tender.active_status !== 1);
    const matchesDepartment = departmentFilter === 'All' || tender.department === departmentFilter;
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
            {/* Filters Section */}
            <div className="flex flex-col lg:flex-row lg:justify-between mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
                {/* Search Bar */}
                <div className="relative w-full lg:w-auto">
                    <input
                        type="text"
                        placeholder="Search tenders"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 border-gray-400 py-2 border rounded-md w-full"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>

                {/* Filter Buttons (Status) */}
                <div className="flex space-x-2 w-full lg:w-auto">
                    {['All', 'Ongoing', 'Closed'].map((status) => (
                        <button
                            key={status}
                            className={`px-4 py-2 rounded-full ${
                                filter === status ? 'bg-gray-200 border border-gray-400' : 'bg-white'
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
                        className="appearance-none bg-white border border-gray-400 rounded-md pl-4 pr-10 py-2 w-full"
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
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-black font-bold text-sm leading-normal">
                            <th className="py-3 text-left">Number</th>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Department</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-center">Start date</th>
                            <th className="py-3 px-6 text-center">Closing date</th>
                            <th className="py-3 pl-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 font-bold text-sm">
                        {currentItems.map((tender, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 text-left whitespace-nowrap">{tender.tender_number}</td>
                                <td className="py-3 px-6 text-left">{tender.title}</td>
                                <td className="py-3 px-6 text-left">{tender.department}</td>
                                <td className="py-3 px-6 text-left">
                                    <span
                                        className={`${
                                            tender.active_status === 1
                                                ? 'bg-green-500 text-white-white-50'
                                                : 'bg-red-700 text-white-white-50'
                                        } px-3 py-1 rounded-[3px] text-xs`}
                                    >
                                        {tender.active_status === 1 ? 'Ongoing' : 'Closed'}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center font-bold">{tender.start_date}</td>
                                <td className="py-3 px-6 text-center font-bold">{tender.closing_date}</td>
                                <td className="py-3 pl-6 float-end">
                                    <button className="bg-yellow-500 text-white-white-50 flex items-center justify-center text-white text-md px-3 py-2 rounded-sm">
                                        View
                                        <FileText className="h-[15px] w-[15px] ml-2" />
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
                {paginationRange().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(page)}
                        className={`px-3 py-1 rounded ${
                            currentPage === page ? 'bg-yellow-500 text-white' : 'bg-gray-200'
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
    );
}
