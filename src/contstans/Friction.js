const Frictions = ['DUMMY', 'POOR', 'MEDIUMPOOR', 'MEDIUM', 'MEDIUMGOOD', 'GOOD'];

const getFriction = friction => {
  return Frictions[friction];
};

module.exports = getFriction;
