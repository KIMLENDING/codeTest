//https://school.programmers.co.kr/learn/courses/30/lessons/64062
function solution(stones, k) {
  var answer = 0;
  // 모든 배열 -1씩 후 answer 1 증가
  // 단 -1을 하는 도중 k값 보다
  let count = 0;

  while (1) {
    for (let i = 0; i < stones; i++) {
      if (stones[i] === 0) {
        count += 1;
        if (count === k) return answer;
        continue;
      }
      stones[i] -= 1;
    }
    answer += 1;
  }

  return answer;
}

const stones = [2, 4, 5, 3, 2, 1, 4, 2, 5, 1];
const k = 3;
console.log(solution(stones, k)); // 3
