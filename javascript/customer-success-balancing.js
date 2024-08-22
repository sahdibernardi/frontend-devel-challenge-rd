function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  const availableCS = customerSuccess
    .filter(cs => !customerSuccessAway.includes(cs.id))
    .sort((a, b) => a.score - b.score);

  const csCustomerCount = new Map();
  availableCS.forEach(cs => csCustomerCount.set(cs.id, 0));

  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid].score < target) {
        left = mid + 1;
      } else if (arr[mid].score > target) {
        right = mid - 1;
      } else {
        return mid;
      }
    }
    return left;
  }

  customers.forEach(customer => {
    const index = binarySearch(availableCS, customer.score);
    if (index < availableCS.length) {
      const csId = availableCS[index].id;
      csCustomerCount.set(csId, csCustomerCount.get(csId) + 1);
    }
  });

  let maxCustomers = 0;
  let csWithMostCustomers = 0;
  let tie = false;

  for (const [csId, count] of csCustomerCount.entries()) {
    if (count > maxCustomers) {
      maxCustomers = count;
      csWithMostCustomers = csId;
      tie = false;
    } else if (count === maxCustomers) {
      tie = true;
    }
  }

  return tie ? 0 : csWithMostCustomers;
}



exports.customerSuccessBalancing = customerSuccessBalancing;
exports.customerSuccessBalancingOld = customerSuccessBalancingOld;
