import Square from "./Square"
import { chunkArray } from "../utils/utils"

export default function Board({ position, highlight, held, legal }){

    const squares = chunkArray(position, 8)

    return (

        <table>
            <tbody>
                {
                    squares.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((square, squareIndex) => {

                                const key = rowIndex * 8 + squareIndex
                                const highlightClass = highlight === key && 'over'
                                const heldClass = held === key && ' held'
                                const legalClass = legal.includes(key) && ' legal'
                                const className = highlightClass + heldClass + legalClass

                                return <Square 
                                            key={key} 
                                            id={key} 
                                            className={className} 
                                            legal={legalClass}
                                            square={square}
                                        />
                                
                                    }
                                )
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}