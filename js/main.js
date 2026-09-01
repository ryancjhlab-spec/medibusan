/**
 * main.js - 공통 인터랙션, 검색 및 비교 필터링 기능
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initContentTabs();
  initTableSearch();
});

/* 모바일 햄버거 메뉴 토글 */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("is-active");
    });
  }
}

/* contents.html: 탭 필터링 */
function initContentTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const contentCards = document.querySelectorAll(".content-card");

  if (!tabButtons.length || !contentCards.length) return;

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      contentCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* report.html: 검색 및 모델별/비교군 실시간 필터 */
function initTableSearch() {
  const searchInput = document.getElementById("reportSearch");
  const categoryFilter = document.getElementById("reportCategoryFilter");
  const tableRows = document.querySelectorAll(".data-table tbody tr");

  if (!tableRows.length) return;

  function filterRows() {
    const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";

    tableRows.forEach(row => {
      const rowCategory = row.getAttribute("data-category") || "";
      const rowText = row.textContent.toLowerCase();

      const matchesSearch = rowText.includes(searchText);
      
      let matchesCategory = false;
      if (selectedCategory === "all") {
        matchesCategory = true;
      } else if (selectedCategory === "busan-all") {
        matchesCategory = (rowCategory !== "seoul");
      } else {
        matchesCategory = (rowCategory === selectedCategory);
      }

      if (matchesSearch && matchesCategory) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  if (searchInput) searchInput.addEventListener("input", filterRows);
  if (categoryFilter) categoryFilter.addEventListener("change", filterRows);
}
