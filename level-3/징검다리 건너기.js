//https://school.programmers.co.kr/learn/courses/30/lessons/64062
//징검다리 건너기
//(이진 탐색, O(N log M))
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
/**
 * 
 * 
1. 문제 분석 & 해결 방법 찾기
각 디딤돌(stones)은 건널 때마다 1씩 감소
최대 몇 명까지 건널 수 있는지 구해야 함
연속된 0이 k개 이상이면 더 이상 건널 수 없음
즉, "몇 명이 건널 수 있는가?" → 최댓값을 찾아야 하는 문제
이 문제를 해결하는 직관적인 방법은?

모든 사람이 하나씩 건너면서 stones 값을 줄인다.
연속된 0이 k개 이상이면 중단.
하지만 이 방법은 O(N^2)이 걸려서 비효율적 
이진 탐색을 활용하면 O(N log M)으로 최적화 가능!

2. 이진 탐색을 떠올리는 과정
이 문제는 "최대 몇 명까지 건널 수 있는가?" 를 구하는 문제.

최소 1명은 건널 수 있고,
최대 2억 명 (200,000,000)까지 가능
→ 이 범위(left=1, right=200000000)에서 이진 탐색을 사용하면?
→ O(log 200,000,000) ≈ 27 번의 연산만으로 답을 찾을 수 있음! 
따라서 이진 탐색을 활용하여 "가능한 최대 인원 수"를 찾는 방법을 선택!

3. 이진 탐색의 동작 방식
let left = 1;
let right = 200000000;
→ 최소 1명부터 최대 2억 명까지 가능한 범위를 설정.
while (left <= right) {
  let mid = Math.floor((left + right) / 2);
}
→ 이진 탐색을 수행하면서 mid(중간값) 명이 건널 수 있는지 확인

4. 특정 mid 명이 건널 수 있는지 체크

for (let stone of stones) {
  if (stone - mid <= 0) { // 디딤돌이 0 이하이면 못 건너니까 카운트 증가
    count += 1;
    maxZero = Math.max(maxZero, count);
  } else {
    count = 0; // 0이 아닌 값이 나오면 연속 카운트 초기화
  }
}
→ 연속된 0이 k개 이상인지 확인하는 과정

stone - mid <= 0이면, 해당 디딤돌이 무너짐(못 건너는 상태)
연속된 0의 개수를 count로 세고, 최댓값을 maxZero에 저장
만약 maxZero >= k라면 더 이상 못 건너므로, 인원을 줄여야 함

5. 이진 탐색으로 범위 줄이기
if (maxZero >= k) {
  right = mid - 1; // 연속된 0이 k개 이상이면, mid명이 너무 많음 → 인원 줄이기
} else {
  left = mid + 1; // mid명이 건널 수 있음 → 인원 늘리기
}
maxZero >= k이면, mid명이 건널 수 없음 → right 값을 줄여서 줄어든 인원으로 재탐색
maxZero < k이면, mid명이 건널 수 있음 → left 값을 증가시켜 더 많은 인원으로 테스트

6. 최종 정답 반환
left 값이 결국 "최대 몇 명까지 건널 수 있는지" 를 나타냄
정확한 인원 수를 찾았으므로 left 반환! 


최종 정리: 사고 과정 요약
완전 탐색은 비효율적 → 이진 탐색(O(N log M))을 사용해야 함
최소 1명부터 최대 2억 명까지 가능한 범위에서 이진 탐색 진행
mid 명이 건널 수 있는지 확인하기 위해 연속된 0의 개수 체크
만약 연속된 0이 k 이상이면 건널 수 없음 → 인원 수 감소
연속된 0이 k 미만이면 건널 수 있음 → 인원 수 증가
최적의 인원 수를 찾으면 left 반환 

** 핵심 포인트 **
이진 탐색을 활용하여 O(N log M)으로 효율적으로 해결!
 연속된 0의 개수를 체크하는 것이 핵심!
 최소 인원(left)과 최대 인원(right)을 조정하며 최적 해 탐색

이렇게 사고하면 자연스럽게 이진 탐색을 적용한 풀이를 떠올릴 수 있어요!


 */
