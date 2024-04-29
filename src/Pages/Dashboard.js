import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [totalHours, setTotalHours] = useState("")
  const [data, setData] = useState([]);
  const [hours, setHours] = useState(0);
  const [labels, setLabels] = useState([]);
  const [durationsArray, setDurationsArray] = useState([]);

  useEffect(() => {
    const timeEntries = JSON.parse(localStorage.getItem("TimeEnteries")) || [];
    const res = timeEntries.reduce((accumulator, currentValue) => accumulator + currentValue.duration,
      0);
    setTotalHours(res);
    const finalDuration = timeEntries.map(entry => entry.duration);
    setDurationsArray(finalDuration);
    console.log("durationssssssssss", finalDuration)


    const datesArray = timeEntries?.map((item) => {
      const dateString = item.endTime.substring(0, 10);
      const dateObject = new Date(dateString);
      const parts = { weekday: 'short', day: '2-digit', month: 'short' };
      return dateObject.toLocaleString('en-US', parts);
    });
    const labels = new Set(datesArray);
    console.log(labels)
    setLabels([...labels])
    // const datesArray = timeEntries?.map((item, idx) => item.endTime.substring(0, 10))
    // console.log('datesArray = ', datesArray)
    // const x = new Set(datesArray);

    // formating date for the y-axis graph
    //   const currentDate = datesArray;
    //   const formattedDate = datesArray.map(dateString => {
    //     const dateObject = new Date(dateString);
    //     const options = { weekday: 'short', day: '2-digit', month: 'short' };
    //     return dateObject.toLocaleString('en-US', options);
    // });
    // console.log("Check Date",formattedDate);
    // console.log('datesArray = ', x)
  }, [])


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
  console.log('totalHours = ', totalHours)
  // for (let i = 0; i < Array.length; i++){
  //   const subArray 
  // }

  // const options = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       ticks: {
  //         callback: function (value) {
  //           console.log('durationsArray = ',durationsArray)
  //           console.log("gyhj",durationsArray,value)
  //           console.log('value = ',value)
  //           const hours = Math.round(value / 3600);
  //           console.log('hours = ',hours)
  //           return `${hours}h`;
  //         },
  //       },
  //     },
  //   },
  // };
  console.log(durationsArray)
  return (
    <div className="chartContainer px-10">
      <div className="text-left w-full mb-10 font-semibold text-l text-gray-600">
        <span>Dashboard</span>
      </div>
      <div className="DayBar w-full bg-gray-300 p-1 px-4 flex justify-between">
        <h1 className="text-gray-600 ">Today</h1>
        <h1 className=" text-gray-600 text-bold "> Total: {formatTime(totalHours)}</h1>
      </div>
      <div className="dataCard trackerCard shadow-2xl ">
        <Bar
          data={{
            labels: [...labels],
            datasets: [
              {
                label: "Hours",
                data: [... new Array(12)].map((i,ind)=>ind+1),
                backgroundColor: ["#00a8b2"],
              },
            ],
          }}
          // options={options}
        />
      </div>
    </div>
  );
};

export default Dashboard;





