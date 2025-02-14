//https://school.programmers.co.kr/learn/courses/30/lessons/77486
/**
 *
 * 이 문제는 간단하게 풀 수 있었음
 *  자식과 연결된 부모의 값을 업데이트 해주면 되는 간단한 문제임
 * 부모를 어떻게 업데이트 할지 조건만 잘 찾으면 할 수 있음
 * seller를 하나씩 돌면서 각 요소가 말단 노드 임으로
 * 이 말단 노드를 타고 올라가는 식으로 올라가면서 자기 자신이 번돈을 업데이트하고
 * 수수료를 부모 노드로 넘겨 주는  재귀 함수를 만들면 됨
 */
function solution(enroll, referral, seller, amount) {
  var answer = [];
  const map = new Map();
  map.set("-", ["", 0]); // '-'도 map에 포함

  enroll.forEach((element, i) => {
    map.set(element, [referral[i], 0]);
  });

  seller.forEach((element, i) => {
    let cash = amount[i] * 100;

    const update = (cash, target) => {
      if (target === "-" || cash < 1) return; // 탈출 조건 추가
      const send = Math.floor(cash * 0.1);
      const my = cash - send;

      let [parent, profit] = map.get(target);
      map.set(target, [parent, profit + my]);

      update(send, parent); // 다음 상위 추천인으로 전달
    };

    update(cash, element);
  });

  enroll.forEach((element) => {
    answer.push(map.get(element)[1]);
  });

  return answer;
}

const enroll = [
  "john",
  "mary",
  "edward",
  "sam",
  "emily",
  "jaimie",
  "tod",
  "young",
];
const referral = [
  "-",
  "-",
  "mary",
  "edward",
  "mary",
  "mary",
  "jaimie",
  "edward",
];
const seller = ["young", "john", "tod", "emily", "mary"];
const amount = [12, 4, 2, 5, 10];
console.log(solution(enroll, referral, seller, amount));
