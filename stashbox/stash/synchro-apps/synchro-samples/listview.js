// ListView header and foolter
//
exports.View =
{
    title: "ListView Sample",
    elements:
    [
        { control: "stackpanel", orientation: "Vertical", height: "*", width: "*", contents: [
            { control: "listview", select: "Single", height: "*", width: "*", binding: { items: "presidents", selection: "selectedPresident", onItemClick: { command: "itemClicked", president: "{$data}" } }, 
                header: [
                    { control: "text", value: "US Presidents of America", fontsize: 12 }
                ],
                itemTemplate: [
                    { control: "stackpanel", orientation: "Horizontal", padding: 5, contents: [
                        { control: "image", resource: "{$root.imgUser}", height: 50, width: 50 },
                        { control: "stackpanel", orientation: "Vertical", contents: [
                            { control: "text", value: "{first}" },
                            { control: "text", value: "{last}" },
                        ] },
                    ] }
                ],
                footer: [
                    { control: "stackpanel", orientation: "Vertical", width: "*", visibility: "{showFooter}", contents: [
                        { control: "text", value: "Displaying {presidents} presidents of the United States", width: "*", fontsize: 12 },
                        { control: "button", caption: "Load more...", binding: "loadMore" },
                    ] }
                ]
            },
            { control: "text", value: "Selected: Mr. {selectedPresident.last}", visibility: "{selectedPresident}", fontsize: 12 },            
        ] },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        presidents: [
            { first: "George", last: "Washington" }, 
            { first: "Abraham", last: "Lincoln" }, 
            { first: "Andrew", last: "Jackson" }, 
        ],
        selectedPresident: { first: "Abraham", last: "Lincoln" },
        showFooter: true,
        imgUser: Synchro.getResourceUrl(context, "user.png")
    }
    return viewModel;
}

exports.Commands = 
{
    loadMore: function(context, session, viewModel)
    {
        viewModel.presidents.push({ first: "Bill", last: "Clinton" });
        viewModel.presidents.push({ first: "Jimmy", last: "Carter" });
        viewModel.presidents.push({ first: "Gerald", last: "Ford" });
        viewModel.presidents.push({ first: "Harry", last: "Truman" });
        viewModel.presidents.push({ first: "Teddy", last: "Roosevelt" });
        viewModel.showFooter = false;
    },
    itemClicked: function(context, session, viewModel, params)
    {
        return Synchro.showMessage(context, { message: "You chose: Mr. " + params.president.last });
    }
}
