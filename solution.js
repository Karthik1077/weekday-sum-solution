function solution(D) {
  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const sums = Object.fromEntries(week.map(d => [d, null]));

  for (let d in D) {
    let idx = new Date(d).getDay();
    idx = idx === 0 ? 6 : idx - 1;
    sums[week[idx]] = (sums[week[idx]] ?? 0) + D[d];
  }

  for (let i = 0; i < 7; i++) {
    if (sums[week[i]] === null) {
      let p = (i - 1 + 7) % 7, n = (i + 1) % 7;
      while (sums[week[p]] === null) p = (p - 1 + 7) % 7;
      while (sums[week[n]] === null) n = (n + 1) % 7;
      sums[week[i]] = Math.floor((sums[week[p]] + sums[week[n]]) / 2);
    }
  }
  return sums;
}

module.exports = solution;
