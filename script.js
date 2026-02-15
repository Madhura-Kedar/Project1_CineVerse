console.log("Javascript started")
// ============ SLIDER FUNCTIONALITY ============
const slider = document.getElementById("cardSlider");
const nextBtn = document.querySelector(".slider-btn.right");
const prevBtn = document.querySelector(".slider-btn.left");

const cardWidth = 220; // card width (200) + gap (20)

nextBtn.addEventListener("click", () => {
  slider.scrollLeft += cardWidth * 2;
});

prevBtn.addEventListener("click", () => {
  slider.scrollLeft -= cardWidth * 2;
});

// ============ FAQ ACCORDION FUNCTIONALITY ============
const faqCards = document.querySelectorAll(".card-three");

faqCards.forEach((card) => {
  card.addEventListener("click", function () {
    // Remove active state from all cards
    faqCards.forEach((item) => {
      if (item !== this) {
        item.classList.remove("active");
        const answer = item.querySelector(".faq-answer");
        if (answer) answer.remove();
      }
    });

    // Toggle current card
    this.classList.toggle("active");

    // Remove existing answer if toggling off
    const existingAnswer = this.querySelector(".faq-answer");
    if (existingAnswer) {
      existingAnswer.remove();
      return;
    }

    // Add answer based on question
    const question = this.querySelector("p")?.textContent || "";
    const answers = {
      "What is Netflix?":
        "Netflix is a streaming service that offers a wide variety of award-winning shows, movies, documentaries, and more on thousands of internet-connected devices.",
      "How much does Netflix cost?":
        "Netflix offers flexible plans starting at ₹149 per month. Plans vary by region and features. Join Netflix to get access to all their content.",
      "How do I cancel my Netflix subscription?":
        "You can easily cancel your subscription anytime. Simply go to your account settings and select Cancel Membership. Your access will continue until the end of your billing cycle.",
      "Can I watch Netflix on multiple devices?":
        "Yes! Netflix allows you to watch on multiple devices depending on your plan. Different plans support different numbers of simultaneous streams.",
      "What can I watch on Netflix?":
        "Netflix offers thousands of movies, TV shows, documentaries, and original content across various genres including drama, comedy, action, and more.",
      "Is Netflix good for kids?":
        "Yes! Netflix has a Kids profile with family-friendly content and parental controls. You can restrict content based on ratings and create a safe viewing environment.",
    };

    if (answers[question]) {
      const answerDiv = document.createElement("div");
      answerDiv.classList.add("faq-answer");
      answerDiv.textContent = answers[question];
      this.appendChild(answerDiv);
    }
  });
});

// ============ EMAIL VALIDATION ============
const emailInputs = document.querySelectorAll('input[type="text"][placeholder="Email address"]');
const getStartedBtns = document.querySelectorAll(".btn-red");

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

getStartedBtns.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    const emailInput = emailInputs[index] || emailInputs[0];

    if (!emailInput.value.trim()) {
      emailInput.style.borderColor = "#ff6b6b";
      emailInput.style.boxShadow = "0 0 10px rgba(255, 107, 107, 0.5)";
      alert("Please enter your email address");
      return;
    }

    if (!validateEmail(emailInput.value)) {
      emailInput.style.borderColor = "#ff6b6b";
      emailInput.style.boxShadow = "0 0 10px rgba(255, 107, 107, 0.5)";
      alert("Please enter a valid email address");
      return;
    }

    // Success feedback
    emailInput.style.borderColor = "#10b981";
    emailInput.style.boxShadow = "0 0 10px rgba(16, 185, 129, 0.5)";
    alert("Great! We'll send you information about Netflix plans.");

    // Reset after 2 seconds
    setTimeout(() => {
      emailInput.value = "";
      emailInput.style.borderColor = "rgba(255,252,252,0.5)";
      emailInput.style.boxShadow = "none";
    }, 2000);
  });

  // Remove border color on focus
  emailInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.borderColor = "rgba(255,252,252,0.5)";
      this.style.boxShadow = "none";
    });
  });
});

// ============ SIGN IN BUTTON FUNCTIONALITY ============
const signInBtn = document.querySelector('.btn-red-sm');
if (signInBtn) {
  signInBtn.addEventListener("click", function () {
    alert("Sign In feature coming soon! 🎬");
  });
}

// ============ LANGUAGE BUTTON FUNCTIONALITY ============
const langBtn = document.querySelector(".lang-btn");
if (langBtn) {
  const languages = ["🌐 English", "🇪🇸 Español", "🇫🇷 Français", "🇩🇪 Deutsch", "🇯🇵 日本語"];
  let currentLang = 0;

  langBtn.addEventListener("click", function () {
    currentLang = (currentLang + 1) % languages.length;
    this.textContent = languages[currentLang];
    this.style.transform = "scale(1.1)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 200);
  });

  langBtn.style.transition = "transform 0.2s ease";
}

// ============ CARD HOVER ANIMATIONS ============
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05) translateY(-10px)";
    this.style.transition = "transform 0.3s ease";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) translateY(0)";
  });

  // Add flip functionality
  card.addEventListener("click", function (e) {
    // Don't flip if clicking the watch button
    if (e.target.classList.contains("watch-btn")) {
      e.stopPropagation();
      return;
    }
    this.classList.toggle("flipped");
  });

  // Watch button functionality
  const watchBtn = card.querySelector(".watch-btn");
  if (watchBtn) {
    watchBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      const title = card.querySelector("h3")?.textContent || "Show";
      
      // Create a fun notification
      const notif = document.createElement("div");
      notif.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #e50914 0%, #b20710 100%);
        color: white;
        padding: 30px 50px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        animation: popIn 0.5s ease-out;
      `;
      notif.textContent = `🎬 "${title}" added to watchlist!`;
      document.body.appendChild(notif);

      setTimeout(() => {
        notif.style.animation = "popOut 0.5s ease-in";
        setTimeout(() => notif.remove(), 500);
      }, 2000);
    });
  }
});

// ============ SCROLL ANIMATION - FADE IN ELEMENTS ============
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe section headings and cards
document.querySelectorAll(".section, .section-two, .section-three, .card-2").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

// ============ SMOOTH SCROLL BEHAVIOR ============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

