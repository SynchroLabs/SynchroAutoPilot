// More Samples Menu page
//
exports.View =
{
    title: "More Samples",
    elements: 
    [
        { control: "stackpanel", width: "*", contents: [
            { control: "text", width: "*", value: "These samples are a little nerdier, and are intended to demonstrate how to use various controls and programming techniques in the Synchro environment." },
            { control: "button", caption: "{caption}", binding: { foreach: "pages", command: "goToView", view: "{view}" } },
        ] }
    ]
}

exports.InitializeViewModel = function (context, session)
{
    var viewModel =
    {
        pages: [
            { caption: "Login", view: "login" },
            { caption: "Countdown", view: "countdown" },
            { caption: "Image", view: "image" },
            { caption: "Canvas", view: "canvas" },
            { caption: "Text Layout", view: "textlayout" },
            { caption: "Movies2", view: "react2" },
            { caption: "Location", view: "location" },
            { caption: "Launch URL", view: "launchurl" },
            { caption: "Styles", view: "styles" },
            { caption: "Toggle", view: "toggle" },
            { caption: "Button", view: "button" },
            { caption: "ListView", view: "listview" },
            { caption: "Device", view: "device" },
            { caption: "Listbox", view: "list" },
            { caption: "List Click", view: "listclick" },
            { caption: "StackPanel", view: "stack" },
            { caption: "WrapPanel", view: "wrap" },
            { caption: "Border", view: "layout" },
            { caption: "Default Layout", view: "default" },
            { caption: "Fill", view: "fill" },
            { caption: "Flex", view: "flex" },
            { caption: "Flex 2", view: "flexflex" },
            { caption: "Flex 3", view: "flex3" },
            { caption: "Text Flow", view: "textflow" },
            { caption: "Image Scale", view: "imagescale" },
            { caption: "Font", view: "font" },
            { caption: "Binding", view: "binding" },
            { caption: "Picker", view: "picker" },
            { caption: "Webview", view: "webview" },
            { caption: "Sandbox", view: "sandbox" },
        ]
    }
    return viewModel;
}

exports.Commands = 
{
    goToView: function(context, session, viewModel, params)
    {
        return Synchro.pushAndNavigateTo(context, params.view);
    },
}
