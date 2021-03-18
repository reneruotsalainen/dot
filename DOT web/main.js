let STUDYTIME;
let BREAKLENGTH;
let BREAKCOUNT;
let STUDYLENGTH;

$(document).ready(function(){
        $.getJSON("db.json", function(json) {
        Object.entries(json).forEach(([key, value]) => {
            let list = [];
            Object.entries(value).forEach(([key, value]) => {
                list.push(value);
            }); 
            barChart(list); 
            avgBreakCount(list);
            avgBreakLength(list);
        });  
        
        $.getJSON("breakLengthDB.json", function(json) {
            Object.entries(json).forEach(([key, value]) => {
                let avgBreakLengths = [];
                Object.entries(value).forEach(([key, value]) => {
                    avgBreakLengths.push(value);
                }); 
                avgStudyTimeBetweenBreaks(avgBreakLengths);
            }); 
        }); 
    });  
});

//Makes visualization of days and studytimes. Chart can be changed in type:"bar" section
function barChart(studyTimes){

    let days = [];
    let times = [];
    let backgroundColors = []
    for (let i = 0; i < studyTimes.length; i++){
        days.push(studyTimes[i].paiva.toString());
        let tmp = (studyTimes[i].Opiskeluaika)/60
        times.push(tmp.toFixed(2));
        backgroundColors.push("rgba(255,0,0,0.5)");
    }

    avgStudyTime(times);
    

    let myChart = document.getElementById("barChart").getContext("2d");
    let barChart = new Chart(myChart, {
        type:"bar", //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels:days,
            
            datasets:[{
                label:"Studytime",
                data:times,  
                backgroundColor:backgroundColors
            }]
        },
        options:{
            title:{
                display:true,
                text:"Daily studytime"
            },
            legend:{
                display:false,
            },
            scales:{
                xAxes:[{
                    display: true,
                    scaleLabel:{
                        display: true,
                        labelString: "Date"
                    }
                }],
                yAxes:[{
                    display: true,
                    ticks: {
                        min: 0
                    },
                    scaleLabel:{
                        display: true,
                        labelString: "Minutes"
                    }
                }],
            }
        }
    });
}

function avgStudyTimeBetweenBreaks(studyTimes){
    let breaks = [];
    for (let i = 0; i < studyTimes.length; i++){
        breaks.push(studyTimes[i].Taukojen_valit.toString());
    }
    console.log
    let breaksString = breaks[0].split(",");
   
    const arrInteger = breaksString.map(x => Number.parseInt(x, 10));
    let avg = 0;
    for (let i = 0; i < arrInteger.length; i++){
        avg += arrInteger[i];
    }
    avg = Math.round((avg/arrInteger.length)/60)
    STUDYLENGTH = avg;
    
    if(STUDYLENGTH > 120){
        document.getElementById("avgBreakTimeBetween").innerHTML=avg.toString() + " Minutes <br><br> <i>You should take breaks more often</i>";
    }else if (STUDYLENGTH < 30){
        document.getElementById("avgBreakTimeBetween").innerHTML=avg.toString() + " Minutes <br><br> <i>You might take breaks too often!</i>";
    }
    else{
        document.getElementById("avgBreakTimeBetween").innerHTML=avg.toString() + " Minutes";
    }
    
}

function avgBreakCount(studyTimes){
    let breakCount = [];
    for (let i = 0; i < studyTimes.length; i++){
        breakCount.push(parseInt(studyTimes[i].Taukojen_lkm))
    }
    let avg = 0;
    for (let i = 0; i < breakCount.length; i++){
        avg += breakCount[i];
    }
    avg = Math.floor(avg/breakCount.length);
    BREAKCOUNT = avg;
    //avg = 1;
    if (BREAKCOUNT <= 1){
        document.getElementById("avgBreakCount").innerHTML=avg.toString() + "<br><br> <i>You should take more breaks!</i>";
    }else if (BREAKCOUNT > 8){
        document.getElementById("avgBreakCount").innerHTML=avg.toString() + "<br><br> <i>You might take too much breaks!</i>";
    }
    else{
        document.getElementById("avgBreakCount").innerHTML=avg.toString();
    } 
    
}

function avgStudyTime(studyTimes){
    const arrInteger = studyTimes.map(x => Number.parseInt(x, 10));
    let avg = 0;
    for (let i = 0; i < arrInteger.length; i++){
        avg += arrInteger[i];
    }
    avg = Math.round(avg/arrInteger.length)
    STUDYTIME = avg;
    //STUDYTIME = 80;
    if (STUDYTIME > 540){
        document.getElementById("avgStudyTime").innerHTML=avg.toString() + " Minutes <br><br> <i>You might study too much!</i>";
    }else if(STUDYTIME < 60){
        document.getElementById("avgStudyTime").innerHTML=avg.toString() + " Minutes <br><br> <i>You should check your the length of your studytimes!</i>";
    }else{
        document.getElementById("avgStudyTime").innerHTML=avg.toString() + " Minutes";
    }  
}

function avgBreakLength(studyTimes){
    let breaks = [];

    for (let i = 0; i < studyTimes.length; i++){
        breaks.push(studyTimes[i].Taukojen_pituudet)
    }

    let breakLengths = [];
    for (const [key, value] of Object.entries(breaks)) {
        breakLengths.push(value.toString());
    }
    let strBreakLengths = breakLengths.toString();
    breakLengths = [];
    breakLengths = strBreakLengths.split(",")

    let integerBreakLengths = [];
    let i = 0;
    while (i < breakLengths.length){
        if(i >= breakLengths.length){
            break;
        }else{
            integerBreakLengths.push(parseInt(breakLengths[i]));
            i = i + 3;
        }    
    }

    let avg = 0;
    for (let i = 0; i < integerBreakLengths.length; i++){
        avg += integerBreakLengths[i];
    }
    avg = Math.round(avg/integerBreakLengths.length)
    BREAKLENGTH = avg;
    if(BREAKLENGTH > 30){
        document.getElementById("avgBreakTime").innerHTML=avg.toString() + " Minutes <br><br> <i>You might taking too long breaks!</i>";
    }else if (BREAKLENGTH < 5){
        document.getElementById("avgBreakTime").innerHTML=avg.toString() + " Minutes <br><br> <i>You breaks might be too short!</i>";
    }
    else{
        document.getElementById("avgBreakTime").innerHTML=avg.toString() + " Minutes";
    } 
}