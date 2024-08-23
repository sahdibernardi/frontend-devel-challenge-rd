function customerSuccessBalancingOld(
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

module.exports = {
  customerSuccessBalancingOld
};
