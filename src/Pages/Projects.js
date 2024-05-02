import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { TbArrowsSort } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import EditProjectForm from "./EditProjectForm";
import { useParams } from "react-router-dom";
// import { v4 as uuidv4 } from 'uuid';


const options = [
  { value: "Airtel", label: "Airtel" },
  { value: " Nokia", label: "Nokia" },
  { value: " Ericson", label: "Ericson" },
];
const options2 = [
  { value: "Airtel", label: "Airtel" },
];

function Projects() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);


  const openModal = (index) => {
    setModal(index)
    console.log('index= ', index)
  }


  const handleClick = () => {
    // Navigate to another page
    navigate('/ProjectForm');
  };
  const handleClick2 = () => {
    // Navigate to another page
    navigate('/viewProject');
  };
  let filteredProjects = []
  const handleSearch = () => {
    console.log("projectssssssss", project)
    filteredProjects = project.filter((project) => project.projectName.includes(search))
    console.log(filteredProjects)
  }
  console.log("modal", modal)

  const handleDelete = (index) => {
    // Create a copy of the projects array
    const updatedProjects = [...project];
    // Remove the project at the specified index
    updatedProjects.splice(index, 1);
    // Update the state with the modified projects array
    setProject(updatedProjects);
    // Update the local storage with the modified projects array
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    // Close the modal
    setModal(null);
  };

  const handleEdit = (index) => {  
    console.log("edit");
    console.log("index")
    navigate(`/editProjectForm/${index}`, {state:{index:modal}})
  }
  const [project, setProject] = useState([]);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    setProject(projects);
  }, []);

  console.log("this is the modal", modal)

  return (
    <div className="FullScreen w-full  space-y-8 h-full mx-7">
      <div className=" flex justify-end w-full pt-5">
        <button className="flex bg-[#07a7b3] text-white text-sm h-8 w-40 items-center" onClick={handleClick}>
          <CiCirclePlus /> ADD NEW PROJECT
        </button>
      </div>
      <div className="TopBar bg-white mt-20 flex items-center justify-between py-1  px-3">
        <div className="flex">
          <div className="1st Dropdown  ">
            <Select
              options={options}
              placeholder="Client"
              className="-"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "white" : "white",
                }),
              }}
            />
          </div>
          <div className="2ndDropdown">
            <Select
              options={options2}
              placeholder="Active"
              className=" "
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "white" : "white",
                }),
              }}
            />
          </div>
        </div>
        <div className="searchBox bg-gray-200 w-3/5 ml-auto mr-2 py-1">
          <input className="textBox bg-gray-200 px-3 w-full focus:outline-none" onChange={(e) => {
            setSearch(e.target.value)
          }} type="text" placeholder="Search by project name.." />
        </div>
        <div>
          <button className="bg-[#07a7b3] text-white py-1 font-sans text-sm px-2" onClick={handleSearch}>SEARCH</button>
        </div>
      </div>
      <div>
        <table className="table-auto w-full text-left ">
          <thead>
            <tr className="bg-gray-300 h-9 font-sans text-sm text-gray-600">
              <th className="pl-5">Project  <button><TbArrowsSort />
              </button></th>
              <th>Client  <button><TbArrowsSort />
              </button></th>
              <th>Hours  <button><TbArrowsSort />
              </button></th>
              <th>Access  <button><TbArrowsSort />
              </button></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-white  " >
            {project.filter((project) => project.projectName.includes(search)).map((item, index) => (
              // <tr key={item.project} className="border font-sans h-12 text-sm text-gray-600 "> 
              <tr className="w-8/12 text-[#07a7b3] font-sans  text-sm">
                <td className="text-[#07a7b3] pl-5" onClick={handleClick2}><li>{item.projectName}</li></td>
                <td>{item.firstDropdown.label}</td>
                <td>{item.hoursConsumed}</td>
                <td>Yes</td>
                <td className="relative"  >
                  <SlOptionsVertical onClick={() => { openModal(index) }}/>
                  {modal === index && (
                    <div className="absolute h-20 w-20 z-20 bg-white border border-green-500">
               
                      <div className="hover:bg-slate-400" onClick={()=>handleEdit(index)}>
                        Edit
                      </div>
                    
                    <div className="hover:bg-red-400" onClick={handleDelete}>
                      Delete
                    </div>

                  </div>
                  )}
                </td>
              </tr>
            ))}



          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Projects;









