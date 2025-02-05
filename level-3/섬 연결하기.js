//https://school.programmers.co.kr/learn/courses/30/lessons/42861

/**
 * 1. 모든 섬은 연결 되어야 함으로 방문 배열을 만들고 초기엔 각 인덱스 번호로 값을 넣고
 * 모두 연결되면 0으로 통일 되도록 함
 */
const solution = (n, costs) => {
  // 간선 비용 기준으로 오름차순 정렬
  costs.sort((a, b) => a[2] - b[2]);

  // 유니온-파인드용 부모 배열
  const parent = Array.from({ length: n }, (_, idx) => idx);

  // Find 함수 (루트 노드 찾기)
  const find = (x) => {
    if (parent[x] === x) return x;
    return (parent[x] = find(parent[x])); // 경로 압축 -> 모두 연결되도록
  };

  // Union 함수 (두 노드 연결)
  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      parent[rootY] = rootX; // 루트 노드 통합
      return true; // 연결 성공
    }
    return false; // 이미 연결된 경우
  };

  let sum = 0;
  for (const [a, b, cost] of costs) {
    if (union(a, b)) {
      sum += cost; // 간선 선택
    }
  }

  return sum;
};

const n = 4;
const costs = [
  [0, 1, 1], // [연결된 다리1,연결된 다리2,걸설 비용]
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
];

console.log(solution(n, costs));
