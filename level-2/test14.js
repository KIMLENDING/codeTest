//https://school.programmers.co.kr/learn/courses/30/lessons/250136
import { optimizedSolution } from "./최적화/test14_최적화.js";
/**
 *
 * DFS로 풀면 될 것 같음
 * 이건 모든 시추 위치를 다 한번씩 돌아야 해서 스택 오버플로우가 발생 할 수 있음
 * 재방문 했을 때 석유량만 더하도록 개선해야 함
 * @param {*} land
 * @returns
 */
function solution(land) {
  const move = [
    [1, 0], // 아래
    [0, 1], // 오른쪽
    [-1, 0], // 위
    [0, -1], // 왼쪽
  ];
  let count = 0;
  const land_result = []; // 시추 위치별 석유량
  const dfs = (x, y, index) => {
    // index는 시추 위치
    if (x < 0 || x >= land.length || y < 0 || y >= land[0].length) return; // 범위를 벗어나면 return
    if (land[x][y] === 0) return; // 갈 수 없는 곳이면 return
    if (land[x][y] === index) return; // 이미 방문한 곳이면 return

    land[x][y] = index; // 방문 처리
    count++; // 방문한 곳 카운트
    for (let i = 0; i < 4; i++) {
      // 상하좌우 이동
      dfs(x + move[i][0], y + move[i][1], index);
    }
  };
  for (let i = 0; i < land[0].length; i++) {
    for (let j = 0; j < land.length; j++) {
      if (land[j][i] !== 0) {
        const index = i + 1 + "번째";
        dfs(j, i, index);
      }
    }
    land_result.push(count);
    count = 0;
  }
  const answer = Math.max(...land_result);
  return answer;
}
/**
 *
 * 위 코드를 개선해보자
 * 각각의 석유가 매장된 범위와 석유량을 저장하고
 * 다음 번에 재방문하면 석유량만 더하도록 하자
 * Map을 사용하여 key: [x, y], value: 석유량으로 저장하자
 *
 *
 * @param {*} land
 * @returns
 */
function solution1(land) {
  const move = [
    [1, 0], // 아래 - x축 - 세로 - j값
    [0, 1], // 오른쪽 - y축 - 가로 - i값
    [-1, 0], // 위 - x축 - 세로 - j값
    [0, -1], // 왼쪽 - y축 - 가로 - i값
  ];
  let count = 0;
  const land_result = new Map(); // 시추 위치별 석유량
  const land_index = new Map(); // 시추 위치별 석유가 매장된 범위

  const dfs1 = (x, y, index) => {
    // index는 시추 위치
    if (x < 0 || x >= land.length || y < 0 || y >= land[0].length) return; // 범위를 벗어나면 return
    if (land[x][y] === 0) return; // 갈 수 없는 곳이면 return
    // const key = [x, y]; // 배열로 key를 생성하면 배열이라 주소 값이 달라서 내용은 같아도 다른 객체로 취급되기 떄문에
    const key = `${x},${y}`; // 문자열로 key를 생성하자
    if (land[x][y] === 2) return; // 이미 방문한 곳이면 return

    land[x][y] = 2; // 방문 처리
    count++; // 방문한 곳 카운트

    for (let i = 0; i < 4; i++) {
      // 상하좌우 이동
      dfs1(x + move[i][0], y + move[i][1], index);
    }
    land_result.set(key, index); // 방문 처리
  };
  for (let i = 0; i < land[0].length; i++) {
    // 가로
    for (let j = 0; j < land.length; j++) {
      // 세로
      if (land[j][i] !== 0) {
        const index = `${i} + ${j} 번째`;
        dfs1(j, i, index);
        land_index.set(`${i} + ${j} 번째`, count);
      }
      count = 0;
    }
  }
  const finalResults = [];
  for (let i = 0; i < land[0].length; i++) {
    let total = 0;
    const tmp = [];
    for (let j = 0; j < land.length; j++) {
      const key = `${j},${i}`; // 문자열로 해야 키값이 같은지 비교 할 수 있음 배열은 참조값이라 주소 값이 달라서 안됨
      if (land_result.has(key)) {
        const value = land_result.get(key); // ex)'1번째' -> 석유가 매장된 범위
        if (tmp.includes(value)) continue;
        tmp.push(value);
        const valueResult = land_index.get(value); // ex) 9 -> 석유량
        total += valueResult;
      }
    }
    finalResults.push(total);
  }
  const answer = Math.max(...finalResults);
  return answer;
}

// 테스트 셋 배열
function generateLand(rows, cols, oilProbability = 0.5) {
  const land = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      // oilProbability에 따라 0 또는 1을 생성
      row.push(Math.random() < oilProbability ? 1 : 0);
    }
    land.push(row);
  }

  return land;
}

// 테스트 예시
const land = [
  [1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1],
];
const testLand = generateLand(4, 4, 0.6);
function deepCopyLandJSON(land) {
  return JSON.parse(JSON.stringify(land));
}
const landForSolution = deepCopyLandJSON(testLand);
const landForSolution1 = deepCopyLandJSON(testLand);
const landForSolution2 = deepCopyLandJSON(testLand);
const landForSolution3 = deepCopyLandJSON(testLand);

console.log(optimizedSolution(land));
// performanceTest(solution, [landForSolution]); // 이건 오래 걸리고 + 스택 오퍼플로우 발생
// performanceTest(solution1, [landForSolution1]); // 이건 스택 오버플로우 발생
// performanceTest(optimizedSolution, [landForSolution2]); // 이건 빠르고 잘됨
