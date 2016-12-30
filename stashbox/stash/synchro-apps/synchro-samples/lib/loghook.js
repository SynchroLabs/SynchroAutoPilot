// Logging Hook Example
//
// This module illustrates the implementation of each supported application  hook function, where each of the 
// hooks simply logs some information about the hook to the console when it is called.
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

exports.BeforeInitializeViewModel = function (route, routeModule, context, session, params, state)
{
    console.log("BeforeInitializeViewModel - route: %s", route);
}

exports.AfterInitializeViewModel = function(route, routeModule, context, session, params, state, viewModel)
{
    console.log("AfterInitializeViewModel - route: %s, viewModel: %s", route, JSON.stringify(viewModel, null, 4));
}

exports.BeforeInitializeView = function (route, routeModule, context, session, viewModel, view, metrics, isViewMetricsUpdate)
{
    console.log("BeforeInitializeView - route: %s", route);
}

exports.AfterInitializeView = function (route, routeModule, context, session, viewModel, view, metrics, isViewMetricsUpdate)
{
    console.log("AfterInitializeView - route: %s, view: %s", route, JSON.stringify(view, null, 4));
}

exports.BeforeLoadViewModel = function (route, routeModule, context, session, viewModel)
{
    console.log("BeforeLoadViewModel - route: %s, viewModel: %s", route, JSON.stringify(viewModel, null, 4));
}

exports.AfterLoadViewModel = function (route, routeModule, context, session, viewModel)
{
    console.log("AfterLoadViewModel - route: %s, viewModel: %s", route, JSON.stringify(viewModel, null, 4));
}

exports.BeforeOnViewMetricsChange = function (route, routeModule, context, session, viewModel, metrics)
{
    console.log("BeforeOnViewMetricsChange - route: %s, metrics: %s", route, JSON.stringify(metrics, null, 4));
}

exports.AfterOnViewMetricsChange = function (route, routeModule, context, session, viewModel, metrics)
{
    console.log("AfterOnViewMetricsChange - route: %s, metrics: %s", route, JSON.stringify(metrics, null, 4));
}

exports.BeforeOnViewModelChange = function (route, routeModule, context, session, viewModel, source, changes)
{
    console.log("BeforeOnViewModelChange - route: %s, source: %s", route, source);
}

exports.AfterOnViewModelChange = function (route, routeModule, context, session, viewModel, source, changes)
{
    console.log("AfterOnViewModelChange - route: %s, source: %s", route, source);
}

exports.BeforeOnBack = function (route, routeModule, context, session, viewModel)
{
    console.log("BeforeOnBack - route: %s", route);
}

exports.AfterOnBack = function (route, routeModule, context, session, viewModel)
{
    console.log("AfterOnBack - route: %s", route);
}

exports.BeforeCommand = function (route, routeModule, command, context, session, viewModel, parameters)
{
    console.log("BeforeCommand - route: %s, command: %s", route, command);
}

exports.AfterCommand = function (route, routeModule, command, context, session, viewModel, parameters)
{
    console.log("AfterCommand - route: %s, command: %s", route, command);
}
