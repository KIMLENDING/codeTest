// https://school.programmers.co.kr/learn/courses/30/lessons/43165

function solution(numbers, target) {
  return dfs(numbers, target, 0, 0);
}

const dfs = (numbers, target, sum, index) => {
  /**
   * dfs는 깊이 우선 탐색으로 트리 구조
   */
  if (index === numbers.length) {
    return sum === target ? 1 : 0; // sum이 target과 같으면 1, 아니면 0
  }
  return (
    dfs(numbers, target, sum + numbers[index], index + 1) +
    dfs(numbers, target, sum - numbers[index], index + 1)
  );
};
/**
 * target이 3이고 numbers가 [1, 1, 1, 1]이면
 *
 *                  1
 *          1               -1
 *      1       -1       1       -1
 *  1     -1  1    -1  1    -1  1    -1
 * 4      2   2     0  2     0  0     1
 *
 *
 *  targetdl 3이니까 3이 나오는 경우의 수는 5개
 * 이런 식으로 트리 구조로 나타낼 수 있음
 */
const numbers = [1, 1, 1, 1];
const target = 2;
console.log(solution(numbers, target)); // 5
