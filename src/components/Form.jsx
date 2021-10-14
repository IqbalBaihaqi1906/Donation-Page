import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Swal from "sweetalert2"

function Form(props) {
    const [formData,setFormData] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)

    

    const onSubmit = data => {
        setFormData(data)
        setIsSubmit(true)
        props.done(true)
        Swal.fire({
            icon : 'success',
            title : 'Donate Success',
        })
        // console.log(formData)
        // console.log(input)
    };

    const donationSchema = yup.object({
        donation : yup.number().required().min(10,"Minimal amount of donation is $10"),
        email : yup.string().email("Email Format Is Not Valid").required(),
        fullname : yup.string().matches(/^[a-zA-Z\s]+$/,"can only contain alphabet characters").required(),
        nric : yup.string().required().matches(/^[GTSF]\d{7}[A-Z]$/,"NRIC format is not valid"),
        address : yup.string().min(10,"Input at least 10 Characters").max(80,"Maximal input is 80 Characters"),
        phone_number : yup.string().min(10).matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,"Your phone number is not valid")
        
    })

    const { register, watch, handleSubmit, formState:{ errors } } = useForm({resolver: yupResolver(donationSchema)});

    let input = watch()

    return (
        <div className="flex justify-center items-center w-full bg-gradient-to-r from-green-400 to-blue-500">
            <div className="w-5/6 md:w-2/3 bg-white rounded shadow-2xl p-8 m-4">
                <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Donation Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >Donation Amount <span className="text-red-400">*</span></label>
                        <input {...register("donation")} className="border-2 rounded-md border-green-100 py-2 px-3 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">{input.donation || isSubmit ? errors.donation?.message : null}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >Email <span className="text-red-400">*</span></label>
                        <input {...register("email")} className="border-2 rounded-md border-green-100 py-2 px-3 text-grey-800" type="email"/>
                        <p className="text-red-400 text-xs italic">{input.email || isSubmit ? errors.email?.message : null}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >Fullname <span className="text-red-400">*</span></label>
                        <input {...register("fullname")} className="border-2 rounded-md border-green-100 py-2 px-3 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">{input.fullname || isSubmit ? errors.fullname?.message : null}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >NRIC <span className="text-red-400">*</span></label>
                        <input {...register("nric")} className="border-2 rounded-md border-green-100 py-2 px-3 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">{input.nric || isSubmit ? errors.nric?.message : null}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >Phone Number</label>
                        <input {...register("phone_number")} className="border-2 rounded-md border-green-100 py-2 px-3 text-grey-800" type="text" />
                        <p className="text-red-400 text-xs italic">{input.phone_number || isSubmit ? errors.phone_number?.message : null}</p>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="mb-2 font-bold text-lg text-gray-900" >Address</label>
                        <textarea {...register("address")} className="border-2 rounded-md border-green-100 py-2 px-3 text-grey-800" ></textarea>
                        <p className="text-red-400 text-xs italic">{input.address || isSubmit ? errors.address?.message : null}</p>
                    </div>

                    <button onClick={() => setIsSubmit(true)} className="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto px-6 py-2 rounded-lg" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Form


