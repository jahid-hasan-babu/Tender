'use client'

import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Files } from 'lucide-react';
import { ChevronLeft } from 'lucide-react'
import { ChevronRight } from 'lucide-react'

const tenders = [
    {
        id: 1,
        companyName: "TRAINING IN ENTREPRENEURSHIP INITIATION",
        sector: "Human Resources",
       password: "@#$%fdfd",
    },
    {
        id: 2,
        companyName: "TRAINING IN ENTREPRENEURSHIP INITIATION",
        sector: "Human Resources",
       password: "@#$%fdfd",
    },
    {
        id: 3,
        companyName: "TRAINING IN ENTREPRENEURSHIP INITIATION",
        sector: "Human Resources",
       password: "@#$%fdfd",
    },
    {
        id: 4,
        companyName: "TRAINING IN ENTREPRENEURSHIP INITIATION",
        sector: "Human Resources",
       password: "@#$%fdfd",
    },
    {
        id: 5,
        companyName: "TRAINING IN ENTREPRENEURSHIP INITIATION",
        sector: "Human Resources",
       password: "@#$%fdfd",
    },
    {
        id: 6,
        companyName: "TRAINING IN ENTREPRENEURSHIP INITIATION",
        sector: "Human Resources",
       password: "@#$%fdfd",
    },
    {
        id: 7,
        companyName: "TRAINING IN ENTREPRENEURSHIP INITIATION",
        sector: "Human Resources",
       password: "@#$%fdfd",
    },
    {
        id: 8,
        companyName: "TRAINING IN ENTREPRENEURSHIP INITIATION",
        sector: "Human Resources",
       password: "@#$%fdfd",
    },
]

export default function MembersTable() {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const [searchTerm, setSearchTerm] = useState('') // Search term
    const [departmentFilter, setDepartmentFilter] = useState('All') // Department filter

    const filteredTenders = tenders.filter(tender => {
        const matchesSearchTerm = tender.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tender.sector.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDepartment = departmentFilter === 'All' || tender.sector === departmentFilter
        return matchesSearchTerm && matchesDepartment
    })

    const totalPages = Math.ceil(filteredTenders.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredTenders.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

    const paginationRange = () => {
        const range = []
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    range.push(i)
                }
                range.push('...')
            } else if (currentPage >= totalPages - 2) {
                range.push(1)
                range.push('...')
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    range.push(i)
                }
            } else {
                range.push(1)
                range.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    range.push(i)
                }
                range.push('...')
                range.push(totalPages)
            }
        }
        return range
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto py-20 px-4 lg:px-0">
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
                        <th className="py-3 px-6 text-left">Company Name</th>
                        <th className="py-3 px-6 text-left">Sector of Activity</th>
                        <th className="py-3 px-6 text-left">Password</th>
                        <th className="py-3 pl-6 text-end">Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700 font-bold text-sm">
                    {currentItems.map((tender) => (
                        <tr key={tender.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 text-left whitespace-nowrap">{tender.id}</td>
                            <td className="py-3 px-6 text-left">{tender.companyName}</td>
                            <td className="py-3 px-6 text-left">{tender.sector}</td>
                            <td className="py-3 px-6 text-left">{tender.password}</td>
                            <td className="py-3 pl-6  float-end">
                                <button
                                    className="bg-yellow-500 flex items-center justify-center text-white-white-50 text-md px-3 py-2 rounded-sm"
                                >
                                    Copy
                                    <Files className="h-[15px] w-[15px] ml-2" />
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

                {paginationRange().map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={index} className="px-3 py-1 text-gray-500">...</span>
                        )
                    } else {
                        const pageNumber = typeof page === 'number' ? page : parseInt(page as string, 10)
                        return (
                            <button
                                key={index}
                                onClick={() => paginate(pageNumber)}
                                className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                            >
                                {page}
                            </button>
                        )
                    }
                })}

                <button
                    onClick={nextPage}
                    className="px-2 py-1 bg-gray-200 rounded-md border border-gray-400"
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}
