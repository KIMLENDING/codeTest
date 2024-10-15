//https://school.programmers.co.kr/learn/courses/30/lessons/12945
import { performanceTest } from "../perFormanceTest.js";
// 재귀 함수와 메모이제이션을 사용한 피보나치 계산
const f = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n < 2) return n;
  memo[n] = f(n - 1, memo) + f(n - 2, memo);
  return memo[n];
};

function solution(n) {
  // n이 10000이면 스택 오버플로우 발생
  return f(n) % 1234567;
}

// 반복문과 배열을 사용한 피보나치 계산
function solution1(n) {
  // n = 100000 일때 Average execution time for solution1: 1.6068 ms
  var result = [0, 1];
  while (result.length !== n + 1) {
    var fibonacci =
      (result[result.length - 2] + result[result.length - 1]) % 1234567;
    result.push(fibonacci);
  }
  return result[n];
}
// 반복문과 상수 공간을 사용한 피보나치 계산
function solution2(n) {
  // n = 100000 일때 Average execution time for solution2: 0.2387 ms
  if (n < 2) return n;
  let a = 0,
    b = 1,
    c;
  for (let i = 2; i <= n; i++) {
    c = (a + b) % 1234567;
    a = b;
    b = c;
  }
  return b;
}

const n = 100000;
performanceTest(solution2, [n]);
