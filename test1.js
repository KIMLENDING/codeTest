/**https://school.programmers.co.kr/learn/courses/30/lessons/258712?language=javascript */
const friends = ["joy", "brad", "alessandro", "conan", "david"];
const gifts = [
  "alessandro brad",
  "alessandro joy",
  "alessandro conan",
  "david alessandro",
  "alessandro david",
];

const list = (friends, gifts) => {
  const total = {}; // 전체 친구들의 선물 정보
  const f = {}; // 친구별 선물 정보
  friends.map((friend) => {
    f[friend] = {};
    f[friend].추가선물 = 0;
    gifts.map((gift) => {
      if (gift.split(" ")[0] === friend) {
        // 검사중인 값이 선물을 본낸 친구가 있다면
        if (f[friend][gift.split(" ")[1]]) {
          // 이미 받은 선물이 있다면 1증가
          f[friend][gift.split(" ")[1]] += 1;
        } else {
          // 없다면 1로 초기화
          f[friend][gift.split(" ")[1]] = 1;
        }
      }
    });
    total[friend] = f[friend];
  });
  return total;
};

const field = (test) => {
  Object.keys(test).map((보낸사람) => {
    let 보낸선물_개수 = 0;
    let 받은선물_개수 = 0;

    Object.keys(test[보낸사람]).map((받은사람) => {
      if (test[보낸사람][받은사람]) {
        보낸선물_개수 += test[보낸사람][받은사람];
      }
    });
    test[보낸사람].보낸선물 = 보낸선물_개수;

    Object.keys(test).map((friend) => {
      if (보낸사람 === friend) {
        return;
      }
      if (test[friend][보낸사람]) {
        받은선물_개수 += test[friend][보낸사람];
      }
    });
    test[보낸사람].받은선물 = 받은선물_개수;
    test[보낸사람].받은선물;
    test[보낸사람].선물지수 = test[보낸사람].보낸선물 - test[보낸사람].받은선물; // 많이 보낼 수록 다음 달에 받을 확률이 높다.
  });
};
const answer1 = (test) => {
  Object.keys(test).map((보낸사람) => {
    Object.keys(test).map((받은사람) => {
      if (보낸사람 === 받은사람) {
        return;
      }
      if (
        test[보낸사람][받은사람] === undefined &&
        test[받은사람][보낸사람] === undefined
      ) {
        // console.log(보낸사람, "-", 받은사람);
        // 둘다 선물을 주고 받은 기록이 없다면 지수가 높은 사람이 선물을 받는다.
        if (test[보낸사람].선물지수 > test[받은사람].선물지수) {
          test[보낸사람].추가선물++;
        }
      } else if (test[보낸사람][받은사람] === undefined) {
        // 받은 적만 있고 준적이 없는 경우 - 즉 보낸_선물 < 받은_선물
        // test[받은사람].추가선물++;
      } else if (test[받은사람][보낸사람] === test[보낸사람][받은사람]) {
        // 같은 선물개수를 받은 경우
        test[보낸사람].선물지수 === test[받은사람].선물지수
          ? null
          : test[보낸사람].선물지수 > // 선물지수가 높은 사람이 선물을 받는다.
            test[받은사람].선물지수
          ? test[보낸사람].추가선물++
          : null;
      } else if (test[보낸사람][받은사람]) {
        //두 사람이 선물을 주고받은 기록이 있다면
        if (test[받은사람][보낸사람] === undefined) {
          // 받은 기록만 있는 경우
          test[보낸사람].추가선물++;
          //   console.log("받은 기록만 있는 경우", test[보낸사람].추가선물);
        } else {
          test[보낸사람][받은사람] > test[받은사람][보낸사람]
            ? test[보낸사람].추가선물++
            : null;
          //   console.log(
          //     "두 사람이 선물을 주고받은 기록이 있다면",
          //     test[보낸사람].추가선물
          //   );
        }
      }
    });
  });
};

function solution(friends, gifts) {
  var answer = 0;
  const total = list(friends, gifts);
  field(total);
  answer1(total);
  const answers = friends.map((friend) => {
    return total[friend].추가선물;
  });

  answer = Math.max.apply(null, answers);
  return answer;
}

const test = solution(friends, gifts);
