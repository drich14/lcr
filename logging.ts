import _ from 'lodash';
import { Die, Roll, GameState, Equation, Expression } from './types';

export const printDie = (die: Die): string => {
  switch (die) {
    case Die.Left:
      return 'L';
    case Die.Center:
      return 'C';
    case Die.Right:
      return 'R';
    case Die.Dot:
      return '.';
  }
};

export const printRoll = (roll: Roll): string => {
  return roll.map(printDie).join('');
};

export const printState = ({ turn, chipsAtPosition }: GameState): string => {
  const chipStrs = chipsAtPosition.map(_.toString);
  chipStrs[turn] = `(${chipStrs[turn]})`;
  return chipStrs.join('');
};

export const printExpression = (expr: Expression): string => {
  return expr.terms
    .map(
      ({ probability, state }) =>
        `${_.round(probability, 2)}*${printState(state)}`
    )
    .join('+');
};

export const printEq = ({ state, expression }: Equation): string => {
  return `${printState(state)}=${printExpression(expression)}`;
};
