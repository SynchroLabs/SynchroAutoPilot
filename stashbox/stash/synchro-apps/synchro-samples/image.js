// Image page
//
exports.View =
{
    title: "Image",
    elements:
    [
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Size", fontsize: 10, width: 140, verticalAlignment: "Center" },
            { control: "slider", minimum: 10, maximum: 400, binding: "size", width: 300, verticalAlignment: "Center" },
            ]
        },
        { control: "image", resource: "{imgUser}", height: "{size}", width: "{size}", binding: { command: "imageTapped", count: "{nextTap}" } },
        { control: "text", value: "{message}", fontsize: 12, visibility: "{message}" },
    ]
}

exports.InitializeViewModel = function (context, session)
{
    var viewModel =
    {
        imgUser: Synchro.getResourceUrl(context, "user.png"),
        size: 100,
        nextTap: 1,
        message: null,
    }
    return viewModel;
}

function waitInterval(intervalMillis, callback)
{
    setTimeout(function(){callback()}, intervalMillis);
}

exports.Commands =
{
    imageTapped: function * (context, session, viewModel, params)
    {
        // We don't really need the count as a param from the tap command (since we have it the viewModel), we're just testing param
        // passing on image tap.
        //
        viewModel.message = "Image tapped: " + params.count;
        var thisTap = ++viewModel.nextTap;
        yield Synchro.interimUpdateAwaitable(context);
        yield Synchro.yieldAwaitable(context, function(callback){ waitInterval(1000, callback) });;
        if (thisTap == viewModel.nextTap)
        {
            // If no other taps came in during the wait, then let's clear the message...
            viewModel.message = "";
        }
    },
}
