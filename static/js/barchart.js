
// d3.csv("../static/csv/merged_data.csv")
d3.json("/merged_data").then(function (schoolData) {

    let inStateTuition = 'in_state_tuition';

    let privates = [], publics = []

    schoolData.forEach(row => {
        // console.log(row)
        if (row.type === 'Private') {
            privates.push({ x: row.type, y: row[inStateTuition] })
        }
        else if (row.type === 'Public') {
            publics.push({ x: row.type, y: row[inStateTuition] })
        }


    });

    // console.log([privates, publics])

    let privateSum = privates.length
    // console.log(privateSum)

    let publicSum = publics.length
    // console.log(publicSum)

    let totalData = schoolData.length
    // console.log(totalData)

    //IN & OUT STATE AVG TUITION FOR PRIVATE AND PUBLIC

    function selectPrivate(school) {
        return school.type === 'Private'
    }

    // console.log(selectPrivate)

    let privateSchools = schoolData.filter(selectPrivate)
    // console.log(privateSchools)

    let privateTuition = privateSchools.map(d => d.in_state_tuition)
    // console.log(privateTuition)

    let outStatePrivateTuition = privateSchools.map(d => d.out_of_state_tuition)
    // console.log(outStatePrivateTuition)

    let totalOutStatePrivateTuitions = privateSchools.map(d => d.out_of_state_total)
    // console.log(totalOutStatePrivateTuitions)

    //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    let totalPrivateTuition = privateTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    // console.log(totalPrivateTuition)

    let totalOutStatePrivateTuition = outStatePrivateTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    // console.log(totalOutStatePrivateTuition)

    let totalOutStatePrivTuition = totalOutStatePrivateTuitions.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    // console.log(totalOutStatePrivTuition)

    function selectPublic(school) {
        return school.type === 'Public'
    }
    let publicSchools = schoolData.filter(selectPublic)
    // console.log(publicSchools)

    let publicTuition = publicSchools.map(d => d.in_state_tuition)
    // console.log(publicTuition)

    let outStatePublicTuition = publicSchools.map(d => d.out_of_state_tuition)
    // console.log(outStatePublicTuition)

    let totalOutStatePublicTuition = publicSchools.map(d => d.out_of_state_tuition)
    // console.log(totalOutStatePublicTuition)

    //syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    let totalPublicTuition = publicTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    // console.log(totalPublicTuition)

    let sumOutStatePublicTuition = outStatePublicTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    // console.log(sumOutStatePublicTuition)

    let totalSumOutStatePublicTuition = totalOutStatePublicTuition.reduce(
        function (t, s) {
            return parseInt(t) + parseInt(s);
        }
    );

    // console.log(totalSumOutStatePublicTuition)

    let avgPrivateTuition = Math.round(totalPrivateTuition / totalData)
    // console.log(avgPrivateTuition)

    let avgPublicTuition = Math.round(totalPublicTuition / totalData)
    // console.log(avgPublicTuition)

    let outStateAvgPrivateTuition = Math.round(totalOutStatePrivateTuition / totalData)
    // console.log(outStateAvgPrivateTuition)


    let outStateAvgPublicTuition = Math.round(sumOutStatePublicTuition / totalData)
    // console.log(outStateAvgPublicTuition)
    

    //chart.js

    var ctx = document.getElementById('myChart').getContext('2d');
    var chartjs = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['Private & Public'],
            datasets: [{
                label: 'Private',
                // type: 'bar',
                backgroundColor: '#00008B',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                data: [privateSum, totalData],
                order: 1
            },
            {
                label: 'Public',
                // type: 'bar',
                backgroundColor: '#B8860B',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'red',
                data: [publicSum],
                order: 2
            },
            ]
        },


        // Configuration options go here
        options: {
            tooltips: {
                mode: 'index',
            },
            title: {
                display: true,
                text: 'Number of Public & Private Schools',
                fontSize: 15
            },
            legend: {
                position: 'right',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    bottom: 0,
                    top: 0
                }
            },

        }
    });

    var ctx = document.getElementById('myChart2').getContext('2d');
    var chartjs = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['In-State', 'Out-State'],
            datasets: [{
                label: 'Private',
                // type: 'bar',
                backgroundColor: '#00FFFF',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'green',
                data: [avgPrivateTuition, outStateAvgPrivateTuition],
                order: 1
            },
            {
                label: 'Public',
                // type: 'bar',
                backgroundColor: '#7FFFD4',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: 'red',
                data: [avgPublicTuition, outStateAvgPublicTuition],
                order: 3
            },
            
            ]
        },


        // Configuration options go here
        options: {
            tooltips: {
                mode: 'index',
            },
            title: {
                display: true,
                text: 'Avg Cost of In-State & Out-State Tuition for Public & Private Schools',
                fontSize: 15
            },
            legend: {
                position: 'right',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    bottom: 0,
                    top: 0
                }
            },

        }
    });
      
})