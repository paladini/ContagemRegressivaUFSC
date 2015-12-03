function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function calculate_remaining_days() {
	var testDate = new Date(2015, 11, 12);
	var today = new Date();
	var remaining_days = 0;
	var remaining_months = (testDate.getMonth()+1) - (today.getMonth()+1);

	if (remaining_months == 0) { // if testDate.month() == today.getMonth()
		if (testDate.getDate() > today.getDate()) {
			remaining_days = testDate.getDate() - today.getDate();
		}
	} else {
		remaining_days = (daysInMonth(today.getMonth()+1, today.getFullYear()) - today.getDate());
		for(var i = 1; i <= remaining_months; i++) {
			if (i == remaining_months) {
				remaining_days += testDate.getDate();
			} else {
				remaining_days += daysInMonth((testDate.getMonth()+1)+i);
			}
		}
	}

	return remaining_days;
}

// Create the alarm and update the badge text.
function onAlarm(alarm) {

	var remaining_days = calculate_remaining_days();
	chrome.browserAction.setBadgeBackgroundColor({color: "#CC0000"});
	chrome.browserAction.setBadgeText({text: remaining_days.toString() });
	chrome.browserAction.setTitle({title: "Faltam " + remaining_days + " dias para o Vestibular UFSC 2016."});

	// Calculating tomorrow
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate()+1);
	tomorrow.setHours(0);
	tomorrow.setMinutes(1);
	tomorrow.setSeconds(0);
	tomorrow.setMilliseconds(0);
	chrome.alarms.create("next_alarm", { when: parseFloat(tomorrow.toString()) });
}

// Trigger the alarm.
chrome.alarms.onAlarm.addListener(onAlarm);

// Opening webpage when clicking in the extension button.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': "http://vestibular2016.ufsc.br"});
});

// Call the method
onAlarm();