//https://school.programmers.co.kr/learn/courses/30/lessons/132266
const solution = (n, roads, sources, destination) => {
  // 그래프 생성
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of roads) {
    graph[a].push(b);
    graph[b].push(a);
  }

  // 목적지에서 모든 노드까지의 최단 거리 계산
  const distances = Array(n + 1).fill(-1); // -1로 초기화 (도달 불가)
  const queue = [destination]; // 역방향 BFS
  distances[destination] = 0; // 목적지의 거리 = 0
  console.log(graph, "\n", queue, "\n", distances);
  while (queue.length > 0) {
    const current = queue.shift();

    for (const neighbor of graph[current]) {
      if (distances[neighbor] === -1) {
        // 아직 방문하지 않은 노드
        distances[neighbor] = distances[current] + 1;
        queue.push(neighbor);
      }
    }
  }

  // sources에서 각 노드의 거리 반환
  return sources.map((source) => distances[source]);
};

/**
 *
 * 목적지에서 출발지의 거리를 계산하도록 역방향 BFS를 사용
 * graph를 사용해서 각 노드 별로 연결된 노드를 저장하고
 * 각 노드별로 도착지와의 거리를 저장할 배열 생성(-1로 초기화 방문했는지 확인하기 위해)
 * queue를 생성하여 초기값으로 도착지의 위치를 삽입
 * 도착지 노드와 연결된 노드를 queue에 저장 후 거리를 저장
 * 단 방문한 노드는 queue에 저장하지 않고 거리를 계산하지 않음
 * 큐가 빌때까지 반복 하면 5와 연결된 노드들의 최소 거리가 각 노드별로 저장됨
 * 그럼 초기에 주어진 sources와 일치하는 노드만 출력
 */

const n = 5; //강철부대가 위치한 지역을 포함한 총지역의 수
const roads = [
  //두 지역을 왕복할 수 있는 길 정보를 담은 2차원 정수 배열
  //a, b가 서로 왕복할 수 있음

  [1, 2],
  [1, 4],
  [2, 4],
  [2, 5],
  [4, 5],
];
const sources = [1, 3, 5]; //각 부대원이 위치한 서로 다른 지역들을 나타내는 정수 배열
const destination = 5; //강철부대의 지역
console.log(solution(n, roads, sources, destination)); //	[1, 2]
