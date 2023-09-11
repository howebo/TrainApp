document.addEventListener("DOMContentLoaded", function () {
  const searchTrainsButton = document.getElementById("searchTrains");
  const searchScheduleButton = document.getElementById("searchSchedule");
  const searchStationButton = document.getElementById("searchStation");

  const dateInput = document.getElementById("d");

  // Get the current date in the format yyyy-mm-dd
  const currentDate = new Date().toISOString().split("T")[0];

  // Set the input element's value to the current date
  dateInput.value = currentDate;

  searchStationButton.addEventListener("click", searchStation);
  searchTrainsButton.addEventListener("click", searchTrains);
  searchScheduleButton.addEventListener("click", searchSchedule);

  function searchTrains() {
    const sourceStation = document
      .getElementById("sourceStation")
      .value.split("-")
      .pop();
    const destinationStation = document
      .getElementById("destinationStation")
      .value.split("-")
      .pop();
    const date = document.getElementById("date").value.split("-").join("");

    const payload = {
      concessionBooking: false,
      srcStn: sourceStation,
      destStn: destinationStation,
      jrnyClass: "",
      jrnyDate: date,
      quotaCode: "GN",
      currentBooking: "false",
      flexiFlag: false,
      handicapFlag: false,
      ticketType: "E",
      loyaltyRedemptionBooking: false,
      ftBooking: false,
    };

    // Replace the following lines with your actual API call using fetch()
    fetch("https://www.irctc.co.in/eticketing/protected/mapps1/altAvlEnq/TC", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json, text/plain, */*",
        Bmirak: "webbm",
        "Content-Language": "en",
        "Content-Type": "application/json",
        Greq: Date.now(),
        Referer: "https://www.irctc.co.in/nget/booking/check-train-schedule",
        "Sec-Ch-Ua":
          '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const warningMessageElement = document.getElementById("warningMessage");
        if (data.errorMessage !== undefined) {
          // Show the warning message
          warningMessageElement.innerText = data.errorMessage;
          warningMessageElement.style.display = "block"; // Display the warning message

          // Hide the warning message after a certain time (e.g., 7 seconds)
          setTimeout(() => {
            warningMessageElement.style.display = "none";
          }, 7000); // Hide after 7 seconds
        } else {
          // Hide the warning message if there was no error
          warningMessageElement.style.display = "none";

          // Handle API response data
          showSearchResultsModal(data.trainBtwnStnsList);
        }
      })
      .catch((error) => {
        // Handle network or other errors
        // showErrorModal("An error occurred. Please try again later.");
      });
  }

  function showSearchResultsModal(trainList) {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = ""; // Clear previous content

    const table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-striped");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = [
      "Train Number",
      "Train Name",
      "From Station",
      "To Station",
      "Arrival Time",
      "Departure Time",
      "Distance",
      "Duration",
      "Runs On",
    ];

    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    trainList.forEach((train) => {
      const row = document.createElement("tr");

      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      let runsOnText = "";
      days.forEach((day) => {
        if (train[`running${day}`] === "Y") {
          runsOnText += day.slice(0, 1) + " ";
        } else {
          runsOnText += "- ";
        }
        if (runsOnText === "M T W T F S S ") runsOnText = "daily";
      });

      const rowData = [
        train.trainNumber,
        train.trainName,
        train.fromStnCode,
        train.toStnCode,
        train.arrivalTime,
        train.departureTime,
        train.distance,
        train.duration,
        runsOnText,
      ];

      rowData.forEach((text) => {
        const cell = document.createElement("td");
        if (text === runsOnText) {
          cell.classList.add("runs-on-cell");
        }
        cell.textContent = text;
        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Clear previous content and append the new table
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);

    $("#tableModal").modal("show");
  }

  function searchSchedule() {
    let trainNumber = document.getElementById("trainNumber").value;
    trainNumber = trainNumber.slice(trainNumber.lastIndexOf("-") + 1);
    const apiUrl = `https://www.irctc.co.in/eticketing/protected/mapps1/trnscheduleenquiry/${trainNumber}`;

    const headers = {
      Accept: "application/json, text/plain",
      Bmirak: "webbm",
      "Content-Language": "en",
      "Content-Type": "application/x-www-form-urlencoded",
      Greq: Date.now(),
      Referer: "https://www.irctc.co.in/nget/booking/check-train-schedule",
      "Sec-Ch-Ua":
        '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "Windows",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
      "Content-Type": "application/json",
    };

    fetch(apiUrl, { headers })
      .then((response) => response.json())
      .then((data) => {
        const warningMessageElement = document.getElementById("warningMessage");
        if (data.errorMessage !== undefined) {
          // Show the warning message
          warningMessageElement.innerText = "Please enter a valid train number";
          warningMessageElement.style.display = "block"; // Display the warning message

          // Hide the warning message after a certain time (e.g., 7 seconds)
          setTimeout(() => {
            warningMessageElement.style.display = "none";
          }, 7000); // Hide after 7 seconds
        } else {
          // Hide the warning message if there was no error
          warningMessageElement.style.display = "none";

          // Handle API response data
          showScheduleModal(data);
        }
      })
      .catch((error) => {
        // Handle network or other errors
        showErrorModal("An error occurred. Please try again later.");
      });
  }

  function showScheduleModal(scheduleData) {
    const modalBody = document.getElementById("scheduleTableContainer");
    modalBody.innerHTML = ""; // Clear previous content

    // Create "Runs On" information
    const runsOnDiv = document.createElement("div");
    runsOnDiv.textContent = "Runs On: ";
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let runsOnText = "";
    for (let i = 0; i < days.length; i++) {
      if (scheduleData[`trainRunsOn${days[i]}`] === "Y") {
        runsOnText += days[i] + " ";
      }
    }
    const runsOnSpan = document.createElement("span");
    runsOnSpan.textContent = runsOnText;
    if (runsOnText === "Mon Tue Wed Thu Fri Sat Sun ") {
      runsOnSpan.textContent = "Daily";
    }
    runsOnSpan.style.fontWeight = "bold";
    runsOnDiv.appendChild(runsOnSpan);

    // Append "Runs On" information
    modalBody.appendChild(runsOnDiv);

    // Create Table
    const table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-striped");

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = [
      "Station Code",
      "Station Name",
      "Arrival Time",
      "Departure Time",
      "Halt Time",
      "Distance",
      "Day Count",
    ];

    for (const headerText of headers) {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = headerText;
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");

    for (const station of scheduleData.stationList) {
      const row = document.createElement("tr");

      const stationCodeCell = document.createElement("td");
      stationCodeCell.textContent = station.stationCode;
      row.appendChild(stationCodeCell);

      const stationNameCell = document.createElement("td");
      stationNameCell.textContent = station.stationName;
      row.appendChild(stationNameCell);

      const arrivalTimeCell = document.createElement("td");
      arrivalTimeCell.textContent = station.arrivalTime;
      row.appendChild(arrivalTimeCell);

      const departureTimeCell = document.createElement("td");
      departureTimeCell.textContent = station.departureTime;
      row.appendChild(departureTimeCell);

      const haltTimeCell = document.createElement("td");
      haltTimeCell.textContent = station.haltTime;
      row.appendChild(haltTimeCell);

      const distanceCell = document.createElement("td");
      distanceCell.textContent = station.distance;
      row.appendChild(distanceCell);

      const dayCountCell = document.createElement("td");
      dayCountCell.textContent = station.dayCount;
      row.appendChild(dayCountCell);

      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    modalBody.appendChild(table);

    // Display the modal
    $("#scheduleModal").modal("show");
  }

  function searchStation() {
    // Get the station code entered by the user
    var stationCode = document
      .getElementById("stationName")
      .value.split("-")
      .pop();

    // Create the API URL
    var apiUrl =
      "https://www.trainman.in/services/station/" +
      stationCode +
      "/?key=012562ae-60a9-4fcd-84d6-f1354ee1ea48";

    // Make the API request
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const warningMessageElement = document.getElementById("warningMessage");
        if (data.message !== "OK") {
          // Show the warning message
          warningMessageElement.innerText = data.message;
          warningMessageElement.style.display = "block"; // Display the warning message

          // Hide the warning message after a certain time (e.g., 7 seconds)
          setTimeout(() => {
            warningMessageElement.style.display = "none";
          }, 7000); // Hide after 7 seconds
        } else {
          // Hide the warning message if there was no error
          warningMessageElement.style.display = "none";
          showSearchStation(data.trains);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        var warningMessage = document.getElementById("warningMessage");
        warningMessage.textContent =
          "An error occurred while fetching data. Please try again later.";
      });
  }
  function showSearchStation(scheduleData) {
    const modalBody = document.getElementById("scheduleTableContainer");
    modalBody.innerHTML = ""; // Clear previous content

    const table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-striped");

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = [
      "Train Number",
      "Train Name",
      "Arrival Time",
      "Departure Time",
      "Platform",
      "Runs On",
    ];

    for (const headerText of headers) {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = headerText;
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");
    if (!document.getElementById("live").checked) {
      for (const station of scheduleData) {
        const row = document.createElement("tr");

        const stationCodeCell = document.createElement("td");
        stationCodeCell.textContent = station.tcode;
        row.appendChild(stationCodeCell);

        const stationNameCell = document.createElement("td");
        stationNameCell.textContent = station.tname;
        row.appendChild(stationNameCell);

        const arrivalTimeCell = document.createElement("td");
        arrivalTimeCell.textContent =
          station.arrive_time === null ? "Origin" : station.arrive_time;
        row.appendChild(arrivalTimeCell);

        const departureTimeCell = document.createElement("td");
        departureTimeCell.textContent =
          station.depart_time === null ? "Dest." : station.depart_time;
        row.appendChild(departureTimeCell);

        const platform = document.createElement("td");
        platform.textContent = station.platform;
        row.appendChild(platform);

        const runsOnCell = document.createElement("td");
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        let runsOnText = "";
        for (let i = 0; i < days.length; i++) {
          if (station.doo[i] === "Y") {
            runsOnText += days[i].slice(0, 1) + " ";
          } else {
            runsOnText += "- ";
          }
          if (runsOnText === "M T W T F S S ") runsOnText = "daily";
        }
        runsOnCell.textContent = runsOnText;
        row.appendChild(runsOnCell);

        const [arrivalHours, arrivalMinutes] =
          station.arrive_time !== null
            ? station.arrive_time.split(":")
            : station.depart_time.split(":");
        const arrivalDate = new Date();
        arrivalDate.setHours(arrivalHours, arrivalMinutes);

        // Compare with current time
        if (arrivalDate < new Date()) {
          row.style.color = "red"; // Train has passed
        } else {
          row.style.color = "green"; // Train is yet to arrive
        }

        tbody.appendChild(row);
      }
    } else {
      const today = new Date().getDay(); // Get the current day (0-6, where 0 is Sunday)
      const tomorrow = (today + 1) % 7; // Calculate the index of tomorrow

      for (const station of scheduleData) {
        if (station.doo[today] === "Y" || station.doo[tomorrow] === "Y") {
          // Parse the arrival time to get hours and minutes
          const [arrivalHours, arrivalMinutes] =
            station.arrive_time !== null
              ? station.arrive_time.split(":")
              : station.depart_time.split(":");
          const arrivalDate = new Date();
          arrivalDate.setHours(arrivalHours, arrivalMinutes);

          // Compare with current time
          if (arrivalDate >= new Date()) {
            const row = document.createElement("tr");

            const stationCodeCell = document.createElement("td");
            stationCodeCell.textContent = station.tcode;
            row.appendChild(stationCodeCell);

            const stationNameCell = document.createElement("td");
            stationNameCell.textContent = station.tname;
            row.appendChild(stationNameCell);

            const arrivalTimeCell = document.createElement("td");
            arrivalTimeCell.textContent =
              station.arrive_time === null ? "Origin" : station.arrive_time;
            row.appendChild(arrivalTimeCell);

            const departureTimeCell = document.createElement("td");
            departureTimeCell.textContent =
              station.depart_time === null ? "Dest." : station.depart_time;
            row.appendChild(departureTimeCell);

            const platform = document.createElement("td");
            platform.textContent = station.platform;
            row.appendChild(platform);

            const runsOnCell = document.createElement("td");
            const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            let runsOnText = "";
            for (let i = 0; i < days.length; i++) {
              if (station.doo[i] === "Y") {
                runsOnText += days[i].slice(0, 1) + " ";
              } else {
                runsOnText += "- ";
              }
              if (runsOnText === "M T W T F S S ") runsOnText = "daily";
            }
            runsOnCell.textContent = runsOnText;
            row.appendChild(runsOnCell);

            tbody.appendChild(row);
          }
        }
      }
    }

    table.appendChild(tbody);
    modalBody.appendChild(table);

    // Display the modal
    $("#scheduleModal").modal("show");
  }

  const form = document.getElementById("availabilityForm");

  const availabilityModal = document.getElementById("availabilityModal");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const sourceStation = document.getElementById("src").value.split("-").pop();
    const destinationStation = document
      .getElementById("dest")
      .value.split("-")
      .pop();
    const date = document.getElementById("d").value.split("-").join("");
    const selectedClass = document.getElementById("class").value;
    const trainNumber = document.getElementById("trN").value;
    const selectedQuota = document.getElementById("quota").value;

    const apiUrl = `https://www.irctc.co.in/eticketing/protected/mapps1/avlFarenquiry/${trainNumber}/${date}/${sourceStation}/${destinationStation}/${selectedClass}/${selectedQuota}/N`;

    const payload = {
      classCode: selectedClass,
      concessionBooking: false,
      fromStnCode: sourceStation,
      ftBooking: false,
      isLogedinReq: false,
      journeyDate: date,
      loyaltyRedemptionBooking: false,
      moreThanOneDay: true,
      paymentFlag: "N",
      quotaCode: selectedQuota,
      ticketType: "E",
      toStnCode: destinationStation,
      trainNumber: trainNumber,
    };

    const headers = {
      Accept: "application/json, text/plain",
      Bmirak: "webbm",
      "Content-Language": "en",
      "Content-Type": "application/json",
      Greq: Date.now(),
      Referer: "https://www.irctc.co.in/nget/booking/train-list",
      "Sec-Ch-Ua":
        '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "Windows",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    };

    fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errorMessage === undefined) {
          // Update your UI with the seat availability information
          let modalContent = "<ul>";
          modalContent += `<li>Train Name: ${data.trainName}</li>`;
          modalContent += `<li>Distance: ${data.distance} km</li>`;
          modalContent += `<li>Total Fare: ₹${data.totalFare}</li>`;
          // ... Add more fields as needed ...

          // Add availability details to modal content
          modalContent += "<li>Availability Details:";
          modalContent += '<table class="table table-bordered">';
          modalContent +=
            "<thead><tr><th>Date</th><th>Status</th></tr></thead>";
          modalContent += "<tbody>";
          data.avlDayList.forEach((availability) => {
            const availabilityStatus = availability.availablityStatus;
            const color =
              availabilityStatus.includes("AVAILABLE") ||
              availabilityStatus.includes("CURR_AVBL")
                ? "green"
                : "red";

            modalContent += "<tr>";
            modalContent += `<td>${formatDate(
              availability.availablityDate
            )}</td>`;
            modalContent += `<td style="color: ${color}">${availabilityStatus}</td>`;
            modalContent += "</tr>";
          });
          modalContent += "</tbody>";
          modalContent += "</table>";
          modalContent += "</li>";

          modalContent += "</ul>";

          modalContent += `<li>Last Updated: ${
            data.lastUpdateTime === undefined ? "--" : data.lastUpdateTime
          }</li>`;
          // Update the modal body content
          const modalBody = availabilityModal.querySelector(".modal-body");
          modalBody.innerHTML = modalContent;

          // Open the modal
          $(availabilityModal).modal("show");
        } else {
          const warningMessageElement =
            document.getElementById("warningMessage");
          // Show the warning message
          warningMessageElement.innerText = data.errorMessage;
          warningMessageElement.style.display = "block"; // Display the warning message

          // Hide the warning message after a certain time (e.g., 7 seconds)
          setTimeout(() => {
            warningMessageElement.style.display = "none";
          }, 7000); // Hide after 7 seconds
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  });
  function formatDate(dateString) {
    const [day, month, year] = dateString.split("-");
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(`${year}-${month}-${day}`).toLocaleDateString(
      "en-US",
      options
    );
  }

  // Function to fetch station data from the JSON file
  function fetchStationData(callback) {
    fetch("stations.json")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) =>
        console.error("Error fetching the station data:", error)
      );
  }

  function fetchTrainData(callback) {
    fetch("trains.json")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) =>
        console.error("Error fetching the station data:", error)
      );
  }

  // Function to handle station input and autocomplete
  function handleStationInput(
    inputElementId,
    suggestionsWrapperId,
    suggestionsDivId
  ) {
    const inputElement = document.getElementById(inputElementId);
    const suggestionsWrapper = document.getElementById(suggestionsWrapperId);
    const suggestionsDiv = document.getElementById(suggestionsDivId);
    let stationData = [];
    let lastInputValue = "";

    document.addEventListener("click", function (event) {
      // Check if the clicked element is not within the suggestions wrapper
      if (!suggestionsWrapper.contains(event.target)) {
        suggestionsWrapper.style.display = "none"; // Hide the suggestions wrapper
      }
    });

    // Fetch the station data from the JSON file
    if (
      inputElement.id === "trainNumber" ||
      inputElement.id === "liveTrainNumber"
    )
      fetchTrainData((data) => {
        stationData = data;
      });
    else
      fetchStationData((data) => {
        stationData = data;
      });

    // Event listener for input changes
    inputElement.addEventListener("input", () => {
      const inputText = inputElement.value.toLowerCase();
      if (inputText.length >= 1 && inputText !== lastInputValue) {
        lastInputValue = inputText;
        const filteredStations = stationData.filter((station) =>
          station.label.toLowerCase().includes(inputText)
        );
        displaySuggestions(filteredStations, inputElement);
        suggestionsWrapper.style.display = "block"; // Show the suggestions div
      } else if (inputText.length === 0) {
        suggestionsDiv.innerHTML = ""; // Clear the suggestions when input is empty
        suggestionsWrapper.style.display = "none"; // Hide the suggestions div
      }
    });

    // Function to display the suggestions
    function displaySuggestions(filteredStations, stationInput) {
      suggestionsDiv.innerHTML = ""; // Clear the previous suggestions
      filteredStations.forEach((station) => {
        const suggestion = document.createElement("div");
        suggestion.textContent = station.label;
        suggestion.classList.add("suggestion");
        suggestion.addEventListener("click", () => {
          stationInput.value = station.label;
          suggestionsWrapper.style.display = "none"; // Hide the suggestions div after selection
        });
        suggestionsDiv.appendChild(suggestion);
      });
    }
  }

  // Call the handleStationInput function for both input fields
  handleStationInput(
    "sourceStation",
    "sourceSuggestionsWrapper",
    "sourceSuggestions"
  );
  handleStationInput(
    "destinationStation",
    "destinationSuggestionsWrapper",
    "destinationSuggestions"
  );
  handleStationInput(
    "stationName",
    "stationNameSuggestionsWrapper",
    "stationNameSuggestions"
  );
  handleStationInput(
    "trainNumber",
    "trainNumberSuggestionsWrapper",
    "trainNumberSuggestions"
  );
  handleStationInput("src", "srcSuggestionsWrapper", "srcSuggestions");
  handleStationInput("dest", "destSuggestionsWrapper", "destSuggestions");

  //
  //
  //
  //
  handleStationInput(
    "liveTrainNumber",
    "liveTrainNumberSuggestionsWrapper",
    "liveTrainNumberSuggestions"
  );
  //
  //
  //
  //
  // Handle the click event for the "Search Live Train Status" button
  const liveTrainStatusButton = document.getElementById(
    "searchLiveTrainStatus"
  );
  liveTrainStatusButton.addEventListener("click", function (e) {
    e.preventDefault();
    let trainNumber = document.getElementById("liveTrainNumber").value;
    trainNumber = trainNumber.slice(trainNumber.lastIndexOf("-") + 1);

    // Call the function to get live train status
    getLiveTrainStatus(trainNumber);
  });

  function formatDateForAPI(userDate) {
    const dateObject = new Date(userDate);
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString("en-US", { month: "short" });
    const year = dateObject.getFullYear();
    return `${day} ${month} ${year}`;
  }
  // Function to get live train status from the API
  function getLiveTrainStatus(trainNumber) {
    const apiKey = "012562ae-60a9-4fcd-84d6-f1354ee1ea48";
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in yyyy-mm-dd format
    const apiUrl = `https://www.trainman.in/services/get-ntes-running-status/${trainNumber}?key=${apiKey}&int=1&refresh=true&date=${currentDate}`;

    const statusDateInput = document.getElementById("statusDate").value;
    const apiFormattedDate = formatDateForAPI(statusDateInput);
    // Make the API call
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.message != "OK") {
          const warningMessageElement =
            document.getElementById("warningMessage");
          // Show the warning message
          warningMessageElement.innerText = data.message;
          warningMessageElement.style.display = "block"; // Display the warning message

          // Hide the warning message after a certain time (e.g., 7 seconds)
          setTimeout(() => {
            warningMessageElement.style.display = "none";
          }, 7000); // Hide after 7 seconds
        } else displayLiveTrainStatus(data, apiFormattedDate);
      })
      .catch((error) => {
        console.error("Error fetching live train status:", error);
        // Handle error here, e.g., display an error message in the modal
      });
  }

  // Function to display the live train status in the modal
  // Updated displayLiveTrainStatus function
  // Updated displayLiveTrainStatus function
  // Updated displayLiveTrainStatus function
  function displayLiveTrainStatus(result, selectedDate) {
    const modalBody = document.getElementById("liveTrainStatusDetails");

    // Create a table to display the station details
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");

    // Create table header
    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Station", "Scheduled Time", "Actual Time", "Delay"];
    headers.forEach((headerText) => {
      const header = document.createElement("th");
      header.textContent = headerText;
      header.scope = "col";
      headerRow.appendChild(header);
    });
    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    const matchingRake = result.rakes.find((rake) => {
      return rake.startDate === selectedDate;
    });
    // Create table body
    const tableBody = document.createElement("tbody");
    matchingRake.stations.forEach((station) => {
      // Filter out stations with "stops" value not equal to 1
      if (station.stops !== 1) {
        return;
      }
      const row = document.createElement("tr");
      const isArrivalDelayed = station.delayArr > 0;

      const columns = [
        station.sname + " (" + station.scode + ")",
        "Arr: " + station.arrive + ", Dept: " + station.depart,
        "Arr: " + station.actArr + ", Dept: " + station.actDep,
        station.delayArr === -1 || station.delayArr === 0
          ? "No Delay"
          : station.delayArr + " mins",
      ];
      columns.forEach((columnText, index) => {
        const column = document.createElement("td");
        column.textContent = columnText;
        // Apply red color to the cell if there's a delay in arrival
        if (isArrivalDelayed && (index === 2 || index === 3)) {
          column.classList.add("text-danger");
        }
        row.appendChild(column);
      });
      tableBody.appendChild(row);
    });
    table.appendChild(tableBody);

    // Append the table to the modal body
    modalBody.innerHTML = ""; // Clear existing content
    modalBody.appendChild(table);

    // Show the modal
    $("#liveTrainStatusModal").modal("show");
  }
});
