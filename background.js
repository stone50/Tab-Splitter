const splitToPrimaryId = "splitToPrimary";
const splitToSecondaryId = "splitToSecondary";
const secondaryScreenXKey = "Secondary Screen X";
const secondaryScreenYKey = "Secondary Screen Y";

browser.menus.create({
  id: splitToPrimaryId,
  title: "Split To Primary",
  contexts: ["tab"],
});
browser.menus.create({
  id: splitToSecondaryId,
  title: "Split To Secondary",
  contexts: ["tab"],
});

browser.menus.onClicked.addListener(async (info, tab) => {
  const splitToPrimary = info.menuItemId === splitToPrimaryId;

  if (!splitToPrimary && info.menuItemId !== splitToSecondaryId) {
    return;
  }

  const res = await browser.storage.sync.get([
    secondaryScreenXKey,
    secondaryScreenYKey,
  ]);

  const secondaryScreenX = res[secondaryScreenXKey] ?? 1920;
  const secondaryScreenY = res[secondaryScreenYKey] ?? 0;

  const splitWindowTop = splitToPrimary ? 0 : secondaryScreenY;
  const splitWindowLeft = splitToPrimary ? 0 : secondaryScreenX;

  const currentWindowTop = splitToPrimary ? secondaryScreenY : 0;
  const currentWindowLeft = splitToPrimary ? secondaryScreenX : 0;

  const currentWindow = await browser.windows.getCurrent();
  await browser.windows.update(currentWindow.id, {
    top: currentWindowTop,
    left: currentWindowLeft,
  });
  await browser.windows.update(currentWindow.id, {
    state: "maximized",
  });

  const splitWindow = await browser.windows.create({
    tabId: tab.id,
    incognito: tab.incognito,
    top: splitWindowTop,
    left: splitWindowLeft,
  });
  await browser.windows.update(splitWindow.id, {
    state: "maximized",
  });
});
