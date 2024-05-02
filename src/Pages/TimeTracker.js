import React, { useEffect, useState, useRef } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { FcClock } from "react-icons/fc";
import { SlCalender } from "react-icons/sl";
import { CiPlay1 } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Select from "react-select";


const arr = [
  [
    {
      "task": "jkhkjh",
      "project": "Student Management",
      "startTime": "2024-04-15T12:13:44.750Z",
      "duration": 2,
      "endTime": "2024-04-15T12:13:47.147Z"
    },
    {
      "task": "jkhkjh",
      "project": "Student Management",
      "startTime": "2024-04-15T12:13:57.595Z",
      "duration": 3,
      "endTime": "2024-04-15T12:14:01.581Z"
    }
  ],
  [
    {
      "task": "avcfg",
      "project": "No Project Assigned",
      "startTime": "2024-04-17T06:59:07.776Z",
      "duration": 4,
      "endTime": "2024-04-17T06:59:12.752Z"
    }
  ]
]


const timeArr = [
  {
    "task": "jkhkjh",
    "project": "Student Management",
    "startTime": "2024-04-15T12:13:44.750Z",
    "duration": 2,
    "endTime": "2024-04-15T12:13:47.147Z"
  },
  {
    "task": "jkhkjh",
    "project": "Student Management",
    "startTime": "2024-04-15T12:13:57.595Z",
    "duration": 3,
    "endTime": "2024-04-15T12:14:01.581Z"
  },

  {
    "task": "avcfg",
    "project": "No Project Assigned",
    "startTime": "2024-04-17T06:59:07.776Z",
    "duration": 4,
    "endTime": "2024-04-17T06:59:12.752Z"
  }
]

const options = [
  { value: "Time Tracker", label: "Time Tracker" },
  { value: "Student Management", label: "Student Management" },
  { value: "No Project Assigned", label: "No Project Assigned" },
];


function TimeTracker() {
  const [time, setTime] = useState(0);
  const [data, setData] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [storeData, setStoreData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    const timeEntries = JSON.parse(localStorage.getItem("TimeEnteries")) || [];
    setStoreData(timeEntries);
    const newArr = []
    for (let i = 0; i < timeEntries.length; i++) {
      if (i === 0) {
        newArr.push([timeEntries[i]])
      } else {
        if (timeEntries[i]?.endTime?.substring(0, 10) === timeEntries[i - 1]?.endTime?.substring(0, 10)) {
          newArr[newArr?.length - 1] = [...newArr[newArr?.length - 1], timeEntries[i]]
        } else {
          console.log("newArrr = ", newArr)
          newArr.push([timeEntries[i]])
        }
      }
    }
    console.log('newArr = ', newArr);
    setTasks([...newArr]);
  }, [isActive]);
  console.log("taksssss", tasks);

  const handleStartStop = () => {
    if (!isActive) {
      setStartTime(new Date())
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      setIsActive(true);
    } else {
      console.log('time = ', time)
      clearInterval(intervalRef.current);
      addEntryToLocalStorage();
      setIsActive(false);
      setTime(0);
    }
  };

  const addEntryToLocalStorage = () => {
    const { task, project } = data;
    const newEntry = {
      task,
      project,
      startTime,
      duration: time,
      endTime: new Date(),
    };
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

    console.log(time);
    console.log(hours);
    console.log(minutes);
    console.log(seconds);

    return (
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };



  console.log('tasks = ', tasks)
  return (
    <div className=" w-full h-full px-5 py-8 ">
      <div className="bg-white h-12 flex justify-between pl-3 py-2  ">
        <input
          className=" textbox bg-gray-200 text-black  w-3/4 pl-2 focus:outline-none"
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

        {tasks?.map((entries, index) => {
          console.log('entries  =  ',entries[0]?.endTime)
          const currentDate = new Date(entries[0]?.endTime);
          const parts = { weekday: 'short', day: '2-digit', month: 'short' };
          const formattedDate = currentDate.toLocaleString('en-US', parts);
          const totalHours = entries.reduce((accumulator, currentValue) => accumulator + currentValue.duration,
          0);
          console.log(formattedDate);
          return (
            <div key={index}>
              <div className="bg-gray-200 h-8 flex justify-between">
                <h1 className="pl-5 text-gray-400 pt-1 font-sans text-sm">{formattedDate}</h1>
                <h1 className="mr-5 text-gray-500">Total: {formatTime(totalHours)} </h1>
              </div>
              {entries?.map((info, i) => {
                console.log('startTime = ', info?.startTime)
                console.log('endTime = ', info?.endTime)
                console.log("startTImmmmmeeeeeeeeeeeee", new Date(info?.startTime))
                // Parse start time
                const startTime = new Date(info?.startTime);
                const startHours = startTime.getHours();
                const startMinutes = startTime.getMinutes();
                const startSeconds = startTime.getSeconds();

                // // Parse end time
                const endTime = new Date(info?.endTime);
                const endHours = endTime.getHours();
                const endMinutes = endTime.getMinutes();
                const endSeconds = endTime.getSeconds();
                console.log("startTime", startTime)
                console.log("startHours", startHours)
                console.log("startMinutes", startMinutes)
                console.log("endTime", endTime)
                console.log("endHours", endHours)
                console.log("endMinutes", endMinutes)

                const period = `${startHours}:${startMinutes}${startHours > 12 ? "PM" : "AM"
                  } - ${endHours}:${endMinutes}${startHours > 12 ? "PM" : "AM"
                  }`;
                // console.log(info?.duration); // Output: 0:2:0
                console.log('period = ', period)

                return (
                  <div key={`${index}_${i}`} className="bg-white h-10 flex border-2 items-center px-2">
                    <div className=" text-gray-600 w-2/12 font-sans text-sm ">{info?.task}</div>
                    <div className="w-8/12 text-[#07a7b3] font-sans text-sm"><li>{info?.project}</li></div>
                    <div className="Timetaken w-3/12 border-r-2 font-sans text-sm flex"><span className="text-gray-600 ">{period}
                    </span>
                      <button className="pl-5  "><SlCalender />
                      </button>
                    </div>

                    <div className="w-1/12 pl-2 border-r-2 font-bold font-sans text-sm">{formatTime(info?.duration)}</div>
                    <div className="w-1/12 px-3  flex justify-between ">
                      <div className=" pr-2 border-r-2">
                        <button><CiPlay1 /></button>
                      </div>
                      <div className="">
                        <button type="" onClick={() => deleteEntry(index)}><RiDeleteBin6Line /></button>
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </div>
          )
        })}
      </div>}
    </div>
  );
}

export default TimeTracker;




































