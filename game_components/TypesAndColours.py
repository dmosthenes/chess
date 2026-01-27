from enum import Enum

class Colour(Enum):

    WHITE = "W"
    BLACK = "B"
    VACANT = "V"

class PieceType(Enum):

    PAWN = "P"
    ROOK = "R"
    KNIGHT = "N"
    BISHOP = "B"
    QUEEN = "Q"
    KING = "K"
    VACANT = "V"
    
