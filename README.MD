# ❄️ SNOWTAM ✈️

SNOWTAM Decoder, and utilities for working with SNOWTAM data

## Installation

```
yarn add @airport-discovery/snowtam
```

## Usage

For now the module exposes one main function, `decode`, which accepts a SNOWTAM string.

## `decode`

```javascript
const snowtam = require('@airport-discovery/snowtam');
const result = snowtam.decode(`SWES0698 ESSB 12261815 COR (SNOWTAM 0698 
        A) ESSB B) 12261815  C) 12 D) 2000 E) 20R F) 1/1/1 G) XX/XX/XX H) 5/5/5 J) 70/10L                
        T) RWY 12 BA 67/72/67. RWY 12 COVER 100 PERCENT. APRON SANDED.)
        CREATED: 26 DEC 2019 18:32:00 SOURCE: EUECYIYN`);
```

## Output

An array of `SnowtamItem` objects, which are defined as follows:

```json
[
  {
    "attr": "A",
    "originalValue": "ESSB",
    "name": "Aerodrome",
    "value": "ESSB"
  },
  {
    "attr": "B",
    "originalValue": "12261815",
    "name": "Observation date",
    "value": "2022-12-26T18:15:00+03:00"
  },
  {
    "attr": "C",
    "originalValue": "12",
    "name": "Runway",
    "value": "12"
  },
  {
    "attr": "D",
    "originalValue": "2000",
    "name": "Cleared runway length",
    "value": "2000 meters"
  },
  {
    "attr": "E",
    "originalValue": "20R",
    "name": "Cleared runway width",
    "value": "20 meters cleared on the right"
  },
  {
    "attr": "F",
    "originalValue": "1/1/1",
    "value": "Threshold DAMP / Mid runway DAMP / Roll out DAMP / ",
    "name": "Runway conditions"
  },
  {
    "attr": "G",
    "originalValue": "XX/XX/XX",
    "value": "Threshold Not significant / Mid runway Not significant / Roll out Not significant / ",
    "name": "Average thickness"
  },
  {
    "attr": "H",
    "originalValue": "5/5/5",
    "value": "Threshold POOR / Mid runway POOR / Roll out POOR / ",
    "name": "Friction coefficient"
  },
  {
    "attr": "J",
    "originalValue": "70/10L",
    "name": "Critical Snow Banks",
    "value": "Snow banks are 70 centimeters high and 10 meters from the Left edge of the runway."
  },
  {
    "attr": "T",
    "originalValue": "RWY 12 BA 67/72/67. RWY 12 COVER 100 PERCENT. APRON SANDED.)  CREATED: 26 DEC 2019 18:32:00 SOURCE: EUECYIYN",
    "name": "Notes",
    "value": "RWY 12 BA 67/72/67. RWY 12 COVER 100 PERCENT. APRON SANDED.)  CREATED: 26 DEC 2019 18:32:00 SOURCE: EUECYIYN"
  }
]
```

## License

MIT ©
