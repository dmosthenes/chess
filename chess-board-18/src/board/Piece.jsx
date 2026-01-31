import BlackQueen from "../assets/BlackQueen";
import BlackBishop from "../assets/BlackBishop"
import BlackRook from "../assets/BlackRook";
import BlackKnight from "../assets/BlackKnight";
import BlackPawn from "../assets/BlackPawn";
import WhiteQueen from "../assets/WhiteQueen";
import WhiteKing from "../assets/WhiteKing";
import BlackKing from "../assets/BlackKing";
import WhiteRook from "../assets/WhiteRook";
import WhiteBishop from "../assets/WhiteBishop";
import WhiteKnight from "../assets/WhiteKnight";
import WhitePawn from "../assets/WhitePawn";


export default function Piece({type, ...props}){

    let pieceComponent;

        switch (type) {
            case "k":
                pieceComponent = <BlackKing/>
                break
            case "q":
                pieceComponent = <BlackQueen/>
                break
            case "r":
                pieceComponent = <BlackRook/>
                break
            case "b":
                pieceComponent = <BlackBishop/>
                break
            case "n":
                pieceComponent = <BlackKnight/>
                break
            case "p":
                pieceComponent = <BlackPawn/>
                break
            case "Q":
                pieceComponent = <WhiteKing/>
                break
            case "K":
                pieceComponent = <WhiteQueen/>
                break
            case "R":
                pieceComponent = <WhiteRook/>
                break
            case "B":
                pieceComponent = <WhiteBishop/>
                break
            case "N":
                pieceComponent = <WhiteKnight/>
                break
            case "P":
                pieceComponent = <WhitePawn/>
                break
            default:
                pieceComponent = null
    }

    return (
        <svg width="45" height="45" viewBox="0 0 45 45">
            {pieceComponent}
        </svg>
        )
    }