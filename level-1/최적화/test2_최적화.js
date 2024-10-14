function solution(bandage, health, attacks) {
  let time = 0; // 현재 시간
  let maxTime = attacks[attacks.length - 1][0] + 1; // 마지막 공격 시간을 기준으로 최대 시간 설정
  let hp = health; // 현재 체력
  let [bandageTime, bandageX, bandageY] = bandage; // 시전 시간, 초당 회복량, 추가 회복량
  let bandageCount = 0; // 연속 회복 성공 횟수
  let attacksIndex = 0; // 공격 처리 인덱스

  for (let time = 0; time < maxTime; time++) {
    if (attacksIndex < attacks.length && attacks[attacksIndex][0] === time) {
      // 공격 시간이 현재 시간과 같다면 피해 처리
      hp -= attacks[attacksIndex][1];
      if (hp <= 0) return -1; // 체력이 0 이하가 되면 즉시 종료
      bandageCount = 0; // 공격을 받았으므로 연속 회복 횟수 초기화
      attacksIndex++;
    } else if (hp < health) {
      // 체력이 가득 차지 않았다면 회복
      hp += bandageX;
      if (++bandageCount === bandageTime) {
        hp += bandageY; // 추가 회복
        bandageCount = 0; // 추가 회복 후 초기화
      }
      if (hp > health) hp = health; // 최대 체력을 초과하면 최대 체력으로 설정
    }
  }

  return hp; // 남은 체력을 반환
}
