const types = global.types || { INTEGRATION: 'Integration', UNIT: 'Unit' };
const traits = global.traits || { SLOW: 'Slow' };

function withType(type) {
  if (
    Object.keys(types)
      .map(typeKey => types[typeKey])
      .includes(type)
  ) {
    return `Test Type: ${type}`;
  }
  return '';
}

function withTraits(passedTraitsUn) {
  const passedTraits = typeof passedTraitsUn === 'string' ? [passedTraitsUn] : passedTraitsUn;
  if (!Array.isArray(passedTraits) || !passedTraits.length) {
    return '';
  }
  const traitsToLabel = passedTraits.filter(trait =>
    Object.keys(traits)
      .map(traitKey => traits[traitKey])
      .includes(trait)
  );
  return traitsToLabel.length ? `Test Traits: ${traitsToLabel.join(', ').trim()}` : '';
}

function label({ name, type, traits: passedTraits }) {
  const typeLabel = withType(type);
  const traitsLabel = withTraits(passedTraits);
  if (!typeLabel) {
    throw new Error('All tests must be labeled with a valid type');
  }

  if (passedTraits && !traitsLabel) {
    throw new Error('You passed invalid traits');
  }

  if (traitsLabel) {
    return `(${typeLabel}, ${traitsLabel}) ${name}`;
  }
  return `(${typeLabel}) ${name}`;
}

module.exports = label;
