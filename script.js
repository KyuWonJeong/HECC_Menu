let jobs = [];

document.getElementById('addJob').addEventListener('click', addJob);

function addJob() {
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value);
    const daysPerWeek = parseFloat(document.getElementById('daysPerWeek').value);

    if (isNaN(hourlyRate) || isNaN(hoursPerDay) || isNaN(daysPerWeek)) {
        alert('모든 입력란을 채워주세요.');
        return;
    }

    jobs.push({ hourlyRate, hoursPerDay, daysPerWeek });
    displayJobs();
    clearInputs();
}

function displayJobs() {
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';

    jobs.forEach((job, index) => {
        const jobItem = document.createElement('div');
        jobItem.classList.add('job');
        jobItem.innerHTML = `
            <p><strong>일 ${index + 1}</strong><br><br>
            시급: ${job.hourlyRate}원<br>
            하루 일하는 시간: ${job.hoursPerDay}시간<br>
            일주일에 일하는 날: ${job.daysPerWeek}일</p>
            <button type="button" style="font-family: AppleSDGothicNeoM00;" 
            onclick="removeJob(${index})">제거</button>`
        jobList.appendChild(jobItem);
    });
}

function clearInputs() {
    document.getElementById('hourlyRate').value = '';
    document.getElementById('hoursPerDay').value = '';
    document.getElementById('daysPerWeek').value = '';
}

function removeJob(index) {
    jobs.splice(index, 1);
    displayJobs();
}

function calculateTotalSalary() {
    let totalWeeklySalary = 0;
    let totalMonthlySalary = 0;

    jobs.forEach(job => {
        const { hourlyRate, hoursPerDay, daysPerWeek } = job;
        
        const weeklySalary = hourlyRate * hoursPerDay * daysPerWeek;
        const monthlySalary = weeklySalary * 4; // Rough estimate: 4 weeks per month

        totalWeeklySalary += weeklySalary;
        totalMonthlySalary += monthlySalary;
    });

    // 소수점 버리기
    totalWeeklySalary = Math.floor(totalWeeklySalary);
    totalMonthlySalary = Math.floor(totalMonthlySalary);

    // 숫자 형식 지정 및 결과 표시
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `주급: ${formatNumber(totalWeeklySalary)}원<br>월급: ${formatNumber(totalMonthlySalary)}원`;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
