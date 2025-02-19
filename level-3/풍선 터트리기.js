// https://school.programmers.co.kr/learn/courses/30/lessons/68646
//풍선 터트리기기
function solution(a) {
  let n = a.length;
  if (n === 1) return 1; // 예외 처리

  let leftMin = Array(n).fill(0);
  let rightMin = Array(n).fill(0);

  // 왼쪽 최소값 채우기
  leftMin[0] = a[0];
  for (let i = 1; i < n; i++) {
    leftMin[i] = Math.min(leftMin[i - 1], a[i]); // 인접 한 값 중 최솟값 살림림
  }

  // 오른쪽 최소값 채우기
  rightMin[n - 1] = a[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMin[i] = Math.min(rightMin[i + 1], a[i]); // 인접 한 값 중 최솟값 살림림
  }
  // 살아남을 수 있는 풍선 개수 계산
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] <= leftMin[i] || a[i] <= rightMin[i]) {
      //기준값보다 한쪽만 작아도 되는 이유는
      // 단 한번 작은 값을 터트릴 수 있기 때문
      count++;
    }
  }

  return count;
}

const a = [9, -1, -5];

console.log(solution(a));
// 인접한 두 풍선 중에서 번호가 더 작은 풍선을 터트리는 행위는 최대 1번만 할 수 있음
// 살아남아야 하는 풍선 기준 왼쪽과 오른쪽에 기준 풍선보다 작은 놈은 왼쪽이든 오른쪽이든 한곳만 있으면 기준 풍선은 살아 남을 수 있음
// 왼쪽에서 부터 i번재를 기준으로 각 i번째 마다 최솟값을 갱신해 주면 됨
// 그럼  i를 기준으로 왼쪽을 기준으로  i번째에 최솟값을 알 수 있으니 살아남아야 하는 값이 저것 보다 최솟 값이거나 커도 ㄱㅊ(단 이럼 오른쪽은 살아남아야 하는 값보다 커야함)
// 그러니 왼쪽,오른쪽 인덱스 별로 최솟값을 구하면 해결 가능
