// https://school.programmers.co.kr/learn/courses/30/lessons/92341

function solution(fees, records) {
  const carNum = {};
  records.forEach((record) => {
    // 차량 번호별로 정리
    const [time, num, status] = record.split(" ");
    if (!carNum[num]) carNum[num] = [];
    carNum[num].push([time, status]);
  });

  const a = Object.entries(carNum).sort((a, b) => a[0] - b[0]); // 오브젝트를 배열로 바꾸고 차량 번호로 정렬
  const parkingFee = []; // 주차 요금을 담을 배열
  a.forEach((car) => {
    // car[0]은 차량 번호
    // car[1]은 차량 번호별로 정리된 시간 배열
    let fee = 0;
    let time = 0;
    let state = "";
    car[1].forEach((item) => {
      // 시간을 분으로 바꾼
      const [h, m] = item[0].split(":");
      if (item[1] === "IN") {
        time = h * 60 + +m;
        state = item[1]; // IN
      } else {
        fee += h * 60 + +m - time; // 주차 시간 계산
        state = item[1]; // OUT
      }
    });
    if (state === "IN") {
      // 주차장을 나가지 않은 차량 23:59에 나가는 것으로 간주
      fee += 24 * 60 - 1 - time;
    }
    if (fees[0] < fee) {
      // 기본 시간보다 주차 시간이 길면
      fee = fees[1] + Math.ceil((fee - fees[0]) / fees[2]) * fees[3]; // 기본 요금 + 단위 요금  올림계산
    } else {
      fee = fees[1]; // 기본 요금
    }
    parkingFee.push(fee); // 주차 요금 배열에 추가
  });
  return parkingFee;
}

const fees = [180, 5000, 10, 600]; // 기본 시간, 기본 요금, 단위 시간, 단위 요금
const records = [
  "05:34 5961 IN",
  "06:00 0000 IN",
  "06:34 0000 OUT",
  "07:59 5961 OUT",
  "07:59 0148 IN",
  "18:59 0000 IN",
  "19:09 0148 OUT",
  "22:59 5961 IN",
  "23:00 5961 OUT",
];

console.log(solution(fees, records)); // [14600, 34400, 5000]
