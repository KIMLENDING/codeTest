//https://school.programmers.co.kr/learn/courses/30/lessons/43164
function solution(tickets) {
  var answer = [];
  tickets.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1].localeCompare(b[1]);
    }
    return a[0].localeCompare(b[0]);
  });

  const v = Array.from({ length: tickets.length }, () => false);

  const dfs = (start, path) => {
    // 모든 티켓을 사용했다면 경로를 저장
    if (path.length === tickets.length + 1) {
      answer.push(...path);
      return true; // 하나의 경로를 찾으면 종료
    }

    for (let i = 0; i < tickets.length; i++) {
      if (!v[i] && tickets[i][0] === start) {
        v[i] = true; // 티켓 사용
        path.push(tickets[i][1]); // 경로 추가

        if (dfs(tickets[i][1], path)) return true;
        // 유효한 경로를 찾으면 종료

        v[i] = false; // 티켓 복구
        path.pop(); // 경로 복구
      }
    }

    return false; // 경로를 찾지 못함
  };

  dfs("ICN", ["ICN"]);
  return answer;
}
const tickets = [
  ["ICN", "COO"],
  ["ICN", "BOO"],
  ["COO", "ICN"],
  ["BOO", "DOO"],
];
console.log(solution(tickets));
