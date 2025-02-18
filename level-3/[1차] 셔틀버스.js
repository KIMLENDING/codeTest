//https://school.programmers.co.kr/learn/courses/30/lessons/17678
//[1차] 셔틀버스
function solution(n, t, m, timetable) {
  function formatTime(time) {
    let h = Math.floor(time / 60);
    let m = time % 60;
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }

  // 1. 숫자로 바꿔서 계산
  timetable = timetable.map((element) => {
    const [h, m] = element.split(":").map((x) => +x);
    return h * 60 + m;
  });
  //   2. 탑승자 시간순으로 정렬
  timetable.sort((a, b) => a - b);

  // 2. 버스 시간표 생성
  const busSchedule = Array(n).fill(0);
  busSchedule[0] = 9 * 60;
  for (let i = 1; i < busSchedule.length; i++) {
    let preTime = busSchedule[i - 1];
    busSchedule[i] = preTime + t;
  }
  // 버스에 탈 수 있는 사람만 살림(막차 시간 보다 일찍 온 사람 기준)
  timetable = timetable.filter(
    (time) => time <= busSchedule[busSchedule.length - 1]
  );
  let lastCrewTime = 0; // 마지막으로 탑승한 크루원
  let idx = 0; // 검사중인 크루원
  for (let i = 0; i < busSchedule.length; i++) {
    const bus = busSchedule[i];
    const isLastBus = i === busSchedule.length - 1;
    let 탑승가능인원 = m;
    while (탑승가능인원 > 0 && timetable[idx] <= bus) {
      // 좌석이 부족하지 않고 버스보다 일찍 온사람만 탐
      lastCrewTime = timetable[idx]; // 마지막 크루원 탑승 시간
      idx++;
      탑승가능인원--;
    }
    if (isLastBus) {
      return 탑승가능인원 > 0
        ? formatTime(bus) // 자리가 남아있으면 버스 도착 시간
        : formatTime(lastCrewTime - 1); // 꽉 찼으면 마지막 사람보다 1분 일찍
    }
  }
}
const n = 2; // 총 1회
const t = 10; // 1분 간격으로
const m = 2; // 최대 5명까지
const timetable = ["09:10", "09:09", "08:00"];
console.log(solution(n, t, m, timetable));

// m*n 버스에 탈 수 있는 총 인원
// 총 인원에서 진짜 탈 수 있는 사람을 찾아야함
// 예를 들면 특정 시간대에 몰려 그 사람때문에 재시간에 왔지만 밀려서 탈 수 없는 상황이 발생함
// 각 시간대 별로 탈 수 있는 사람들은 제거하면서 마지막시간대 버스로 문닫고 들어가는 시간을 구해야 하지
// m*n보다 timetable의 크기가 작으면 마지막 버스시간으로 고정 하지만
// 밀릴때를 대비 해야함
// 버스 시간을 기준으로 사람을 태우는데
// 사람이 모두 타거나 버스 시간보다 늦게온 사람은 다름 버스로 태워야 함 이걸 while문으로 하면 되겠지
