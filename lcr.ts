import _ from 'lodash';
import { PositionChips, GameState } from './types';
import { calculateProbabilities } from './probability';

export const getProblemParameters = (): PositionChips => {
  const {
    argv: [, , ...positionChipsStrs]
  } = process;

  const chipsAtPosition = _.map(positionChipsStrs, _.parseInt);

  if (chipsAtPosition.length <= 1) {
    throw new Error('Error: Length of <chips>... must be greater than 1.');
  }

  if (!chipsAtPosition.every(c => _.isInteger(c) && c >= 0)) {
    throw new Error(
      'Error: <chips>... must be a list of nonnegative integers.'
    );
  }

  return chipsAtPosition;
};

const main = () => {
  const chipsAtPosition = getProblemParameters();

  chipsAtPosition.forEach((c, i) =>
    console.log(`Position ${i + 1} starts with ${c} chip(s).`)
  );

  const probabilities = calculateProbabilities(
    new GameState(0, chipsAtPosition)
  );

  probabilities.forEach((p, i) =>
    console.log(
      `The probability of position ${i + 1} winning is ${_.round(p * 100, 5)}%.`
    )
  );
};

main();
