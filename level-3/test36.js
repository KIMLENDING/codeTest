//https://school.programmers.co.kr/learn/courses/30/lessons/12979
function solution(n, stations, w) {
  let answer = 0;
  const cover = 2 * w + 1; // 전파가 닿는 거리
  let start = 1; // 아파트 단지의 시작점

  for (const station of stations) {
    //
    const left = station - w; // 왼쪽 전파 끝 지점
    const right = station + w; // 오를쪽 전파 끝 지점

    if (start < left) {
      // 시작점 보다 left가 작으면 안됨 ( 그럼 전파가 터진다는 의미임)(ex 1에 기지국이 있으면 left는 음수 임으로 안됨)
      answer += Math.ceil((left - start) / cover); // 전파가 통하지 않는 아파트 개수를 기지국의 전파 거리로 나누면 필요한 기지국의 개수 (소수점 나올 시 올림 해야함 전파가 통하지 않는 곳이 생기면 안되니까)
    }
    start = right + 1; // 오른쪽 전파가 끝 지점에 +1을 하면 전파가 닿지 않는 새로운 아파트 (새로운 시작점 할당)
  }
  // 마지막 기지국 이후 남은 구간 처리
  if (start <= n) {
    const gap = n - start + 1;
    answer += Math.ceil(gap / cover);
  }
  return answer;
}

const N = 11;
const stations = [4, 11];
const W = 1;

console.log(solution(N, stations, W)); //3
