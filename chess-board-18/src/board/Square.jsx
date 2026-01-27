import { useDraggable } from "@dnd-kit/core"
import { useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

import Piece from "./Piece"

export default function Square({id, className, legal, square}){
    // draggable hook
    const {attributes, listeners, setNodeRef: setDraggableRef, transform} = useDraggable({id: id})
    const style = {
        transform: CSS.Translate.toString(transform)
    }

    // droppable hook
    const {setNodeRef: setDroppableRef} = useDroppable({id: id, disabled: !legal})

    return <td  key={id} 
            id={id} 
            className={className} 
            style={style} 
            ref={(node) => {
                
                // all tds are draggable
                setDraggableRef(node)

                // legal move tds are droppable
                setDroppableRef(node)
                            }
                }
            {...listeners}
            {...attributes}
            >
                <Piece 
                    key={id}
                    id={id}
                    // className={highlight === key ? 'over' : ''}
                        // {(squareIndex % 2 == 0 & rowIndex % 2 == 0) || 
                        //     (squareIndex % 2 != 0 & rowIndex % 2 != 0)
                        //     ? `light` : "dark"}
                    type={square}
                />
            </td>
 
}