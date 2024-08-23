const { customerSuccessBalancing, customerSuccessBalancingOld } = require("./customer-success-balancing");
const { mapEntities, buildSizeEntities, arraySeq } = require("./utils");


describe("Performance Test", () => {
  it("should handle large datasets efficiently", () => {
    const numCS = 10000;
    const numCustomers = 1000000;
    
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

    expect(resultOptimized).toEqual(resultOriginal);

    console.log(`Original implementation time: ${durationOriginal.toFixed(2)}ms`);
    console.log(`Optimized implementation time: ${durationOptimized.toFixed(2)}ms`);

    expect(durationOptimized).toBeLessThan(durationOriginal);

    const maxAllowedTime = 5000;
    expect(durationOptimized).toBeLessThan(maxAllowedTime);
  });
});
