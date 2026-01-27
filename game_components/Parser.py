from Piece import Piece
from TypesAndColours import PieceType, Colour
import numpy as np
from numpy import uint64


STARTING_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
AFTER_1E4 = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
COMPLEX = "r3k2r/ppp2ppp/2n1bn2/3pp3/3PP3/2N1BN2/PPP2PPP/R3K2R b KQkq - 5 10"


class Parser:
    """
    A Forsyth-Edwards Notation parser. Defines a method to convert FEN strings into game state dictionaries.
    """

    def __init__(self, string):

        """
        Takes an FEN string and returns a dictionary of board state.
        """

        self.info = string.split()

        self.state = {
            'placement': self.placement(self.info[0]),
            'turn': Colour.WHITE if self.turn(self.info[1]) == "w" else Colour.BLACK,
            'castling': self.castling(self.info[2]),
            'en_passant': self.info[3],
            'half_move': self.info[4],
            'turn_number': self.info[5]
        }

        return self.state

    def placement(positions):
        """
        Generate bitboards to reflect current piece locations.

            To set the bit for a specific square (e.g., e2 which is index 12):
            bit_position = np.uint64(1) << 12  # Shift 1 to the 12th position
        """

        bitboards = {
            'white pawns': np.uint64(0),
            'white knights': np.uint64(0),
            'white bishops': np.uint64(0),
            'white rooks': np.uint64(0),
            'white queens': np.uint64(0),
            'white king': np.uint64(0),
            'black pawns': np.uint64(0),
            'black knights': np.uint64(0),
            'black bishops': np.uint64(0),
            'black rooks': np.uint64(0),
            'black queens': np.uint64(0),
            'black king': np.uint64(0),
        }

        count = 63

        for pos in positions:

            # Throw error if count is below 0
            assert(count >= 0)

            # When pos is a digit, subtract from count and skip character
            if pos.isdigit():
                count = count - int(pos)
                continue

            # Otherwise, match on the value
            match pos:
                case "/":
                    continue                    
                case "p":
                    bitboards['white pawns'](1) << count
                case "n":
                    bitboards['white knights'](1) << count
                case "b":
                    bitboards['white bishops'](1) << count
                case "r":
                    bitboards['white rooks'](1) << count
                case "q":
                    bitboards['white queen'](1) << count
                case "k":
                    bitboards['white king'](1) << count
                case "P":
                    bitboards['black pawns'](1) << count
                case "N":
                    bitboards['black kights'](1) << count
                case "B":
                    bitboards['black bishops'](1) << count
                case "R":
                    bitboards['black rooks'](1) << count
                case "Q":
                    bitboards['black queens'](1) << count
                case "K":
                    bitboards['black king'](1) << count

            # Decrement count
            count = count - 1

        return bitboards


            

            
