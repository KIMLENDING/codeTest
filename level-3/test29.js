//https://school.programmers.co.kr/learn/courses/30/lessons/12927

function solution(n, works) {
  // 작업량을 내림차순 정렬
  works.sort((a, b) => b - a); //O(𝑘log⁡𝑘)

  while (n > 0) {
    // 가장 큰 작업량 가져오기
    if (works[0] === 0) break; // 작업량이 0이면 종료

    works[0]--; // 작업량 감소
    n--;

    // 갱신 후 정렬 대신 삽입 위치 조정
    let i = 0;
    while (i < works.length - 1 && works[i] < works[i + 1]) {
      //O(𝑘)
      // 내림차순 정렬
      [works[i], works[i + 1]] = [works[i + 1], works[i]]; // swap
      i++;
    }
  }

  // 남은 작업량의 제곱 합 계산
  return works.reduce((acc, cur) => acc + Math.pow(cur, 2), 0);
}

const n = 2;
const works = [1, 1, 1];
console.log(solution(n, works)); // 3
