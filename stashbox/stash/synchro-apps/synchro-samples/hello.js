// Hello page
//
exports.View =
{
    title: "Hello World",
    elements:
    [
        { control: "text", value: "Enter your name:", font: { size: 12, bold: true } },

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "First name:", fontsize: 12, width: 200, verticalAlignment: "Center", textAlignment: "Right" },
            { control: "edit", fontsize: 12, width: 200, verticalAlignment: "Center", binding: "firstName" },
        ] },
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Last name:", fontsize: 12, width: 200, verticalAlignment: "Center", textAlignment: "Right" },
            { control: "edit", fontsize: 12, width: 200, verticalAlignment: "Center", binding: "lastName" },
        ] },

        { control: "text", value: "Hello {firstName} {lastName}", fontsize: 12, width: "*" },

        { control: "rectangle", width: "*", height: 5, color: "Black" },
        { control: "text", value: "This sample app demonstrates Synchro data binding.  No procedural code is required to update the greeting from the first and last name controls.", width: "*" },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        firstName: "Planet",
        lastName: "Earth",
    }
    return viewModel;
}
