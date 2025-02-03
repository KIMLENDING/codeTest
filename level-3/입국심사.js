//https://school.programmers.co.kr/learn/courses/30/lessons/43238
function solution(n, times) {
  // 이분 탐색 범위 설정
  let left = 1; // 최소 시간
  let right = Math.max(...times) * n; // 최대 시간
  while (left <= right) {
    //모든 사람이 심사를 받을 수 있는 최소 시간 mid
    console.log(left, right);
    const mid = Math.floor((left + right) / 2); // 중간 시간
    // 각 심사관의 처리량의 합
    const total = times.reduce((sum, time) => sum + Math.floor(mid / time), 0); // 총 처리 가능한 인원

    if (total >= n) {
      // n명을 처리할 수 있으면 더 짧은 시간 탐색

      right = mid - 1;
    } else {
      // n명을 처리할 수 없으면 시간을 늘림
      left = mid + 1;
    }
  }
  return left;
}
/**
 *
 * 최소시간을 찾기위해 이분 탐색을 사용 (모든 사람이 심사를 받을 수 있는 최소 시간)
 * ******** 이분 탐색의 종료 조건 left > right가 될 때 즉 left가 최소 시간일 때 **********
 * 최소 시간은 1, 최대 시간은 Math.max(...times) * n.
 * 주어진 시간 mid 동안 처리 가능한 인원이 n명 이상이면 조건을 만족
 * 임의의 중간값을 할당하고 그걸 각 심사관이 주어진 시간동안 처리할 수 있는 양의 총합을 구하고
 * 총합이 n보다 크면 최대값을 중간값에서 - 1 한 값으로 바꾸고 (-1을 하는 이유는 현재 mid가 답이 될 수 있기에 겹치는 범위를 제거하기 위함)
 * 총합이 n보다 작다면 최소값을 중간값에서 +1 한 값으로 바꿈 (mid가 답이 될 수 없으므로, 더 큰 값에서 답을 찾기 위해 left = mid + 1로 탐색)
 *
 */
const n = 6;
const times = [7, 10];
console.log(solution(n, times));
