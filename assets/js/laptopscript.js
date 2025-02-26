// Quiz questions and choices
const questions = [
  {
    question: "What will you mostly use your laptop for?",
    choices: ["Gaming", "School", "Work"],
    answer: null
  },
  {
    question: "What screen size do you prefer?",
    choices: ["13 inches", "15 inches", "17 inches"],
    answer: null
  },
  {
    question: "What's your budget?",
    choices: ["$1000+", "$1500+", "$2000+"],
    answer: null
  },
  {
    question: "How much storage do you need?",
    choices: ["512GB+", "1TB+"],
    answer: null
  }
];

let currentQuestionIndex = 0;

// Product recommendations based on quiz answers
const productRecommendations = {
  gamingSmall: [
    {
      name: "MSI Prestige 13 AI+ Evo (2024) 13.3” 2.8K OLED Business Laptop",
      price: "$1,399.99",
      link: "https://amzn.to/3CUSi72"
    },
    {
      name: "ASUS ROG Flow Z13 (2023) Gaming Laptop Tablet",
      price: "$1,749.99",
      link: "https://amzn.to/4hZDRxO"
    }
  ],
  schoolWorkSmall: [
    {
      name: "Dell XPS 13 AI PC Laptop 13.4\" Touchscreen 2.8K Display",
      price: "$1,299.99",
      link: "https://amzn.to/4190RDa"
    },
    {
      name: "Apple 2024 MacBook Air 13-inch Laptop with M3 chip",
      price: "$1,299.00",
      link: "https://amzn.to/3D69g2i"
    }
  ],
  gamingBig: [
    {
      name: "ASUS ROG Strix G16 Gaming Laptop",
      price: "$1,399.99",
      link: "https://amzn.to/41ywxU2"
    },
    {
      name: "Acer Predator Helios Neo 16 Gaming Laptop",
      price: "$999.99",
      link: "https://amzn.to/3EVponH"
    },
    {
      name: "ASUS ROG Strix G16 (2024) Gaming Laptop",
      price: "$1,899.99",
      link: "https://amzn.to/4i0C4ID"
    }
  ],
  schoolWorkBig: [
    {
      name: "Apple 2024 MacBook Air 15-inch Laptop with M3 chip",
      price: "$1,699.00",
      link: "https://amzn.to/437JAgi"
    }
  ]
};

// Start quiz by displaying the first question
function startQuiz() {
  displayQuestion();
}

// Display question and choices
function displayQuestion() {
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");

  questionElement.textContent = questions[currentQuestionIndex].question;
  choicesElement.innerHTML = "";

  questions[currentQuestionIndex].choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.onclick = () => selectAnswer(index);
    choicesElement.appendChild(button);
  });
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    displayResults();
  }
}

// Save the user's answer
function selectAnswer(index) {
  questions[currentQuestionIndex].answer = index;
  nextQuestion();
}

// Display recommendations based on quiz answers
function displayResults() {
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");

  questionElement.textContent = "Based on your answers, here are your recommended laptops!";
  choicesElement.innerHTML = ""; // Clear previous choices

  // Build the criteria object
  const criteria = {
    usage: questions[0].choices[questions[0].answer], // Gaming, School, etc.
    screenSize: questions[1].choices[questions[1].answer], // 13 inches, 15 inches, etc.
    budget: questions[2].choices[questions[2].answer], // $1000+, $1500+, etc.
    storage: questions[3].choices[questions[3].answer], // 512GB+, 1TB+, etc.
  };

  // Determine the appropriate category based on the user's answers
  if (criteria.usage === 'Gaming') {
    if (criteria.screenSize === '13 inches') {
      displayProductRecommendations(productRecommendations.gamingSmall);
    } else {
      displayProductRecommendations(productRecommendations.gamingBig);
    }
  } else if (criteria.usage === 'School' || criteria.usage === 'Work') {
    if (criteria.screenSize === '13 inches') {
      displayProductRecommendations(productRecommendations.schoolWorkSmall);
    } else {
      displayProductRecommendations(productRecommendations.schoolWorkBig);
    }
  }
}

// Display product recommendations
function displayProductRecommendations(products) {
  const choicesElement = document.getElementById("choices");

  products.forEach(product => {
    const productLink = document.createElement("a");
    productLink.href = product.link;
    productLink.textContent = `${product.name} - ${product.price}`;
    productLink.target = "_blank";
    choicesElement.appendChild(productLink);
    choicesElement.appendChild(document.createElement("br"));
  });
}

// Start the quiz on page load
startQuiz();

