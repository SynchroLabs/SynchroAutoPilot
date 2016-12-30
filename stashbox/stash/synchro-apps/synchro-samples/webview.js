// Webview page
//
exports.View =
{
    title: "Webview",
    elements:
    [
        { control: "border", border: "Blue", borderThickness: "5", contents: [
            { control: "webview", width: 400, height: 200, contents: "<h1>Local Content</h1><i>This is <b>local</b> content</i>" },
        ] },

        { control: "border", border: "Blue", borderThickness: "5", contents: [
            { control: "webview", width: 400, height: 200, url: "http://www.google.com" },
        ] },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
    }
    return viewModel;
}
