// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement
const themeIcon = document.querySelector(".theme-icon")

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem("theme") || "light"
html.setAttribute("data-theme", currentTheme)
updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  const theme = html.getAttribute("data-theme")
  const newTheme = theme === "light" ? "dark" : "light"

  html.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === "light" ? "🌙" : "☀️"
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navMenu = document.getElementById("navMenu")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active")
    navMenu.classList.toggle("active")
  })
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (navMenu && !e.target.closest(".nav")) {
    mobileMenuBtn.classList.remove("active")
    navMenu.classList.remove("active")
  }
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      // Close mobile menu if open
      if (navMenu) {
        mobileMenuBtn.classList.remove("active")
        navMenu.classList.remove("active")
      }
    }
  })
})

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format percentage
function formatPercentage(value) {
  return value.toFixed(2) + "%"
}

// Generic calculator function - to be used in individual calculator pages
function setupCalculator(calculateFunction) {
  const form = document.getElementById("calculatorForm")
  if (!form) return

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    calculateFunction()
  })

  // Real-time calculation on input change
  const inputs = form.querySelectorAll("input, select")
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        calculateFunction()
      }
    })
  })
}

// Show results with animation
function showResults() {
  const results = document.getElementById("calculatorResults")
  if (results) {
    results.style.opacity = "0"
    setTimeout(() => {
      results.style.transition = "opacity 0.3s ease"
      results.style.opacity = "1"
    }, 100)
  }
}

// Display result
function displayResult(elementId, value) {
  const element = document.getElementById(elementId)
  if (element) {
    element.textContent = value
  }
}

// Add active class to current page in navigation
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-menu a")

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")
    if (linkPage === currentPage) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
})
