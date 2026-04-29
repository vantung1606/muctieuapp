const calculateSavingPlan = (targetAmount, currentAmount, deadline) => {
  const now = new Date();
  const targetDate = new Date(deadline);
  const diffTime = targetDate - now;
  
  if (diffTime <= 0) {
    return {
      daily: 0,
      weekly: 0,
      monthly: 0,
      daysRemaining: 0
    };
  }

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const remainingAmount = targetAmount - currentAmount;

  if (remainingAmount <= 0) {
    return {
      daily: 0,
      weekly: 0,
      monthly: 0,
      daysRemaining: diffDays
    };
  }

  const daily = remainingAmount / diffDays;
  const weekly = remainingAmount / (diffDays / 7);
  const monthly = remainingAmount / (diffDays / 30);

  return {
    daily: Math.round(daily * 100) / 100,
    weekly: Math.round(weekly * 100) / 100,
    monthly: Math.round(monthly * 100) / 100,
    daysRemaining: diffDays
  };
};

module.exports = {
  calculateSavingPlan
};
