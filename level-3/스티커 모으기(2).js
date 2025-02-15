//https://school.programmers.co.kr/learn/courses/30/lessons/12971
//스티커 모으기(2)

function solution(sticker) {
  const N = sticker.length;
  if (N < 3) return Math.max(...sticker);
  const dp1 = Array(N).fill(0);
  const dp2 = Array(N).fill(0);

  // 첫 번째 스티커를 선택한 경우 (마지막 스티커는 사용 불가)
  dp1[0] = sticker[0];
  dp1[1] = sticker[0]; // 두 번째 선택 불가
  for (let i = 2; i < N - 1; i++) {
    // N-1 (마지막 스티커 사용 불가)
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + sticker[i]);
  }
  // 첫 번째 스티커를 선택하지 않은 경우 (마지막 스티커 사용 가능)
  dp2[0] = 0;
  dp2[1] = sticker[1]; // 두 번째 선택 가능
  for (let i = 2; i < N; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + sticker[i]);
  }

  return Math.max(dp1[N - 2], dp2[N - 1]);
}

function solution1(sticker) {
  const N = sticker.length;
  if (N === 1) return sticker[0];

  let dp1 = [sticker[0], sticker[0]]; // 두 번째 선택 불가
  let dp2 = [0, sticker[1]]; // 두 번째 선택 가능
  // 첫 번째 스티커를 선택한 경우 (마지막 스티커는 사용 불가)
  for (let i = 2; i < N - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + sticker[i]);
  }
  // 첫 번째 스티커를 선택하지 않은 경우 (마지막 스티커 사용 가능)
  for (let i = 2; i < N; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + sticker[i]);
  }

  return Math.max(dp1[N - 2], dp2[N - 1]);
}
/**
1. 문제 분석: "최댓값을 구해야 한다"
서로 인접하지 않은 스티커를 선택해 최댓값을 구하는 문제
배열이 원형(첫 번째와 마지막이 연결됨) 이므로 추가적인 제약이 존재
단순 DFS(완전 탐색)는 시간 복잡도가 너무 커서 비효율적
 2. DP(동적 프로그래밍)로 해결하는 이유
 중복 계산을 피하면서 최적의 해를 찾을 수 있기 때문!
 DP를 활용하면 한 번 계산된 값을 저장하여 불필요한 연산을 줄일 수 있음

 3. 원형 배열 특성으로 인한 두 가지 선택 방식
첫 번째 스티커를 선택하는 경우 → 마지막 스티커 선택 불가
첫 번째 스티커를 선택하지 않는 경우 → 마지막 스티커 선택 가능
 즉, 두 가지 경우를 나누어 계산해야 함!

4. 핵심 로직: DP 점화식 정리
현재 i 번째 스티커를 선택할 때, 두 가지 경우가 있음.

 1) i 번째 스티커를 선택하는 경우
→ 이전의 인접하지 않은 값과 더해야 함!
dp[i] = dp[i-2] + sticker[i]; 

 2) i 번째 스티커를 선택하지 않는 경우
→ 이전 값(dp[i-1])을 그대로 가져감!
dp[i] = dp[i-1]; 

 두 경우 중 최댓값을 유지하면서 진행하면 가장 큰 값을 찾을 수 있음!
dp[i] = Math.max(dp[i-1], dp[i-2] + sticker[i]);
 5. 최종 풀이 과정 정리
dp1 → 첫 번째 스티커를 선택하는 경우 (마지막 사용 불가)
dp2 → 첫 번째 스티커를 선택하지 않는 경우 (마지막 사용 가능)
두 경우의 결과 중 최댓값 반환


6. 최종 정리: DP를 사용한 최적화된 접근법
 DFS(완전 탐색)은 시간 복잡도 문제로 비효율적
 DP를 사용하면 중복 계산 없이 최적의 해를 구할 수 있음
 원형 배열이므로 두 가지 경우(첫 번째 선택 vs 미선택)로 나누어 풀이
 점화식 활용 → dp[i] = Math.max(dp[i-1], dp[i-2] + sticker[i])
 O(N)으로 최적해를 구할 수 있음! 
 */
const sticker = [14, 6, 5, 11, 3, 9, 2, 10];
console.log(solution(sticker)); //36
