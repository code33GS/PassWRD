import React from 'react'
import './PassEnter.css'
import { RiEyeCloseFill } from "react-icons/ri";
import { HiEye } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaChrome } from "react-icons/fa";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

import { useState, useEffect } from 'react';

const PassEnter = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({ name: "", url: "", password: "" });

    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem('passwords');
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPass = () => {
        if (showPassword === false) {
            setShowPassword(prevState => !prevState);

        }
        else {
            setShowPassword(prevState => !prevState);
        }
    };

    const savePassWRD = () => {
        if (form.name.length === 0 || form.url.length === 0 || form.password.length === 0) {
            toast.error('Enter details')

        }
        else {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setForm({ name: "", url: "", password: "" })
        }
    }
    const deletePassWRD = (id) => {
        let c = confirm("Are you sure you want to delete?")
        if (c === true) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    }

    const editPassWRD = (id) => {
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const clearAll = () => {
        setForm({ name: "", url: "", password: "" })
    }
    const clearName = () => {
        setForm({ name: "" })
    }
    const clearURL = () => {
        setForm({ url: "" })
    }
    const clearPass = () => {
        setForm({ password: "" })
    }


    const copytxt = (text) => {
        toast.success('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="sabkamain">
                <div className='pe-main'>
                    E N T E R &nbsp; P A S S W O R D &nbsp; D E T A I L S
                    <input value={form.name} onChange={handleChange} className='ip-txt cmmn wdth' type="text" name="name" placeholder='Website URL' />
                    <input value={form.url} onChange={handleChange} className='ip-txt cmmn wdth' type="text" name="url" placeholder='Username' />
                    <div className="pem-pname-save">
                        <input value={form.password} onChange={handleChange} type={showPassword ? "text" : "password"} className='ip-txt passeye cmmn wdth' name="password" placeholder='Password' />
                        <button onClick={showPass} className='ip-eye'>{showPassword ? <HiEye /> : <RiEyeCloseFill />}</button>
                    </div>
                    <div className="pem-pname-save">
                        <button onClick={savePassWRD} className='ip-btn'>S A V E <TiTick /></button>
                        <div className="mid-but">
                            <button onClick={clearName} className='ip-btn'>C L E A R &nbsp; N A M E</button>
                            <button onClick={clearURL} className='ip-btn'>C L E A R &nbsp; U R L</button>
                            <button onClick={clearPass} className='ip-btn'>C L E A R &nbsp; P A S S</button>
                        </div>
                        <button onClick={clearAll} className='ip-btn'>C L E A R &nbsp; A L L <MdDelete /></button>
                    </div>

                </div>
                <div className="mainkabhimain">
                    <span>Y O U R &nbsp; P A S S W R D &nbsp; E N T R I E S</span>
                    {passwordArray.length === 0 && <div className='notng'>Nothing to show here</div>}
                    {passwordArray.length != 0 && <div className='pd-main'>
                        {passwordArray.map((item) => {
                            return <div className="pdm-trident">
                                <div className="pdm-cont-main">
                                    <div className="pdmt-contents">
                                        <div className="pdmc-main">WEBSITE URL:</div>
                                        {/* <a href={item.name} target='_blank'><div className="pdmc-text">{item.name}</div></a> */}
                                        <div className="pdmc-text">{item.name}</div>
                                    </div>
                                    <button onClick={() => { copytxt(item.name) }} className='pdmc-btn'> <IoCopy /></button>
                                    <a href={item.name} target='_blank'><div className="pdmc-text"><button className='pdmc-btn'> <FaChrome /></button></div></a>
                                </div>

                                <div className="pdm-cont-main">
                                    <div className="pdmt-contents">
                                        <div className="pdmc-main">USERNAME:</div>
                                        <div className="pdmc-text">{item.url}</div>
                                    </div>
                                    <button onClick={() => { copytxt(item.url) }} className='pdmc-btn'> <IoCopy /></button>
                                    <button onClick={() => { editPassWRD(item.id) }} className='pdmc-btn'> <MdEdit /></button>

                                </div>

                                <div className="pdm-cont-main">
                                    <div className="pdmt-contents">
                                        <div className="pdmc-main">PASSWORD:</div>
                                        <div className="pdmc-text">{item.password}</div>
                                    </div>
                                    <button onClick={() => { copytxt(item.password) }} className='pdmc-btn'><IoCopy /></button>
                                    <button onClick={() => { deletePassWRD(item.id) }} className='pdmc-btn'><MdDelete /></button>
                                </div>
                            </div>
                        })}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default PassEnter
