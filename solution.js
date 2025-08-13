// solution.js
function solution(D) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const res = {};

    // Step 1: Sum values by day
    for (let date in D) {
        const dayIndex = new Date(date).getDay();
        const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1];
        res[dayName] = (res[dayName] || 0) + D[date];
    }

    // Step 2: Fill missing days using average of prev and next
    for (let i = 0; i < days.length; i++) {
        if (res[days[i]] === undefined) {
            let prev = (i - 1 + days.length) % days.length;
            let next = (i + 1) % days.length;
            while (res[days[next]] === undefined) next = (next + 1) % days.length;
            while (res[days[prev]] === undefined) prev = (prev - 1 + days.length) % days.length;
            res[days[i]] = Math.floor((res[days[prev]] + res[days[next]]) / 2);
        }
    }

    return res;
}

// Unit tests
function runTests() {
    const case1 = {
        input: {
            '2020-01-01': 4, '2020-01-02': 4, '2020-01-03': 6,
            '2020-01-04': 8, '2020-01-05': 2, '2020-01-06': 6,
            '2020-01-07': 2, '2020-01-08': -2
        },
        expected: { Mon: -6, Tue: 2, Wed: 4, Thu: 4, Fri: 6, Sat: 8, Sun: 2 }
    };

    const case2 = {
        input: {
            '2020-01-01': 6, '2020-01-04': 12,
            '2020-01-05': 14, '2020-01-07': 4
        },
        expected: { Mon: 2, Tue: 4, Wed: 6, Thu: 8, Fri: 10, Sat: 12, Sun: 14 }
    };

    [case1, case2].forEach((test, idx) => {
        const output = solution(test.input);
        console.log(`Test ${idx + 1}:`, JSON.stringify(output) === JSON.stringify(test.expected) ? "Pass ✅" : "Fail ❌");
    });
}

runTests();
