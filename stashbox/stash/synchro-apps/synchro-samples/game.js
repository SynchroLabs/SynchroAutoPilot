// Lights Out Game
//
//     https://en.wikipedia.org/wiki/Lights_Out_(game)
//
// The light-chasing solution is:
//
// Bottom row  Top row
//   O---O     OO---
//   -O-O-     O--O-
//   OOO--     -O---
//   --OOO     ---O-
//   O-OO-     ----O
//   -OO-O     O----
//   OO-OO     --O--
//
var boardDim = 5;
var squareOn = "Orange";
var squareOff = "DarkGray";

exports.View =
{
    title: "Lights Out",
    elements:
    [
        { control: "text", value: "Each time you click a square, it toggles the lit state of that square and each horiontally or vertically adjacent square.  All game state is actually in a Synchro app running on the server.", width: "*" },
        { control: "rectangle", width: "*", height: 5, color: "Black" },

        { control: "stackpanel", orientation: "Vertical", margin: 0, width: "*", contents: [
            { control: "text", value: "Turn Out the Lights", fontsize: 12, horizontalAlignment: "Center" },
            { control: "stackpanel", orientation: "Horizontal", margin: 0, horizontalAlignment: "Center", binding: { foreach: "board" }, contents: [
                { control: "rectangle", height: 75, width: 75, margin: 5,  color: "{background}", 
                  binding: { foreach: "$data", onTap: { command: "squareTapped", row: "{$parent.$index}", col: "{$index}" } } },
            ] },
            { control: "text", value: "Turns: {turnCount}, lights: {lights}", fontsize: "12", horizontalAlignment: "Center" }
        ] },
    ]
}

function countLights(viewModel)
{
    viewModel.lights = 0;
    for (var row = 0; row < boardDim; row++) 
    {
        for (var col = 0; col < boardDim; col++) 
        {
            if (viewModel.board[row][col].background == squareOn)
            {
                viewModel.lights++;
            }
        }
    }
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        turnCount: 0,
        lights: 0
    }

    // We're going to generate a random, but known-solvable, board by starting with a solved board (all off)
    // and simulating random moves.  That same sequence is guaranteed to solve the board, in addition
    // to other potentially more optimized solutions (any board can be solved in 15 or fewer moves).
    //
    viewModel.board = new Array(boardDim);
    for (var row = 0; row < boardDim; row++) 
    {
        viewModel.board[row] = new Array(boardDim);
        for (var col = 0; col < boardDim; col++) 
        {
            viewModel.board[row][col] = { background: squareOff }
        }
    }

    for (var n = 0; n < 25; n++)
    {
        toggle(viewModel.board, Math.floor(Math.random() * boardDim), Math.floor(Math.random() * boardDim)); 
    }

    countLights(viewModel);

    return viewModel;
}

function toggleCell(board, row, col)
{
    if ((row >= 0) && (row < board.length) && (col >= 0) && (col < board[row].length))
    {
        board[row][col].background = board[row][col].background == squareOn ? squareOff : squareOn;
    }
}

function toggle(board, row, col)
{
    toggleCell(board, row, col);
    toggleCell(board, row-1, col);
    toggleCell(board, row+1, col);
    toggleCell(board, row, col-1);
    toggleCell(board, row, col+1);
}

exports.Commands = 
{
    squareTapped: function(context, session, viewModel, params)
    {
        toggle(viewModel.board, params.row, params.col);
        viewModel.turnCount++;
        countLights(viewModel);
        if (viewModel.lights == 0)
        {
            return Synchro.showMessage(context, { message: "Congrats!  You turned out the lights!" });
        }
    }
}