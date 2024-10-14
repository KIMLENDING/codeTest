import { performanceTest } from "../../perFormanceTest.js";
function solution(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = []; // 가격의 인덱스를 저장할 스택

  for (let i = 0; i < prices.length; i++) {
    // 현재 가격이 스택의 마지막 인덱스의 가격보다 낮으면
    while (stack.length && prices[i] < prices[stack[stack.length - 1]]) {
      const j = stack.pop();
      answer[j] = i - j;
    }
    stack.push(i);
  }

  // 스택에 남아있는 인덱스는 가격이 끝까지 떨어지지 않았으므로
  while (stack.length) {
    const j = stack.pop();
    answer[j] = prices.length - j - 1;
  }

  return answer;
}

// 예시 사용
const prices = [1, 2, 3, 2, 3];
console.log(solution(prices)); // 출력: [4, 3, 1, 1, 0]
performanceTest(solution, prices);
