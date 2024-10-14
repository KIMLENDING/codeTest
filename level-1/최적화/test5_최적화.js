function solution(park, routes) {
  // 초기 시작 위치 찾기
  let { start } = park.reduce(
    (acc, v, i) => {
      if (acc.stop) return acc;
      let idx = v.indexOf("S");
      if (idx !== -1) {
        acc.start = [i, idx];
        acc.stop = true;
      }
      return acc;
    },
    { start: [], stop: false }
  );

  // 이동 가능한지 확인하고 위치를 업데이트하는 함수
  const move = (dx, dy, n) => {
    let [x, y] = start;
    for (let i = 1; i <= n; i++) {
      const nx = x + dx * i;
      const ny = y + dy * i;
      // 경계를 벗어나거나 장애물을 만나면 이동 중단
      if (
        // !park[nx] || !park[nx][ny] || park[nx][ny] === "X" 이렇게 표현 가능
        nx < 0 ||
        ny < 0 ||
        nx >= park.length ||
        ny >= park[0].length ||
        park[nx][ny] === "X" // 장애물
      ) {
        return false;
      }
    }
    // 이동 가능하면 위치 업데이트
    start = [x + dx * n, y + dy * n];
    return true;
  };

  // 각 방향에 맞는 이동 정의
  const directions = {
    N: [-1, 0], // 북쪽: x축 감소
    S: [1, 0], // 남쪽: x축 증가
    W: [0, -1], // 서쪽: y축 감소
    E: [0, 1], // 동쪽: y축 증가
  };

  // 경로 순회
  routes.forEach((v) => {
    const [op, n] = v.split(" ");
    const [dx, dy] = directions[op]; // 해당 방향의 변화량
    move(dx, dy, Number(n)); // 이동 시도
  });

  return start;
}

const park = ["SOO", "OOO", "OOO"];
const routes = ["E 2", "S 2", "W 1"];
console.log(solution(park, routes)); // [2, 1]
