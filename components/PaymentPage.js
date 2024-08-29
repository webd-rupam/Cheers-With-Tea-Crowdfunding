"use client"
import Script from 'next/script'

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    // const {data: session} = useSession()
    const [paymentform, setpaymentform] = useState({name: "", message: "", amount: ""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])


    useEffect(() => {
        if(searchParams.get("paymentdone") == "true") {

            toast("Payment done", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)
        }, [])
    


    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentUser(u)

        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }



    const pay = async (amount) => {
        // get order id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id

        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Cheers with Tea", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
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
                theme="light"
            />

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className='cover w-full relative'>
                <img className='object-cover w-full h-48 md:h-[350px]' src={currentUser.coverpic} alt="bg" />
                <div className='absolute md:-bottom-18 -bottom-16 right-[38%] md:right-[46%] border-2 border-white rounded-full'>
                    <img className='rounded-full md:w-32 w-24' src={currentUser.profilepic} alt="" />
                </div>
            </div>

            <div className="info flex flex-col justify-center items-center my-24 text-white gap-1">
                <div className='font-bold md:text-lg text-md'>@{username}</div>
                <div className='text-slate-400'>Lets help <span className='italic font-bold'>{currentUser.name}</span> to get a sip!</div>
                <div className='text-slate-400'>{payments.length} Payments yet . ₹{payments.reduce((a, b) => a+b.amount, 0)} raised</div>

                <div className="payment flex flex-col md:flex-row gap-3 w-[80%]">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-10 md:my-5 my-2">
                        <h2 className='md:text-2xl text-xl font-bold md:my-5 my-2'>Supporters</h2>
                        <ul className='mx-5 text-lg'>

                            {payments.length === 0 && <li>No Payments Yet</li>}


                            {payments.map((p, i) => (


                                <li className='my-4 flex gap-2 items-center'>
                                    <img className='md:w-9 w-7' src="avatar.gif" alt="" />
                                    <span className='text-sm md:text-base'>
                                        {p.name} Donated <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"
                                    </span>
                                </li>

                            ))}

                        </ul>
                    </div>

                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg p-10 my-5">
                        <h2 className='md:text-2xl text-xl font-bold my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col'>
                            <div>

                                <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter your Name' />
                            </div>
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />


                            <input onChange={handleChange} value={paymentform.amount} name='amount' type="number" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-800 to-blue-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:from-purple-100 disabled:cursor-not-allowed" disabled={paymentform.name?.length < 1 || paymentform.message?.length < 1 || paymentform.amount?.length < 1}>Pay</button>
                        </div>

                        {/* or choose from these */}
                        <div className="flex flex-col md:flex-row gap-2 mt-5">
                            <button className='bg-slate-800 p-3 rounded-lg disabled:cursor-not-allowed' disabled={paymentform.name?.length < 1 || paymentform.message?.length < 1} onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg disabled:cursor-not-allowed' disabled={paymentform.name?.length < 1 || paymentform.message?.length < 1} onClick={() => pay(3000)}>Pay ₹30</button>
                            <button className='bg-slate-800 p-3 rounded-lg disabled:cursor-not-allowed' disabled={paymentform.name?.length < 1 || paymentform.message?.length < 1} onClick={() => pay(5000)}>Pay ₹50</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
