//https://school.programmers.co.kr/learn/courses/30/lessons/12904
function solution(s) {
  let maxLen = 0;

  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--; // 왼쪽 확장
      right++; // 오른쪽 확장
    }
    return right - left - 1; // 길이 반환
  };

  for (let i = 0; i < s.length; i++) {
    // 1. 홀수 길이 팰린드롬 (ex: "aba")
    const len1 = expandAroundCenter(i, i);
    // 2. 짝수 길이 팰린드롬 (ex: "abba")
    const len2 = expandAroundCenter(i, i + 1);

    maxLen = Math.max(maxLen, len1, len2);
  }

  return maxLen;
}

const s = "abcdcba";
console.log(solution(s)); // 7
