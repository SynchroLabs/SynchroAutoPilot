// Auto-complete
//
var lodash = require("lodash");

var states = 
[
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
    "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

exports.View =
{
    title: "Auto-Complete",
    elements:
    [
        { control: "text", value: "Enter a State", fontsize: 12, margin: { bottom: 0 } },
        { control: "edit", binding: { value: "searchText", sync: "change" }, placeholder: "state name", width: 200 },
        { control: "listbox", width: 250, height: 300, select: "None", binding: { items: "suggestions",  onItemClick: { command: "suggestionSelected", suggestion: "{$data}" } }, visibility: "{suggestions}"},
        { control: "button", caption: "Check", width: 125, binding: "check" },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        searchText: "",
        suggestions: [],
    }
    return viewModel;
}

exports.OnViewModelChange = function(context, session, viewModel, source, changes)
{
    // If the source of the change was the view and the thing that changed was searchText, then lets update suggestions...
    //
    if ((source == "view") && lodash.find(changes, { path: 'searchText' }))
    {
        viewModel.suggestions = [];
        if (viewModel.searchText)
        {
            var searchLower = viewModel.searchText.toLowerCase();
            for (var i = 0; i < states.length; i++)
            {
                if (states[i].toLowerCase().indexOf(searchLower) == 0)
                {
                    if (states[i].length == searchLower.length)
                    {
                        // If it's an exact match, we don't need suggestions
                        break;
                    }
                    viewModel.suggestions.push(states[i]);
                }
            }        
        }
    }
}

exports.Commands = 
{
    suggestionSelected: function(context, session, viewModel, params)
    {
        viewModel.searchText = params.suggestion;
        viewModel.suggestions = [];

    },
    check: function(context, session, viewModel)
    {
        if ((viewModel.searchText == null) || (viewModel.searchText.length == 0))
        {
            return Synchro.showMessage(context, { message: "Please enter a state!" });
        }
        else if (lodash.indexOf(states, viewModel.searchText) != -1)
        {
            return Synchro.showMessage(context, { message: "It looks like '{searchText}' is a state, congrats!" });
        }
        else
        {
            return Synchro.showMessage(context, { message: "It looks like '{searchText}' is a not state, sorry." });
        }
    },
}
