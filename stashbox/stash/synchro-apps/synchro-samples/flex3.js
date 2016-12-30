// Flex 3 page
//
exports.View =
{
    title: "Flex 3",
    elements:
    [
        { control: "stackpanel", orientation: "Vertical", height: "*", width: "*", contents: [
            { control: "wrappanel", orientation: "Horizontal", width: "*", contents: [
                { control: "toggle", binding: "showRed", caption: "Show Red", onLabel: "Showing", offLabel: "Hiding", fontsize: 12 },
                { control: "toggle", binding: "showBlue", caption: "Show Blue", onLabel: "Showing", offLabel: "Hiding", fontsize: 12 },
            ] },
            { control: "rectangle", height: "*", width: "*", color: "Red", margin: 0, visibility: "{showRed}" },
            { control: "rectangle", height: "*", width: "*", color: "Blue", margin: 0, visibility: "{showBlue}" },
        ] }
    ]
}

exports.InitializeViewModel = function (context, session) 
{
    var viewModel =
    {
    	showRed: true,
    	showBlue: true
    }
    return viewModel;
}
