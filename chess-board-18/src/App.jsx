import Board from "./board/Board"
import "./App.css"
import { DndContext } from "@dnd-kit/core"
import { useState } from 'react'
import { makeBoardArray } from "./utils/utils"
import { getLegalMoves } from "./utils/utils"

export default function App(){

  const STARTING_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  const [pos, setPos] = useState(makeBoardArray(STARTING_POSITION))
  const [turn, setTurn] = useState(STARTING_POSITION.split(" ")[1])

  const [overPiece, setOverPiece] = useState()
  
  const [heldPiece, setHeldPiece] = useState()

  const [legalMoves, setLegalMoves] = useState([...Array(64).keys()])

  function movePiece(from, to){

      // clear identified hover square
      setOverPiece()
      // clear identified held piece
      setHeldPiece()
      // clear legal moves
      setLegalMoves([...Array(64).keys()])

      // early return if invalid move
      if (!to) {
        return
      }

      // change turn
      setTurn(turn === "w" ? "b" : "w")

      // update board position
      setPos(ogPos => (
        ogPos.map((piece, index) => (
          // console.log(`the piece index: ${index}`)
          // console.log(`the piece: ${piece}`)
          // console.log(`the destination index: ${to.id}`)
          // console.log(`the origin index: ${from.id}`)

          // update the destination to display the moved piece
          index === to.id ? ogPos[from.id] : 
          
            // update the origin to not display the moved piece
            index === from.id ? "_" : piece

        ))
      ))
  }

  // identify hover square during drag
  function identifyOverSquare(origin,target){
    if (target === null){return}
    if (origin.id != target.id){
      setOverPiece(target.id)
    }
  }

  function identifyHeldAndLegal(active){
    // update currently dragged piece
    setHeldPiece(active.id)
    
    // call getLegalMoves here and update legalMoves
    const moves = getLegalMoves(active.id, turn, pos)
    setLegalMoves(moves)
  }

  return (
      <DndContext 
        onDragStart={({active}) => identifyHeldAndLegal(active)}
        onDragEnd={({active, over}) => movePiece(active, over)}
        onDragOver={(data) => identifyOverSquare(data.active, data.over)}>
          <Board position={pos} highlight={overPiece} held={heldPiece} legal={legalMoves}/>
      </DndContext>
  )
}
