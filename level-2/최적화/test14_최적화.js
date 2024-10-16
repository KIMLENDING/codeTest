class UnionFind {
  constructor(size) {
    this.parent = Array(size) // 초기에 자기 자신을 가리키도록 설정
      .fill()
      .map((_, i) => i); // 루트를 추적하기 위해 사용
    console.log("parent", this.parent);
    this.size = Array(size).fill(1); // 1로 초기화
    console.log("size", this.size);
  }

  // x의 루트를 찾음 (경로 압축 최적화 적용)
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  // x와 y를 포함하는 집합을 합침 (크기 기반 최적화 적용)
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.size[rootX] < this.size[rootY]) {
        [rootX, rootY] = [rootY, rootX];
      }
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    }
    console.log("parent", this.parent);
    console.log("size", this.size);
  }

  // x가 속한 집합의 크기를 반환
  getSize(x) {
    return this.size[this.find(x)];
  }
}

export function optimizedSolution(land) {
  const rows = land.length;
  const cols = land[0].length;
  const uf = new UnionFind(rows * cols);

  // 2D 좌표를 1D 인덱스로 변환하는 헬퍼 함수
  const getIndex = (i, j) => i * cols + j;

  // 인접한 석유 셀 연결
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (land[i][j] === 1) {
        // 석유가 있는 셀만 확인
        // 위쪽과 왼쪽 셀을 확인하는 이유는 이미 확인한 셀이기 때문에
        // 연결 시키기 위해
        // 위쪽 셀 확인
        if (i > 0 && land[i - 1][j] === 1)
          uf.union(getIndex(i, j), getIndex(i - 1, j));
        // 왼쪽 셀 확인
        if (j > 0 && land[i][j - 1] === 1)
          uf.union(getIndex(i, j), getIndex(i, j - 1));
      }
    }
  }

  // 각 열의 석유량 계산
  const columnOil = new Array(cols).fill(0);
  for (let j = 0; j < cols; j++) {
    const seenRoots = new Set();
    for (let i = 0; i < rows; i++) {
      if (land[i][j] === 1) {
        const root = uf.find(getIndex(i, j));
        if (!seenRoots.has(root)) {
          seenRoots.add(root);
          columnOil[j] += uf.getSize(root);
        }
      }
    }
  }

  // 최대 석유량 반환
  return Math.max(...columnOil);
}
