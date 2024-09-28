function solution(friends, gifts) {
  const giftCount = new Map();
  const giftBalance = new Map();
  const nextMonthGifts = new Map();

  // Initialize maps
  friends.forEach((friend) => {
    giftCount.set(friend, new Map());
    giftBalance.set(friend, 0);
    nextMonthGifts.set(friend, 0);
  });

  // Process gifts
  gifts.forEach((gift) => {
    const [giver, receiver] = gift.split(" ");
    giftCount // 선물을 주고 받은 정보를 저장
      .get(giver)
      .set(receiver, (giftCount.get(giver).get(receiver) || 0) + 1); // 주고 받은 적이 없다면 undefiend 이면 0으로 간주함  있다면 1증가

    // 선물을 주고 받은 정보를 저장 - 지수데이터
    giftBalance.set(giver, giftBalance.get(giver) + 1);
    giftBalance.set(receiver, giftBalance.get(receiver) - 1);
  });

  for (let i = 0; i < friends.length; i++) {
    for (let j = i + 1; j < friends.length; j++) {
      const friend1 = friends[i];
      const friend2 = friends[j];
      const gift1to2 = giftCount.get(friend1).get(friend2) || 0;
      const gift2to1 = giftCount.get(friend2).get(friend1) || 0;

      if (
        gift1to2 > gift2to1 || // 1이 2에게 준 선물이 2가 1에게 준 선물보다 많거나 또는
        (gift1to2 === gift2to1 && // 1이 2에게 준 선물과 2가 1에게 준 선물이 같고
          giftBalance.get(friend1) > giftBalance.get(friend2)) // 지수가 1이 2보다 더 높다면
      ) {
        nextMonthGifts.set(friend1, nextMonthGifts.get(friend1) + 1); // 1이 선물을 하나 받는다.
      } else if (
        gift2to1 > gift1to2 || // 2가 1에게 준 선물이 1이 2에게 준 선물보다 많거나 또는
        (gift1to2 === gift2to1 && // 1이 2에게 준 선물과 2가 1에게 준 선물이 같고
          giftBalance.get(friend2) > giftBalance.get(friend1)) // 지수가 2가 1보다 더 높다면
      ) {
        nextMonthGifts.set(friend2, nextMonthGifts.get(friend2) + 1); // 2가 선물을 하나 받는다.
      }
    }
  }
  console.log("giftCount", giftCount);
  console.log("giftBalance", giftBalance);
  console.log("nextMonthGifts", nextMonthGifts);

  return Math.max(...nextMonthGifts.values());
}

// Test the solution
const friends = ["joy", "brad", "alessandro", "conan", "david"];
const gifts = [
  "alessandro brad",
  "alessandro joy",
  "alessandro conan",
  "david alessandro",
  "alessandro david",
];

console.log(solution(friends, gifts));
