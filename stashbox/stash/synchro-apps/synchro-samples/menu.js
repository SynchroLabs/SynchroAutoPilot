// Menu page
//
exports.View =
{
    title: "Synchro Samples",
    elements: 
    [
        { control: "stackpanel", width: "*", contents: [
            { control: "border", width: "*", horizontalAlignment: "{align}", background: "White", contents: [
                { control: "image", width: 400, horizontalAlignment: "{align}", resource: "{imgSynchro}" }
            ] },
            { control: "text", width: "*", textAlignment: "{align}", value: "The apps below are running on the Synchro platform under Node.js.  Not only are they served from the cloud, they actually run there as well!" },
            { control: "button", horizontalAlignment: "{$root.align}", icon: "{icon}", caption: "{caption}", width: 300, binding: { foreach: "pages", command: "goToView", view: "{view}" } },
        ] }
    ]
}

exports.InitializeViewModel = function (context, session)
{
    var viewModel =
    {
        imgSynchro: Synchro.getResourceUrl(context, "synchro-800x140.png"),
        pages: [
            { caption: "Hello World", view: "hello", icon: "pan_tool" },
            { caption: "Twitter", view: "tweet", icon: "chat" },
            { caption: "Click Counter", view: "counter", icon: "add_box" },
            { caption: "Lights Out", view: "game", icon: "lightbulb_outline" },
            { caption: "Game of 15", view: "game2", icon: "grid_on" },
            { caption: "Movies", view: "react", icon: "movie" },
            { caption: "Auto-Complete", view: "autocomplete", icon: "spellcheck" },
            { caption: "Contacts", view: "contacts", icon: "contacts" },
            { caption: "More Samples", view: "menu2", icon: "more_horiz" },
        ]
    }

    exports.OnViewMetricsChange(context, session, viewModel, Synchro.getMetrics(context));

    return viewModel;
}

exports.OnViewMetricsChange = function (context, session, viewModel, metrics)
{ 
    console.log("view metrics change");
    viewModel.align = metrics.ViewMetrics.orientation.toLowerCase() ==  "portrait" ? "Center" : "Left";
}

exports.Commands = 
{
    goToView: function(context, session, viewModel, params)
    {
        return Synchro.pushAndNavigateTo(context, params.view);
    },
}
