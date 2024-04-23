import React, { useEffect, useState, useRef } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { FcClock } from "react-icons/fc";
import { SlCalender } from "react-icons/sl";
import { CiPlay1 } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Select from "react-select";

const options = [
  { value: "Time Tracker", label: "Time Tracker" },
  { value: "Student Management", label: "Student Management" },
  { value: "No Project Assigned", label: "No Project Assigned" },
];

function TimeTracker() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);
  const [data, setData] = useState({
    task: "",
    project: "",
    startTime: null,
    endTime: null,
    duration: 0
  });
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const timeEntries = JSON.parse(localStorage.getItem("TimeEnteries")) || [];
    // const result = Object.groupBy(timeEntries, (timeEntries) => new Date(timeEntries.startTime).toLocaleDateString())
    setStoreData(timeEntries);
  }, [isActive]);

  const handleStartStop = () => {
    if (!isActive) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setIsActive(true);
    } else {
      console.log('time = ',time)
      clearInterval(intervalRef.current);
      const newEntry = {
        task: data.task,
        project: data.project,
        startTime: time,
        endTime: new Date().toLocaleString(),
        duration: time
      };
      addEntryToLocalStorage(newEntry);
      setIsActive(false);
      setTime(0);
    }
  };

  const addEntryToLocalStorage = (newEntry) => {
    const existingEntries = JSON.parse(localStorage.getItem('TimeEnteries')) || [];
    const updatedEntries = [...existingEntries, newEntry];
    localStorage.setItem('TimeEnteries', JSON.stringify(updatedEntries));
  };

  const deleteEntry = (index) => {
    const updatedEntries = [...storeData];
    updatedEntries.splice(index, 1);
    setStoreData(updatedEntries);
    localStorage.setItem('TimeEnteries', JSON.stringify(updatedEntries));
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return (
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };


  return (
    <div className=" w-full h-full px-5 py-8 ">
      <div className="bg-white h-12 flex justify-between pl-3 py-2  ">
        <input
          className=" textbox bg-gray-200 text-black  w-3/4 focus:outline-none"
          type="text"
          placeholder=""
          onChange={(e) => setData({ ...data, task: e.target.value })}
        ></input>

        <Select
          options={options}
          placeholder="Project"
          className="-m-2 py-1 "
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "white" : "white",
            }),
          }}
          onChange={(e) => setData({ ...data, project: e.value })}
        />
        <div className="flex ">
          <h1 className="pr-10 text-xl text-bold text-gray-600 ml-3">
            {formatTime(time)}
          </h1>
          <button
            onClick={handleStartStop}
            className="bg-[#07a7b3] w-20 mr-3 text-white"
          >
            {isActive ? "STOP" : "START"}
          </button>
        </div>

        <div className="">
          <FcClock />
          <TfiMenuAlt />
        </div>
      </div>
      {storeData && <div className="1st Table py-10">

        <div className="bg-gray-200 h-8">
          <h1 className="pl-5 text-gray-400 pt-1 font-sans text-sm">Today</h1>
        </div>
        {storeData.map((info, index) => {
          console.log('startTime = ', info?.startTime)
          console.log('endTime = ', info?.endTime)

          // Parse start time
          const startTime = new Date(info?.startTime);
          const startHours = startTime.getHours();
          const startMinutes = startTime.getMinutes();
          const startSeconds = startTime.getSeconds();

          // Parse end time
          const endTime = new Date(info?.endTime);
          const endHours = endTime.getHours();
          const endMinutes = endTime.getMinutes();
          const endSeconds = endTime.getSeconds();

          // Calculate difference
          const diffHours = endHours - startHours;
          const diffMinutes = endMinutes - startMinutes;
          const diffSeconds = endSeconds - startSeconds;

          // Output difference
          const difference = `${diffHours}:${diffMinutes}:${diffSeconds}`;
          console.log(difference); // Output: 0:2:0

          return (
            <div key={index} className="bg-white h-10 flex border-2 items-center px-2">
              <div className=" text-gray-600 w-2/12 font-sans text-sm ">{info.task}</div>
              <div className="w-8/12 text-[#07a7b3] font-sans text-sm"><li>{info.project}</li></div>
              <div className="Timetaken w-3/12 border-r-2 font-sans text-sm"><span className="text-gray-600">{info.startTime}-{info.endTime}</span>
                <button className="pl-5  "><SlCalender />
                </button>
              </div>

              <div className="w-1/12 pl-2 border-r-2 font-bold font-sans text-sm">{info.duration}</div>
              <div className="w-1/12 px-3  flex justify-between ">
                <div className=" pr-2 border-r-2">
                  <button><CiPlay1 /></button>
                </div>
                <div className="">
                  <button onClick={() => deleteEntry(index)}><RiDeleteBin6Line /></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>}
    </div>
  );
}

export default TimeTracker;


// import { useEffect, useState, useRef } from "react";
// import { TfiMenuAlt } from "react-icons/tfi";
// import { FcClock } from "react-icons/fc";
// import { SlCalender } from "react-icons/sl";
// import { CiPlay1 } from "react-icons/ci";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import Select from "react-select";

// const options = [
//   { value: "Time Tracker", label: "Time Tracker" },
//   { value: "Student Management", label: "Student Management" },
//   { value: "No Project Assigned", label: "No Project Assigned" },
// ];




// function TimeTracker() {
//   const [time, setTime] = useState(0);
//   const [isActive, setIsActive] = useState(false);
//   const intervalRef = useRef(null);
//   const [data, setData] = useState({
//          task : "",
//          project:"",
//          startTime:null,
//          endTime:null,
//          duration: 0
//        });
//   const [storeData, setStoreData] = useState(null);


//   useEffect (() => {
//     const timeEntries = JSON.parse(localStorage.getItem("TimeEnteries"));
//     // console.log("t",timeEntries)
//     // const result = Object.groupBy(timeEntries,(timeEntries)=> new Date(timeEntries.startTime).toLocaleDateString())
//     // console.log("result",result)
//     setStoreData(timeEntries)
//   },[isActive]);

//   console.log(storeData);


//   const handleStartStop = () => {
//     if (!isActive) {
//       intervalRef.current = setInterval(() => {
//         setTime(prevTime => prevTime + 1);
//       }, 1000);
//       setIsActive(true);
//     } else {
//       clearInterval(intervalRef.current);
//       const newEntry = {
//         task: [data.task],
//         project: [data.project],
//         startTime: new Date().toLocaleString(),
//         endTime: new Date().toLocaleString(), // Assuming endTime is also set when stopped
//         duration: time
//       };
//       addEntryToLocalStorage(newEntry);
//       setIsActive(false);
//       setTime(0);
//     }
//   };

//   const addEntryToLocalStorage = (newEntry) => {
//     const existingEntries = JSON.parse(localStorage.getItem('TimeEnteries')) || [];
//     const updatedEntries = [...existingEntries, newEntry];
//     localStorage.setItem('TimeEnteries', JSON.stringify(updatedEntries));
//   };




//   const formatTime = (time) => {
//     const hours = Math.floor(time / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     const seconds = time % 60;
//     return (
//       (hours < 10 ? "0" + hours : hours) +
//       ":" +
//       (minutes < 10 ? "0" + minutes : minutes) +
//       ":" +
//       (seconds < 10 ? "0" + seconds : seconds)
//     );
//   };


//   return (
//     <div className=" w-full h-full px-5 py-8 ">
//       <div className="bg-white h-12 flex justify-between pl-3 py-2  ">
//         <input
//           className=" textbox bg-gray-200 text-black  w-3/4 focus:outline-none"
//           type="text"
//           placeholder=""
//           onChange={(e) => {

//             setData({...data,task:e.target.value})

//           }}
//         ></input>

//         <Select
//           options={options}
//           placeholder="Project"
//           className="-m-2 py-1 "
//           styles={{
//             control: (baseStyles, state) => ({
//               ...baseStyles,
//               borderColor: state.isFocused ? "white" : "white",
//             }),
//           }}
//           onChange={(e) => {

//             setData({...data,project:e.value})

//           }}
//         />
//         <div className="flex ">
//           <h1 className="pr-10 text-xl text-bold text-gray-600 ml-3">
//             {formatTime(time)}
//           </h1>
//           <button
//             onClick={handleStartStop}
//             className="bg-[#07a7b3] w-20 mr-3 text-white"
//           >
//             {isActive ? "STOP" : "START"}
//           </button>
//         </div>

//         <div className="">
//           <FcClock />
//           <TfiMenuAlt />
//         </div>
//       </div>
//       {storeData && <div className="1st Table py-10">

//         <div className="bg-gray-200 h-8">
//           <h1 className="pl-5 text-gray-400 pt-1 font-sans text-sm">Today</h1>
//         </div>
//         {
//      storeData?.map((info, index) =>{ 
//         return(
//         <div className="bg-white h-10 flex border-2 items-center px-2">
//           <div className=" text-gray-600 w-2/12 font-sans text-sm ">{info.task}</div>
//           <div className="w-8/12 text-[#07a7b3] font-sans text-sm"><li>{info.project}</li></div>
//           <div className="w-3/12 border-r-2 font-sans text-sm"><span className="text-gray-600">{info.startTime}-{info.endTime}</span>
//           <button className="pl-5  "><SlCalender />
//             </button>
//         </div>

//           <div className="w-1/12 pl-2 border-r-2 font-bold font-sans text-sm">{info.duration}</div>
//           <div className="w-1/12 px-3  flex justify-between ">
//             <div className=" pr-2 border-r-2"><button><CiPlay1 />
//             </button></div>
//             <div className=" "><button><RiDeleteBin6Line />
//             </button></div>
//           </div>
//         </div>)})}


//       </div>}


//       {/* <div className="2nd Table ">
//       <div className="bg-gray-200 h-8 ">
//           <div className="pl-5 text-gray-400 pt-1 font-sans text-sm">Yesterday</div>
//         </div>
//         <div className="bg-white h-10 flex border-2 items-center px-2">
//           <div className=" text-gray-600 w-2/12 font-sans text-sm">Work done</div>
//           <div className="w-8/12 text-[#07a7b3] font-sans text-sm"><li>Project</li></div>
//           <div className="w-3/12 border-r-2 text-gray-600 font-sans text-sm"><span>10:00AM - 2:00PM</span>
//           <button className="pl-5  "><SlCalender />
// </button></div>

//           <div className="w-1/12 pl-2 border-r-2 font-bold font-sans text-sm">4:02:36</div>
//           <div className="w-1/12 px-3  flex justify-between ">
//             <div className=" pr-2 border-r-2"><button><CiPlay1 />
//             </button></div>
//             <div className=" "><button><RiDeleteBin6Line />
//             </button></div>
//           </div>

//         </div>
//         <div className="bg-white h-10 flex border-2 items-center px-2">
//           <div className=" text-gray-600 w-2/12 font-sans text-sm">Work done</div>
//           <div className="w-8/12 text-[#07a7b3] font-sans text-sm"><li>Project</li></div>
//           <div className="w-3/12 border-r-2 text-gray-600 font-sans text-sm"><span>10:00AM - 2:00PM</span>
//           <button className="pl-5  "><SlCalender />
// </button></div>

//           <div className="w-1/12 pl-2 border-r-2 font-bold font-sans text-sm">4:02:36</div>
//           <div className="w-1/12 px-3  flex justify-between ">
//             <div className=" pr-2 border-r-2"><button><CiPlay1 />
//             </button></div>
//             <div className=" "><button><RiDeleteBin6Line />
//             </button></div>
//           </div>
//         </div>
//         <div className="bg-white h-10 flex border-2 items-center px-2">
//           <div className=" text-gray-600 w-2/12 font-sans text-sm">Work done</div>
//           <div className="w-8/12 text-[#07a7b3] font-sans text-sm"><li>Project</li></div>
//           <div className="w-3/12 border-r-2 text-gray-600 font-sans text-sm"><span>10:00AM - 2:00PM</span>
//           <button className="pl-5  "><SlCalender />
// </button></div>

//           <div className="w-1/12 pl-2 border-r-2 font-bold font-sans text-sm">4:02:36</div>
//           <div className="w-1/12 px-3  flex justify-between ">
//             <div className=" pr-2 border-r-2"><button><CiPlay1 />
//             </button></div>
//             <div className=" "><button><RiDeleteBin6Line />
//             </button></div>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );}
// export default TimeTracker;




// function TimeTracker() {

//   const [time, setTime] = useState(0);
//   const [isActive, setIsActive] = useState(false);
//   const intervalRef = useRef(null);
//   const [data, setData] = useState({
//     task : "",
//     project:"",
//     startTime:null,
//     endTime:null,
//     duration: 0
//   });

//   console.log("data",data)
//   const handleStartStop = () => {
//     if (!isActive) {
//       intervalRef.current = setInterval(() => {
//         setTime((prevTime) => prevTime + 1);
//       }, 1000);
//       setData({...data,startTime:new Date().toLocaleString()})
//       setIsActive(!isActive);

//     } else {
//       setData({...data,duration:time,endTime:new Date().toLocaleString()})
//       // setData({...data,endTime:new Date()})

//       localStorage.setItem("TimeEntry",JSON.stringify(data))
//       clearInterval(intervalRef.current);

//      setTime(0)
//      setIsActive(!isActive);
//     }
//   };

//   // const TimerStart = () => {
//   //     setData({...data,startTime:new Date()})
//   // }

//   const formatTime = (time) => {
//     const hours = Math.floor(time / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     const seconds = time % 60;
//     return (
//       (hours < 10 ? "0" + hours : hours) +
//       ":" +
//       (minutes < 10 ? "0" + minutes : minutes) +
//       ":" +
//       (seconds < 10 ? "0" + seconds : seconds)
//     );
//   };

//   const tracker = [
//     {startTime : {...data},}
//   ];


{/* <div className="bg-white h-10 flex border-2 items-center px-2">
          <div className=" text-gray-600 w-2/12 font-sans text-sm">Work done</div>
          <div className="w-8/12 text-[#07a7b3] font-sans text-sm"><li>Project</li></div>
          <div className="w-3/12 border-r-2 text-gray-600 font-sans text-sm"><span>10:00AM - 2:00PM</span>
          <button className="pl-5  "><SlCalender />
</button></div>
        
          <div className="w-1/12 pl-2 border-r-2 font-bold font-sans text-sm">4:02:36</div>
          <div className="w-1/12 px-3  flex justify-between ">
            <div className=" pr-2 border-r-2"><button><CiPlay1 />
            </button></div>
            <div className=" "><button><RiDeleteBin6Line />
            </button></div>
          </div>
        </div> */} //2nd entry of the first box

































