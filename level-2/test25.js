//https://school.programmers.co.kr/learn/courses/30/lessons/155651
function solution(book_time) {
  var answer = 0;
  function makeMinStamp(time) {
    const [hour, min] = time.split(":").map(Number);
    return hour * 60 + min;
  }
  book_time = book_time
    .map(([start, end]) => [makeMinStamp(start), makeMinStamp(end) + 10]) //퇴실한 객실은 10분뒤 예약이 가능하다.
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])); // 시작 시간이 같으면 끝 시간으로 정렬

  while (book_time.length > 0) {
    answer++; // 방 하나 추가
    let [start, end] = book_time.shift(); // 현재 예약 삭제 // 현재 예약을 다른 예약과 비교하기 위해 변수에 저장
    for (let i = 0; i < book_time.length; i++) {
      const [next_start, next_end] = book_time[i]; // 비교할 다음 예약
      if (next_start >= end) {
        // 다음 예약(시작 시간)이 현재 예약(종료 시간) 보다 뒤에 있거나 같으면(청소시간 포함) (예약 가능)
        book_time.splice(i, 1); // 방 재배정 가능 함으로 삭제
        end = next_end; // 다음 예약의 종료 시간으로 변경 (다다음 예약과 비교하기 위해)
        i--; // 삭제했으니 인덱스 하나 줄여줌
      }
    }
  }
  return answer;
}

const book_time = [
  ["15:00", "17:00"],
  ["16:40", "18:20"],
  ["14:20", "15:20"],
  ["14:10", "19:20"],
  ["18:20", "21:20"],
];
// 퇴실한 객실은 10분뒤 예약이 가능하다.

console.log(solution(book_time)); // 3
