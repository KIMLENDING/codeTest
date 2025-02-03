//https://school.programmers.co.kr/learn/courses/30/lessons/161988

function solution(sequence) {
  const a1 = sequence.map((a, i) => {
    return i % 2 === 0 ? a * -1 : a;
  });
  const a2 = sequence.map((a, i) => {
    return i % 2 === 0 ? a : a * -1;
  });

  const dp = (arr) => {
    let i = 0;
    let sum = 0;
    let max = 0;
    while (i < arr.length) {
      sum = Math.max(sum + arr[i], arr[i]); // 이전 값의 합+ 현재 값과 현재 값 중 큰것
      max = max < sum ? sum : max; // max값 찾기
      i++;
    }
    return max;
  };
  return Math.max(dp(a1), dp(a2));
}

const sequence = [2, 3, -6, 1, 3, -1, 2, 4];
console.log(solution(sequence));
