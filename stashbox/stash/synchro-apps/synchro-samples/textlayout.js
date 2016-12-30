// Test stretch layout
//
exports.View = {
    title: "Text Layout",
    elements: [
        { control: "stackpanel", orientation: "Vertical", height: "*", width: "*", contents: [
            { control: "listview", height: "*", width: "*", select: "None", binding: { items: "topics" }, 
                header: [
                    { control: "rectangle", height: 10, width: "*", color: "Red" }
                ],
                itemTemplate:
                [
                    { control: "stackpanel", orientation: "Horizontal", width: "*", contents: [
                        { control: "stackpanel", orientation: "Vertical", width: "*", contents: [
                            { control: "text", value: "{title}", width: "*", font: { size: 8, bold: true } },
                            { control: "stackpanel", orientation: "Horizontal", width: "*", contents: [
                                { control: "text", value: "{time}", width: "2*", fontsize: 6 },
                                { control: "text", value: "by {author}", width: "2*", foreground: "CornflowerBlue", fontsize: 6 },
                                { control: "text", value: "replies: {replies}", width: "*", fontsize: 6 }
                            ]}
                        ]}
                    ]}
                ],
                footer: [
                    { control: "rectangle", height: 10, width: "*", color: "Blue" }
                ]
            }
        ]}
    ]
};

exports.InitializeViewModel = function(context, session) {
    var viewModel = {
        topics: [
            {"_id":"571be1a1bb9ab0903a2a10cf","title":"Heya","body":"Fibble","author":"Will","replies":[],"timestamp":1461445025212,"time":"9 days ago"},
            {"_id":"5712784f386a4fd0492150fd","title":"Beef","body":"FFS","author":"Will","replies":[],"timestamp":1460828238938,"time":"16 days ago"},
            {"_id":"570dcb45d3c4f8bf067d02b2","title":"Testing a spinner","body":"Meow meow ","author":"Will","replies":[],"showLoader":true,"timestamp":1460521795739,"time":"20 days ago"},
            {"_id":"570db34a9363b3040d6485a7","title":"Multiline text boxes are coming soon!","body":"Soon we will be able to have multi-linesnin these boxes.","author":"Will","replies":[],"timestamp":1460515658477,"time":"20 days ago"},
            {"_id":"570b20e25edb23f7d260352a","title":"Sdfg","body":"","author":"Will","replies":[],"timestamp":1460347106037,"time":"22 days ago"},
            {"_id":"570ae593698616d7c9553a9f","title":"Mariner's game just got out. Need drivers by the stadium.","body":"Blah blah blah","author":"Will","timestamp":1460331922012,"replies":[],"time":"22 days ago"},
            {"_id":"5709c608e4b050965a585f0e","title":"It's slow on I-5 at the Convention Center","body":"There's a ton of traffic and an overturned apple cart...","timestamp":1460258225223,"author":"curriemrusmc","replies":[{"body":"yeah, this blows chunks.","author":"joemac","timestamp":1460258235223},{"body":"I'm stuck at Yessler","author":"janedrivesastick","timestamp":1460258236220}],"time":"23 days ago"},
            {"_id":"5709c770e4b050965a585f1d","title":"This is the only industry that saying \"I'm charging my mustache at home\" makes perfect sense","body":"Some message body, blah, foo","timestamp":1460257325123,"author":"ugcommand","replies":[{"body":"Lol.","author":"joemac","timestamp":1460257326123},{"body":"I mustache you a question","author":"sirseanconnery","timestamp":1460257327123}],"time":"23 days ago"},
        ]
    };
    return viewModel;
};
