// Contacts page
//
var lodash = require('lodash');

exports.View =
{
    title: "Contacts",
    elements:
    [
        { control: "stackpanel", orientation: "Vertical", width: "*", height: "*", contents: [

            { control: "text", value: "Your Contacts", fontsize: 12 },

            { control: "stackpanel", orientation: "Horizontal", contents: [
                { control: "button", caption: "Add", binding: "add"},
                { control: "button", caption: "Remove", binding: "remove", enabled: "{selectedContacts}" },
                { control: "button", caption: "Sort", binding: "sort" },
            ] },

            { control: "listview", select: "Multiple", height: "*", width: "*", binding: { items: "contacts", selection: "selectedContacts" }, itemTemplate: [
                { control: "stackpanel", orientation: "Horizontal", padding: 5, contents: [
                    { control: "image", resource: "{$root.imgUser}", height: 50, width: 50 },
                    { control: "stackpanel", orientation: "Vertical", contents: [
                        { control: "text", value: "{first}" },
                        { control: "text", value: "{last}" },
                    ] },
                ] },
            ] },
        ] },

    ]
}

exports.InitializeViewModel = function(context, session, params, state)
{
    var viewModel = state;
    if (viewModel == null)
    {
        viewModel = 
        {
            imgUser: Synchro.getResourceUrl(context, "user.png"),
            contacts: [ { first: "John", last: "Smith" }, { first: "George", last: "Washington" }, ],
            selectedContacts: [],
        }
    }

    if (session.addedContact)
    {
        viewModel.contacts.push(session.addedContact);
        delete session.addedContact;
    }

    return viewModel;
}

exports.Commands = 
{
    add: function(context, session, viewModel)
    {
        return Synchro.pushAndNavigateTo(context, "contacts_add", null, viewModel );
    },
    sort: function(context, session, viewModel)
    {
        viewModel.contacts.sort(function(a,b){return a.last == b.last ? a.first > b.first : a.last > b.last});
    },
    remove: function(context, session, viewModel)
    {
        lodash.pullAllWith(viewModel.contacts, viewModel.selectedContacts, lodash.isEqual);
        viewModel.selectedContacts = [];
    },
}
