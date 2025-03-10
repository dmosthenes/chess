from Piece import Piece


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
            'turn': self.turn(self.info[1]),
            'castling': self.castling(self.info[2]),
            'en_passant': self.info[3],
            'half_move': self.info[4],
            'turn_number': self.info[5]

        }

        return self.state

    def placement(positions):

        out = []

        for pos in positions:


            # Insert a piece into next spot it occupied
            if pos.isAlpha():

                out.append(Piece(pos))

            # Otherwise insert as many spaces as present
            else:

                for p in pos:

                    out.append()
