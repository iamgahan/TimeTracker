import React, { useState } from "react";
import Select from "react-select";
import { FaTimes } from 'react-icons/fa';
import { useForm, Controller } from "react-hook-form"
import { CgLayoutGrid } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
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
    { value: " Marketing", label: "Marketing" },
];

function ProjectForm() {
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { register, reset, handleSubmit, setValue, getValues, control, formState: { errors } } = useForm()
    // console.log("register", register);

    const handleChange = (selectedOption) => {
        console.log({ selectedOption })
        if (Array.isArray(selectedOption)) {
            setValue("secondDropdown", selectedOption.map((e => e)))
        } else {

            setValue("firstDropdown", selectedOption)
        }
    };
    const onSubmit = (data) => {
        console.log("data", data)
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        if (projects?.length > 0) {
            projects.push(data);
            localStorage.setItem('projects', JSON.stringify(projects))
        } else {
            localStorage.setItem('projects', JSON.stringify([{ ...data }]))
        }
        navigate("/projects")
    }


    const handleClick = () => {
        // Navigate to another page
        navigate('/projects');
    }
    const handleReset = () => {
        console.log("reserererere",)
        reset();
    }

    return (
        <div className="w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full p-12">
                <div className="w-full h-full bg-white">
                    <div className="form   space-y-10 p-5">
                        <div className="">
                            <Controller
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        className="pl-2 border-2 w-4/12 h-10" placeholder="Project Name"
                                    />
                                )}
                                name="projectName"
                                control={control}
                                rules={{ required: true, maxLength: {
                                    value: 20,
                                    message: "exceeding max length"
                                } }}

                            />
                            {errors?.projectName && (
                                <p style={{ color: 'red' }}>{errors?.projectName?.message}</p>
                            )}
                        </div>
                        <div className="w-4/12">
                            <Select
                                {...register("firstDropdown")}
                                options={options}
                                placeholder="Client"
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
                        </div>
                        <div className="w-4/12"><Controller render={({ field }) => (<input className="pl-2 border-2 h-10 w-full" placeholder="Technology" value={field.value} onChange={field.onChange} ref={field.ref} />)} name="technology" control={control} rules={{ required: true, maxLength: { value: 20, message: "exceeding max length" } }} />  {errors?.technology && (
                                <p style={{ color: 'red' }}>{errors?.technology?.message}</p>
                            )} </div>
                        <div className="w-4/12"> <Controller render={({ field }) => (<input className="pl-2 border-2 h-10 w-full" type="number" placeholder="Hours Allotted" value={field.value} onChange={field.onChange} ref={field.ref} />)} name="hoursAllotted" control={control} rules={{ required: true, maxLength: 20 }} /></div>
                        <div className="flex w-full ">
                            <div className=""> <Controller render={({ field }) => (<input placeholder="Hours Consumed" className="border-2 pl-2 h-10 w-11/12" type="number" value={field.value} onChange={field.onChange} ref={field.ref} />)} name="hoursConsumed" control={control} rules={{ required: true, pattern: /^[0-9]+$/ }} /></div>
                            <div className=" ml-2"> <Controller render={({ field }) => (<input placeholder="Hours Left" className="border-2 pl-2 h-10 w-11/12 ml-2" type="number" value={field.value} onChange={field.onChange} ref={field.ref} />)} name="hoursLeft" control={control} rules={{ required: true, pattern: /^[0-9]+$/ }} /></div>
                        </div>
                        <div className="w-full"><Controller render={({ field }) => (<input className="pl-2 border-2 w-3/4 h-24 pb-20 pt-2" placeholder="Description" value={field.value} onChange={field.onChange} inputRef={field.ref}></input>)} name="description" control={control} rules={{
                            required: {
                                value: true,
                                message: "Please provide description"
                            }, maxLength: { value: 20, message: "exceeding max length" }
                        }} /> {errors?.description && (
                            <p style={{ color: 'red' }}>{errors?.description?.message}</p>
                        )} </div>
                        <div className="flex">
                            Assigned Team
                            <div className=" ml-8 w-2/5 h-10">
                                    <Select
                                    {...register("secondDropdown")}
                                    options={options2}
                                    value={getValues("secondDropdown")}
                                    onChange={handleChange}
                                    isMulti
                                    className="hover:black"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end pt-3">
                    <button type="reset" className="bg-[#07a7b3] w-1/12 h-8 text-white" onClick={() => handleReset()} >RESET</button>
                    <button type="submit" className="bg-[#07a7b3] w-1/12 h-8 text-white">SAVE</button>
                </div>
            </form>
        </div>
    )
}
export default ProjectForm



