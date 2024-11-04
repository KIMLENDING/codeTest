// 코드는 짧아 졌는데, 느려짐 filter때문 인듯
function solution(book_time) {
  const makeMinStamp = (time) => {
    const [hour, min] = time.split(":").map(Number);
    return hour * 60 + min;
  };
  book_time = book_time
    .map(([start, end]) => [makeMinStamp(start), makeMinStamp(end) + 10])
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  let answer = 0;
  while (book_time.length > 0) {
    answer++;
    let [start, end] = book_time.shift();
    book_time = book_time.filter(([next_start, next_end]) => {
      // filter는 true인 것만 남기고 false인 것은 제거
      if (next_start >= end) {
        // 다음 예약(시작 시간)이 현재 예약(종료 시간) 보다 뒤에 있거나 같으면(청소시간 포함) (예약 가능)
        end = next_end; // 다음 예약의 종료 시간으로 변경 (다다음 예약과 비교하기 위해)
        return false; //  삭제
      }
      return true; //  유지
    });
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

console.log(solution(book_time)); // 3
