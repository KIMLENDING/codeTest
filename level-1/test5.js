// 문제 url: https://school.programmers.co.kr/learn/courses/30/lessons/172928

const park = ["SOO", "OOO", "OOO"];
const routes = ["E 2", "S 2", "W 1"];

const park2 = ["SOO", "OXX", "OOO"];
const routes2 = ["E 2", "S 2", "W 1"];

const park3 = ["OSO", "OOO", "OXO", "OOO"];
const routes3 = ["E 2", "S 3", "W 1"];

function solution(park, routes) {
  // 초기 시작 위치 찾기
  let { start } = park.reduce(
    (acc, v, i) => {
      if (acc.stop) return acc; // 'S'를 찾았다면 더이상 찾지 않음
      let idx = v.indexOf("S"); // 'S'의 위치를 찾음
      if (idx !== -1) {
        // 'S'가 있다면
        acc.start = [i, idx]; // 시작 위치 저장
        acc.stop = true; // 'S'가 있다는 표시
        return acc;
      }
      console.log(acc, i);
      return acc; // 'S'가 없다면 다음 행으로 이동
    },
    { start: [], stop: false }
  );

  routes.forEach((v) => {
    const [op, n] = v.split(" ");

    if (op === "N") {
      // 북쪽 이동
      if (start[0] - Number(n) >= 0) {
        // park 밖으로 나가지 않도록
        for (let i = 1; i <= n; i++) {
          if (park[start[0] - i][start[1]] === "X") {
            break; // 장애물이 있으면 이동 중단
          }
          if (i === Number(n)) {
            // 이동 가능하다면
            start[0] -= Number(n);
          }
        }
      }
    }
    if (op === "S") {
      // 남쪽 이동
      //   console.log(start[0] + Number(n), park.length);
      if (start[0] + Number(n) < park.length) {
        // park 밖으로 나가지 않도록
        for (let i = 1; i <= n; i++) {
          if (park[start[0] + i][start[1]] === "X") {
            break; // 장애물이 있으면 이동 중단
          }
          if (i === Number(n)) {
            // 이동 가능하다면
            start[0] += Number(n);
          }
        }
      }
    }
    if (op === "W") {
      // 서쪽 이동
      if (start[1] - Number(n) >= 0) {
        // park 밖으로 나가지 않도록
        for (let i = 1; i <= n; i++) {
          if (park[start[0]][start[1] - i] === "X") {
            break; // 장애물이 있으면 이동 중단
          }
          if (i === Number(n)) {
            // 이동 가능하다면
            start[1] -= Number(n);
          }
        }
      }
    }

    if (op === "E") {
      // 동쪽 이동
      if (start[1] + Number(n) < park[0].length) {
        // park 밖으로 나가지 않도록
        for (let i = 1; i <= n; i++) {
          if (park[start[0]][start[1] + i] === "X") {
            break; // 장애물이 있으면 이동 중단
          }
          if (i === Number(n)) {
            // 이동 가능하다면
            start[1] += Number(n);
          }
        }
      }
    }
  });

  return start;
}
console.log(solution(park, routes)); // [1, 1, 1]
