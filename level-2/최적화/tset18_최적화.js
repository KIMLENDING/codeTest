function optimizedSolution(queue1, queue2) {
  const totalSum = [...queue1, ...queue2].reduce((acc, cur) => acc + cur, 0);
  if (totalSum % 2 !== 0) return -1; // 총합이 홀수면 균등 분할 불가

  const targetSum = totalSum / 2;
  let sumQ1 = queue1.reduce((acc, cur) => acc + cur, 0);
  let count = 0;
  let pointer1 = 0,
    pointer2 = queue1.length;

  const combinedQueue = [...queue1, ...queue2];
  const maxOperations = queue1.length * 3;

  while (count < maxOperations) {
    if (sumQ1 === targetSum) return count;

    if (sumQ1 > targetSum) {
      sumQ1 -= combinedQueue[pointer1++];
    } else {
      sumQ1 += combinedQueue[pointer2++];
    }

    count++;
  }

  return -1;
}
