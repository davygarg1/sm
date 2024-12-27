import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, DatePicker } from 'antd';
import API from '../Context/API/api_context';
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import moment from 'moment';

const { RangePicker } = DatePicker;

function Invoice() {
    let navigate = useNavigate();
    const Contextdata = useContext(API);
    const { get_Invoices, Invoices, Resend_invoice } = Contextdata;

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const pageSize = 10;

    useEffect(() => {
        get_Invoices();
    }, [navigate]);

    useEffect(() => {
        setFilteredData(invoiceData); // Initialize the table with all data
    }, [Invoices]);

    const invoiceData = Invoices && Invoices.length > 0 ? Invoices : [];

    const columns = [
        {
            title: 'USER',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'User',
            key: 'User',
            render: (text) => <span>{text.name?.toUpperCase()} ({text.phone})</span>,
        },
        {
            title: 'E-MAIL',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text?.toUpperCase()}</a>,
        },
        {
            title: 'AMOUNT',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
        },
        {
            title: 'PAYMENT METHOD',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'payment',
            key: 'payment',
            align: 'center',
        },
        {
            title: 'TREATMENT',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'treatment',
            key: 'treatment',
            align: 'center',
        },
        {
            title: 'DATE',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => moment(text).format('YYYY-MM-DD'),
        },
        {
            title: 'Action',
            width: window.innerWidth >= 769 ? 50 : 20,
            key: '_id',
            dataIndex: '_id',
            fixed: 'center',
            align: 'center',
            render: (_, { _id }) => (
                <div className="flex flex-row items-center justify-evenly">
                    <Button onClick={() => Resend_invoice(_id)} className='w-20' type="primary" danger>Resend</Button>
                </div>
            ),
        },
    ];

    // Function to filter the invoice data based on the selected date range
    const handleDateChange = (dates) => {
        if (dates && dates.length === 2) {
            const [start, end] = dates;
            const filtered = invoiceData.filter((invoice) => {
                const invoiceDate = moment(invoice.createdAt).startOf('day');
                return invoiceDate.isSameOrAfter(start.$d, 'day') && invoiceDate.isSameOrBefore(end.$d, 'day');
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(invoiceData); // Reset to full data when no date range is selected
        }
    };

    const exportToExcel = () => {
        const currentData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(currentData.map(invoice => ({
            User: invoice.User.name,
            Amount: invoice.amount,
            Payment: invoice.payment,
            Treatment: invoice.treatment,
            Date: moment(invoice.createdAt).format('YYYY-MM-DD'),
            Status: invoice.status ? "PAID" : "PENDING",
        })));

        XLSX.utils.book_append_sheet(wb, ws, "Invoices");
        XLSX.writeFile(wb, "Invoices.xlsx");
    };

    return (
        <div className='mx-12 z-10'>
            <div className="flex justify-between space-x-4 my-4">
                <RangePicker
                    onChange={handleDateChange} // Trigger filtering when dates are selected
                />
                <Button type="primary" onClick={exportToExcel} style={{ marginLeft: '10px' }}>
                    Export to Excel
                </Button>
            </div>
            <Table 
                columns={columns} 
                dataSource={filteredData.map(item => ({ ...item, key: item._id }))}
                scroll={{ x: 1300 }} 
                pagination={{ 
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: (page) => setCurrentPage(page),
                    total: filteredData.length,
                }} 
            />
        </div>
    );
}

export default Invoice;
