//https://school.programmers.co.kr/learn/courses/30/lessons/42584
import { performanceTest } from "../perFormanceTest.js";

function solution(prices) {
  var answer = [];
  for (let i = 0; i < prices.length; i++) {
    let cnt = 0;
    for (let j = i + 1; j < prices.length; j++) {
      cnt++;
      if (prices[i] > prices[j]) break;
    }
    answer.push(cnt);
  }
  return answer;
}

const prices = [1, 2, 3, 2, 3];
console.log(solution(prices)); // [4, 3, 1, 1, 0]
performanceTest(solution, prices);
