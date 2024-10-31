// https://school.programmers.co.kr/learn/courses/30/lessons/138476
function solution(k, tangerine) {
  const counter = {};

  // forEach를 사용하여 카운팅
  tangerine.forEach((t) => (counter[t] = (counter[t] || 0) + 1));

  // Object.values와 sort를 체이닝하여 values 배열 생성과 정렬을 한번에 처리
  const sortedCounts = Object.values(counter).sort((a, b) => b - a);

  // reduce를 사용하여 더 함수형 프로그래밍 스타일로 결과 계산
  let sum = 0;
  return sortedCounts.reduce((count, curr) => {
    if (sum >= k) return count;
    sum += curr;
    return count + 1;
  }, 0);
  //   let answer = 0;
  //   for (const curr of sortedCounts) {
  //     answer++;
  //     if (k > curr) k -= curr;
  //     else break;
  //   }
  //   return answer;
}

const k = 6;
const tangerine = [1, 3, 2, 5, 4, 5, 2, 3];
console.log(solution(k, tangerine)); // 3
