// Sandbox page
//
exports.View =
{
    title: "Sandbox",
    elements:
    [
        { control: "border", border: "Blue", borderthickness: "5", contents: [
            { control: "scrollview", orientation: "Horizontal", height: 150, width: 150, contents: [
                { control: "image", height: 300, width: 300, resource: "{image}" },
            ] },
        ] },

        { control: "image", height: 150, width: 150, resource: "{image}" },

        { control: "button", caption: "Switch images", binding: "switchImages" },

        { control: "text", value: "Container: {container}" },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        container: Synchro.getConfig(context, "container")
    }
    viewModel.image = switchImages(contect, session, viewModel);
    return viewModel;
}

exports.Commands =
{
    switchImages: function(context, session, viewModel)
    {
        var profileImage = Synchro.getResourceUrl(context, "cloud_system_256.png");
        var userImage =  Synchro.getResourceUrl(context, "user.png");

        if (viewModel.image == userImage)
        {
            viewModel.image = profileImage;
        }
        else
        {
            viewModel.image = userImage;
        }
    },
}
