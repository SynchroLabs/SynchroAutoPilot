// List Click page
//
exports.View =
{
    title: "List Click",
    elements:
    [
        { control: "stackpanel", orientation: "Horizontal", contents: [
            { control: "stackpanel", orientation: "Vertical", contents: [

                { control: "text", value: "Click an item...", fontsize: 16 },
                { control: "listview", select: "None", height: 300, maxheight: 300, width: 350, binding: { items: "items", onItemClick: { command: "itemClicked", itemData: "{data}" } }, itemTemplate: [
                    { control: "stackpanel", orientation: "Horizontal", padding: 5, contents: [
                        { control: "image", resource: "{$root.imgUser}", height: 50, width: 50 },
                        { control: "text", value: "{title}" },
                    ] },
                ] },
            ] },
        ] },

        { control: "text", value: "Last item clicked: {lastClicked}", fontsize: 12 },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        items: [
            { title: "Item Number One", data: "one" },
            { title: "Item Number Two", data: "two" },
            { title: "Item Number Three", data: "three" },
            { title: "Item Number Four", data: "four" },
        ],
        lastClicked: "none",
        imgUser: Synchro.getResourceUrl(context, "user.png")
    }
    return viewModel;
}

exports.Commands = 
{
    itemClicked: function(context, session, viewModel, params)
    {
        viewModel.lastClicked = params.itemData;
    },
}
