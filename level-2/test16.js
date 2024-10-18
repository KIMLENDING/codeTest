// https://school.programmers.co.kr/learn/courses/30/lessons/60057
import { performanceTest } from "../perFormanceTest.js";
function solution(s) {
  let minLength = s.length;

  for (let i = 1; i <= s.length / 2; i++) {
    // 문자열의 절반 이상은 자를 필요가 없음
    // i는 자르는 단위
    let temp = ""; // 임시 문자열
    let count = 1; // 연속된 문자열의 개수 초기값 1
    for (let j = 0; j < s.length; j += i) {
      // j는 시작점
      const current = s.slice(j, j + i);
      const next = s.slice(j + i, j + i + i);
      if (current === next) {
        count++; // 같으면 카운트 증가
      } else {
        // count가 1이면 숫자를 붙이지 않음
        // 그리고 temp에 current를 붙임 - 연속 되지 않은 문자열이기 때문에
        count === 1 ? (temp += current) : (temp += count + current);
        count = 1; // count 초기화
      }
    }
    minLength = Math.min(minLength, temp.length);
  }
  return minLength;
}
const s = "abcabcabcabcdedededededecccccccccccc";
/**
 * 개선 방법
 * 연속하는 문자열이 초점이니까 next와 current를 하위 for문에서 둘다 생성하지 않고
 * next를 제거하고 상위 for문에 prev 변수를 생성하여 초기값으로 s.slice(0, i)를 할당
 * 이러면 다를 때만 prev 변수를 current로 변경하면 됨 이렇게 하면 불필요한 연산을 줄일 수 있음
 */

console.log(solution(s)); // 7
performanceTest(solution, s);
