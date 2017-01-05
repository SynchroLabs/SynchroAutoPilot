// Twitter sample
//
// This sample is intended to show how to use eval() property value expressions to change local state.  For example:
//
//    Characters Left count is updated as characters are typed
//    When characters left gets below zero, the characters left value is displayed in bold and Red
//    The "Tweet" button is enabled if there is at least one character and less than or equal to 140 characters
//
exports.View =
{
    title: "Twitter",
    elements:
    [
        { control: "stackpanel", orientation: "Vertical", width: "440", contents: [
            { control: "text", value: "Enter Tweet", fontsize: 12, width: "*" },
            { control: "edit", multiline: true, placeholder: "enter tweet", width: "*", margin: { right: 0 }, lines: 3, binding: "text"},
            { control: "stackpanel", orientation: "Horizontal", width: "*", contents: [
                { control: "text", value: "Characters Left:", margin: { right: 5 }, fontsize: 10, verticalAlignment: "Center", width: "*", textAlignment: "Right"},
                { control: "text", value: "eval(140 - {text}.length)", foreground: "eval({text}.length <= 140 ? null : 'Red')", font: { bold: "eval({text}.length > 140)", size: 10 }, width: 70, verticalAlignment: "Center" },
                { control: "button", caption: "Tweet", binding: "tweet", margin: { left: 10, right: 0 }, verticalAlignment: "Center", enabled: "eval({text}.length > 0 && {text}.length <= 140)" },
            ] },
        ] },

        { control: "rectangle", width: "*", height: 5, color: "Black" },
        { control: "text", value: "This sample app demonstrates advanced Synchro data binding using 'eval'.  The 'characters left' value and color, and the enabled state of the 'Tweet' button are all udated without any round trip to the server.", width: "*" },
    ]
}

exports.InitializeViewModel = function (context, session) {
    var viewModel =
    {
        text: ""
    }
    return viewModel;
}

exports.Commands = 
{
    tweet: function(context, session, viewModel)
    {
        Synchro.showMessage(context, { message: "Tweet: " + viewModel.text });
        viewModel.text = "";
    }
}
