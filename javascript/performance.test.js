const { customerSuccessBalancing } = require("./customer-success-balancing");
const { customerSuccessBalancingOld } = require("./customer-success-balancing-optimized");

// ... (seus testes existentes)

describe("Performance Test", () => {
  it("should handle large datasets efficiently", () => {
    const numCS = 10000;
    const numCustomers = 1000000;
    
    // Gerar dados de teste
    const css = mapEntities(arraySeq(numCS, 1));
    const customers = buildSizeEntities(numCustomers, numCS - 1);
    const csAway = arraySeq(Math.floor(numCS / 2), 1);

    // Medir tempo para a implementação original
    const startTimeOriginal = performance.now();
    const resultOriginal = customerSuccessBalancingOld(css, customers, csAway);
    const endTimeOriginal = performance.now();
    const durationOriginal = endTimeOriginal - startTimeOriginal;

    // Medir tempo para a implementação otimizada
    const startTimeOptimized = performance.now();
    const resultOptimized = customerSuccessBalancing(css, customers, csAway);
    const endTimeOptimized = performance.now();
    const durationOptimized = endTimeOptimized - startTimeOptimized;

    // Verificar se os resultados são iguais
    expect(resultOptimized).toEqual(resultOriginal);

    // Imprimir resultados de performance
    console.log(`Original implementation time: ${durationOriginal.toFixed(2)}ms`);
    console.log(`Optimized implementation time: ${durationOptimized.toFixed(2)}ms`);

    // Verificar se a implementação otimizada é mais rápida
    expect(durationOptimized).toBeLessThan(durationOriginal);

    // Definir um limite de tempo máximo (ajuste conforme necessário)
    const maxAllowedTime = 5000; // 5 segundos
    expect(durationOptimized).toBeLessThan(maxAllowedTime);
  });
});
