import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import FENBoard from './fen-chess-board.js';

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

describe('FENBoard', () => {
  describe('constructor', () => {
    it('creates an empty board when no argument is given', () => {
      const board = new FENBoard();
      assert.equal(board.fen, '8/8/8/8/8/8/8/8');
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

  describe('fen setter', () => {
    it('resets the board when setting a new FEN', () => {
      const board = new FENBoard(START_FEN);
      board.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/8';
      assert.equal(board.fen, 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/8');
    });

    it('clears the board when set to falsy value', () => {
      const board = new FENBoard(START_FEN);
      board.fen = '';
      assert.equal(board.fen, '8/8/8/8/8/8/8/8');
    });

    it('ignores everything after the first space in a full FEN string', () => {
      const board = new FENBoard('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e3 0 1');
      assert.equal(board.fen, 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR');
    });
  });

  describe('fen getter', () => {
    it('round-trips a complex position', () => {
      const scholarsMate = 'r1bqk1nr/pppp1Qpp/2n5/2b1p3/2B1P3/8/PPPP1PPP/RNB1K1NR';
      const board = new FENBoard(scholarsMate);
      assert.equal(board.fen, scholarsMate);
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
  });

  describe('put()', () => {
    it('places a piece on the board', () => {
      const board = new FENBoard();
      board.put('a4', 'Q');
      assert.equal(board.piece('a4'), 'Q');
    });

    it('overwrites an existing piece', () => {
      const board = new FENBoard('start');
      board.put('a1', 'q');
      assert.equal(board.piece('a1'), 'q');
    });
  });

  describe('clear()', () => {
    it('removes a piece from the board', () => {
      const board = new FENBoard('start');
      board.clear('a1');
      assert.equal(board.piece('a1'), '');
    });
  });

  describe('move()', () => {
    it('moves a piece from one square to another', () => {
      const board = new FENBoard('start');
      board.move('d2', 'd4');
      assert.equal(board.piece('d4'), 'P');
      assert.equal(board.piece('d2'), '');
    });

    it('throws when moving from an empty square', () => {
      const board = new FENBoard();
      assert.throws(() => board.move('a1', 'a2'), {
        message: 'Move Error: the from square was empty',
      });
    });
  });
});
