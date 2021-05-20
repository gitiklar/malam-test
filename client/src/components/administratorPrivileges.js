import React from 'react';
import { Link } from 'react-router-dom';

export const AdministratorPrivileges = () => {
    return (
        <>
            <Link to="/home/store-management">Store management</Link>
            <Link to="/home/statistics">Statistics</Link>
        </>
    )
}