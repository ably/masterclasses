var choiceOne = 0, choiceTwo = 0, choiceThree = 0, choiceFour = 0;
// Init Ably library
var realtime = new Ably.Realtime({key: '<YOUR-ABLY-API-KEY>'});
// Attach to a channel
var myVotingChannel = realtime.channels.get('voting-channel');


// Preparing the chart data
const chartData = [
    {
      label: "Cheeky Child",
      value: choiceOne
    },
    {
      label: "Tormented Teenager",
      value: choiceTwo
    },
    {
      label: "Mad Midlifer",
      value: choiceThree
    },
    {
      label: "Groovy Grandparent",
      value: choiceFour
    }
  ];
// Chart configuration
const chartConfig = {
    type: "pie2d",
    renderAt: 'chart-container',
    id: 'vote-chart',
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
        "chart": {
            "caption": "If age is only a state of mind",
            "subCaption": "Which category best describes YOUR state of mind right now?",
            "theme": "fusion",
        },
        "data": chartData
    }
};

// Render the chart
FusionCharts.ready(function(){
    var fusioncharts = new FusionCharts(chartConfig);
    fusioncharts.render();
});

//Subscribe to the voting channel
myVotingChannel.subscribe('vote', (msg)=>{
    console.log(msg.data);
    switch(msg.data){
        case "1": choiceOne++;
        break;
        case "2": choiceTwo++;
        break;
        case "3": choiceThree++;
        break;
        case "4": choiceFour++;
        break;
        default: console.log('something broke, it wasnt me');
    };
    //Re-render an already rendered chart with new data
    FusionCharts.items['vote-chart'].setJSONData({
        "chart": {
            "caption": "If age is only a state of mind",
            "subCaption": "Which category best describes YOUR state of mind right now?",
            "theme": "fusion",
        },
        "data": [
            {
              label: "Cheeky Child",
              value: choiceOne
            },
            {
              label: "Tormented Teenager",
              value: choiceTwo
            },
            {
              label: "Mad Midlifer",
              value: choiceThree
            },
            {
              label: "Groovy Grandparent",
              value: choiceFour
            }
          ]
    });
});