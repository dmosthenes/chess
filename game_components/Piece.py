from TypesAndColours import Colour, PieceType

class Piece:

    def __init__(self, type, colour):
        self.colour = colour
        self.type = type

    @classmethod
    def pieceFromFEN(cls, char):

        if char == "V":
            return cls(PieceType("V"), Colour(3))

        # When lower case, piece is black
        if char.islower():
            colour = Colour.BLACK
        else:
            colour = Colour.WHITE

        type = PieceType(char.upper())

        return cls(type, colour)