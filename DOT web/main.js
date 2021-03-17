
$(document).ready(function(){
        $.getJSON("db.json", function(json) {
        Object.entries(json).forEach(([key, value]) => {
            let list = [];
            Object.entries(value).forEach(([key, value]) => {
                list.push(value);
                console.log(list)
                $("#data").append(JSON.stringify(value, null, 4)) 
                $("#data").append("<br>"); 
            }); 
            barChart(list); 
            avgBreakCount(list);
        });  

        $.getJSON("breakLengthDB.json", function(json) {
            Object.entries(json).forEach(([key, value]) => {
                let avgBreakLengths = [];
                Object.entries(value).forEach(([key, value]) => {
                    avgBreakLengths.push(value);
                    //console.log(avgBreakLengths);
                    $("#data").append(JSON.stringify(value, null, 4)) 
                    $("#data").append("<br>"); 
                }); 
                //barChart(list); 
                avgBreakTime(avgBreakLengths);
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
        times.push(tmp.toFixed(3));
        backgroundColors.push("rgba(255,0,0,0.5)");
    }

    let myChart = document.getElementById("barChart").getContext("2d");
    let barChart = new Chart(myChart, {
        type:"bar", //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels:days,
            
            datasets:[{
                label:"Opiskeluaika",
                data:times,  
                backgroundColor:backgroundColors
            }]
        },
        options:{
            title:{
                display:true,
                text:"Opiskeluaikasi päivittäin"
            },
            legend:{
                display:false,
            },
            scales:{
                xAxes:[{
                    display: true,
                    scaleLabel:{
                        display: true,
                        labelString: 'Päivämäärä'
                    }
                }],
                yAxes:[{
                    display: true,
                    ticks: {
                        min: 0
                    },
                    scaleLabel:{
                        display: true,
                        labelString: 'Minuutit'
                    }
                }],
            }
        }
    });
}

function avgBreakTime(studyTimes){
    let breaks = [];
    for (let i = 0; i < studyTimes.length; i++){
        breaks.push(studyTimes[i].Taukojen_valit.toString());
    }
    let breaksString = breaks[0].split(",");
   
    const arrInteger = breaksString.map(x => Number.parseInt(x, 10));
    let avg = 0;
    for (let i = 0; i < arrInteger.length; i++){
        avg += arrInteger[i];
    }
    avg = Math.round((avg/arrInteger.length)/60)
    document.getElementById("avgBreakTime").innerHTML=avg.toString() + " minuuttia";
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
    avg = avg/breakCount.length;
    document.getElementById("avgBreakCount").innerHTML=avg.toString();
}