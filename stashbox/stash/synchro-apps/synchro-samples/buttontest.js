// Button test page (lots of variables/permutations)
//
exports.View =
{
    title: "Buttons",
    elements:
    [
        { control: "button", caption: "Button", foreground: "CornflowerBlue", background: "Black", binding: "text" },
        { control: "button", resource: "{imgCloud}", width: 125, height: 125, binding: "image" },

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Enabled:", fontsize: 10, verticalAlignment: "Center" },
            { control: "toggle", binding: "enabled", fontsize: 12, verticalAlignment: "Center" },
        ] },

        { control: "button", caption: "No icon", icon: "foo", binding: { command: "vary", amount: 1 } },

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "button", icon: "{buttonIcon}", caption: "{buttonCap}", binding: "text", enabled: "{enabled}", style: "btnStyle" },
            { control: "rectangle", color: "Red", width: "{spacerWidth}", height: "{spacerHeight}" },
            { control: "button", caption: "{buttonCap}", binding: "text", enabled: "{enabled}", style: "btnStyle" },
            { control: "rectangle", color: "Red", width: "{spacerWidth}", height: "{spacerHeight}" },
            { control: "button", icon: "{buttonIcon}", binding: "text", enabled: "{enabled}", style: "btnStyle" },
        ]},

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "button", width: 150, icon: "{buttonIcon}", caption: "{buttonCap}", binding: "text", enabled: "{enabled}", style: "btnStyle" },
            { control: "rectangle", color: "Red", width: "{spacerWidth}", height: "{spacerHeight}" },
            { control: "button", width: 150, caption: "{buttonCap}", binding: "text", enabled: "{enabled}", style: "btnStyle" },
            { control: "rectangle", color: "Red", width: "{spacerWidth}", height: "{spacerHeight}" },
            { control: "button", width: 75, icon: "{buttonIcon}", binding: "text", enabled: "{enabled}", style: "btnStyle" },
        ]},

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "button", borderless: true, icon: "{buttonIcon}", caption: "{buttonCap}", binding: "text", height: "{buttonHeight}", enabled: "{enabled}", style: "btnStyle" },
            { control: "rectangle", color: "Red", width: "{spacerWidth}", height: "{spacerHeight}"},
            { control: "button", borderless: true, caption: "{buttonCap}", binding: "text", height: "{buttonHeight}", enabled: "{enabled}", style: "btnStyle" },
            { control: "rectangle", color: "Red", width: "{spacerWidth}", height: "{spacerHeight}" },
            { control: "button", borderless: true, icon: "{buttonIcon}", binding: "text", height: "{buttonHeight}", enabled: "{enabled}", style: "btnStyle" },
        ]},

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "button", borderless: true, foreground: "Black", icon: "{buttonIcon}", caption: "{buttonCap}", binding: "text", height: "{buttonHeight}", enabled: "{enabled}", style: "btnStyle" },
            { control: "rectangle", color: "Red", width: "{spacerWidth}", height: "{spacerHeight}" },
            { control: "button", borderless: true, foreground: "White", caption: "{buttonCap}", binding: "text", height: "{buttonHeight}", enabled: "{enabled}", style: "btnStyle" },
            { control: "rectangle", color: "Red", width: "{spacerWidth}", height: "{spacerHeight}" },
            { control: "button", borderless: true, foreground: "Red", icon: "{buttonIcon}", binding: "text", height: "{buttonHeight}", enabled: "{enabled}", style: "btnStyle" },
        ]},

        { control: "text", value: "{message}", fontsize: 12 },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        enabled: true,
        buttonCap: "Like",
        buttonIcon: "thumb_up",
        buttonHeight: 45,
        spacerWidth: 25,
        spacerHeight: 60,
        btnStyle: { background: "Gray", xfontsize: 20 },
        imgCloud: Synchro.getResourceUrl(context, "cloud_system_256.png"),
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
