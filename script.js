// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Get references to elements
  const wheel = document.querySelector(".wheel");
  const spinButton = document.getElementById("spin-button");
  const lastWin = document.getElementById("last-win");
  const betButtons = document.querySelectorAll(".bet-button");
  const resetButton = document.getElementById("reset-button");
  const balanceDisplay = document.getElementById("balance-display");
  const goodLuckMessage = document.getElementById("good-luck-message");

  // Store the available options and their respective values
  const options = [
    { text: "2x", value: 2 },
    { text: "0", value: 0 },
    { text: "1x", value: 1 },
    { text: "0", value: 0 },
    { text: "3x", value: 3 },
    { text: "2x", value: 2 },
    { text: "0", value: 0 },
    { text: "1x", value: 1 },
    { text: "0", value: 0 },
    { text: "3x", value: 3 },
    { text: "0", value: 0 },
    { text: "1x", value: 1 },
    { text: "0", value: 0 },
    { text: "5x", value: 5 },
    { text: "0", value: 0 },
    { text: "10x", value: 10 },
    { text: "0", value: 0 },
    { text: "Free Spins", value: 'freeSpins' },
  ];

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

  // Function to spin the wheel
  function spinWheel() {
    if (currentBetAmount === 0) {
      alert("Please choose a bet amount.");
      return;
    }
    goodLuckMessage.style.display = "block";
    
    // Increase default angle
    defaultAngle += 1800;

    // Check if the bet amount is greater than the balance
    if (currentBetAmount > balance) {
      alert("Insufficient balance. Please choose a lower bet amount.");
      return;
    }

    // Deduct the bet amount from the balance
    balance -= currentBetAmount;
    updateBalanceDisplay();

    // Disable the spin button
    spinButton.disabled = true;

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

    // Wait for the animation to finish and display the selected option
    setTimeout(function () {
      goodLuckMessage.style.display = "none";
      spinButton.disabled = false;

      // Calculate the winnings based on the selected option and bet amount
      const winnings = currentOption.value * currentBetAmount;
      if (winnings != 0) lastWin.textContent = `Last win: ${winnings} coins`;
      // Add the winnings to the balance
      balance += winnings;
      updateBalanceDisplay();
      if (winnings != 0) {
        alert("Congratulations! You won " + winnings + " coins.");
        lastWin = winnings;
      } else alert("Try again!");
    }, 5000); 
  }
  // Add event listener to the reset button
  resetButton.addEventListener("click", function () {
    // Reset the selected option, bet amount, and balance
    currentOption = null;
    currentBetAmount = 0;
    balance = 500;

    // Clear the selected bet amount styling
    betButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Clear the selected option display
    selectedOption.textContent = "";

    // Enable the spin button
    spinButton.disabled = false;

    // Update the balance display
    updateBalanceDisplay();
  });

  // Update the balance display initially
  updateBalanceDisplay();
});
