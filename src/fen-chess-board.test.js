import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import FENBoard from './fen-chess-board.js';

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
const EMPTY_FEN = '8/8/8/8/8/8/8/8';

describe('FENBoard', () => {
  describe('constructor', () => {
    it('creates an empty board when no argument is given', () => {
      const board = new FENBoard();
      assert.equal(board.fen, EMPTY_FEN);
    });

    it('accepts a FEN string', () => {
      const board = new FENBoard(START_FEN);
      assert.equal(board.fen, START_FEN);
    });

    it('accepts "start" as shorthand for the starting position', () => {
      const board = new FENBoard('start');
      assert.equal(board.fen, START_FEN);
    });
  });

  describe('board', () => {
    it('is a full 8x8 array of empty strings for an empty board', () => {
      const board = new FENBoard();
      assert.equal(board.board.length, 8);
      for (const row of board.board) {
        assert.deepEqual(row, ['', '', '', '', '', '', '', '']);
      }
    });

    it('has rank 8 in row 0 and the a-file in column 0', () => {
      const board = new FENBoard('start');
      assert.equal(board.board[0][0], 'r');
      assert.equal(board.board[0][4], 'k');
      assert.equal(board.board[7][0], 'R');
      assert.equal(board.board[7][4], 'K');
    });

    it('stays a full 8x8 array after put()', () => {
      const board = new FENBoard();
      board.put('a4', 'Q');
      assert.deepEqual(board.board[4], ['Q', '', '', '', '', '', '', '']);
      assert.deepEqual(board.board[3], ['', '', '', '', '', '', '', '']);
    });
  });

  describe('fen setter', () => {
    it('resets the board when setting a new FEN', () => {
      const board = new FENBoard(START_FEN);
      board.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/8';
      assert.equal(board.fen, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/8');
    });

    it('clears the board when set to a falsy value', () => {
      const board = new FENBoard(START_FEN);
      board.fen = '';
      assert.equal(board.fen, EMPTY_FEN);
      board.fen = START_FEN;
      board.fen = undefined;
      assert.equal(board.fen, EMPTY_FEN);
    });

    it('ignores everything after the first space in a full FEN string', () => {
      const board = new FENBoard('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e3 0 1');
      assert.equal(board.fen, 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR');
    });

    it('leaves missing ranks empty', () => {
      const board = new FENBoard('rnbqkbnr/pppppppp');
      assert.equal(board.fen, 'rnbqkbnr/pppppppp/8/8/8/8/8/8');
    });

    it('throws on more than 8 ranks', () => {
      assert.throws(() => new FENBoard('8/8/8/8/8/8/8/8/8'), {
        message: 'Invalid FEN: expected at most 8 ranks, got 9',
      });
    });

    it('throws on more than 8 squares in a rank', () => {
      assert.throws(() => new FENBoard('8/8/8/8/8/8/8/ppppppppp'), {
        message: 'Invalid FEN: rank 1 has more than 8 squares',
      });
      assert.throws(() => new FENBoard('4ppppp/8/8/8/8/8/8/8'), {
        message: 'Invalid FEN: rank 8 has more than 8 squares',
      });
    });

    it('leaves the board unchanged when the FEN is invalid', () => {
      const board = new FENBoard('start');
      const rows = board.board;
      assert.throws(() => { board.fen = '8/8/8/8/8/8/8/8/8'; });
      assert.throws(() => { board.fen = 'ppppppppp/8/8/8/8/8/8/8'; });
      assert.equal(board.fen, START_FEN);
      assert.equal(board.board, rows);
    });

    it('throws on the digits 0 and 9', () => {
      assert.throws(() => new FENBoard('9/8/8/8/8/8/8/8'), {
        message: 'Invalid FEN: unexpected "9" in rank 8',
      });
      assert.throws(() => new FENBoard('8/8/8/8/8/8/8/0rnbqkbnr'), {
        message: 'Invalid FEN: unexpected "0" in rank 1',
      });
    });
  });

  describe('fen getter', () => {
    it('round-trips a complex position', () => {
      const scholarsMate = 'r1bqk1nr/pppp1Qpp/2n5/2b1p3/2B1P3/8/PPPP1PPP/RNB1K1NR';
      const board = new FENBoard(scholarsMate);
      assert.equal(board.fen, scholarsMate);
    });

    it('collapses consecutive empty squares', () => {
      const board = new FENBoard();
      board.put('a1', 'K');
      board.put('h1', 'k');
      board.put('d5', 'Q');
      assert.equal(board.fen, '8/8/8/3Q4/8/8/8/K6k');
    });
  });

  describe('piece()', () => {
    it('returns the piece at a given square', () => {
      const board = new FENBoard('start');
      assert.equal(board.piece('a1'), 'R');
      assert.equal(board.piece('e8'), 'k');
      assert.equal(board.piece('d2'), 'P');
      assert.equal(board.piece('d7'), 'p');
    });

    it('returns empty string for an empty square', () => {
      const board = new FENBoard('start');
      assert.equal(board.piece('e4'), '');
    });

    it('returns empty string on a board created without a FEN', () => {
      const board = new FENBoard();
      assert.equal(board.piece('a1'), '');
    });

    it('throws on an invalid square', () => {
      const board = new FENBoard('start');
      for (const square of ['z9', 'a9', 'i1', 'A1', 'a', 'a10', '', 12, undefined]) {
        assert.throws(() => board.piece(square), {
          message: `Invalid square: ${JSON.stringify(square)}`,
        });
      }
    });
  });

  describe('put()', () => {
    it('places a piece on the board', () => {
      const board = new FENBoard();
      board.put('a4', 'Q');
      assert.equal(board.piece('a4'), 'Q');
      assert.equal(board.fen, '8/8/8/8/Q7/8/8/8');
    });

    it('overwrites an existing piece', () => {
      const board = new FENBoard('start');
      board.put('a1', 'q');
      assert.equal(board.piece('a1'), 'q');
    });

    it('throws on an invalid square', () => {
      const board = new FENBoard();
      assert.throws(() => board.put('i1', 'Q'), { message: 'Invalid square: "i1"' });
      assert.equal(board.fen, EMPTY_FEN);
    });

    it('throws on a piece that is not a single character', () => {
      const board = new FENBoard();
      for (const piece of ['QQ', '1', '/', ' ', undefined, null, 5]) {
        assert.throws(() => board.put('a1', piece), {
          message: `Invalid piece: ${JSON.stringify(piece)}`,
        });
      }
      assert.equal(board.fen, EMPTY_FEN);
    });
  });

  describe('clear()', () => {
    it('removes a piece from the board', () => {
      const board = new FENBoard('start');
      board.clear('a1');
      assert.equal(board.piece('a1'), '');
    });

    it('is a no-op on an empty square', () => {
      const board = new FENBoard('start');
      board.clear('e4');
      assert.equal(board.fen, START_FEN);
    });
  });

  describe('move()', () => {
    it('moves a piece from one square to another', () => {
      const board = new FENBoard('start');
      board.move('d2', 'd4');
      assert.equal(board.piece('d4'), 'P');
      assert.equal(board.piece('d2'), '');
    });

    it('captures whatever is on the destination square', () => {
      const board = new FENBoard('start');
      board.move('d2', 'd7');
      assert.equal(board.piece('d7'), 'P');
      assert.equal(board.piece('d2'), '');
    });

    it('keeps the piece when moving a piece to its own square', () => {
      const board = new FENBoard('start');
      board.move('d2', 'd2');
      assert.equal(board.piece('d2'), 'P');
      assert.equal(board.fen, START_FEN);
    });

    it('throws when moving from an empty square', () => {
      const board = new FENBoard();
      assert.throws(() => board.move('a1', 'a2'), {
        message: 'Move Error: the from square was empty',
      });
    });

    it('throws on an invalid square and leaves the board untouched', () => {
      const board = new FENBoard('start');
      assert.throws(() => board.move('d2', 'd9'), { message: 'Invalid square: "d9"' });
      assert.throws(() => board.move('d0', 'd4'), { message: 'Invalid square: "d0"' });
      assert.equal(board.fen, START_FEN);
    });
  });
});
