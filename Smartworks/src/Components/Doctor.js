import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import API from '../Context/API/api_context';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Modal_Screen from './modal';
import * as XLSX from 'xlsx';

function Category() {
    let navigate = useNavigate();
    const Contextdata = useContext(API);
    const { get_Doctor, Doctor, Removedoctor } = Contextdata;

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Set max records per page

    useEffect(() => {
        get_Doctor();
    }, [navigate]);

    // Ensure Doctor is defined before accessing its properties
    const doctorData = Doctor && Doctor.Doctor ? Doctor.Doctor : [];
    
    const columns = [
        {
            title: 'NAME',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Link>{text?.toUpperCase()}</Link>,
        },
        {
            title: 'E-MAIL',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            render: (text) => <Link>{text?.toUpperCase()}</Link>,
        },
        {
            title: 'STUDY',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'study',
            key: 'study',
            align: 'center',
            render: (text) => <Link>{text?.toUpperCase()}</Link>,
        },
        {
            title: 'STATUS',
            width: window.innerWidth >= 769 ? 50 : 10,
            dataIndex: 'status',
            key: 'status',
            fixed: 'center',
            align: 'center',
            render: (_, { status, _id }) => (
                <div className="flex flex-col items-center justify-center md:flex-row">
                    <Button onClick={() => toggleStatus(_id)} className={`w-24 ${status ? "bg-green-400" : "bg-red-400"}`} type="primary">
                        {status ? "ACTIVE" : "INACTIVE"}
                    </Button>
                </div>
            ),
        },
        {
            title: 'Action',
            width: window.innerWidth >= 769 ? 110 : 30,
            key: '_id',
            dataIndex: '_id',
            fixed: 'center',
            align: 'center',
            render: (_, { _id }) => (
                <div className="flex flex-row items-center justify-evenly">
                    <Button onClick={() => Remove(_id)} className='w-20' type="primary" danger>Remove</Button>
                    <Modal_Screen id={_id} Addoctor={false}></Modal_Screen>
                </div>
            ),
        },
    ];

    function toggleStatus(id) {
        // Function to toggle doctor status (ACTIVE/INACTIVE)
        // Implementation depends on your API structure
    }

    function Remove(id) {
        let person = prompt("Are you sure you want to remove this?", "Dr. Summet Saini");
        if (person === "Dr. Summet Saini") {
            Removedoctor(id, "success");
        } else {
            alert("Unauthorized access");
        }
    }

    const exportToExcel = () => {
        const currentData = doctorData.slice((currentPage - 1) * pageSize, currentPage * pageSize); // Get current page data
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(currentData.map(doctor => ({
            Name: doctor.name,
            Email: doctor.email,
            Study: doctor.study,
            Status: doctor.status ? "ACTIVE" : "INACTIVE",
        })));
        
        XLSX.utils.book_append_sheet(wb, ws, "Doctors");
        XLSX.writeFile(wb, "Doctors.xlsx");
    };

    return (
        <div className='mx-12 z-10'>
            <div className="my-8 px-4 flex items-center">
                <p>Expanding Our Medical Team: Join New Doctors!</p>
                <Modal_Screen Addoctor={true} />
            </div>
            <Button type="primary" onClick={exportToExcel} style={{ marginBottom: '20px' }}>
                Export to Excel
            </Button>
            <Table 
                columns={columns} 
                dataSource= {doctorData.map(item => ({ ...item, key: item._id }))}
                scroll={{ x: 1300 }} 
                pagination={{ 
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: (page) => setCurrentPage(page),
                    total: doctorData.length,
                }} 
            />
        </div>
    );
}

export default Category;
