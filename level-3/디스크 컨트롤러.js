//https://school.programmers.co.kr/learn/courses/30/lessons/42627
function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]); // 요청 시간순 // 초기에 작업이 없기때문

  const queue = [];
  let answer = 0;
  let current = 0; // 현재 위치()
  let i = 0;
  const count = jobs.length;
  while (i < count || queue.length > 0) {
    while (i < count && current >= jobs[i][0]) {
      // 요청시간순 배열에서 current보다 작은 작업만 큐에 추가
      queue.push(jobs[i]);
      i++;
    }
    queue.sort((a, b) => a[1] - b[1]); // 처리시간 순으로 정렬
    if (queue.length > 0) {
      const [r, d] = queue.shift(); // 가장 먼저 처리할 프로세스
      current += d; // 처리된 프로세스의 완료 위치
      answer += current - r; // 작업 종료위치에 작업 요청 위치를 빼면  (반환시간)
    } else {
      // queue에 값이 없으면 current보다 크고 가장 빠른 요청 시간 프로세스를 current로 바꿔야함
      if (i < count) {
        current = jobs[i][0];
      }
    }
  }
  return Math.floor(answer / count);
}

const jobs = [
  //[작업이 요청되는 시점, 작업의 소요시간]
  [0, 3],
  [4, 2],
  [2, 5],
];
// 작업의 소요시간이 짧은 것, 작업의 요청 시각이 빠른 것, 작업의 번호가 작은 것 순
// 작업을 하고 있지 않을 시 가장 요청이 빠른것을 추가
console.log(solution(jobs)); // 8
