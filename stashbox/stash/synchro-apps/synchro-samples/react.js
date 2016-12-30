// React Movies sample app implementation
// https://facebook.github.io/react-native/docs/tutorial.html
//
var request = require('request');
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

exports.View =
{
    title: "Movies",
    elements:
    [
        { control: "stackpanel", orientation: "Vertical", width: "*", height: "*", contents: [
            { control: "text", value: "Loading movies...", fontsize: 10, visibility: "{!responseData.movies}" },
            { control: "listview", select: "None", height: "*", width: "*", margin: 0, binding: "responseData.movies", itemTemplate: [
                { control: "stackpanel", orientation: "Horizontal", width: "*", margin: 0, contents: [
                    { control: "image", resource: "{posters.thumbnail}", height: 100, width: 75 },
                    { control: "stackpanel", orientation: "Vertical", width: "*", contents: [
                        { control: "text", value: "{title}", width: "*", font: { bold: true, size: 8 } },
                        { control: "text", value: "{year}", width: "*", fontsize: 7 },
                    ]}
                ]}
            ]}
        ]}
    ]
}

// The designViewModel below is to support the Synchro Studio view editing feature (this data is what
// is used by Synchro Studio to render the UX at design-time, since it doesn't have access to live 
// data from the running app).
// 
// This is not required or used by the running/deployed app.
//
var designViewModel = 
{
    "responseData": {
        "movies": [
        {
            "id": "11494",
            "title": "Chain Reaction",
            "year": 1996,
            "mpaa_rating": "PG-13",
            "runtime": 106,
            "synopsis": "",
            "posters": {
                "thumbnail": "http://resizing.flixster.com/DeLpPTAwX3O2LszOpeaMHjbzuAw=/53x77/dkpu1ddg7pbsk.cloudfront.net/movie/11/16/47/11164719_ori.jpg",
            },
        },
        {
            "id": "770920361",
            "title": "React! A Woman's Guide to Safety and Basic Self-Defense",
            "year": 1996,
            "mpaa_rating": "Unrated",
            "runtime": "",
            "synopsis": "",
            "posters": {
                "thumbnail": "http://resizing.flixster.com/m7G-weBZPYfnoqSiF59LIPPYOuM=/44x81/dkpu1ddg7pbsk.cloudfront.net/movie/10/97/47/10974721_ori.jpg",
            },
        },
        {
            "id": "391535485",
            "title": "Chain Reaction (House of Blood)",
            "year": 2006,
            "mpaa_rating": "NC-17",
            "runtime": 105,
            "synopsis": "",
            "posters": {
                "thumbnail": "http://resizing.flixster.com/Q8IBqX3b-nhEAEYokJ_aH6jO6lE=/54x78/dkpu1ddg7pbsk.cloudfront.net/movie/10/94/13/10941373_ori.jpg",
            },
        },
    ] }
}

exports.InitializeViewModel = function(context, session)
{
    return { responseData: null };
}

exports.LoadViewModel = function * (context, session, viewModel)
{
    var response = yield Synchro.yieldAwaitable(context, function(callback){ request({ url: REQUEST_URL }, callback) });
    viewModel.responseData = JSON.parse(response[0].body);
    console.log("movies:", JSON.stringify(viewModel, null, 4));
}