//https://school.programmers.co.kr/learn/courses/30/lessons/42898
// fill 사용시 주의점
// fill은 원시 타입이 안닌 경우 shallow copy를 하기 때문에 2차원 배열을 만들 때 주의해야 한다.
// Array.from을 사용하면 deep copy를 할 수 있다.
// 즉 []이런 객체를 만들어서 fill을 사용하면 같은 객체를 참조하기 때문에 문제가 발생한다.
// const a = Array(4).fill([]) => [[], [], [], []] 이렇게 만들어진다.
// a.push(1) => [[1], [1], [1], [1]] 이렇게 만들어진다. 그래서 조심해야 한다.

function solution(m, n, puddles) {
  const MOD = 1000000007;

  // DP 배열 초기화 (0, 0)부터 시작
  const dp = Array.from({ length: n }, () => Array(m).fill(0));
  dp[0][0] = 1; // 시작점

  // 물웅덩이 표시
  for (const [x, y] of puddles) {
    dp[y - 1][x - 1] = -1; // 물웅덩이를 -1로 표시 (1-indexed → 0-indexed)
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (dp[i][j] === -1) {
        dp[i][j] = 0; // 물웅덩이는 경로 수 0
        continue;
      }
      if (i > 0) dp[i][j] += dp[i - 1][j] % MOD; // 위쪽에서 오는 경로
      if (j > 0) dp[i][j] += dp[i][j - 1] % MOD; // 왼쪽에서 오는 경로
      dp[i][j] %= MOD; // 모듈러 연산 i와 j가 0일 때
    }
  }

  return dp[n - 1][m - 1]; // 도착점 (n-1, m-1)
}

const m = 4;
const n = 3;
const puddles = [[2, 2]];
console.log(solution(m, n, puddles)); // 4
// dp[i][j]각 위치의 값은 왼쪽과 위에서 오는 경로의 합이다.
