// https://school.programmers.co.kr/learn/courses/30/lessons/12987
const solution = (A, B) => {
  var answer = 0;
  let i = 0; // A 배열 포인터
  let j = 0; // B 배열 포인터
  A.sort((a, b) => b - a);
  B.sort((a, b) => b - a);
  while (i < A.length && j < B.length) {
    if (B[j] > A[i]) {
      // B의 현재 값이 A의 현재 값보다 크다면 이길 수 있음
      answer++;
      j++; // B의 포인터 이동
    }
    i++; // A의 포인터는 항상 이동
  }
  return answer;
};

const A = [7, 5, 4, 3, 3, 2, 2];
const B = [8, 6, 4, 4, 3, 2, 1];
console.log(solution(A, B)); // 3
