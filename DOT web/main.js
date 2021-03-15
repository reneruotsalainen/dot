
$(document).ready(function(){
        $.getJSON("db.json", function(json) {
        Object.entries(json).forEach(([key, value]) => {
            let list = [];
            Object.entries(value).forEach(([key, value]) => {
                list.push(value);

                $("#data").append(JSON.stringify(value, null, 4)) 
                $("#data").append("<br>"); 
            }); 
            barChart(list); 
            otherChart(list);
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
        times.push(parseInt(studyTimes[i].Opiskeluaika)/60);
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

function otherChart(studyTimes){

}