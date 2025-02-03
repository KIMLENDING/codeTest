//https://school.programmers.co.kr/learn/courses/30/lessons/64064 //불량 사용자

function solution(user_id, banned_id) {
  const isMask = (user, ban) => {
    //마스크 부분 체크 ( 길이, 마스크 아닌부분이 다르면 false )
    if (user.length !== ban.length) return false;
    for (let i = 0; i < user.length; i++) {
      if (ban[i] !== "*" && ban[i] !== user[i]) return false;
    }
    return true;
  };

  const dfs = (index, bannedMap, selectedSet, results) => {
    if (index === bannedMap.length) {
      const sortedSet = Array.from(selectedSet).sort(); // 하나의 완성된 조합(정렬해서 조합의 순서를 통일시킴)
      results.add(sortedSet.join(","));
      return;
    }

    for (const user of bannedMap[index]) {
      // 각 밴 요소 별로
      if (!selectedSet.has(user)) {
        // 중복되지 않도록
        selectedSet.add(user); // 추가
        dfs(index + 1, bannedMap, selectedSet, results); // 다은 밴 요소로 넘어감
        selectedSet.delete(user); // 제거 (이전 상태로 복구)
      }
    }
  };

  const results = new Set();

  // 마스킹된 밴 요소별 밴가능한 id
  const bannedMap = banned_id.map((ban) => {
    return user_id.filter((user) => isMask(user, ban));
  });
  dfs(0, bannedMap, new Set(), results);
  return results.size;
}

const user_id = ["frodo", "fradi", "crodo", "abc123", "frodoc"];
const banned_id = ["fr*d*", "*rodo", "******", "******"];
console.log(solution(user_id, banned_id)); //2
