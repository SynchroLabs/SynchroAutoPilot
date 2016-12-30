// Countdown page
//
exports.View =
{
    title: "Countdown",
    elements: 
    [
        { select: "First", contents: [
            { filter: { deviceMetric: "os", is: "Web" }, control: "stackpanel", orientation: "Vertical", visibility: "{isLoading}", contents: [
                { control: "progressring", width: 300, value: "{isLoading}", verticalAlignment: "Center" },
                { control: "text", value: "Loading...", foreground: "Red", font: { size: 24, bold: true }, verticalAlignment: "Center" },
            ] },
            { control: "stackpanel", orientation: "Horizontal", visibility: "{isLoading}", contents: [
                { control: "progressring", height: 50, width: 50, value: "{isLoading}", verticalAlignment: "Center" },
                { control: "text", value: "Loading...", foreground: "Red", font: { size: 24, bold: true }, verticalAlignment: "Center" },
            ] },
        ] },
        { control: "stackpanel", orientation: "Vertical", visibility: "{!isLoading}", contents: [
            { control: "text", value: "Count: {count}", foreground: "Green", font: { size: 24, bold: true } },
            { control: "progressbar", value: "{count}", minimum: 0, maximum: 10, width: 300 },
            { control: "button", caption: "Start Countdown", binding: "start", visibility: "{!isCounting}" },
            { control: "button", caption: "Pause Countdown", binding: "stop", visibility: "{isCounting}" },
        ] }
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        count: 0,
        isLoading: true,
        isCounting: false
    }
    return viewModel;
}

exports.LoadViewModel = function * (context, session, viewModel)
{
    yield Synchro.yieldAwaitable(context, function(callback){ waitInterval(4000, callback) });;
    viewModel.count = 10;
    viewModel.isLoading = false;
}

function waitInterval(intervalMillis, callback)
{
    setTimeout(function(){callback()}, intervalMillis);
}

exports.Commands = 
{
    start: function * (context, session, viewModel, params)
    {
        viewModel.isCounting = true;

        while (viewModel.isCounting && (viewModel.count > 0))
        {
            yield Synchro.yieldAwaitable(context, function(callback){ waitInterval(1000, callback) });;
            if (viewModel.isCounting)
            {
                viewModel.count--;
                yield Synchro.interimUpdateAwaitable(context);
            }
        }

        viewModel.isCounting = false;
    },
    stop: function(context, session, viewModel, params)
    {
        viewModel.isCounting = false;
    },
}