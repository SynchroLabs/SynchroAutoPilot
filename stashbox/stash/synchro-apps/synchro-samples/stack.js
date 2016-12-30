// Stackpanel page
//
exports.View =
{
    title: "StackPanel",
    elements:
    [
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Padding", fontsize: 10, width: 140, verticalAlignment: "Center" },
            { control: "slider", minimum: 0, maximum: 20, binding: "padding", width: 300, verticalAlignment: "Center" },
        ] },

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Margin", fontsize: 10, width: 140, verticalAlignment: "Center"  },
            { control: "slider", minimum: 0, maximum: 20, binding: "margin", width: 300, verticalAlignment: "Center" },
        ] },

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Orientation", fontsize: 10, verticalAlignment: "Center"  },
            { control: "picker", margin: { bottom: 10 }, verticalAlignment: "Center", 
                binding: { items: "orientations", selection: "orientation", onSelectionChange: { command: "setOrientation", orientation: "{$data}" } }
            }, 
        ] },

        { control: "stackpanel", orientation: "Horizontal", visibility: "{isHorizontal}", contents: [
            { control: "button", width: 135, caption: "Top", binding: { command: "setVAlign", align: "Top" } },
            { control: "button", width: 135, caption: "Center", binding: { command: "setVAlign", align: "Center" } },
            { control: "button", width: 135, caption: "Bottom", binding: { command: "setVAlign", align: "Bottom" } },
        ] },

        { control: "stackpanel", orientation: "Horizontal", visibility: "{!isHorizontal}", contents: [
            { control: "button", width: 135, caption: "Left", binding: { command: "setHAlign", align: "Left" } },
            { control: "button", width: 135, caption: "Center", binding: { command: "setHAlign", align: "Center" } },
            { control: "button", width: 135, caption: "Right", binding: { command: "setHAlign", align: "Right" } },
        ] },

        { control: "border", border: "Gray", borderThickness: "5", contents: [
            { control: "stackpanel", background: "Red", padding: "{padding}", orientation: "{orientation}", contents: [
                { control: "border", border: "Blue", borderThickness: "2", background: "LightBlue", height: 50, width: 125, margin: "{margin}", horizontalAlignment: "{alignContentH}", verticalAlignment: "{alignContentV}", contents: [
                    { control: "text", value: "Small", foreground: "Black", fontsize: 10, horizontalAlignment: "Center", verticalAlignment: "Center" },
                ]  },
                { control: "border", border: "Blue", borderThickness: "2", background: "LightBlue", height: 150, width: 250, margin: 0, contents: [
                    { control: "text", value: "Tall and Fat", foreground: "Black", fontsize: 10, horizontalAlignment: "Center", verticalAlignment: "Center" },
                ]  },
            ] },
        ] },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        padding: 0,
        margin: 0,
        orientation: "Horizontal",
        isHorizontal: true,
        alignContentH: "Left",
        alignContentV: "Top",
        orientations: ["Horizontal", "Vertical"]
    }
    return viewModel;
}

exports.Commands =
{
    setOrientation: function(context, session, viewModel, params)
    {
        viewModel.orientation = params.orientation;
        viewModel.isHorizontal = params.orientation == "Horizontal";
    },
    setVAlign: function(context, session, viewModel, params)
    {
        viewModel.alignContentV = params.align;
    },
    setHAlign: function(context, session, viewModel, params)
    {
        viewModel.alignContentH = params.align;
    },
}
