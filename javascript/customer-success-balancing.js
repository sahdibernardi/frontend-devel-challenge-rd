/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */

function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  const availableCSs = customerSuccess.filter((cs) => customerSuccessAway.includes(cs.id) === false);

  availableCSs.sort((csa, csb) => csa.score - csb.score);

  availableCSs.forEach((cs) => {
    cs.customers = [];
  })

  customers.forEach((customer) => {
    const correctCS = availableCSs.find((cs) => 
      cs.score >= customer.score
    );

    if(correctCS) {
      correctCS.customers.push(customer.id);
    }
  })

  let maxCustomersCount = 0;
  let maxCustomersCS = null;
  let tiedmaxCustomersCS = null;

  availableCSs.forEach(cs => {
    const customersCount = cs.customers.length;
    if (customersCount > maxCustomersCount) {
      maxCustomersCount = customersCount;
      maxCustomersCS = cs;
    }
    if (customersCount === maxCustomersCount) {
      tiedmaxCustomersCS = cs;
    }
  });

  if (!maxCustomersCS || tiedmaxCustomersCS !== maxCustomersCS){
    return(0);
  }

  return(maxCustomersCS.id)
}

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt){
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8", () => {
  const css = mapEntities([60, 40, 95, 75]);
  const customers = mapEntities([90, 70, 20, 40, 60, 10]);
  const csAway = [2, 4];
  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});
