// Given an array and a number of rows, return a 2D array divided into the same number of subarrays.
export function chunkArray(array, rows){

    const out = [Array(rows)]

    const len = Math.ceil(array.length / rows)

    for (let i = 0; i < rows; i++){
        out[i] = [Array(len)]

        for (let j = 0; j < len; j++){
            out[i][j] = array[i * len + j]
        }
    }

    return out

}

// Given the current position as a string, return an array of each board square.
export function makeBoardArray(pos){
    const posArray = pos.split(" ")[0].replace(/\//g,"").split("")
    // const posOnly = pos.split(" ")
    // const posNoSlashes = posOnly[0].replace(/\//g,"")
    const out = posArray.flatMap((element) => (
        isNaN(element) ? element : Array(parseInt(element)).fill("_")
    ))
    return out
}

// Given the currently held piece and the position, return an array of legal move indicies
export function getLegalMoves(held, turn, pos){
    // determine current turn
    // check pos[1]
    // w => white / upper case
    // b => black / lower case

    // black regex
    const blackReg = new RegExp("[prnbkq]")

    // white regex
    const whiteReg = new RegExp("[PRNBKQ]")

    // get correct regex
    const currentReg = turn === "w" ? whiteReg : blackReg

    // early return if held piece is wrong color (not their turn)
    if (pos[held].search(currentReg) === -1){return []}

    // start with all squares unlocked
    let legal = [...Array(64).keys()]

    // rules for all pieces (except possibly en passant)
    // can't move where any piece of the same colour is
    // remove any squares occupied by pieces of the same colour
    legal = legal.filter((square) => (pos[square].search(currentReg)))

    // rotate legal moves if piece is white
    legal = turn === "w" ? rotateLegal(legal) : legal
    // rotate held if piece is white
    held = turn === "w" ? Math.abs(held-63) : held
    // rotate board if piece is white
    pos = turn === "w" ? rotateBoard(pos) : pos

    const currentRow = Math.floor(held / 8)

    const currentCol = held % 8

    console.log(pos[held])


    // can assume that the piece is the current turn's colour
    switch(pos[held].toLowerCase()){
        case "p":
            return getPawnMoves(held, turn, legal, pos, currentRow, currentCol);
        case "r":
            return getRookMoves(held, turn, pos, currentReg);
        case "n":
            return getKnightMoves(held, turn, legal, pos, currentRow, currentCol);
        case "b":
            return getBishopMoves(held, turn, pos, currentReg);
        case "q":
            return getQueenMoves(held, turn, pos, currentReg);
        case "k":
            return getKingMoves(held, turn, legal, pos, currentRow, currentCol);
        default:
            return []
    }

}

// Rotate the board indices so that the player always advances from the north
function rotateBoard(pos){
    let out = Array(64)
    pos.forEach((piece, index) => (out[Math.abs(index-63)] = piece))
    return out
}

// Rotate legal moves array
function rotateLegal(availableMoves){
    return availableMoves.map((move => Math.abs(move-63)))
}

// Get index of first array element which is occupied
// function getFirstOccupiedIndex(moves){
    // return moves.findIndex((move) => move !== "_")
// }


// For a given starting index, and a given move increment, calculate the available moves.
// Assumes piece can continue to move as long as squares are available.
function rayMoves(start, step, pos){

    let moves = []

    let i = start + step

    // keep search within board
    while (i >= 0 && i < 64){

        // break if iterator has wrapped by row (for rook)
        if (step === 1 || step === -1)
            {
                // check if the new iterator is in a different row
                if (Math.floor(i/8) != Math.floor(start/8)){
                    break
                }
            }

        // break if iterator has wrapped by column (for bishop)
        if (Math.abs(step) === 7 || Math.abs(step) === 9)
            {
                // break if in col 0 or 8 and
                // previous iterator was also in col 0 or 8
                if ((i % 8 == 0 || i % 8 == 7) && ((i - step) % 8 == 0 || (i - step) % 8 == 7)){
                    break
                }
            }

        // add index to moves array if free "_" and continue
        if (pos[i] === "_")
            {
                moves.push(i)
                // continue
            }
        
        // add index to moves array if occupied and break
        if (pos[i] != "_")
            {
                moves.push(i)
                break
            }

        // increase iterator
        i += step

        }

    // console.log(moves)

    return moves

}

function isEnemyPiece(occupied, currentReg){

    // return false if matches currentReg else true
    return occupied.search(currentReg) != -1 ? false : true
}

// held => index of dragged piece
// turn => w / b string
// availableMoves => array of available move indices (squares with same colour pieces already removed)
// pos => array of current position
function getPawnMoves(held, turn, availableMoves, pos, currentRow, currentCol){
    // rules for pawns
    // can only advance forwards (assume forwards is higher indices given board rotation)
    // can't move if fowards is blocked
    // can move diagonally when taking an enemy piece
    // can move two rows on first turn

    // can advance forward one row at a time (or two from row index 1)
    availableMoves = availableMoves.filter((move) => (
                    currentRow === 1 && (Math.floor(move/8) === 2 || Math.floor(move/8) === 3) ? move : null ||
                    Math.floor(move/8) === currentRow + 1 ? move : null                                    
    ))

    // check if forward is blocked
    // const blockedMove = pos[held + 8] != "_" && held + 8

    // can't move forward if blocked by a piece
    // if (blockedMove != undefined){
    if (pos[held + 8] != "_"){
        availableMoves = availableMoves.filter((move) => (move % 8 != currentCol))
    } 

    // can only move forwards, except when taking at +7 or +9
    availableMoves = availableMoves.filter((move) => (
                    move % 8 === currentCol && move ||
                    // move % 8 === currentCol - 1 && pos[move] != "_" && Math.floor(move/8) === currentRow + 1 && move || 
                    // move % 8 === currentCol + 1 && pos[move] != "_" && Math.floor(move/8) === currentRow + 1 && move
                    move === held + 7 && pos[move] != "_" && move ||
                    move === held + 9 && pos[move] != "_" && move
    ))

    // if white, return rotated board
    return turn === "w" ? rotateLegal(availableMoves) : availableMoves
}

function getRookMoves(held, turn, pos, currentReg){
    // get ray moves
    const available = rayMoves(held, 8, pos)
    available.push(...rayMoves(held, -8, pos))
    available.push(...rayMoves(held, 1, pos))
    available.push(...rayMoves(held, -1, pos))

    // remove same colour pieces
    const availableMoves = available.filter((move) => (
                    pos[move] == "_" || isEnemyPiece(pos[move], currentReg)
    ))

    // flip board (if white)
    return turn === "w" ? rotateLegal(availableMoves) : availableMoves

}

// function getRookMovesOld(held, turn, availableMoves, pos, currentRow, currentCol){
//     // rules for rooks
//     // can only move along the current row or column
//     // cannot move past any other pieces in the row or column

//     // console.log(availableMoves)

//     // console.log(0 % 8)
//     // console.log(63 % 8)
//     // console.log(currentCol)

//     // remove all moves which aren't in the current row or column
//     availableMoves = availableMoves.filter((move) => (
//                     move % 8 === currentCol ||
//                     Math.floor(move/8) === currentRow
//     ))

//         // console.log(availableMoves)


//     // remove all moves which are blocked by another piece
//     // sort available moves into column squares and row squares
//     // find the maximum and minimum square for the column and row
//     // remove any squares beyond the max/min squares

//     // filter pos array for column
//     const posCol = pos.filter((square, index) => (
//                     index % 8 === currentCol
//     ))

//     // posCol has all the squares for the Rook's column top to bottom
//     // split into top and bottom
//     const posColTop = posCol.slice(0,currentRow)
//     const posColBot = posCol.slice(currentRow+1)

//     console.log(posColTop)
//     console.log(posColBot)

//     // find the minimum row occupied by a piece
//     const minRow = getFirstOccupiedIndex(posColTop)

//     console.log(minRow)
    
//     // find the max row occupied by a piece
//     const maxRow = getFirstOccupiedIndex(posColBot) + currentRow

//     console.log(maxRow)

//     // remove any moves within the current column above minRow or below maxRow
//     // availableMoves = availableMoves.filter((move) => (
//     //                     Math.floor(move / 8) > minRow && Math.floor(move / 8) <= maxRow
//     // ))

//     // filter pos array for current row
//     const posRow = pos.slice(currentRow * 8, currentRow * 8 + 8)

//     console.log(`posRow = ${posRow}`)

//     // posRow has all squares for current row left to right
//     // split posRow into left of current piece and right of current piece
//     const posRowLeft = posRow.slice(0, currentCol)
//     const posRowRight = posRow.slice(currentCol + 1, 8)

//     console.log(`posRowLeft = ${posRowLeft}`)
//     console.log(`posRowRight = ${posRowRight}`)

//     // get min col and max col
//     const minCol = currentCol + getFirstOccupiedIndex(posRowLeft.reverse())
//     const maxCol = getFirstOccupiedIndex(posRowRight) + currentCol + 1

//     console.log(`minCol = ${minCol}`)
//     console.log(`maxCol = ${maxCol}`)

//     // remove any moves within the current row above posColTop or below posColBot
//     availableMoves = availableMoves.filter((move) => (
//                         // retain only moves which aren available in the row
//                         // is the move in a column greater than the min column and less than the max col?
//                         (move % 8 > minCol && move % 8 < maxCol) ||
//                         // retain only moves which are available in the column
//                         // is the move in a row greater than the min row and less than the max row?
//                         Math.floor(move / 8) > minRow && Math.floor(move / 8) < maxRow
//     ))
    
//     // if white, return rotated board
//     return turn === "w" ? rotateLegal(availableMoves) : availableMoves
// }

function getKnightMoves(held, turn, availableMoves, pos){
    
    // if white, return rotated board
    return turn === "w" ? rotateLegal(availableMoves) : availableMoves
}

function getBishopMoves(held, turn, pos, currentReg){
    // get ray moves
    const available = rayMoves(held, 7, pos)
    available.push(...rayMoves(held, -7, pos))
    available.push(...rayMoves(held, 9, pos))
    available.push(...rayMoves(held, -9, pos))

    // remove friendly pieces
    const availableMoves = available.filter((move) =>
                    (move === "_" || isEnemyPiece(pos[move], currentReg))
    )

    // if white, return rotated board
    return turn === "w" ? rotateLegal(availableMoves) : availableMoves
}

function getQueenMoves(held, turn, pos, currentReg){
    // get diagonal moves
    const diagonals = getBishopMoves(held, turn, pos, currentReg)

    // get straight moves
    const straights = getRookMoves(held, turn, pos, currentReg)

    return diagonals.push(...straights)
}

function getKingMoves(held, turn, availableMoves, pos){
    
    // if white, return rotated board
    return turn === "w" ? rotateLegal(availableMoves) : availableMoves
}