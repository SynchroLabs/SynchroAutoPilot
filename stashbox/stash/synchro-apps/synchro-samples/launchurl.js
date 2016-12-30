// Launch URL
//
exports.View =
{
    title: "Launch URL",
    elements:
    [
        { control: "text", value: "Primary URL", fontsize: 12, margin: { bottom: 0 } },
        { control: "edit", binding: "primary", width: 320 },
        { control: "text", value: "Secondary URL", fontsize: 12, margin: { bottom: 0 } },
        { control: "edit", binding: "secondary", width: 320 },
        { control: "button", caption: "Launch", width: 125, binding: "launch" },
    ]
}

exports.InitializeViewModel = function (context, session)
{
    var viewModel =
    {
        primary: "",
        secondary: "",
    }
    return viewModel;
}

exports.Commands = 
{
    launch: function (context, session, viewModel)
    {
        return Synchro.launchUrl(context, viewModel.primary, viewModel.secondary);
    },
}
