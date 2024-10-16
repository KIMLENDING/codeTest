// https://school.programmers.co.kr/learn/courses/30/lessons/12924
import { performanceTest } from "../perFormanceTest.js";

function solution(n) {
  var answer = 0;
  var sum = 0;
  if (n === 1) return 1;
  //   for (let i = 1; i <= Math.round(n / 2); i++) {}
  for (let i = 1; i <= Math.round(n / 2); i++) {
    for (let j = i; j <= Math.round(n / 2); j++) {
      sum += j;
      if (sum >= n) {
        if (sum === n) {
          answer++;
        }
        sum = 0;
        break;
      }
    }
  }

  return answer + 1; // +1은 자기 자신
}

const solution1 = (n) => {
  // 수학적인 방법 풀이
  // n을 연속된 자연수로 표현하는 방법의 수는 n의 홀수 약수의 개수와 같다.
  var answer = 0;
  for (var i = 1; i <= n; i++) {
    if (n % i == 0 && i % 2 == 1) {
      // 약수이면서 홀수인 경우
      answer++;
    }
  }
  return answer;
};

const n = 999999;
performanceTest(solution, [n]); //Average execution time for solution: 4.7730 ms
performanceTest(solution1, [n]); //Average execution time for solution1: 1.3910 ms
