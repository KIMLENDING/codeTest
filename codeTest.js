// 1. 랜덤으로 1 또는 0을 반환하는 함수
const get_1_or_0 = () => Math.random() < 0.5 ? 1 : 0;

// 2. 0부터 n사이의 임의의 정수반환하는 함수(단 난수 생성함수 사용 금지)
const get_random = (n)=>{
    let result = 0;
    for(let i = 0; i < n; i++) result += get_1_or_0();
    return result;
}
// 최대한 넓은 범위 즉 n 값을 매우 크게 하면서 속도를 빠르게 하는게 목표
// Math.random()의 시간 복잡도는 O(1) 
// get_random의 시간 복잡도는 O(n) 
// 그럼 랜덤함수가 n번 호출 되는 것 숫자가 커질 수록 비효율적임 
// 적어도 O(log n) 정도로 줄여야 할 것 같음
// 그러면서도 모든 숫자가 균등하게 나와야함 
// 그럼 비트로 바꿔서 각 자리의 확률을 50%로 맞추면 될 것 같음

// 1. 필요한 비트수가 얼마인지 계산하고
// 2. 비트수 만큼 반복을 하면서 각 자리를 50% 확률로 1 또는 0을 채움
// 2.1 왼쪽 시프트로 자릿수를 늘리고, 거기에 새로운 비트를 추가한다
// 3. 생성된 숫자가 n보다 크면 다시 반복
const get_random2 = (n) => {
    if (n <= 0) return 0;
    
    // 필요한 비트 수 
    const bits = n.toString(2).length;
    let result;
    do {
        result = 0;
        for (let i = 0; i < bits; i++) {
            result = (result << 1) | get_1_or_0();
        }
    } while (result > n); 
    return result;
};


function performanceTest(func, args, iterations = 1000) {
  const times = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    func(args);
    const end = performance.now();
    times.push(end - start);
  }
  const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
  console.log(`평균 실행 시간 ${func.name}: ${avgTime.toFixed(4)} ms`);
}
performanceTest(get_random, 214748); // 평균 실행 시간(1000회) get_random: 2.2209 ms
performanceTest(get_random2, 214748); // 평균 실행 시간(1000회) get_random2: 0.0011 ms