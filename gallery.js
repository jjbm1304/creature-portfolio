
const states = {
  avian: { render: ["4-0", "4-1", "4-2"], clay: ["5-0", "5-1", "5-2"], wire: ["6-0", "6-1", "6-2"] },
  "boar-a": { render: ["1-2", "1-3"], wire: ["1-0", "1-1"] },
  "boar-b": { render: ["2-2", "2-3"], wire: ["2-0", "2-1"] }
};

const dialog = document.querySelector(".lightbox");
const previewImage = dialog.querySelector("img");
const previewTitle = dialog.querySelector("h2");

for (const section of document.querySelectorAll(".project")) {
  const projectTitle = section.querySelector("h2").textContent;
  const modes = [...section.querySelectorAll("[data-mode]")];
  const figures = [...section.querySelectorAll("figure[data-view]")];
  const status = section.querySelector(".gallery-status");

  for (const button of modes) {
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-pressed") === "true") return;

      const files = states[section.id][button.dataset.mode];
      for (const mode of modes) {
        mode.setAttribute("aria-pressed", String(mode === button));
      }
      for (const [index, figure] of figures.entries()) {
        const image = figure.querySelector("img");
        image.src = "creature-" + files[index] + ".png";
        image.alt = [projectTitle, button.textContent, figure.dataset.view].join(" ");
      }
      status.textContent = projectTitle + " " + button.textContent + " 보기";
    });
  }

  for (const figure of figures) {
    const trigger = figure.querySelector("button");
    trigger.addEventListener("click", () => {
      const image = trigger.querySelector("img");
      previewTitle.textContent = image.alt;
      previewImage.alt = image.alt;
      previewImage.src = image.src;
      dialog.showModal();
    });
  }
}

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

