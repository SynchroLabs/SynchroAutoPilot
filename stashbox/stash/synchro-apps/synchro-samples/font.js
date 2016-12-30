// Font page
//
exports.View =
{
    title: "Font",
    elements:
    [
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "button", width: 150, caption: "San Serif", binding: { command: "setFace", face: "SanSerif" } },
            { control: "button", width: 130, caption: "Serif", binding: { command: "setFace", face: "Serif" } },
            { control: "button", width: 170, caption: "Monospace", binding: { command: "setFace", face: "Monospace" } },
        ] },

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Size", fontsize: 10, width: 140 },
            { control: "slider", minimum: 10, maximum: 50, binding: "currFont.size", width: 300 },
        ] },

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Bold", fontsize: 10, width: 140 },
            { control: "toggle", binding: "currFont.bold", fontsize: 12 },
        ] },

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "Italic", fontsize: 10, width: 140 },
            { control: "toggle", binding: "currFont.italic", fontsize: 12 },
        ] },

        { control: "text", value: "Testing {currFont.face}", width: "*", font: { face: "{currFont.face}", size: "{currFont.size}", bold: "{currFont.bold}", italic: "{currFont.italic}" } },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        currFont: 
        {
            face: "Monospace",
            size: 24,
            bold: false,
            italic: false,
        },
    }
    return viewModel;
}

exports.Commands =
{
    setFace: function(context, session, viewModel, params)
    {
        viewModel.currFont.face = params.face;
    },
}
