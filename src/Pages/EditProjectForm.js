import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaTimes } from 'react-icons/fa';
import { useForm, Controller } from "react-hook-form"
import { CgLayoutGrid } from "react-icons/cg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getValue } from "@testing-library/user-event/dist/utils";

const options = [
    { value: "Airtel", label: "Airtel" },
    { value: " Nokia", label: "Nokia" },
    { value: " Ericson", label: "Ericson" },
];
const options2 = [
    { value: "Developer", label: "Developer" },
    { value: " Tester", label: "Tester" },
    { value: " HR", label: "HR" },
    { value: " Marketing", label: "Marketing" }
];

function EditProjectForm() {
    const location = useLocation();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { register, reset, handleSubmit, formState: { errors }, setValue, getValues, control } = useForm()
    const navigate = useNavigate();
    const { index } = useParams()

    const handleChange = (selectedOption) => {
        if (Array.isArray(selectedOption)) {

            setValue("secondDropdown", selectedOption.map((e => e.value)))
        } else {

            setValue("firstDropdown", selectedOption)
        }
    };
    const onSubmit = (data) => {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects[index] = { ...data };
        localStorage.setItem('projects', JSON.stringify([...projects]))
        navigate("/projects")
    }

    useEffect(() => {
        const projects = JSON.parse(localStorage.getItem("projects") || [])
        const project = projects[index];
        console.log('project = ', project.secondDropdown)
        setValue('projectName', project.projectName)
        setValue('firstDropdown', project.firstDropdown)
        setValue('technology', project.technology)
        setValue('hoursAllotted', project.hoursAllotted)
        setValue('hoursConsumed', project.hoursConsumed)
        setValue('hoursLeft', project.hoursLeft)
        setValue('description', project.description)
        setValue('secondDropdown', project.secondDropdown)
    }, [index, setValue])

    const handleClick = () => {
        navigate('/projects');
    }
    const handleReset = () => {
        reset();
    }
    return (
        <div className="w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full p-12">
                <div className="w-full h-full bg-white">
                    <div className="form   space-y-10 p-5">
                        <div className="">
                            <Controller
                                name="projectName"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please provide project name"
                                    }, maxLength: {
                                        value: 20,
                                        message: "exceeding max length"

                                    }
                                }}
                                render={({ field }) => {
                                    return (
                                        <input
                                            {...field}
                                            className="pl-2 border-2 w-4/12 h-10" placeholder="Project Name"
                                        />
                                    )
                                }}
                            />
                            {errors?.projectName && (
                                <p style={{ color: 'red' }}>{errors?.projectName?.message}</p>
                            )}
                            
                        </div>
                        <div className="w-4/12">
                            <Controller
                                name="firstDropdown"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please provide project name"
                                    }, maxLength: {
                                        value: 20,
                                        message: "exceeding max length"
                                    }
                                }}
                                render={({ field }) => {
                                   
                                    return (
                                        <Select
                                            {...field}
                                            options={options}
                                     
                                            name='firstDropdown'
                                            className="w-full border-2"
                                            onChange={handleChange}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: state.isFocused ? "white" : "white",
                                                }),
                                            }}
                                        />
                                    )
                                }}
                            />


                        </div>
                        <div className="w-4/12"><Controller render={({ field }) => (<input className="pl-2 border-2 h-10 w-full" placeholder="Technology" value={field.value} onChange={field.onChange} inputRef={field.ref} />)} name="technology" control={control} rules={{ required: true, maxLength: { value: 20, message: "exceeding max length" } }} />  {errors?.technology && (
                                <p style={{ color: 'red' }}>{errors?.technology?.message}</p>
                            )} </div>
                        <div className="w-4/12"> <Controller render={({ field }) => (<input className="pl-2 border-2 h-10 w-full" type="number" placeholder="Hours Allotted" value={field.value} onChange={field.onChange} inputRef={field.ref} />)} name="hoursAllotted" control={control} rules={{ required: true, maxLength: { value: 20, message: "exceeding max length" } }} />   </div>
                        <div className="flex w-full ">
                            <div className=""> <Controller render={({ field }) => (<input placeholder="Hours Consumed" className="border-2 pl-2 h-10 w-11/12" type="number" value={field.value} onChange={field.onChange} inputRef={field.ref} />)} name="hoursConsumed" control={control} rules={{ required: true, pattern: /^[0-9]+$/ }} /></div>
                            <div className=" ml-2"> <Controller render={({ field }) => (<input placeholder="Hours Left" className="border-2 pl-2 h-10 w-11/12 ml-2" type="number" value={field.value} onChange={field.onChange} inputRef={field.ref} />)} name="hoursLeft" control={control} rules={{ required: true, pattern: /^[0-9]+$/ }} /></div>
                        </div>
                        <div className="w-full"><Controller render={({ field }) => (<input className="pl-2 border-2 w-3/4 h-24 pb-20 pt-2" placeholder="Description" value={field.value} onChange={field.onChange} inputRef={field.ref}></input>)} name="description" control={control} rules={{ required: true, maxLength: { value: 20, message: "exceeding max length" } }} />  {errors?.description && (
                                <p style={{ color: 'red' }}>{errors?.description?.message}</p>
                            )} </div>
                        <div className="flex">
                            Assigned Team
                            <div className=" ml-8 w-2/5 h-10">
                            
                                  <Controller
                                name="secondDropdown"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Please provide project name"
                                    }, maxLength: {
                                        value: 20,
                                        message: "exceeding max length"
                                    }
                                }}
                                render={({ field }) => {
                                    console.log('field = ', field?.value)
                                    return (
                                        <Select
                                            {...field}
                                            options={options2}
                                         
                                            name='secondDropdown'
                                            className="w-full border-2"
                                            isMulti
                                            onChange={handleChange}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: state.isFocused ? "white" : "white",
                                                }),
                                            }}
                                        />
                                    )
                                }}
                            />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end pt-3">
                 
                    <button type="submit" className="bg-[#07a7b3] w-1/12 h-8 text-white">SAVE</button>
                </div>
            </form>
        </div>
    )
}


export default EditProjectForm

