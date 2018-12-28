'use strict';

export default {
  xfail: {
    // Tests with any of these feature flags are expected not to parse, unless they are whitelisted in xpassDespiteFeatures
    features: [],
    xpassDespiteFeatures: [],
    files: []
  }
};
