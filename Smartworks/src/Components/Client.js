import React, { useContext, useEffect } from 'react';
import { Table, Button } from 'antd';
import API from '../Context/API/api_context';
import { useNavigate } from "react-router-dom";
import Modal_Screen from './modal';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

function Client() {

    let navigate = useNavigate();
    const Contextdata = useContext(API);
    const { Client, get_Client, Removeclient } = Contextdata;

    // Ensure Doctor is defined before accessing its properties
    const ClientData = Client && Client.Client ? Client.Client : [];

    useEffect(() => {
        get_Client();
    }, [navigate]);

    function date(date) {
        const originalDate = new Date(date);
        const day = String(originalDate.getDate()).padStart(2, '0');
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const year = originalDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const columns = [
        {
            title: 'NAME',
            width: window.innerWidth >= 769 ? 70 : 20,
            dataIndex: 'name',
            key: 'name',
            render: (text) => <Link>{text?.toUpperCase()}</Link>,
        },
        {
            title: 'PHONE',
            width: window.innerWidth >= 769 ? 70 : 25,
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => <Link to={`tel:${phone}`}>{phone}</Link>,
        },
        {
            title: 'E-MAIL',
            width: window.innerWidth >= 769 ? 100 : 50,
            dataIndex: 'email',
            key: 'email',
            render: (email) => <Link to={`mailto:${email}`}>{email?.toUpperCase()}</Link>,
        },
        {
            title: 'STATUS',
            width: window.innerWidth >= 769 ? 100 : 20,
            dataIndex: 'status',
            key: 'status',
            align: 'center',
        },
        {
            title: 'DOB',
            width: window.innerWidth >= 769 ? 50 : 20,
            dataIndex: 'DOB',
            key: 'DOB',
            align: 'center',
            render: (DOB) => <Link>{date(DOB)}</Link>,
        },
        {
            title: 'SLOT',
            width: window.innerWidth >= 769 ? 50 : 20,
            dataIndex: 'slot',
            key: 'slot',
            align: 'center',
            render: (slot) => <Link>{new Date(slot).toLocaleString()}</Link>,
        },
        {
            title: 'BOOK AT',
            width: window.innerWidth >= 769 ? 50 : 20,
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (createdAt) => <Link>{new Date(createdAt).toLocaleString()}</Link>,
        },
        {
            title: 'MESSAGE',
            width: window.innerWidth >= 769 ? 50 : 20,
            dataIndex: 'massage',
            key: 'massage',
            fixed: 'center',
            align: 'center',
        },
        {
            title: 'Action',
            width: window.innerWidth >= 769 ? 140 : 60,
            key: '_id',
            dataIndex: '_id',
            fixed: 'center',
            align: 'center',
            render: (_, { _id, email }) => (
                <div className="flex flex-row items-center justify-between">
                    <Button onClick={() => Remove(_id)} className='w-20 mr-4' type="primary" danger>Remove</Button>
                    <Modal_Screen SendInvoice={true} id={_id} email={email}/>
                    <Modal_Screen id={_id} />
                </div>
            ),
        },
    ];

    function Remove(id) {
        let person = prompt("Are you sure you want to remove this?", "Dr. Summet Saini");
        if (person === "Dr. Summet Saini") {
            Removeclient(id, "success");
        } else {
            alert("Unauthorized access");
        }
    }

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(Client.Client.map(client => ({
            Name: client.name,
            Phone: client.phone,
            Email: client.email,
            Status: client.status,
            DOB: date(client.DOB),
            Slot: new Date(client.slot).toLocaleString(),
            BookAt: new Date(client.createdAt).toLocaleString(),
            Message: client.massage,
        })));
        
        XLSX.utils.book_append_sheet(wb, ws, "Clients");
        XLSX.writeFile(wb, "Clients.xlsx");
    };
    
    return (
        <div className='mx-12 z-10'>
            <Button type="primary" onClick={exportToExcel} style={{ marginBottom: '20px' }}>
                Export to Excel
            </Button>
            <Table 
                columns={columns} 
                dataSource= {ClientData.map(item => ({ ...item, key: item._id }))}
                scroll={{ x: 1300 }} 
                pagination={{ pageSize: 10 }} // Set max records per page
            />
        </div>
    );
}

export default Client;
