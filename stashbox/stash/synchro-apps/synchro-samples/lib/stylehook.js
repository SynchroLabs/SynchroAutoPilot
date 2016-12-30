// App-wide Style Hook
//
// This module illustrates using application hook functionality to apply styles across an application.
//
// To install this hook, add it to the "hooks" key in the app package.json.  For example:
//
// {
//     "name": "synchro-samples",
//     "version": "x.x.x",
//     "description": "Synchro API Samples",
//     "main": "menu",
//     "author": "Bob Dickinson <bob@synchro.io> (http://synchro.io/)",
//     "private": true,
//     "engines": { "synchro": "*" },
//     "hooks": [ "lib/loghook", "lib/stylehook" ]
// }
//

var styleHelper = require("synchro-api/style-helper");

// The mappings below define the default style to add to each control of the key type in the view.
//
var appStyleMappings = 
{
    "button": "btnStyle",
    "text": "txtStyle"
}

// The "app" styles below will be merged in to any styles provided in the viewModel.  Only app styles that are actually 
// referenced from the view will be merged.  Also, the app styles are merged in such that any style values provided in the
// viewModel will override the cooresponding app style.
//
var appStyles = 
{
    btnStyle:
    {
        foreground: "CornflowerBlue",
        background: "DarkSlateGray",
    },
    txtStyle:
    {
        fontsize: 12
    },
    stackStyle:
    {
        orientation: "Horizontal"
    },
    editStyle:
    {
        // These aren't really meaningful style values - they're just included as an example of how platform filtering
        // can be done on style values.
        //
        fontsize: { os_value: { iOS: 9, Android: 10, Windows: 11, default: 12 } },
        os_merge: 
        {
            iOS: 
            {
                foreground: "Blue"
            },
            Windows:
            {
                foreground: "Blue",
                background: "Black"
            },
            default:
            {
                background: "Green"
            }
        }
    }
}

exports.AfterInitializeView = function(route, routeModule, context, session, viewModel, view, metrics, isViewMetricsUpdate)
{
    console.log("Processing styles");
    styleHelper.processViewAndViewModelStyles(viewModel, view, metrics, appStyleMappings, appStyles);
}