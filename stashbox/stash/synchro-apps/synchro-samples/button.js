// Hello page
//
exports.View =
{
    title: "Buttons",
    elements:
    [
        { control: "button", caption: "Button", foreground: "CornflowerBlue", background: "Black", binding: "text" },
        { control: "button", resource: "{imgCloud}", width: 125, height: 125, binding: "image" },

        { control: "button", icon: "star", caption: "Like", binding: "text" },
        { control: "button", borderless: true, icon: "thumb_up", caption: "Like", binding: "text" },
        { control: "button", icon: "xxxx", caption: "Bad Icon", binding: "text" },

        { control: "text", value: "{message}", fontsize: 12 },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        imgCloud: Synchro.getResourceUrl(context, "cloud_system_256.png"),
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
    text: function * (context, session, viewModel)
    {
        viewModel.message = "Caption button";
        yield Synchro.interimUpdateAwaitable(context);
        yield Synchro.yieldAwaitable(context, function(callback){ waitInterval(1000, callback) });;
        viewModel.message = "";
    },
    image: function * (context, session, viewModel)
    {
        viewModel.message = "Image button";
        yield Synchro.interimUpdateAwaitable(context);
        yield Synchro.yieldAwaitable(context, function(callback){ waitInterval(1000, callback) });;
        viewModel.message = "";
    },
}
