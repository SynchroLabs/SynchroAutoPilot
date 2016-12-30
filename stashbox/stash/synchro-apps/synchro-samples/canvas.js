// Image scaling page
//
exports.View =
{
    title: "Canvas",
    elements:
    [
        { control: "canvas", width: "*", height: "300", contents: [
            { control: "rectangle", width: "100", height: "100", left: "{redLeft}", top: "{redTop}", color: "Red", margin: 0, binding: "redTapped" },
            { control: "rectangle", width: "100", height: "100", left: "100", top: "100", color: "Green", margin: 0, binding: "greenTapped" },
        ] },
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Red Left", fontsize: 10, width: 140, verticalAlignment: "Center" },
            { control: "slider", minimum: 0, maximum: 200, binding: "redLeft", width: 300, verticalAlignment: "Center" },
        ] },
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Red Top", fontsize: 10, width: 140, verticalAlignment: "Center" },
            { control: "slider", minimum: 0, maximum: 200, binding: "redTop", width: 300, verticalAlignment: "Center" },
        ] },
        { control: "text", value: "{message}", fontsize: 12, visibility: "{message}" },
    ]
}

exports.InitializeViewModel = function (context, session)
{
    var viewModel =
    {
        redLeft: 50,
        redTop: 50,
        message: null
    }
    return viewModel;
}

function waitInterval(intervalMillis, callback)
{
    setTimeout(function(){callback()}, intervalMillis);
}

exports.Commands =
{
    redTapped: function * (context, session, viewModel)
    {
        viewModel.message = "Red tapped";
        yield Synchro.interimUpdateAwaitable(context);
        yield Synchro.yieldAwaitable(context, function(callback){ waitInterval(1000, callback) });;
        viewModel.message = "";
    },
    greenTapped: function * (context, session, viewModel)
    {
        viewModel.message = "Green tapped";
        yield Synchro.interimUpdateAwaitable(context);
        yield Synchro.yieldAwaitable(context, function(callback){ waitInterval(1000, callback) });;
        viewModel.message = "";
    },
}
