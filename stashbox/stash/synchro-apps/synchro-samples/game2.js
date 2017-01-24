// Game of 15
//
var boardDim = 4; // Configurable board size - go nuts!

exports.View =
{
    title: "Game of 15",
    elements:
    [
        { control: "text", value: "Tap a tile to shift that tile, row, or column toward the empty space until all tiles are in order.  All game state is actually in a Synchro app running on the server.", width: "*" },
        { control: "rectangle", width: "*", height: 5, color: "Black" },

        { control: "stackpanel", orientation: "Vertical", margin: 0, width: "*", contents: [
            { control: "text", value: "Put the Squares in Order", fontsize: 12, horizontalAlignment: "Center" },
            { control: "stackpanel", orientation: "Horizontal", margin: 0, horizontalAlignment: "Center", binding: { foreach: "board" }, contents: [
                { control: "border", background: "{background}", height: 75, width: 75, margin: 5, binding: { foreach: "$data", onTap: { command: "squareTapped", row: "{$parent.$index}", col: "{$index}" } }, contents: [
                    { control: "text", value: "{number}", horizontalAlignment: "Center", verticalAlignment: "Center", margin: 0 },
                ]}
            ] },
            { control: "text", value: "Turns: {turnCount}", fontsize: "12", horizontalAlignment: "Center" }
        ] },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        turnCount: 0,
        blankRow: boardDim-1,
        blankCol: boardDim-1
    }

    // Populate the board (not all random boards are solvable, so we start with a solved board, then scramble it).
    //
    var curr = 1;
    viewModel.board = new Array(boardDim);
    for (var row = 0; row < boardDim; row++) 
    {
        viewModel.board[row] = new Array(boardDim);
        for (var col = 0; col < boardDim; col++) 
        {
            if (curr < (boardDim * boardDim))
            {                
                viewModel.board[row][col] = { number: curr++, background: "Orange" };
            }
            else
            {
                viewModel.board[row][col] = { };
            }
        }
    }

    // Scramble the board
    //
    for (var i = 0; i < 250; i++)
    {
        var newBlankRow = viewModel.blankRow;
        var newBlankCol = viewModel.blankCol;
        if (Math.random() > 0.5)
        {
            // Pick a new row at random
            while (newBlankRow == viewModel.blankRow)
            {
                newBlankRow = Math.floor(Math.random() * boardDim); 
            }
        }
        else
        {
            // Pick a new col at random
            while (newBlankCol == viewModel.blankCol)
            {
                newBlankCol = Math.floor(Math.random() * boardDim); 
            }
        }
        toggle(viewModel, newBlankRow, newBlankCol);
    }

    return viewModel;
}

function isSolved(board)
{
    for (var row = 0; row < boardDim; row++) 
    {
        for (var col = 0; col < boardDim; col++) 
        {
            if ((row == boardDim-1) && (col == boardDim-1) && !board[row][col].number)
            {
                return true; // Got to the end and found empty square
            }
            else if (((row * boardDim) + col + 1) != board[row][col].number)
            {
                return false; // Found a square out of position
            }
        }
    }
    return false;
}

function toggle(viewModel, row, col)
{
    if ((row == viewModel.blankRow) && (col == viewModel.blankCol))
    {
        return false; // Selected location is already blank, NOOP
    }
    else if (row == viewModel.blankRow)
    {
        if (col < viewModel.blankCol) // Shift cells left
        {
            for (var i = viewModel.blankCol; i > col; i--)
            {
                viewModel.board[row][i] = viewModel.board[row][i-1];
            }
        }
        else // Shift cells right
        {
            for (var i = viewModel.blankCol; i < col; i++)
            {
                viewModel.board[row][i] = viewModel.board[row][i+1];
            }
        }
    }
    else if (col == viewModel.blankCol)
    {
        if (row < viewModel.blankRow) // Shift cells up
        {
            for (var i = viewModel.blankRow; i > row; i--)
            {
                viewModel.board[i][col] = viewModel.board[i-1][col];
            }
        }
        else // Shift cells down
        {
            for (var i = viewModel.blankRow; i  < row; i++)
            {
                viewModel.board[i][col] = viewModel.board[i+1][col];
            }
        }
    }
    else
    {
        return false; // Invalid turn (blank is not on the chosen row/col), NOOP
    }

    viewModel.board[row][col] = {};
    viewModel.blankRow = row;
    viewModel.blankCol = col;
    return true;
}

exports.Commands = 
{
    squareTapped: function(context, session, viewModel, params)
    {
        if (toggle(viewModel, params.row, params.col))
        {
            viewModel.turnCount++;
            if (isSolved(viewModel.board))
            {
                return Synchro.showMessage(context, { message: "Congrats!  You solved it!" });
            }
        }
    }
}