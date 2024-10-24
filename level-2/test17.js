// https://school.programmers.co.kr/learn/courses/30/lessons/92335
import { performanceTest } from "../perFormanceTest.js";
function solution(n, k) {
  const num = n.toString(k).split("0"); // k진수로 변환
  const t = num.reduce((acc, cur) => {
    if (cur.length > 0 && primeNumber(Number(+cur))) {
      acc++;
    }
    return acc;
  }, 0);

  return t;
}

function primeNumber(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
function digit(n, k) {
  // 나머지를 구해 자릿수를 결정 하고  나눈 몫을 사용해 더 높은 자릿수를구함
  let result = "";
  while (n > 0) {
    result = (n % k) + result;
    n = Math.floor(n / k);
  }
  return result;
  // n.toString(k); 이렇게 할 수 도 있다라는 것을 알았다. 심지어 빨라
}

const n = 110011;
const k = 10;

// console.log(solution(n, k)); // 211020101011
performanceTest(solution, [n, k]); // 0.0001 ms
