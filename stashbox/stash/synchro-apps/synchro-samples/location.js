// Location page
//
exports.View =
{
    title: "Location",
    elements:
    [
        //{ control: "location", binding: "location" }, // movementThreshold: 100,
        //{ control: "location", binding: { value: "location", sync: "change" } },
        { control: "location", binding: { value: "location", onUpdate: { command: "locationChange", location: "{location.coordinate}" } } },
        
        { control: "stackpanel", orientation: "Vertical", contents: [
            { control: "text", value: "Status: {location.status}", fontsize: 12 },
            { control: "text", value: "Available: {location.available}", fontsize: 12 },
            { control: "text", value: "Lat: {location.coordinate.latitude}", visibility: "{location.coordinate}", fontsize: 12 },
            { control: "text", value: "Long: {location.coordinate.longitude}", visibility: "{location.coordinate}", fontsize: 12 },
            { control: "text", value: "Accuracy: {location.accuracy} meters", visibility: "{location.accuracy}", fontsize: 12 },
            { control: "text", value: "Heading: {location.heading}", visibility: "{location.heading}", fontsize: 12 },
            { control: "text", value: "Speed: {location.speed} meters/sec", visibility: "{location.speed}", fontsize: 12 },
        ] },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        location: null,
    }
    return viewModel;
}

exports.OnViewModelChange = function(context, session, viewModel, source, changes)
{
    if (source == "view")
    {
        console.log("UPDATE: Location change, location: " + JSON.stringify(viewModel.location, null, 4));
    }
}

exports.Commands =
{
    locationChange: function(context, session, viewModel, params)
    {
        console.log("COMMAND: Location change:", params.location);
    },
}
