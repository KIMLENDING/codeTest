// 문제 링크 https://school.programmers.co.kr/learn/courses/30/lessons/178871
const players = ["mumu", "soe", "poe", "kai", "mine"];
const callings = ["kai", "kai", "mine", "mine"];
function solution(players, callings) {
  var answer = Array.from(players); // 플레이어 배열 복사
  const indexMap = new Map(); // 플레이어의 인덱스를 저장할 맵
  answer.forEach((item, index) => {
    indexMap.set(item, index);
  });
  for (const calling of callings) {
    // 복잡도 O(n)
    // const index = answer.indexOf(calling); // 호출된 플레이어의 인덱스
    // ------------------------------------------------------------------

    // 복잡도 O(1)
    const index = indexMap.get(calling); // 호출된 플레이어의 인덱스
    indexMap.set(calling, index - 1); // 호출된 플레이어의 인덱스를 1 감소
    const 추월당한선수 = answer[index - 1]; // 추월당한선수를 임시로 저장
    indexMap.set(추월당한선수, index); // 추월당한선수의 인덱스를 1 증가

    // ------------------------------------------------------------------
    answer[index - 1] = calling; // 호출된 플레이어를 추월
    answer[index] = 추월당한선수; // 추월당한선수를 호출된 플레이어가 있던 자리로 이동
    // ------------------------------------------------------------------
    // splice는 재배치를 하기 때문에 오래걸림
    // answer.splice(index, 1); // 호출된 플레이어를 제거
    // answer.splice(index - 1, 0, calling); // 호출된 플레이어를 추월
  }
  return answer;
}
console.log(solution(players, callings)); //["mumu", "kai", "mine", "soe", "poe"]
