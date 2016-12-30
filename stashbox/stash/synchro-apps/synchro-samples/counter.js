// Counter page
//
var util = require('./lib/util');

var fontStyle = 
{
    normal: { color: "Green", isBold: false },
    highlighted: { color: "Red", isBold: true }
}

exports.View =
{
    title: "Click Counter",
    elements: 
    [
        { control: "text", value: "Count: {count}", foreground: "{font.color}", font: { size: 24, bold: "{font.isBold}" } },
        { control: "button", caption: "Increment Count", binding: { command: "vary", amount: 1 } },
        { control: "button", caption: "Decrement Count", binding: { command: "vary", amount: -1 }, enabled: "{count}" },

        // Toolbar support for ther various platforms
        //
        { select: "First", contents: [
            { select: "All", filter: { deviceMetric: "os", is: ["Windows", "WinPhone"] }, contents: [
                { control: "commandBar.button", text: "Add", winIcon: "Add", commandBar: "Bottom", commandType: "Secondary", binding: { command: "vary", amount: 1 } },
                { control: "commandBar.button", text: "Subtract", winIcon: "Remove", commandBar: "Bottom", commandType: "Secondary", binding: { command: "vary", amount: -1 }, enabled: "{count}" },
                { control: "commandBar.button", text: "Reset", winIcon: "Delete", commandBar: "Bottom", binding: "reset" },
                ]
            },
            { select: "All", filter: { deviceMetric: "os", is: "Android" }, contents: [
                { control: "actionBar.item", text: "Add", binding: { command: "vary", amount: 1 } },
                { control: "actionBar.item", text: "Subtract", binding: { command: "vary", amount: -1 }, enabled: "{count}" },
                { control: "actionBar.item", text: "Reset", icon: "delete", showAsAction: "IfRoom", binding: "reset", enabled: "{count}" },
                ]
            },
            { select: "All", filter: { deviceMetric: "os", is: "iOS" }, contents: [
                { control: "navBar.button", systemItem: "Trash", binding: "reset", enabled: "{count}" },
                { control: "toolBar.button", text: "Add", icon: "add", binding: { command: "vary", amount: 1 } },
                { control: "toolBar.button", text: "Subtract", icon: "remove", binding: { command: "vary", amount: -1 }, enabled: "{count}" },
                ]
            },
            ]
        },
    ]
}

exports.InitializeView = function(context, session, viewModel, view)
{
    view.elements[0].value = "The count: {count}";
    return view;
}

exports.InitializeViewModel = function(context, session)
{
    session.count = session.count || 0; // Initialize if undefined
    console.log("Initializing count to: " + session.count);

    var viewModel =
    {
        count: session.count,
        font: (session.count < 10) ? fontStyle.normal : fontStyle.highlighted
    }
    return viewModel;
}

exports.OnViewModelChange = function(context, session, viewModel, source, changes)
{
    viewModel.font = (viewModel.count < 10) ? fontStyle.normal : fontStyle.highlighted; 
}

exports.Commands = 
{
    vary: function(context, session, viewModel, params)
    {
        viewModel.count = util.Vary(viewModel.count, params.amount);
    },
    reset: function(context, session, viewModel)
    {
        viewModel.count = 0;
    },
    exit: function(context, session, viewModel)
    {
        session.count = viewModel.count;
        console.log("Updated session count to: " + session.count);
        return Synchro.navigateToView(context, "menu");
    },
}

exports.OnBack = function(context, session, viewModel)
{
    Synchro.popTo(context, "menu");
    return true; // Nav handled
}
