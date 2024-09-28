// bandage는 [시전 시간, 초당 회복량, 추가 회복량] 형태의 길이가 3인 정수 배열입니다.
// 1 ≤ 시전 시간 = t ≤ 50
// 1 ≤ 초당 회복량 = x ≤ 100
// 1 ≤ 추가 회복량 = y ≤ 100
// 1 ≤ health ≤ 1,000
// 1 ≤ attacks의 길이 ≤ 100
// attacks[i]는 [공격 시간, 피해량] 형태의 길이가 2인 정수 배열입니다.
// attacks는 공격 시간을 기준으로 오름차순 정렬된 상태입니다.
// attacks의 공격 시간은 모두 다릅니다.
// 1 ≤ 공격 시간 ≤ 1,000
// 1 ≤ 피해량 ≤ 100
const bandage = [4, 2, 7]; // t, x, y
const health = 20;
const attacks = [
  [1, 15],
  [5, 16],
  [8, 6],
]; // 마지막 공격 시간을 최대 진행 시간으로 간주

function solution(bandage, health, attacks) {
  var answer = 0;
  let time = 0; // 진행 시간
  let maxTime = attacks[attacks.length - 1][0] + 1; // 마지막 공격 시간을 최대 진행 시간으로 간주
  let hp = health; // 체력
  let bandageTime = bandage[0]; // 최대 회복 시간
  let bandageX = bandage[1]; // 초당 회복량
  let bandageY = bandage[2]; // 추가 회복량
  let bandageCount = 0; // 연속 성공 횟수 if bandageCount가 bandageTime과 같으면 0으로 초기화 후 bandageY를 hp에 더해준다.
  let attacksIndex = 0;

  for (let i = 0; i < maxTime; i++) {
    if (i !== 0) {
      bandageCount++;
    }
    console.log("time", time);
    console.log("hp", hp);
    console.log("bandageCount", bandageCount);
    if (attacks[attacksIndex][0] === time) {
      console.log("공경당함");
      console.log("현재 hp", hp);
      console.log("피해량", attacks[attacksIndex][1]);
      hp -= attacks[attacksIndex][1];
      if (hp <= 0) {
        console.log("체력이 0이하로 떨어짐으로 종료");
        return -1;
      }
      console.log("남은 hp", hp);
      console.log("맞았음으로 bandageCount 초기화");
      bandageCount = 0;
      //   bandageCount++;
      attacksIndex++;
      time++;

      console.log("---------------------------");
      continue;
    }
    if (hp === health) {
      console.log("최대 체력임으로 회복할 필요가 없음");
      //   bandageCount++;
      time++;
    } else {
      hp += bandageX;
      if (bandageCount === bandageTime) {
        console.log(
          "연속 회복의 횟수가 최대 회복 시간과 일치함으로 추가 회복 및 연속회복 횟수 초기화"
        );
        hp += bandageY;
        bandageCount = 0;
      }
      if (hp > health) {
        // 최대 체력을 넘어가면 최대 체력으로 설정
        hp = health;
      }

      time++;
    }
    console.log("-------------------------------------");
  }
  answer = hp;

  return answer;
}
console.log(solution(bandage, health, attacks));
