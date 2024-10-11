//https://school.programmers.co.kr/learn/courses/30/lessons/142086
function solution(s) {
  const result = [];
  const lastSeen = {}; // 각 문자의 마지막 위치를 저장하는 객체

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (lastSeen[char] !== undefined) {
      // 마지막으로 등장한 위치에서 현재 위치를 빼면 거리가 나옴
      result.push(i - lastSeen[char]);
    } else {
      result.push(-1); // 처음 등장하는 경우 -1 추가
    }

    // 현재 문자의 인덱스를 마지막 위치로 업데이트
    lastSeen[char] = i;
  }

  return result;
}

// 예시 사용
const s = "foobar";
const result = solution(s);
console.log(result); // 출력: [-1, -1, -1, 2, 2, 2]
