//https://school.programmers.co.kr/learn/courses/30/lessons/67259

function solution(board) {
  const N = board.length;
  const dist = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => Array.from({ length: 4 }).fill(Infinity))
  );

  dist[0][0] = [0, 0, 0, 0];

  const dx = [-1, 1, 0, 0]; // 상, 하, 좌, 우
  const dy = [0, 0, -1, 1]; // 0, 1, 2, 3

  const pq = []; // 초기엔 어느 방향도 아님으로 -1 [비용,x,y,dir]

  for (let i = 0; i < 4; i++) {
    const nx = dx[i];
    const ny = dy[i];
    // 이동 가능한 좌표(범위를 벗어나지 않고 벽이 없는)
    if (nx >= 0 && nx < N && ny >= 0 && ny < N && board[nx][ny] === 0) {
      dist[nx][ny][i] = 100; // 직선 도로
      pq.push([100, nx, ny, i]); //[비용,x,y,dir]
    }
  } // (0,0)에서 (0,1)(우) 과 (1,0)(하)으로 움직임 //dist[0][1][3], dist[1][0][1] = 100

  while (pq.length > 0) {
    pq.sort((a, b) => b[0] - a[0]); // 비용(cost) 기준으로 오름차순 정렬 (갈 수 있는 방향 중 최소비용이 드는 곳 먼저 )
    const [cost, x, y, dir] = pq.pop(); // 최소 비용을 가진 요소를 꺼냄

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue; // 범위 체크
      if (board[nx][ny] === 1) continue; // 벽이면 못 감

      const newCost = cost + (i === dir ? 100 : 600); // 같은 방향이면 100, 코너면 600

      if (newCost < dist[nx][ny][i]) {
        // 최소 비용 갱신 시
        dist[nx][ny][i] = newCost;
        pq.push([newCost, nx, ny, i]); // 우선순위 큐에 추가
      }
    }
  }

  return Math.min(...dist[N - 1][N - 1]);
}

const board = [
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
];
console.log(solution(board)); //3800;

/**
 * 최단 경로를 구해야 함으로 bfs를 사용하면 좋을 것 같은데
 * 다리 건설비용이 들어가니까 다익스트라를 써야할 것 같음
 * 최소 비용을 우선 탐색하는 방향으로 만들면 될 것 같다.
 * - bfs처럼 탐색하되 우선순위(최소비용) 큐를 사용한 다익스트라 알고리즘
 *
 * 직선: 도로 100원
 * 코너: 도로 100원 + 추가비용 500원
 * 추가비용을 알려면 어느 방향에서 왔는지 알아야함
 * - (cost,x,y,direction) (비용,x,y,방향)
 * - dist을 3차원 배열로 하는 이유는
 * - 방향별 최소 비용을 저장하기 위해서임
 * ( 만약 2차원 배열로 하고 NewCost값이 기존 값보다 작으면 교체 한다 했을 때 )
 * (오른쪽에서 온 값인지 위에서 온 값인지 알 수 없게 됨으로 (코너를 계산 할 수 없게 되어버림))
 *
 */
