// Toggle page
//
exports.View =
{
    title: "Toggle",
    elements:
    [
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Toggle:", fontsize: 10, width: 140 },
            { control: "toggle", binding: "toggleState", fontsize: 12 },
        ] },

        { filter: { deviceMetric: "os", is: ["Windows", "WinPhone"] }, control: "commandBar.toggle", text: "Favorite", icon: "Favorite", binding: { value: "toggleState", onToggle: "onToggle" } },
        { filter: { deviceMetric: "os", is: "Android" }, control: "actionBar.toggle", checkedicon: "star", uncheckedicon: "star_border", showAsAction: "IfRoom", binding: { value: "toggleState", onToggle: "onToggle" } },
        { filter: { deviceMetric: "os", is: "iOS" }, control: "navBar.toggle", checkedicon: "star", uncheckedicon: "star_border" , binding: { value: "toggleState", onToggle: "onToggle" } },
        { filter: { deviceMetric: "os", is: "Web" }, control: "imagetoggle", checkedresource: "{star}", uncheckedresource: "{starEmpty}", alt: "Toggle", binding: { value: "toggleState", onToggle: "onToggle" } },

        { control: "togglebutton", icon: "star", caption: "Favorite", alt: "Toggle", binding: { value: "toggleState", onToggle: "onToggle" } },
        { control: "togglebutton", checkedicon: "thumb_up", uncheckedicon: "thumb_down", checkedcaption: "Like", uncheckedcaption: "Hate", checkedcolor: "Green", uncheckedcolor: "Red", alt: "Toggle", binding: { value: "toggleState", onToggle: "onToggle" } },

        { control: "togglebutton", checkedicon: "thumb_up", uncheckedicon: "thumb_down", alt: "Toggle", binding: { value: "toggleState", onToggle: "onToggle" } },

        { control: "text", value: "Toggle state: {toggleState}" },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        toggleState: false, 
        star: Synchro.getResourceUrl(context, "star.png"),
        starEmpty: Synchro.getResourceUrl(context, "star-empty.png")
    }
    return viewModel;
}

exports.Commands =
{
    onToggle: function(context, session, viewModel, params)
    {
        console.log("Toggled");
    },
}
