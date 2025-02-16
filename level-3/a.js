//https://school.programmers.co.kr/learn/courses/30/lessons/64062
function solution(stones, k) {
  let left = 1;
  let right = 200000000; // 가능한 최대 값

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let count = 0;
    let maxZero = 0; // 연속된 0의 개수

    for (let stone of stones) {
      if (stone - mid <= 0) {
        count += 1;
        maxZero = Math.max(maxZero, count);
      } else {
        count = 0;
      }
    }

    if (maxZero >= k) {
      right = mid - 1; // 건널 수 없으면 범위를 줄임
    } else {
      left = mid + 1; // 건널 수 있으면 범위를 늘림
    }
  }

  return left;
}

const stones = [2, 4, 5, 3, 2, 1, 4, 2, 5, 1];
const k = 3;
console.log(solution(stones, k)); // 3
