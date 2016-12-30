// Add Contact page
//
exports.View =
{
    title: "New Contact",
    elements:
    [
        { control: "stackpanel", orientation: "Vertical", contents: [
            { control: "text", value: "First Name:", width: 200, fontsize: 10 },
            { control: "edit", binding: "addFirst", width: 240 },
            { control: "text", value: "Last Name:", width: 200, fontsize: 10 },
            { control: "edit", binding: "addLast", width: 240 },
        ] },

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "button", caption: "Ok", binding: "add", enabled: "{addLast}" },
            { control: "button", caption: "Cancel", binding: "cancel" },
        ] },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        addFirst: "",
        addLast: "",
    }
    return viewModel;
}

exports.Commands = 
{
    add: function(context, session, viewModel)
    {
        session.addedContact = { first: viewModel.addFirst, last: viewModel.addLast };
        Synchro.pop(context);
    },
    cancel: function(context, session, viewModel)
    {
        Synchro.pop(context);
    },
}
