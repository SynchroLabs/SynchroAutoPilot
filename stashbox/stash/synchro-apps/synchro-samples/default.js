// Default layout page
//
exports.View =
{
    title: "Default Layout",
    elements:
    [
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "rectangle", color: "Green", height: "50", width: "10" },
            { control: "rectangle", color: "Green", height: "50", width: "100" },
            { control: "rectangle", color: "Green", height: "50", width: "10" },
        ] },
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "rectangle", color: "Green", height: "*", width: "10" },
            { control: "text", value: "Name:", fontsize: 12, verticalAlignment: "Center", textAlignment: "Right" },
            { control: "edit", fontsize: 12, width: 200, verticalAlignment: "Center", binding: "name" },
            { control: "rectangle", color: "Green", height: "*", width: "10" },
        ] },
        { control: "rectangle", color: "Green", height: "10", width: "*" },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        name: "Name"
    }
    return viewModel;
}
