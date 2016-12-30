// Login page
//
exports.View =
{
    title: "Login",
    elements:
    [
        { control: "text", value: "Login", font: { size: 16 }, margin: { bottom: 16 } },
        { control: "text", value: "Username", fontsize: 12, margin: { bottom: 0 } },
        { control: "edit", binding: "username", placeholder: "username", width: 200 },
        { control: "text", value: "Password", fontsize: 12, margin: { bottom: 0 } },
        { control: "password", binding: "password", placeholder: "password", width: 200 },
        { control: "button", caption: "Login", icon: "perm_identity", width: 125, binding: "login" },
        { control: "toggle", binding: "showPassword", caption: "Show Password", onLabel: "Showing", offLabel: "Hiding", fontsize: 12 },
        { control: "text", value: "Password: {password}", fontsize: 12, visibility: "{showPassword}" },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        username: "",
        password: "",
        showPassword: false
    }
    return viewModel;
}

exports.Commands = 
{
    login: function(context, session, viewModel)
    {
        if (viewModel.username && (viewModel.username == viewModel.password))
        {
            session.username = viewModel.username;
            var messageBox = 
            {
                title: "Winner",
                message: "Congrats {username}, you succeeded!  Now on the Counter app...",
                options:
                [
                    { label: "Ok", command: "success" },
                    { label: "Cancel" },
                ]
            }
            return Synchro.showMessage(context, messageBox);
        }
        else
        {
            return Synchro.showMessage(context, { message: "Sorry, login failed!" });
        }
    },
    success: function(context)
    {
        return Synchro.navigateTo(context, "counter");
    },
}
