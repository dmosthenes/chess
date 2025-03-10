from enum import Enum, auto

class Colour(Enum):

    WHITE = auto()
    BLACK = auto()
    VACANT = auto()

class PieceType(Enum):

    PAWN = "P"
    ROOK = "R"
    KNIGHT = "K"
    BISHOP = "B"
    QUEEN = "Q"
    KING = "K"
    VACANT = "V"
    
