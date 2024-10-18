/**
 * 개선 방법
 * 연속하는 문자열이 초점이니까 next와 current를 하위 for문에서 둘다 생성하지 않고
 * next를 제거하고 상위 for문에 prev 변수를 생성하여 초기값으로 s.slice(0, i)를 할당
 * 이러면 다를 때만 prev 변수를 current로 변경하면 됨 이렇게 하면 불필요한 연산을 줄일 수 있음
 */
function solution(s) {
  if (s.length === 1) return 1; // 길이가 1이면 1 리턴
  let minLength = s.length; // 초기 최소 길이를 문자열의 전체 길이로 설정

  for (let i = 1; i <= s.length / 2; i++) {
    let temp = ""; // 압축된 문자열
    let count = 1; // 연속된 문자열의 개수 초기화
    let prev = s.slice(0, i); // 첫 번째 자른 문자열

    for (let j = i; j < s.length; j += i) {
      const current = s.slice(j, j + i);
      if (prev === current) {
        count++; // 현재와 이전 문자열이 같으면 카운트 증가
      } else {
        // 다르면 압축된 형태로 저장
        temp += (count > 1 ? count : "") + prev;
        prev = current; // 현재 문자열을 새로운 이전 문자열로 설정
        count = 1; // 카운트 초기화
      }
    }

    // 마지막 남은 문자열 처리
    temp += (count > 1 ? count : "") + prev;
    // 압축된 길이를 비교하여 최소 길이 저장
    minLength = Math.min(minLength, temp.length);
  }

  return minLength;
}
