//https://school.programmers.co.kr/learn/courses/30/lessons/42884 //단속카메라

function solution(routes) {
  var answer = 0;
  routes.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  }); //진출을 기준으로 오름차순 정렬

  let camera = -30001; // 카메라의 초기 위치를 설정
  for (const [a, b] of routes) {
    if (camera < a) {
      // 카메라가 진입 지점보다 앞에 있으면
      console.log(camera, a, b);
      camera = b; // 카메라를 진출 지점에 설치

      answer++;
    }
  }
  return answer;
}
const routes = [
  [-20, -15],
  [-14, -5],
  [-18, -13],
  [-5, -3],
  [-6, -3],
]; //[진입, 진출]
console.log(solution(routes)); //2
