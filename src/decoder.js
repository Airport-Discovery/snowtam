const moment = require('moment');
const SnowtamItem = require('./SnowtamItem');
const RunwayState = require('./contstans/RunwayState');
const getFriction = require('./contstans/Friction');

const SNOWTAM_LABELS = {
  AERODROME: 'Aerodrome',
  OBSERVATION_DATE: 'Observation date',
  RUNWAY: 'Runway',
  CLEARED_RUNWAY_LENGTH: 'Cleared runway length',
  CLEARED_RUNWAY_WIDTH: 'Cleared runway width',
  THRESHOLD: 'Threshold',
  MID_RUNWAY: 'Mid runway',
  ROLL_OUT: 'Roll out',
  NOT_MEASURED: 'Not measured',
  NOT_SIGNIFICANT: 'Not significant',
  AVRAGE_THICKNESS: 'Average thickness',
  FIRCTION_COEFFICIENT: 'Friction coefficient',
  RUNWAY_CONDITIONS: 'Runway conditions',
  CRITICAL_SNOW_BANKS: 'Critical Snow Banks',
  NOTES: 'Notes'
};

const preocessSnowtam = (attr, value, snowtam) => {
  const snowtamItem = new SnowtamItem(attr, value);

  let split = [];

  switch (snowtamItem.attr) {
    case 'A': {
      snowtamItem.name = SNOWTAM_LABELS.AERODROME;
      snowtamItem.value = value;
      break;
    }
    case 'B': {
      const date = moment(value, 'MMDDhhmm');
      snowtamItem.name = SNOWTAM_LABELS.OBSERVATION_DATE;
      snowtamItem.value = date.format();
      break;
    }
    case 'C': {
      snowtamItem.name = SNOWTAM_LABELS.RUNWAY;
      snowtamItem.value = value;
      break;
    }
    case 'D':
      snowtamItem.name = SNOWTAM_LABELS.CLEARED_RUNWAY_LENGTH;
      snowtamItem.value = `${value} meters`;
      break;
    case 'E': {
      snowtamItem.name = SNOWTAM_LABELS.CLEARED_RUNWAY_WIDTH;
      snowtamItem.value = `${value.replace('R', '').replace('L', '')} meters cleared on the ${
        value.includes('R') ? 'right' : 'left'
      }`;
      break;
    }
    case 'F': {
      split = value.split('/');
      let finalValue = '';

      split.forEach((state, stateIndex) => {
        if (stateIndex === 0) {
          finalValue += SNOWTAM_LABELS.THRESHOLD;
        }
        if (stateIndex === 1) {
          finalValue += SNOWTAM_LABELS.MID_RUNWAY;
        }
        if (stateIndex === 2) {
          finalValue += SNOWTAM_LABELS.ROLL_OUT;
        }

        let runwayState = RunwayState.runwayStatues[10]; // UNKNOWN

        try {
          runwayState = RunwayState.getRunwayState(Number(state));
        } catch (e) {
          console.log(e);
        }

        finalValue += ` ${runwayState} / `;
      });

      snowtamItem.value = finalValue;
      snowtamItem.name = SNOWTAM_LABELS.RUNWAY_CONDITIONS;

      break;
    }

    case 'G': {
      split = value.split('/');

      let finalValueG = '';

      split.forEach((thickness, thicknessIndex) => {
        if (thicknessIndex === 0) {
          finalValueG += SNOWTAM_LABELS.THRESHOLD;
        }
        if (thicknessIndex === 1) {
          finalValueG += SNOWTAM_LABELS.MID_RUNWAY;
        }
        if (thicknessIndex === 2) {
          finalValueG += SNOWTAM_LABELS.ROLL_OUT;
        }

        if (thickness !== 'XX') {
          finalValueG += ` ${thickness}mm`;
        } else {
          finalValueG += ` ${SNOWTAM_LABELS.NOT_SIGNIFICANT}`;
        }
        finalValueG += ' / ';
      });

      snowtamItem.value = finalValueG;
      snowtamItem.name = SNOWTAM_LABELS.AVRAGE_THICKNESS;

      break;
    }

    case 'H': {
      split = value.split('/');
      let finalValueH = '';

      split.forEach((friction, frictionIndex) => {
        if (frictionIndex === 0) {
          finalValueH += SNOWTAM_LABELS.THRESHOLD;
        }
        if (frictionIndex === 1) {
          finalValueH += SNOWTAM_LABELS.MID_RUNWAY;
        }
        if (frictionIndex === 2) {
          finalValueH += SNOWTAM_LABELS.ROLL_OUT;
        }

        const score = Number(friction);
        let pscore = 0;
        if (score > 40) {
          pscore = 5;
        } else if (score >= 36 && score <= 39) {
          pscore = 4;
        } else if (score >= 30 && score <= 35) {
          pscore = 3;
        } else if (score >= 26 && score <= 29) {
          pscore = 2;
        } else if (score <= 25) {
          pscore = 1;
        }

        finalValueH += ` ${getFriction(pscore)} / `;
      });

      snowtamItem.value = finalValueH;
      snowtamItem.name = SNOWTAM_LABELS.FIRCTION_COEFFICIENT;

      break;
    }
    case 'J': {
      split = value.split('/');

      snowtamItem.name = SNOWTAM_LABELS.CRITICAL_SNOW_BANKS;
      snowtamItem.value = `Snow banks are ${split[0]} centimeters high and ${split[1]
        .replace('R', '')
        .replace('L', '')} meters from the ${split[1].includes('R') ? 'Right' : ''}${
        split[1].includes('L') ? 'Left' : ''
      } edge of the runway.`;
      break;
    }

    case 'T': {
      snowtamItem.name = SNOWTAM_LABELS.NOTES;
      snowtamItem.value = snowtam
        .split('T)')
        .pop()
        .trim()
        .replace(/(\r\n|\n|\r)/gm, '');
      snowtamItem.originalValue = snowtam
        .split('T)')
        .pop()
        .trim()
        .replace(/(\r\n|\n|\r)/gm, '');
      break;
    }

    default: {
      console.log('Unknown snowtam attribute: ' + attr);
    }
  }

  return snowtamItem;
};

const parseABC = snowtam => {
  const snowtamItems = [];

  const regex = '([ABCDEFGHJKLMPST])\\)\\s*([A-Z0-9\\/]*)[\\s\\t]*';
  const matches = snowtam.matchAll(regex);

  // eslint-disable-next-line no-restricted-syntax
  for (const match of matches) {
    const [full, key, value] = match;
    snowtamItems.push(preocessSnowtam(key.trim(), value.trim(), snowtam));
  }

  return snowtamItems;
};

const decode = snowtam => {
  const result = parseABC(snowtam);
  return result;
};

module.exports = decode;
