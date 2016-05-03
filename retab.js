function move (where) {
  chrome.tabs.query({active: true}, function (tabs) {
    if (!tabs || tabs.length < 1) {
      return;
    }
    var tab = tabs[0];
    var index = where === 'left' ? tab.index - 1 : tab.index + 1;
    chrome.tabs.query({}, function (tabs) {
      if (index === tabs.length) {
        index = 0;
      }
      chrome.tabs.move(tab.id, {index: index});
    });
  });
}

chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case 'move-tab-left':
      move('left');
      break;
    case 'move-tab-right':
      move('right');
      break;
    default:
      break;
  }
});
