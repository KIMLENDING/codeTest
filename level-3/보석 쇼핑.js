//https://school.programmers.co.kr/learn/courses/30/lessons/67258 //보석 쇼핑
function solution(gems) {
  var answer = [];
  const gemMap = new Map();
  const gemsLength = new Set(gems).size; // 보석의 종류 수
  let start = 0;
  let end = 0;
  let minLength = Infinity; //처음 조건은 무조건 실행 시키기

  while (end < gems.length) {
    // 1. 구간 확장: 보석 추가
    gemMap.set(gems[end], (gemMap.get(gems[end]) || 0) + 1);
    end++;

    // 2. 조건 충족 시 구간 축소
    while (gemMap.size === gemsLength) {
      if (end - start < minLength) {
        minLength = end - start; // 최소 구간 길이 갱신
        answer = [start + 1, end]; // 1-based 인덱스로 변환
      }

      // 맨 앞 보석 제거
      gemMap.set(gems[start], gemMap.get(gems[start]) - 1);
      if (gemMap.get(gems[start]) === 0) gemMap.delete(gems[start]); // 0인 경우 제거
      start++;
    }
  }

  return answer;
}

const gems = [
  "DIA",
  "RUBY",
  "RUBY",
  "DIA",
  "DIA",
  "EMERALD",
  "SAPPHIRE",
  "DIA",
];
console.log(solution(gems));
[3, 7];
