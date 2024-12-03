console.log("Hello world!");

// Ideas
// crt, scanlines and pan number curtain across screen

// generate numbers
// randomly select numbers
// give special classes, transitions and change the number 
// repeat

document.addEventListener("DOMContentLoaded", function () {
    const backdrop = document.querySelector('.backdrop');

    // Generate initial random numbers
    let numbers = generateNumbers();
    updateBackdrop(numbers, backdrop);

    // Apply a special class to random numbers every few seconds
    setInterval(() => {
        //! applySpecialClass(numbers, backdrop);
        // changeRandomNumbers(numbers)
        // console.log("Called.")
    }, 2000); // Every 2 seconds


    // Scrambles header title with random letters as a hover effect before returning to original state
    // Commented out during development
    //! const letters = "abcedefghijklmnoprqstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    document.querySelector("h1").onmouseover = event =>{
        let iterations = 0;
        
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {

                    if (index < iterations){
                        return event.target.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 52)]; // 52 for letters.length
                })
                .join("");

            // Scrambles for as many letters as shown
            if  (iterations >= event.target.dataset.value.length) 
                clearInterval(interval);

            iterations++;
       }, 30); // Every 30 miliseconds
    }

    // An attempt to create a box shadow box effect as a way to "highlight" the backdrop
    // Doesn't work the way I thought it would... not sure what's going on yet 
    document.querySelector(".backdrop").onmousemove = event => {
        // Get the dimensions and position of the element
        const rect = event.target.getBoundingClientRect();
    
        // Calculate mouse position relative to the element
        const x = event.clientX - rect.left; 
        const y = event.clientY - rect.top;  
    
        // Set a fixed box-shadow size
        const shadowWidth = 100; 
        const shadowHeight = 100; 
        const blurRadius = 0;
    
        // Update the box-shadow property
        event.target.style.boxShadow = `
            ${x - shadowWidth / 2}px 
            ${y - shadowHeight / 2}px 
            ${blurRadius}px 
            lime inset
        `;
    };
});

// Generates number curtain with random values
function generateNumbers() {
    const numbers = [];
    for (let i = 0; i < 3000; i++) {
        const number = Math.floor(Math.random() * 10);
        numbers.push(number);
    }
    return numbers;
}

// Updates HTML with random numbers 
function updateBackdrop(numbers, backdrop) {
    backdrop.innerHTML = numbers.map(num => `<span>${num}</span>`).join('');
}

// Applies a special class to a random subset of numbers in the backdrop
function applySpecialClass(numbers, backdrop) {
    const numberElements = backdrop.querySelectorAll('span');
    const totalNumbers = numberElements.length;

    // Remove existing special classes
    numberElements.forEach(element => element.classList.remove('special'));

    const updatedIndices = new Set(); // Track updated indices to ensure uniqueness

    while (updatedIndices.size < totalNumbers * 0.10) {
        const randomIndex = Math.floor(Math.random() * totalNumbers);

        // Skip if this index was already updated
        if (updatedIndices.has(randomIndex)) continue;

        const element = numberElements[randomIndex];
        const currentNumber = parseInt(element.textContent, 10);

        // Generate a new number that is guaranteed to be different
        const potentialNumbers = Array.from({ length: 10 }, (_, idx) => idx).filter(n => n !== currentNumber);
        const newNumber = potentialNumbers[Math.floor(Math.random() * potentialNumbers.length)];

        // Update the element
        element.classList.add('special');
        element.textContent = Math.floor(Math.random() * 10) + 1;
        // element.innerHTML = `<span>${newNumber}</span>`;

        updatedIndices.add(randomIndex); // Mark this index as updated
        console.log(`Updated element ${randomIndex}: ${currentNumber} => ${newNumber}`);
    }
}

// Obselete 
function changeRandomNumbers(numbers) {
    applySpecialClass(document.querySelector('.backdrop'));
    const totalToChange = Math.floor(numbers.length / 2);
    const updatedIndices = new Set();

    while (updatedIndices.size < totalToChange) {
        const randomIndex = Math.floor(Math.random() * numbers.length);

        if (updatedIndices.has(randomIndex)) continue;

        numbers[randomIndex] = Math.floor(Math.random() * 10); // New random number
        updatedIndices.add(randomIndex); // Mark as updated
    }

    return numbers;
}
