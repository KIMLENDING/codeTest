// 성능 테스트
export function performanceTest(func, args, iterations = 100) {
  const times = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    func(...args);
    const end = performance.now();
    times.push(end - start);
  }
  const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
  console.log(`평균 실행 시간 ${func.name}: ${avgTime.toFixed(4)} ms`);
}
// 중간 크기의 배열 (100개 요소)
export const mediumScore = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 1000) + 1
);

// 큰 크기의 배열 (10000개 요소)  -- 이건 너무 오래걸려서 주석처리함
export const largeScore = Array.from(
  { length: 5000 },
  () => Math.floor(Math.random() * 10000) + 1
);

// 정렬된 배열 (오름차순, 1000개 요소)
export const sortedScore = Array.from({ length: 1000 }, (_, i) => i + 1);

// 역정렬된 배열 (내림차순, 1000개 요소)
export const reverseSortedScore = Array.from(
  { length: 1000 },
  (_, i) => 1000 - i
);

// 동일한 값이 많은 배열 (1000개 요소)
export const repeatedScore = Array.from(
  { length: 1000 },
  () => Math.floor(Math.random() * 10) + 1
);
