function solution1(n, works) {
  const maxHeap = new MaxHeap(works); // 최대 힙 생성

  while (n > 0) {
    let max = maxHeap.extractMax(); // 최대값 추출
    if (max === 0) break; // 최대값이 0이면 종료
    max--; // 최대값 -1
    maxHeap.insert(max); // 감소된 값을 다시 힙에 삽입
    n--; // 남은 시간 -1
  }
  return maxHeap.toArray().reduce((acc, cur) => acc + Math.pow(cur, 2), 0);
}

class MaxHeap {
  constructor(data = []) {
    this.heap = [];
    data.forEach((item) => this.insert(item));
  }

  insert(value) {
    // 삽입
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    // 삽입 후 재정렬
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] >= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  extractMax() {
    // 최대값 추출
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return max;
  }

  bubbleDown() {
    // 최대값 추출 후 재정렬
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild > element) swap = leftChildIndex;
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }

  toArray() {
    // 배열 반환
    return this.heap.slice();
  }
}
