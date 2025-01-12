document.querySelectorAll('.start-time, .end-time, .break-time').forEach(input => {
    input.addEventListener('input', calculateHours);
});

function calculateHours() {
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        let totalRowHours = 0;
        const timeCells = row.querySelectorAll('td');

        timeCells.forEach(cell => {
            const startTime = cell.querySelector('.start-time')?.value;
            const endTime = cell.querySelector('.end-time')?.value;
            const breakTime = parseFloat(cell.querySelector('.break-time')?.value) || 0;

            if (startTime && endTime) {
                const start = new Date(`1970-01-01T${startTime}Z`);
                const end = new Date(`1970-01-01T${endTime}Z`);
                let hoursWorked = (end - start) / (1000 * 60 * 60);
                if (hoursWorked < 0) hoursWorked += 24;

                hoursWorked = Math.max(hoursWorked - breakTime, 0); // Restar refrigerio
                totalRowHours += hoursWorked;
            }
        });

        row.querySelector('.total-hours').textContent = totalRowHours.toFixed(2);
    });
}
