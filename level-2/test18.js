// https://school.programmers.co.kr/learn/courses/30/lessons/118667
import { performanceTest } from "../perFormanceTest.js";
function solution(queue1, queue2) {
  let count = 0;
  let arr = [...queue1, ...queue2];
  const sumArr = arr.reduce((acc, cur) => acc + cur, 0);
  const avg = sumArr / 2;
  let sum1 = queue1.reduce((acc, cur) => acc + cur, 0);

  if (sumArr % 2 !== 0) return -1; // 총합이 홀수면 불가능
  let s = 0;
  let e = queue1.length;
  while (true) {
    if (s === arr.length || e === arr.length) return -1; // 끝까지 갔는데 없으면 -1
    if (sum1 === avg) return count;
    if (sum1 > avg) {
      // 평균보다 크면 빼준다
      sum1 -= arr[s++]; // 앞 배열에서 빼준다
    } else {
      // 평균보다 작으면
      sum1 += arr[e++]; // 뒤 배열에서 더해준다
    }
    count++;
  }
}
// 평균에서 큰 배열에서 뺀다

const queue1 = [3, 2, 7, 2];
const queue2 = [4, 6, 5, 1];

console.log(solution(queue1, queue2)); // 2
// performanceTest(solution, [queue1, queue2]); // 0.0001 ms
