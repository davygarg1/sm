import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import API from '../Context/API/api_context';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

function TestimonialsCategory() {
    let navigate = useNavigate();
    const Contextdata = useContext(API);
    const { get_Testimonials, Testimonials, Remove_Testimonials } = Contextdata;

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Set max records per page

    useEffect(() => {
        get_Testimonials();
    }, [navigate]);

    // Ensure Testimonials is defined before accessing its properties
    const testimonialData = Testimonials && Testimonials.Testimonial ? Testimonials.Testimonial : [];

    const columns = [
        {
            title: 'NAME',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Link>{text?.toUpperCase()}</Link>,
        },
        {
            title: 'Message',
            width: window.innerWidth >= 769 ? 70 : 50,
            dataIndex: 'massage',
            key: 'massage',
            render: (text) => <Link>{text?.toUpperCase()}</Link>,
        },
        {
            title: 'Rating',
            width: window.innerWidth >= 769 ? 70 : 10,
            dataIndex: 'star',
            key: 'star',
        },
        {
            title: 'STATUS',
            width: window.innerWidth >= 769 ? 50 : 20,
            dataIndex: 'status',
            key: 'status',
            fixed: 'center',
            align: 'center',
            render: (_, { status, _id }) => (
                <div className="flex flex-col items-center justify-center md:flex-row">
                    <Button onClick={() => Remove(_id, "Status")} className={`w-24 ${status ? "bg-green-400" : "bg-red-400"}`} type="primary">
                        {status ? "ACTIVE" : "INACTIVE"}
                    </Button>
                </div>
            ),
        },
        {
            title: 'Action',
            width: window.innerWidth >= 769 ? 110 : 20,
            key: '_id',
            dataIndex: '_id',
            fixed: 'center',
            align: 'center',
            render: (_, { _id }) => (
                <div className="flex flex-col items-center justify-center md:flex-row">
                    <Button onClick={() => Remove(_id, "remove")} className='w-20' type="primary" danger>
                        Remove
                    </Button>
                </div>
            ),
        },
    ];

    function Remove(id, action) {
        let person = prompt("Are you sure you want to remove this?", "Dr. Summet Saini");
        if (person === "Dr. Summet Saini") {
            Remove_Testimonials(id, action);
        } else {
            alert("Unauthorized access");
        }
    }

    const exportToExcel = () => {
        const currentData = testimonialData.slice((currentPage - 1) * pageSize, currentPage * pageSize); // Get current page data
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(currentData.map(testimonial => ({
            Name: testimonial.name,
            Message: testimonial.massage,
            Rating: testimonial.star,
            Status: testimonial.status ? "ACTIVE" : "INACTIVE",
        })));
        
        XLSX.utils.book_append_sheet(wb, ws, "Testimonials");
        XLSX.writeFile(wb, "Testimonials.xlsx");
    };

    return (
        <div className='mx-12 z-10'>
            <Button type="primary" onClick={exportToExcel} style={{ marginBottom: '20px' }}>
                Export to Excel
            </Button>
            <Table 
                columns={columns} 
                dataSource={testimonialData.map(item => ({ ...item, key: item._id }))} 
                scroll={{ x: 1300 }} 
                pagination={{ 
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: (page) => setCurrentPage(page),
                    total: testimonialData.length,
                }} 
            />
        </div>
    );
}

export default TestimonialsCategory;
