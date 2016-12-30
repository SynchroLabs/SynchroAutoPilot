// Flex 2 page
//
exports.View =
{
    title: "Flex 2",
    elements:
    [
        { control: "stackpanel", orientation: "Horizontal", width: "*", contents: [
            { control: "stackpanel", orientation: "Horizontal", width: "*", contents: [
                { control: "rectangle", height: "100", width: "*", color: "Red", border: "Blue", borderThickness: 5 },
                ],
            },
            { control: "stackpanel", orientation: "Horizontal", contents: [
                { control: "rectangle", height: "100", width: "100", color: "Green", border: "Yellow", borderThickness: 5 },
                ]
            }
            ]
        }
    ]
}

exports.InitializeViewModel = function (context, session) 
{
    var viewModel =
    {
    }
    return viewModel;
}
