/*
 * * F CONDITIONS ACROSS THE LENGTH OF THE TRACK
 * Observed on each third of the runway from the threshold which bears the lowest runway identification number:
 * 0 - CLEAR AND DRY
 * 1 - DAMP
 * 2 - WET or WATER PATCHES
 * 3 - FROST OR HICE - thickness normally less than 1 mm - RIME OR FROSTCOVERED
 * 4 - DRY SNOW
 * 5 - WET SNOW
 * 6 - SLUSH
 * 7 - ICE
 * 8 - COMPACTED OR ROLLED SNOW
 * 9 - FROZEN RUTS OR RIDGES
 * If more than one deposit is present on the same portion of the track, it is reported in sequence from 1 to 9
 * Special cases can be reported in the T field in plain language.
 *
 */

const runwayStatues = [
  'CLEAR',
  'DAMP',
  'WET',
  'RIME',
  'DRYSNOW',
  'WETSNOW',
  'SLUSH',
  'ICE',
  'COMPACTED',
  'FROZENRUTS',
  'UNKNOWN'
];

const getRunwayState = runwayState => {
  return runwayStatues[runwayState] ? runwayStatues[runwayState] : runwayStatues[10];
};

module.exports = { runwayStatues, getRunwayState };
