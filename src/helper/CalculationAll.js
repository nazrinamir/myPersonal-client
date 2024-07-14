// Helper function to calculate utilisation percentage
const usage = {
  pi: "",
  gf: "",
  m1: "",
  m2: "",
  m3: "",
};

export const calcPercentageIncrease = (startValue, currentValue) => {
  if (!startValue || !currentValue) {
    return null;
  }

  const start = parseFloat(startValue.replace(/,/g, ""));
  const current = parseFloat(currentValue.replace(/,/g, ""));

  if (isNaN(start) || isNaN(current) || current === 0) {
    return null;
  }

  const percentResult = ((current - start) / start) * 100;
  const growthResult = 1 + percentResult / 100;
  const m1Result = currentValue * growthResult;
  const m2Result = m1Result * growthResult;
  const m3Result = m2Result * growthResult;

  usage.pi = percentResult.toFixed(2) + "%";
  usage.gf = growthResult.toFixed(2);
  usage.m1 = m1Result.toFixed(2);
  usage.m2 = m2Result.toFixed(2);
  usage.m3 = m3Result.toFixed(2);
  return usage;
};

export const calcUtilisation = (used, totalSize) => {
  if (!used || !totalSize) {
    return null;
  }

  const totSize = parseFloat(totalSize.replace(/,/g, ""));
  const used_ = parseFloat(used.replace(/,/g, ""));

  const utilResult = (used_ / totSize) * 100;
  return utilResult.toFixed(2);


};
