(() => {
  const config = window.SPACECARE_CONFIG || {};
  const number = (config.whatsappNumber || "").replace(/\D/g, "");
  const message = "Hello Thelma SpaceCare Services, I would like to make a cleaning enquiry.";
  const waUrl = (text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  document.querySelectorAll("[data-whatsapp]").forEach(a => {
    a.href = number && !number.includes("X") ? waUrl(message) : "#contact";
    a.addEventListener("click", e => {
      if (!number || number.includes("X")) {
        e.preventDefault();
        alert("The WhatsApp number has not been configured yet. Please update config.js before publishing.");
      }
    });
  });
  document.querySelectorAll("[data-service]").forEach(a => {
    a.href = "#contact";
    a.addEventListener("click", e => {
      e.preventDefault();
      const select = document.querySelector('[name="service"]');
      if (select) select.value = a.dataset.service;
      document.querySelector("#contact").scrollIntoView({behavior:"smooth"});
    });
  });
  const form = document.querySelector("#booking-form");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    if (!number || number.includes("X")) {
      alert("Please add the business WhatsApp number in config.js before using the booking form.");
      return;
    }
    const data = new FormData(form);
    const msg = [
      "Hello Thelma SpaceCare Services, I would like to request a cleaning service.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Service: ${data.get("service")}`,
      `Location: ${data.get("location")}`,
      `Preferred date: ${data.get("date") || "Flexible"}`,
      `Details: ${data.get("details") || "Not provided"}`
    ].join("\n");
    window.open(waUrl(msg), "_blank", "noopener");
  });
  document.querySelector(".menu-toggle")?.addEventListener("click", e => {
    const nav = document.querySelector(".nav");
    const open = nav.classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => document.querySelector(".nav").classList.remove("open")));
  document.querySelector("#year").textContent = new Date().getFullYear();
})();
