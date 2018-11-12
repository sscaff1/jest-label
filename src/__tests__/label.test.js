// MOCK types and traits
const label = require('../label');
const traits = {
  SLOW: 'Slow'
};
const types = {
  INTEGRATION: 'Integration',
  UNIT: 'Unit'
};

describe('label', () => {
  describe(label({ name: 'should be successfully applied', type: types.INTEGRATION }), () => {
    const testMockLabel = { name: 'mock' };
    const arrayOfTests = [
      [{ ...testMockLabel, type: types.UNIT }],
      [{ ...testMockLabel, type: types.INTEGRATION, traits: traits.SLOW }],
      [{ ...testMockLabel, type: types.INTEGRATION, traits: [traits.SLOW] }]
    ];

    test.each(arrayOfTests)('for %p should match snapshot', labelPassed => {
      expect(label(labelPassed)).toMatchSnapshot();
    });
  });

  describe(label({ name: 'should throw an error when attempted', type: types.INTEGRATION }), () => {
    const testMockLabel = { name: 'mock' };
    const arrayOfTests = [
      [{ ...testMockLabel }],
      [{ ...testMockLabel, type: 'fake' }],
      [{ ...testMockLabel, type: null }],
      [{ ...testMockLabel, type: types.UNIT, traits: [] }],
      [{ ...testMockLabel, type: types.UNIT, traits: ['__fake__'] }],
      [{ ...testMockLabel, type: types.UNIT, traits: '__fake__' }]
    ];

    test.each(arrayOfTests)('for %p should match error snapshot', labelPassed => {
      expect(() => label(labelPassed)).toThrowErrorMatchingSnapshot();
    });
  });
});
