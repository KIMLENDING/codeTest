// https://school.programmers.co.kr/learn/courses/30/lessons/12907
function solution(n, money) {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1; // 0원을 만드는 방법은 1가지 (아무 동전도 사용하지 않는 경우)

  for (const coin of money) {
    for (let j = coin; j <= n; j++) {
      dp[j] = (dp[j] + dp[j - coin]) % 1000000007;
    }
  }

  return dp[n];
}

const n = 5;
const money = [1, 2, 5];
console.log(solution(n, money));

/**
 *
 * 조합의 모양을 찾는게 아니라 조합의 개수를 찾는 것
 *
 * 1. dp 배열 초기화
 * dp[i]: i 원을 만들 수 있는 경우의 수
 * dp[0] = 1 (0원을 만들 방법은 아무 동전도 사용하지 않을 때 1가지)
 *
 * 2. 각 동전에 대해 dp 업데이트
 * dp[i] += dp[i - coin]
 * 'i원을 만들 수 있는 방법의 개수를 누적'
 * i원에서 coin을 빼면 남은 금액으로 만들 수 있는 방법임
 * dp[i]에 이 값을 추가하면 'coin을 사용해서 i원을 만드는 방법이 추가' 됨
 *
 *
 */
