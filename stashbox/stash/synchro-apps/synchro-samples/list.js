// List page
//
var lodash = require('lodash');

exports.View =
{
    title: "List example",
    elements:
    [
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "text", value: "New item:", fontsize: 12 },
            { control: "edit", binding: "itemToAdd" },
        ] },
        { control: "button", caption: "Add", binding: "add", enabled: "{itemToAdd}" },

        { control: "text", value: "Your items", fontsize: 12 },
        { control: "listbox", width: 250, height: 300, select: "Multiple", binding: { items: "items", selection: "selectedItems" } },

        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "button", caption: "Remove", binding: "remove", enabled: "{selectedItems}" },
            { control: "button", caption: "Sort", binding: "sort", enabled: "{items}" },
        ] },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        itemToAdd: "",
        items: [ "white", "black", "yellow" ],
        selectedItems: [ "black" ]
    }
    return viewModel;
}

exports.Commands = 
{
    add: function(context, session, viewModel)
    {
        viewModel.items.push(viewModel.itemToAdd);
        viewModel.itemToAdd = "";
    },
    sort: function(context, session, viewModel)
    {
        viewModel.items.sort();
    },
    remove: function(context, session, viewModel)
    {
        lodash.pullAllWith(viewModel.items, viewModel.selectedItems, lodash.isEqual);
        viewModel.selectedItems = [];
    },
}
