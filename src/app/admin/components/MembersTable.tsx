'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ChevronDown, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchTenders } from '@/app/redux/slice/allMembresSlice';
import { AppDispatch, RootState } from '@/app/redux/store';

export default function TableData() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('All');

    const dispatch = useDispatch<AppDispatch>();
    const { tenders, loading, error } = useSelector((state: RootState) => state.newApplication);

    useEffect(() => {
        dispatch(fetchTenders());
    }, [dispatch]);

    // Extract unique departments for the filter dropdown
    const departmentOptions = Array.from(
        new Set(tenders?.map((tender) => tender?.company?.sector_of_activity || '')) || []
    );

    // Filter tenders based on search term and department
    const filteredTenders = tenders?.filter((tender) => {
        const company = tender?.company;
        if (!company) return false;

        const matchesSearchTerm =
            company.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.sector_of_activity?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment =
            departmentFilter === 'All' || company.sector_of_activity === departmentFilter;

        return matchesSearchTerm && matchesDepartment;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredTenders.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTenders.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    if (loading) return <p className='text-center'>Loading tenders...</p>;
    if (error) return <p className='text-center'>Error: {error}</p>;

    return (
        <div className="w-full max-w-[1200px]  mx-auto py-20 px-4 lg:px-0">
            <div className='border p-3 border-gray-300 rounded-md'>
                      {/* Search and Filter */}
            <div className="flex flex-col  lg:flex-row lg:justify-between mb-4 space-y-4 lg:space-y-0 lg:space-x-4">
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
                <div className="relative w-full lg:w-auto">
                    <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="appearance-none bg-white border border-gray-400 rounded-md pl-4 pr-10 py-2 w-full"
                    >
                        <option value="All">All Departments</option>
                        {departmentOptions?.map((option, idx) => (
                            <option key={idx} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white table-auto border border-gray-200 p-2 ">
                    <thead>
                        <tr className="bg-gray-100 text-black font-bold text-sm leading-normal">
                            <th className="py-3  px-6 text-left">Number</th>
                            <th className="py-3 px-6 text-left">Company Name</th>
                            <th className="py-3 px-6 text-left">Sector of Activity</th>
                            <th className="py-3 px-6 text-left">Password</th>
                            <th className="py-3 px-6 text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 font-bold text-sm">
                        {currentItems.map((tender, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                <td className="py-3 px-6 text-left">{tender?.company?.company_name}</td>
                                <td className="py-3 px-6 text-left">{tender?.company?.sector_of_activity}</td>
                                <td className="py-3 px-6 text-left">
                                    {tender?.password}
                                </td>
                                <td className="py-3 px-6 text-right">
                                    <button className="bg-yellow-500 text-white-white-50 px-3 py-1 rounded">
                                        View <FileText className="inline ml-2" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
                <button onClick={prevPage} className="px-2 py-1 bg-gray-200 rounded-md" disabled={currentPage === 1}>
                    <ChevronLeft />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-3 py-1 rounded ${
                            currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={nextPage}
                    className="px-2 py-1 bg-gray-200 rounded-md"
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight />
                </button>
            </div>
      </div>
        </div>
    );
}
