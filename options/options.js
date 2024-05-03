const secondaryScreenXInputId = "secondary-screen-x-input";
const secondaryScreenYInputId = "secondary-screen-y-input";
const secondaryScreenXKey = "Secondary Screen X";
const secondaryScreenYKey = "Secondary Screen Y";

async function saveOptions(e) {
  e.preventDefault();

  const submitMessageElement = document.getElementById("submit-message");
  const errorMessageElement = document.getElementById("error-message");

  const secondaryScreenX = parseInt(
    document.getElementById(secondaryScreenXInputId).value
  );

  if (!secondaryScreenX && secondaryScreenX !== 0) {
    submitMessageElement.innerText = "";
    errorMessageElement.innerText = `${secondaryScreenXKey} must be a valid integer.`;
    return;
  }

  const secondaryScreenY = parseInt(
    document.getElementById(secondaryScreenYInputId).value
  );

  if (!secondaryScreenX && secondaryScreenX !== 0) {
    submitMessageElement.innerText = "";
    errorMessageElement.innerText = `${secondaryScreenYKey} must be a valid integer.`;
    return;
  }

  const newOptions = {};
  newOptions[secondaryScreenXKey] = secondaryScreenX;
  newOptions[secondaryScreenYKey] = secondaryScreenY;

  await browser.storage.sync.set(newOptions);

  submitMessageElement.innerText = "Saved!";
  errorMessageElement.innerText = "";
}

async function restoreOptions() {
  const res = await browser.storage.sync.get([
    secondaryScreenXKey,
    secondaryScreenYKey,
  ]);

  const secondaryScreenX = res[secondaryScreenXKey] ?? 1920;
  const secondaryScreenY = res[secondaryScreenYKey] ?? 0;

  document.getElementById(secondaryScreenXInputId).value = secondaryScreenX;
  document.getElementById(secondaryScreenYInputId).value = secondaryScreenY;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
