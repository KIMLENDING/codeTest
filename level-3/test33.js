//https://school.programmers.co.kr/learn/courses/30/lessons/12938
function solution(n, s) {
  if (s < n) return [-1]; // 합이 숫자 개수보다 작으면 불가능

  const q = Math.floor(s / n);
  const r = s % n;

  const result = Array(n).fill(q);
  for (let i = 0; i < r; i++) {
    result[n - 1 - i]++;
  }

  return result;
}
const n = 3;
const s = 10;
console.log(solution(n, s)); // [4, 5]
