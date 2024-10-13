function solution1(k, score) {
  // 1차 최적화
  var answer = [];
  for (let i = 1; i <= score.length; i++) {
    if (i < k) {
      answer.push(score.slice(0, i).sort((a, b) => b - a)[i - 1]);
    } else {
      answer.push(score.slice(0, i).sort((a, b) => b - a)[k - 1]);
    }
  }
  return answer;
}
//Math.min(i, k) 으로 둘 중 작은 값을 선택
function solution2(k, score) {
  //2차 최적화
  // k개 이하일 때는 k개까지만 정렬하고,
  //   k개 이상일 때는 k개까지만 정렬한 후 k번째 요소를 선택
  var answer = [];
  for (let i = 1; i <= score.length; i++) {
    answer.push(score.slice(0, i).sort((a, b) => b - a)[Math.min(i, k) - 1]);
  }
  return answer;
}

function solution3(k, score) {
  //3차 최적화   이건 성능이 좀 더 좋음 대신 직관이 떨어진달까?
  // 항상 k개의 요소만 유지하면서 최소값을 구하는 방법
  var answer = [];
  return score.reduce((acc, cur) => {
    answer.push(cur); // 현재 값을 추가
    answer = answer.sort((a, b) => b - a).slice(0, k); // 내림차순 정렬 후 k개만큼 잘라냄
    return [...acc, Math.min(...answer)]; // 현재까지의 최소값을 배열에 추가
  }, []);
}

// 성능 테스트
function performanceTest(func, args, iterations = 100) {
  const times = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    func(...args);
    const end = performance.now();
    times.push(end - start);
  }
  const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
  console.log(
    `Average execution time for ${func.name}: ${avgTime.toFixed(4)} ms`
  );
}

const k = 3;
const score = [10, 100, 20, 150, 1, 100, 200]; // [10, 10, 10, 20, 20, 100, 100]
performanceTest(solution2, [k, score]);
performanceTest(solution3, [k, score]);
// 중간 크기의 배열 (100개 요소)
const mediumScore = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 1000) + 1
);
performanceTest(solution2, [k, mediumScore]);
performanceTest(solution3, [k, mediumScore]);
// 큰 크기의 배열 (10000개 요소)  -- 이건 너무 오래걸려서 주석처리함
// const largeScore = Array.from(
//   { length: 10000 },
//   () => Math.floor(Math.random() * 10000) + 1
// );
// performanceTest(solution2, [k, largeScore]);
// performanceTest(solution3, [k, largeScore]);
// 정렬된 배열 (오름차순, 1000개 요소)
const sortedScore = Array.from({ length: 1000 }, (_, i) => i + 1);
performanceTest(solution2, [k, sortedScore]);
performanceTest(solution3, [k, sortedScore]);
// 역정렬된 배열 (내림차순, 1000개 요소)
const reverseSortedScore = Array.from({ length: 1000 }, (_, i) => 1000 - i);
performanceTest(solution2, [k, reverseSortedScore]);
performanceTest(solution3, [k, reverseSortedScore]);
// 동일한 값이 많은 배열 (1000개 요소)
const repeatedScore = Array.from(
  { length: 1000 },
  () => Math.floor(Math.random() * 10) + 1
);
performanceTest(solution2, [k, repeatedScore]);
performanceTest(solution3, [k, repeatedScore]);
// 극단적인 값을 포함한 배열
const extremeScore = [1, 1000000, 5, 10, 15, 500000, 20, 25, 30, 750000];
performanceTest(solution2, [k, extremeScore]);
performanceTest(solution3, [k, extremeScore]);
