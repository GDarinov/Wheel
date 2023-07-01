// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    // Get references to elements
    const wheel = document.querySelector(".wheel");
    const spinButton = document.querySelector(".spin-button");
    const lastWin = document.getElementById("last-win");
    const betButtons = document.querySelectorAll(".bet-button");
    const balanceDisplay = document.getElementById("balance-display");
    const goodLuckMessage = document.getElementById("good-luck-message");
    const remainingFreeSpinsDisplay = document.getElementById("remaining-free-spins");
    const totalWinningsDisplay = document.getElementById("total-winnings");
  
    // Store the available options and their respective values
    const options = [
      { text: "2x", value: 2 },
      { text: "0", value: 0 },
      { text: "1x", value: 1 },
      { text: "0", value: 0 },
      { text: "3x", value: 3 },
      { text: "0", value: 0 },
      { text: "10x", value: 10 },
      { text: "1x", value: 1 },
      { text: "0",  value: 0 },
      { text: "3x", value: 3 },
      { text: "0",  value: 0 },
      { text: "1x", value: 1 },
      { text: "0", value: 0 },
      { text: "5x", value: 5 },
      { text: "0",  value: 0 },
      { text: "Free Spins", value: 'free spins' },
      { text: "0", value: 0 },
      { text: "4x",  value: 4 },
    ];
  
    remainingFreeSpinsDisplay.style.color = "transparent";
    totalWinningsDisplay.style.color = "transparent";
  
    let spinsCounter = 0;
  
    function delay(duration) {
      return new Promise(resolve => setTimeout(resolve, duration));
    }
  
    let remainingFreeSpins = 0;
  
    function freeSpin(betAmount) {
      return new Promise((resolve) => {
          defaultAngle+=1800;
        // The original code for your freeSpin function here, but without the setTimeout...
  
        // Get a random index to determine the selected option
        const randomIndex = Math.floor(Math.random() * options.length);
        currentOption = options[randomIndex];
  
        // Calculate the rotation angle based on the selected option
        const baseAngle = 360 / options.length; // Angle between each segment
        const winningAngle = 270; // Angle to position the winning sector
        const rotationAngle =
          360 - (randomIndex * baseAngle + winningAngle) + defaultAngle;
  
        // Apply the rotation animation to the wheel
        wheel.style.transform = "rotate(" + rotationAngle + "deg)";
  
        // Wait for the animation to finish and calculate the winnings
        delay(5000).then(() => {
          if(currentOption.value==='free spins'){
              remainingFreeSpins+=3;
            alert('Congratulations! You won 3 more free spins')
            resolve(0); // Resolve with 0 winnings if it's a free spin
          } else {
            // Calculate the winnings based on the selected option and bet amount
            let winnings = currentOption.value * betAmount;
            resolve(winnings); // Resolve with the calculated winnings
          }
        });
      });
    }
  
  
    async function freeSpins(betAmount) {
          spinButton.disabled = true;
    spinButton.style.pointerEvents = "none";
    for (let i = 0; i < betButtons.length; i++) {
        betButtons[i].disabled = true;
        betButtons[i].style.pointerEvents = "none";
      };
      remainingFreeSpinsDisplay.style.color = "black";
      totalWinningsDisplay.style.color = "black";
      let totalWinnings = 0;
      totalWinningsDisplay.textContent = `Total Free Spin Winnings: ${totalWinnings} coins`;
      remainingFreeSpinsDisplay.textContent = `Remaining Free Spins: ${remainingFreeSpins}`;
      while(remainingFreeSpins>0){
        let currentWin= await freeSpin(betAmount);
        if(currentWin>0)totalWinnings+=currentWin;
        remainingFreeSpins--;
        totalWinningsDisplay.textContent = `Total Free Spin Winnings: ${totalWinnings} coins`;
       remainingFreeSpinsDisplay.textContent = `Remaining Free Spins: ${remainingFreeSpins}`;
      balance += currentWin;
      updateBalanceDisplay(); 
      }
      totalWinningsDisplay.textContent = `Total Free Spin Winnings: ${totalWinnings} coins`;
      //totalWinningsDisplay.textContent = `Total Free Spin Winnings: 0 coins`;
  
    
      setTimeout(() => {
        if(totalWinnings>0){
          alert("Congratulations! You won " + totalWinnings + " coins in free spins");
          lastWin.textContent = `Last win: ${totalWinnings} coins`;
        }else alert("You won 0 coins in free spins. Better luck next time!")
          
      //totalWinningsDisplay.textContent = 0;
       //remainingFreeSpinsDisplay.textContent = remainingFreeSpins;
       remainingFreeSpinsDisplay.style.color = "transparent";
      totalWinningsDisplay.style.color = "transparent";


      spinButton.disabled = false;
     spinButton.style.pointerEvents = "auto";

     for (let i = 0; i < betButtons.length; i++) {
        betButtons[i].disabled = false;
        betButtons[i].style.pointerEvents = "auto";
      };
   
        }, 1000); 
        //totalWinningsDisplay.textContent = `Total Free Spin Winnings: 0 coins`;
      
      return totalWinnings;
    }
  
    // Update the value inside each wheel segment
    const segmentValues = document.querySelectorAll(".segment-value");
    options.forEach((option, index) => {
      segmentValues[index].textContent = option.text;
    });
  
    // Store the current selected option, bet amount, and balance
    let currentOption = null;
    let currentBetAmount = 0;
    let balance = 500;
  
    // Update the balance display
    function updateBalanceDisplay() {
      balanceDisplay.textContent = "Balance: " + balance + " coins";
      // Disable bet buttons with amounts exceeding the balance
      betButtons.forEach(function (button) {
        const betAmount = parseInt(button.dataset.betAmount);
        button.disabled = betAmount > balance;
      });
    }
  
    // Add event listeners to the bet buttons
    betButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Get the bet amount from the data attribute of the button
        currentBetAmount = parseInt(button.dataset.betAmount);
  
        // Update the selected bet amount
        betButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });
        button.classList.add("active");
      });
    });
  
    // Add event listener to the spin button
    spinButton.addEventListener("click", spinWheel);
  
    let defaultAngle = 0;
  
    // Get the spin indexes for the rigged spins
    function getNonConsecutiveNumbers() {
      const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
      function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
      }
    
      function getNonAdjacentDigits(arr, n) {
        let result = [];
    
        while (result.length < n) {
          const index = getRandomIndex(arr.length);
          const current = arr[index];
          
          // Check if the current number is adjacent to any number in the result array
          const isAdjacent = result.some((num) => Math.abs(num - current) === 1);
    
          if (!isAdjacent) {
            result.push(current);
            arr.splice(index, 1);
          }
        }
    
        return result;
      }
    
      let threeNumbers = getNonAdjacentDigits(digits, 3);
      let twoNumbers = getNonAdjacentDigits(digits, 2);
    
      return [threeNumbers, twoNumbers];
    }
  
       let [threeNumbers,twoNumbers] = getNonConsecutiveNumbers();
  
    // Function to spin the wheel
    function spinWheel() {
      totalWinningsDisplay.textContent = `Total Free Spin Winnings: 0 coins`;
  
      spinsCounter++;
  
      if(spinsCounter%10===0){
          [threeNumbers,twoNumbers] = getNonConsecutiveNumbers();
      }
      //spinsCounter++;
      if (currentBetAmount === 0) {
        alert("Please choose a bet amount.");
        return;
      }
  
      goodLuckMessage.style.color = "black";
  
      // Increase default angle
      defaultAngle += 1800;
  
      // Check if the bet amount is greater than the balance
      if (currentBetAmount > balance) {
        return alert("Insufficient balance. Please choose a lower bet amount.");
      }
  
      // Deduct the bet amount from the balance
      balance -= currentBetAmount;
      updateBalanceDisplay();
  
      // Disable the spin button
      spinButton.disabled = true;
      spinButton.style.pointerEvents = "none";

      // Disable the bet buttons
      for (let i = 0; i < betButtons.length; i++) {
          betButtons[i].disabled = true;
          betButtons[i].style.pointerEvents = "none";
        };
  
      // Get a random index to determine the selected option
      let randomIndex=0;
  
      if (spinsCounter % 10 === threeNumbers[0] || spinsCounter%10===threeNumbers[1] || spinsCounter%10===threeNumbers[2]){
          randomIndex = 16;
      } else if (spinsCounter % 10 === twoNumbers[0] || spinsCounter%10===twoNumbers[1]){
          randomIndex=17;
      } else {
          randomIndex = Math.floor(Math.random() * options.length);
  
          if (randomIndex>15) {
              randomIndex-=3;
          }
      }
      currentOption = options[randomIndex];
  
  
      // Calculate the rotation angle based on the selected option
      const baseAngle = 360 / options.length; // Angle between each segment
      const winningAngle = 270; // Angle to position the winning sector
      const rotationAngle =
        360 - (randomIndex * baseAngle + winningAngle) + defaultAngle;
  
      // Apply the rotation animation to the wheel
      wheel.style.transform = "rotate(" + rotationAngle + "deg)";
  
      // Wait for the animation to finish and display the selected option
      setTimeout(function () {
          goodLuckMessage.style.color = "transparent";
        
          spinButton.disabled = false;
     spinButton.style.pointerEvents = "auto";

     for (let i = 0; i < betButtons.length; i++) {
        betButtons[i].disabled = false;
        betButtons[i].style.pointerEvents = "auto";
      };

        let winnings=0
        if(currentOption.value==='free spins'){
          spinButton.disabled=true;
          remainingFreeSpins+=3;
          alert('Congratulations! You won 3 free spins!')
          winnings = freeSpins(currentBetAmount);
          spinButton.disabled=false;
          
        }else{
        // Calculate the winnings based on the selected option and bet amount
        winnings = currentOption.value * currentBetAmount;
        }
  
        if (winnings > 0) {
          lastWin.textContent = `Last win: ${winnings} coins`;
        // Add the winnings to the balance      
        balance +=winnings;
          updateBalanceDisplay()
  
          alert("Congratulations! You won " + winnings + " coins.");
        } else if(winnings===0){
          // Enable the bet buttons
      for (let i = 0; i < betButtons.length; i++) {
          betButtons[i].disabled = false;
        }
           alert("Try again!");
        }
      }, 5000); 
    }
  
    // Update the balance display initially
    updateBalanceDisplay();
  });