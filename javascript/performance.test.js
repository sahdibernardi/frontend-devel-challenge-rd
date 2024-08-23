const { customerSuccessBalancing } = require("./customer-success-balancing");
const { customerSuccessBalancingOld } = require("./old-version");
const { mapEntities, buildSizeEntities, arraySeq } = require("./utils");
const { performance } = require('perf_hooks');

describe("Performance Test", () => {
  describe("should handle large datasets efficiently", () => {
    const numCS = 10000;
    const numCustomers = 1000000;
    const maxAllowedTime = 5000;
    
    const css = mapEntities(arraySeq(numCS, 1));
    const customers = buildSizeEntities(numCustomers, numCS - 1);
    const csAway = arraySeq(Math.floor(numCS / 2), 1);

    const startTimeOriginal = performance.now();
    const resultOriginal = customerSuccessBalancingOld(css, customers, csAway);
    const endTimeOriginal = performance.now();
    const durationOriginal = endTimeOriginal - startTimeOriginal;

    const startTimeOptimized = performance.now();
    const resultOptimized = customerSuccessBalancing(css, customers, csAway);
    const endTimeOptimized = performance.now();
    const durationOptimized = endTimeOptimized - startTimeOptimized;

    console.log(`Original implementation time: ${durationOriginal.toFixed(2)}ms`);
    console.log(`Optimized implementation time: ${durationOptimized.toFixed(2)}ms`);

    it("should return the same result", () => {
      expect(resultOptimized).toEqual(resultOriginal);
    });

    it("should be faster than the original implementation", () => {
    expect(durationOptimized).toBeLessThan(durationOriginal);
    })

    it("should be faster than the max allowed time", () => {
    expect(durationOptimized).toBeLessThan(maxAllowedTime);
    })
  });
});
