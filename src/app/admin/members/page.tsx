import React from 'react';
import {AdminNavbar} from "@/components/AdminNavbar";
import MembersTable from "@/app/admin/components/MembersTable";

const Page = () => {
    return (
        <>
            <AdminNavbar/>
            <MembersTable/>
        </>
    );
};

export default Page;