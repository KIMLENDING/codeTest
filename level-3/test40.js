//https://school.programmers.co.kr/learn/courses/30/lessons/49189

function solution(n, edge) {
  // 그래프를 인접 리스트로 변환
  const graph = Array.from({ length: n + 1 }, () => []);
  edge.forEach(([a, b]) => {
    graph[a].push(b);
    graph[b].push(a);
  });
  console.log(graph);
  // 최단 거리 배열 초기화
  const distance = new Array(n + 1).fill(Infinity);
  distance[1] = 0; // 시작 노드(1번)는 거리 0

  // BFS 탐색
  const queue = [1]; // 시작 노드 큐
  while (queue.length > 0) {
    const current = queue.shift();
    for (const near of graph[current]) {
      // 방문하지 않은 노드라면
      if (distance[near] === Infinity) {
        distance[near] = distance[current] + 1;
        queue.push(near);
      }
    }
  }

  // 가장 먼 거리 찾기
  const maxDistance = Math.max(...distance.filter((d) => d !== Infinity));
  return distance.filter((d) => d === maxDistance).length;
}

const vertex = [
  [3, 6],
  [4, 3],
  [3, 2],
  [1, 3],
  [1, 2],
  [2, 4],
  [5, 2],
];

const n = 6;

console.log(solution(n, vertex));
