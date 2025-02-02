//https://school.programmers.co.kr/learn/courses/30/lessons/49191
function solution(n, results) {
  var answer = 0;
  const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill("무"));
  console.log(dist);

  for (const [win, lose] of results) {
    dist[win][lose] = "승"; // win이 lose를 이김
    dist[lose][win] = "패"; // lose가 win에게 짐
  }
  console.log(dist);
  // 플로이드-워셜 알고리즘 실행
  for (let k = 1; k <= n; k++) {
    // 중간노드 k
    for (let i = 1; i <= n; i++) {
      // 시작 노드 i
      for (let j = 1; j <= n; j++) {
        // 도착 노드 j
        if (dist[i][k] === "승" && dist[k][j] === "승") dist[i][j] = "승"; // a>b 이고 b>c 이면 a>c 이다. 라고 해서 관계 유추
        if (dist[i][k] === "패" && dist[k][j] === "패") dist[i][j] = "패";
      }
    }
  }
  console.log(dist);
  // n-1인 값 찾기(순위 확정 가능한 선수) 0이 자기 자신만 있는 선수
  answer = n;
  for (let i = 1; i <= n; i++) {
    let count = 0;
    for (let j = 1; j <= n; j++) {
      if (dist[i][j] === "무") count++;
      if (count > 1) {
        answer--;
        break;
      }
    }
  }
  return answer;
}
const n = 5;
const results = [
  [4, 3],
  [4, 2],
  [3, 2],
  [1, 2],
  [2, 5],
];
console.log(solution(n, results));
// 플로이드-워셜 알고리즘
