// Menu page
//
exports.View =
{
    title: "Synchro Samples",
    elements: 
    [
        { control: "stackpanel", width: "*", contents: [
            { control: "border", border: "Red", horizontalAlignment: "Center", borderThickness: 10, cornerRadius: 15, padding: { top: 15, bottom: 15, left: 50, right: 50 }, margin: { top: 10, bottom: 25 }, background: "Blue", contents: [
                { control: "image", width: 150, height: 150, resource: "{imgCloud}" },
            ]
            },
            { control: "button", caption: "{caption}", binding: { foreach: "pages", command: "goToView", view: "{view}" } },
        ] }
    ]
}

exports.InitializeViewModel = function (context, session)
{
    var viewModel =
    {
        imgCloud: Synchro.getResourceUrl(context, "cloud_system_256.png"),
        pages: [
            { caption: "Hello World", view: "hello" },
            { caption: "Login Sample", view: "login" },
            { caption: "Twitter Sample", view: "tweet" },
            { caption: "Click Counter Sample", view: "counter" },
            { caption: "Countdown Sample", view: "countdown" },
            { caption: "Lights Out", view: "game" },
            { caption: "Game of 15", view: "game2" },
            { caption: "Movies", view: "react" },
            { caption: "Image", view: "image" },
            { caption: "Canvas", view: "canvas" },
            { caption: "Text Layout", view: "textlayout" },
            { caption: "Movies2", view: "react2" },
            { caption: "Location Sample", view: "location" },
            { caption: "Launch URL", view: "launchurl" },
            { caption: "Styles", view: "styles" },
            { caption: "Toggle", view: "toggle" },
            { caption: "Button", view: "button" },
            { caption: "ListView", view: "listview" },
            { caption: "Device", view: "device" },
            { caption: "Auto-Complete", view: "autocomplete" },
            { caption: "List Sample", view: "list" },
            { caption: "List Click", view: "listclick" },
            { caption: "Contacts", view: "contacts" },
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
