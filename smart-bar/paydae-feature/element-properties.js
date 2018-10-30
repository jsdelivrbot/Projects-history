window.elementProperties  = [
    {
        id: "first-div",
        html: {
            element: "input",
            value: "First button",
            handlers:{
                onclick: function (e) {
                    let result = statistic.filter(function( element ){
                        return  element.id == e.target.name;
                    });
                    result[0].clicks++;
                },
                onMouseOver: function (e) {
                    let result = statistic.filter(function( element ){
                        return  element.id == e.target.name;
                    });
                    result[0].overs++;
                }
            },
            type: "button"
        },
        start_time: Date.now(),
        end_time: Date.now() + 6000
    },
    {
        id: "second-div",
        html: {
            element: "button",
            handlers:{
                onclick: function (e) {
                    let result = statistic.filter(function( element ){
                        return  element.id == e.target.name;
                    });
                    result[0].clicks++;

                },
                onMouseOver: function (e) {
                    let result = statistic.filter(function( element ){
                        return  element.id == e.target.name;
                    });
                    result[0].overs++;
                }},
            type: "button",
            className: "second-div",
            innerHTML: "Second button",

        },
           mutableProperties: {
               color: {
                   current: "red",
                   start_time: Date.now() + 7000,
                   end_time: Date.now() + 8000,
                   new: "yellow"
               }
            },
             start_time: Date.now() + 5000,
             end_time: Date.now() + 10000
    }];