// ===== CONSTANTS =====
const API_CONFIG = {
  IRCTC_BASE_URL: "https://www.irctc.co.in/eticketing/protected/mapps1",
  HEADERS: {
    Accept: "application/json, text/plain, */*",
    Bmirak: "webbm",
    "Content-Language": "en",
    "Content-Type": "application/json",
    "Sec-Ch-Ua": '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
  },
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Major Indian station coordinates for route map
const STATION_COORDS = {
  NDLS:{lat:28.6419,lng:77.2195},NDL:{lat:28.6419,lng:77.2195},
  BCT:{lat:18.9398,lng:72.8355},CSTM:{lat:18.9401,lng:72.8357},
  HWH:{lat:22.5839,lng:88.3422},KOAA:{lat:22.5626,lng:88.3481},
  MAS:{lat:13.0836,lng:80.2754},MS:{lat:13.0836,lng:80.2754},
  SBC:{lat:12.9785,lng:77.5666},YPR:{lat:13.0075,lng:77.5542},
  BPL:{lat:23.2645,lng:77.4030},HBJ:{lat:23.2504,lng:77.4634},
  INDB:{lat:22.7231,lng:75.8765},INDI:{lat:22.7231,lng:75.8765},
  ADI:{lat:23.0732,lng:72.5994},ST:{lat:21.1702,lng:72.8311},
  UMB:{lat:30.5245,lng:76.9610},LKO:{lat:26.8467,lng:80.9462},
  CNB:{lat:26.4478,lng:80.3340},AGC:{lat:27.1975,lng:78.0176},
  PNBE:{lat:25.6097,lng:85.1252},RJPB:{lat:25.6097,lng:85.1252},
  BBS:{lat:20.2617,lng:85.8385},CTC:{lat:20.4625,lng:85.8828},
  SC:{lat:17.4339,lng:78.5013},HYB:{lat:17.3850,lng:78.4867},
  JP:{lat:26.9124,lng:75.7873},AII:{lat:26.4522,lng:74.6349},
  JU:{lat:26.2389,lng:73.0243},BKN:{lat:27.2195,lng:73.0061},
  UDZ:{lat:24.5761,lng:73.7269},ABR:{lat:25.3478,lng:71.1885},
  JHS:{lat:25.4484,lng:78.5685},GWL:{lat:26.2183,lng:78.1828},
  KOTA:{lat:25.1798,lng:75.8393},RTM:{lat:23.3314,lng:75.0430},
  SUR:{lat:17.6891,lng:75.9050},NGP:{lat:21.1458,lng:79.0882},
  NED:{lat:19.1383,lng:77.3210},AWB:{lat:19.8762,lng:75.3433},
  PNE:{lat:18.5293,lng:73.8785},KJT:{lat:18.9898,lng:73.1310},
  PUNE:{lat:18.5293,lng:73.8785},
  NZM:{lat:28.5921,lng:77.2573},DLI:{lat:28.6619,lng:77.2300},
  GZB:{lat:28.6692,lng:77.4538},MTJ:{lat:27.4924,lng:77.6737},
  TNA:{lat:19.2081,lng:72.9710},KYN:{lat:19.2328,lng:73.0800},
  LTT:{lat:19.1023,lng:72.8979},DR:{lat:18.9732,lng:72.8320},
  BVI:{lat:19.4560,lng:72.7997},VR:{lat:21.1978,lng:72.8398},
  BRC:{lat:22.3072,lng:73.1812},
  MLDT:{lat:25.0000,lng:88.1333},MFP:{lat:26.1230,lng:85.3937},
  SPJ:{lat:25.8900,lng:86.4540},BJU:{lat:25.7386,lng:87.0250},
  KIR:{lat:25.5469,lng:87.5776},
  JAT:{lat:32.7266,lng:74.8570},ASR:{lat:31.6340,lng:74.8723},
  FZR:{lat:30.9243,lng:74.9934},LDH:{lat:30.9010,lng:75.8573},
  RPJ:{lat:30.3706,lng:76.7974},SRE:{lat:30.0869,lng:77.2803},
  DLN:{lat:29.9457,lng:77.5461},
  HRI:{lat:29.1500,lng:75.7300},
  ROK:{lat:29.6911,lng:76.9769},KNL:{lat:29.9800,lng:76.8200},
  CDG:{lat:30.7333,lng:76.7794},
  VSKP:{lat:17.6868,lng:83.2185},BZA:{lat:16.5193,lng:80.6480},
  GNT:{lat:16.3067,lng:80.4365},OGL:{lat:15.4909,lng:78.8356},
  RU:{lat:14.4673,lng:77.0230},BAY:{lat:15.1488,lng:76.9323},
  GTL:{lat:15.1488,lng:77.0000},SBC:{lat:12.9785,lng:77.5666},
  MYS:{lat:12.2958,lng:76.6394},MAQ:{lat:12.8698,lng:74.8430},
  UBL:{lat:14.8138,lng:75.4006},HVR:{lat:14.4673,lng:75.9045},
  ASK:{lat:13.6755,lng:76.2625},
  ED:{lat:11.3410,lng:77.7172},CBE:{lat:11.0168,lng:76.9558},
  MDU:{lat:9.9252,lng:78.1198},TEN:{lat:8.8932,lng:77.4938},
  CAPE:{lat:8.0883,lng:77.5385},NCJ:{lat:10.7900,lng:78.7047},
  TPJ:{lat:10.7900,lng:78.7047},VM:{lat:11.9420,lng:79.4916},
  SA:{lat:11.6500,lng:79.3300},PDY:{lat:11.9139,lng:79.8145},
  RMM:{lat:9.2876,lng:79.3129},
  ERS:{lat:9.9816,lng:76.2999},TVC:{lat:8.4855,lng:76.9492},
  SRR:{lat:11.2588,lng:75.7804},CLT:{lat:11.2588,lng:75.7804},
  PGT:{lat:10.5276,lng:76.2144},TCR:{lat:10.5224,lng:76.2142},
  ALLP:{lat:9.4981,lng:76.3388},QLN:{lat:8.8874,lng:76.5747},
  NCB:{lat:8.4855,lng:76.9492},
  PURI:{lat:19.8135,lng:85.8312},BSPB:{lat:21.4661,lng:83.9764},
  ROURKELA:{lat:22.2604,lng:84.8536},
  RNC:{lat:23.3441,lng:85.3096},DHN:{lat:23.7948,lng:86.4254},
  GAYA:{lat:24.7955,lng:84.9994},MGAH:{lat:25.2800,lng:83.0057},
  BSB:{lat:25.3176,lng:82.9739},ALD:{lat:25.4358,lng:81.8463},
  CNB:{lat:26.4478,lng:80.3340},
  GKP:{lat:26.7606,lng:83.3732},GD:{lat:26.7606,lng:83.3732},
  CPR:{lat:25.9792,lng:85.1695},SEE:{lat:25.9792,lng:85.1695},
  DBG:{lat:26.1542,lng:85.8954},SPJ:{lat:25.8900,lng:86.4540},
  KGUI:{lat:25.5786,lng:87.2759},
  NJP:{lat:26.7042,lng:88.3534},JAJ:{lat:26.7233,lng:88.2350},
  MLBA:{lat:26.3452,lng:89.4543},NOQ:{lat:26.1167,lng:91.0667},
  GHY:{lat:26.1445,lng:91.7362},DBRG:{lat:27.4728,lng:94.9120},
  TinsukiaJn:{lat:27.4914,lng:95.3514},
  BPQ:{lat:19.8606,lng:79.4497},WADI:{lat:17.0588,lng:76.9764},
  GR:{lat:17.3384,lng:76.8231},BJP:{lat:16.8302,lng:75.7100},
  KWV:{lat:16.0303,lng:76.0167},
  PUNE:{lat:18.5293,lng:73.8785},CSMT:{lat:18.9401,lng:72.8357},
  DADAR:{lat:19.0178,lng:72.8478},
  JBP:{lat:23.1815,lng:79.9864},SGRL:{lat:22.8500,lng:80.0000},
  ET:{lat:22.0577,lng:78.6785},BHO:{lat:23.2832,lng:77.3540},
  BINA:{lat:24.1717,lng:78.1339},
  REWA:{lat:24.5369,lng:81.3032},STAM:{lat:24.5870,lng:80.8300},
  SGRL:{lat:23.0833,lng:80.0167},KMZ:{lat:23.7500,lng:80.7833},
  CTI:{lat:22.7500,lng:82.1333},BSP:{lat:22.0864,lng:82.1499},
  RAIPUR:{lat:21.2514,lng:81.6296},R:{lat:21.2514,lng:81.6296},
  DURG:{lat:21.1904,lng:81.2849},NAG:{lat:21.1458,lng:79.0882},
  AMM:{lat:20.0000,lng:79.3000},
  ZON:{lat:22.1667,lng:79.6500},
  KZJK:{lat:22.3500,lng:82.7333},
  AK:{lat:19.8762,lng:75.3433},
  PVR:{lat:19.5000,lng:74.4167},
  MMR:{lat:22.0000,lng:82.0000},
};

// ===== UTILITIES =====
const Utils = {
  getCurrentDate: () => new Date().toISOString().split("T")[0],

  formatDate: (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  },

  extractStationCode: (value) => (value || "").split("-").pop().trim(),

  formatRunsOn: (train, prefix = "running") => {
    const shortDays = ["M","T","W","T","F","S","S"];
    let result = "";
    DAYS.forEach((day, i) => {
      result += train[`${prefix}${day}`] === "Y" ? shortDays[i] : "·";
    });
    return result === "MTWTFSS" ? "Daily" : result;
  },

  showLoader: (show = true) => {
    const el = document.getElementById("globalLoader");
    if (el) el.style.display = show ? "flex" : "none";
  },

  showWarning: (msg, duration = 5000) => {
    const el = document.getElementById("warningMessage");
    if (!el) return;
    el.textContent = msg;
    el.style.display = "block";
    clearTimeout(el._timer);
    el._timer = setTimeout(() => { el.style.display = "none"; }, duration);
  },

  makePlaceholder: (icon, text) => `
    <div class="result-placeholder">
      <div class="placeholder-icon">${icon}</div>
      <p>${text}</p>
    </div>`,
};

// ===== MAP =====
let leafletMap = null;

function initRouteMap(stationList, trainName) {
  const panel = document.getElementById("routeMapPanel");
  const nameEl = document.getElementById("mapTrainName");
  panel.style.display = "block";
  if (nameEl) nameEl.textContent = trainName || "";

  // Wait 2 frames so the panel is laid out before Leaflet sizes the map div
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const coords = [];
    stationList.forEach((s) => {
      const code = s.stationCode;
      if (STATION_COORDS[code]) {
        coords.push({ code, name: s.stationName, latlng: STATION_COORDS[code] });
      }
    });

    if (coords.length < 2) {
      document.getElementById("routeMap").innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:0.85rem;">Map data not available for this route</div>';
      return;
    }

    if (leafletMap) { leafletMap.remove(); leafletMap = null; }

    leafletMap = L.map("routeMap", { zoom: 5, zoomControl: true });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "© OpenStreetMap © CARTO",
      subdomains: "abcd", maxZoom: 19,
    }).addTo(leafletMap);

    const latlngs = coords.map((c) => [c.latlng.lat, c.latlng.lng]);
    L.polyline(latlngs, { color: "#a668ff", weight: 3, opacity: 0.8, dashArray: "6 4" }).addTo(leafletMap);

    const makeIcon = (isTerminus) => L.divIcon({
      className: "",
      html: `<div style="width:${isTerminus?14:10}px;height:${isTerminus?14:10}px;border-radius:50%;background:${isTerminus?"#00ffa4":"#a668ff"};border:2px solid ${isTerminus?"#00ffa4":"rgba(166,104,255,0.5)"};box-shadow:0 0 ${isTerminus?10:6}px ${isTerminus?"#00ffa4":"#a668ff"}"></div>`,
      iconSize: [isTerminus?14:10, isTerminus?14:10],
      iconAnchor: [isTerminus?7:5, isTerminus?7:5],
    });

    coords.forEach((c, i) => {
      const isTerminus = i === 0 || i === coords.length - 1;
      L.marker([c.latlng.lat, c.latlng.lng], { icon: makeIcon(isTerminus) })
        .addTo(leafletMap)
        .bindPopup(`<strong style="color:#f0f0f0">${c.name}</strong><br/><span style="color:#a668ff;font-size:0.78rem">${c.code}</span>`);
    });

    leafletMap.fitBounds(latlngs, { padding: [32, 32] });
  }));
}

// ===== TAB NAVIGATION =====
function initTabs() {
  const navItems = document.querySelectorAll(".nav-item");
  const panels = document.querySelectorAll(".tab-panel");
  const tabTitle = document.querySelector(".tab-title");

  const tabLabels = {
    search: "Train Search",
    schedule: "Train Schedule",
    station: "Station Search",
    live: "Live Status",
    availability: "Seat Availability",
  };

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tab = item.dataset.tab;
      navItems.forEach((n) => n.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      item.classList.add("active");
      const panel = document.getElementById(`tab-${tab}`);
      if (panel) panel.classList.add("active");
      if (tabTitle) tabTitle.textContent = tabLabels[tab] || "";
      // Close sidebar on mobile
      if (window.innerWidth < 768) {
        document.getElementById("sidebar").classList.remove("open");
      }
    });
  });
}

// ===== MOBILE SIDEBAR =====
function initMobileSidebar() {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("sidebarClose");

  hamburger?.addEventListener("click", () => sidebar.classList.toggle("open"));
  closeBtn?.addEventListener("click", () => sidebar.classList.remove("open"));
}

// ===== RAILWAY MAP MODAL =====
function initMapModal() {
  const overlay = document.getElementById("railwayMapOverlay");
  document.getElementById("mapFabBtn")?.addEventListener("click", () => {
    overlay.classList.add("open");
  });
  document.getElementById("mapModalClose")?.addEventListener("click", () => {
    overlay.classList.remove("open");
  });
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("open");
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initMobileSidebar();
  initMapModal();

  const today = Utils.getCurrentDate();
  ["date", "d", "statusDate"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = today;
  });

  setupEventListeners();
  setupAutocomplete();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  document.getElementById("searchTrains")?.addEventListener("click", (e) => { e.preventDefault(); searchTrains(); });
  document.getElementById("searchSchedule")?.addEventListener("click", (e) => { e.preventDefault(); searchSchedule(); });
  document.getElementById("searchStation")?.addEventListener("click", (e) => { e.preventDefault(); searchStation(); });
  document.getElementById("searchLiveTrainStatus")?.addEventListener("click", (e) => { e.preventDefault(); searchLiveTrainStatus(); });
  document.getElementById("switch-icon")?.addEventListener("click", swapStations);
  document.getElementById("availabilityForm")?.addEventListener("submit", handleAvailabilitySubmit);
  document.getElementById("showNextDay")?.addEventListener("click", (e) => { e.preventDefault(); changeAvailabilityDate(1); });
  document.getElementById("showPrevDay")?.addEventListener("click", (e) => { e.preventDefault(); changeAvailabilityDate(-1); });
}

function swapStations() {
  const src = document.getElementById("sourceStation");
  const dst = document.getElementById("destinationStation");
  if (src && dst) [src.value, dst.value] = [dst.value, src.value];
}

// ===== SEARCH TRAINS =====
function searchTrains() {
  const src = Utils.extractStationCode(document.getElementById("sourceStation").value);
  const dst = Utils.extractStationCode(document.getElementById("destinationStation").value);
  const date = (document.getElementById("date").value || "").split("-").join("");

  if (!src || !dst) { Utils.showWarning("Please enter both source and destination stations"); return; }

  const payload = {
    concessionBooking: false, srcStn: src, destStn: dst,
    jrnyClass: "", jrnyDate: date, quotaCode: "GN",
    currentBooking: "false", flexiFlag: false, handicapFlag: false,
    ticketType: "E", loyaltyRedemptionBooking: false, ftBooking: false,
  };

  Utils.showLoader(true);

  fetch(`${API_CONFIG.IRCTC_BASE_URL}/altAvlEnq/TC`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { ...API_CONFIG.HEADERS, Greq: Date.now(), Referer: "https://www.irctc.co.in/nget/booking/check-train-schedule" },
  })
    .then((r) => r.json())
    .then((data) => {
      Utils.showLoader(false);
      if (data.errorMessage) { Utils.showWarning(data.errorMessage); return; }
      renderSearchResults(data.trainBtwnStnsList || []);
    })
    .catch(() => { Utils.showLoader(false); Utils.showWarning("Network error. Please try again."); });
}

function renderSearchResults(list) {
  const panel = document.getElementById("searchResult");
  if (!list.length) { panel.innerHTML = Utils.makePlaceholder("🚫", "No trains found for this route"); return; }

  const cards = list.map((t) => {
    const runsOn = Utils.formatRunsOn(t);
    return `
      <div class="train-card">
        <div class="train-card-top">
          <span class="train-number">${t.trainNumber}</span>
          <span class="train-name">${t.trainName}</span>
          <span class="days-pill">${runsOn}</span>
        </div>
        <div class="train-card-bottom">
          <div class="station-time">
            <span class="time-value">${t.departureTime || "--"}</span>
            <span class="station-code">${t.fromStnCode}</span>
          </div>
          <div class="journey-line">
            <span class="duration-text">${t.duration || ""}</span>
            <div class="line-track">
              <div class="line-dot"></div>
              <div class="line-rule"></div>
              <div class="line-dot"></div>
            </div>
            <span class="dist-text">${t.distance ? t.distance + " km" : ""}</span>
          </div>
          <div class="station-time">
            <span class="time-value">${t.arrivalTime || "--"}</span>
            <span class="station-code">${t.toStnCode}</span>
          </div>
        </div>
      </div>`;
  }).join("");

  panel.innerHTML = `
    <div class="result-header">
      <span class="result-title">Trains Found</span>
      <span class="result-badge">${list.length} trains</span>
    </div>
    <div class="train-cards">${cards}</div>`;
}

// ===== SCHEDULE =====
function searchSchedule() {
  let num = Utils.extractStationCode(document.getElementById("trainNumber").value);
  if (!num) { Utils.showWarning("Please enter a train number"); return; }

  Utils.showLoader(true);
  fetch(`${API_CONFIG.IRCTC_BASE_URL}/trnscheduleenquiry/${num}`, {
    headers: { ...API_CONFIG.HEADERS, Greq: Date.now(), Referer: "https://www.irctc.co.in/nget/booking/check-train-schedule" },
  })
    .then((r) => r.json())
    .then((data) => {
      Utils.showLoader(false);
      if (data.errorMessage) { Utils.showWarning("Please enter a valid train number"); return; }
      renderSchedule(data);
    })
    .catch(() => { Utils.showLoader(false); Utils.showWarning("Network error. Please try again."); });
}

function renderSchedule(data) {
  const panel = document.getElementById("scheduleResult");
  const stations = data.stationList || [];

  let runsOn = "";
  DAYS.forEach((d) => { if (data[`trainRunsOn${d}`] === "Y") runsOn += d + " "; });
  runsOn = runsOn.trim() === "Mon Tue Wed Thu Fri Sat Sun" ? "Daily" : runsOn;

  const rows = stations.map((s) => `
    <tr>
      <td>${s.stationCode}</td>
      <td>${s.stationName}</td>
      <td>${s.arrivalTime || "Origin"}</td>
      <td>${s.departureTime || "Destination"}</td>
      <td>${s.haltTime || "--"}</td>
      <td>${s.distance || "--"}</td>
      <td>${s.dayCount || 1}</td>
    </tr>`).join("");

  panel.innerHTML = `
    <div class="result-header">
      <span class="result-title">${data.trainName || "Schedule"}</span>
      <span class="result-badge">${stations.length} stations</span>
    </div>
    <div class="runs-on-box"><strong>Runs On:</strong> ${runsOn || "N/A"}</div>
    <div class="schedule-table-wrap">
      <table class="data-table">
        <thead>
          <tr><th>Code</th><th>Station</th><th>Arrival</th><th>Departure</th><th>Halt</th><th>Dist (km)</th><th>Day</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;

  // Draw route map
  initRouteMap(stations, data.trainName);
}

// ===== NTES HEADERS =====
const NTES_HEADERS = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  Origin: "https://enquiry.indianrail.gov.in",
  Referer: "https://enquiry.indianrail.gov.in/mntes/",
};

// ===== STATION (NTES staEnq) =====
function searchStation() {
  const code = Utils.extractStationCode(document.getElementById("stationName").value);
  if (!code) { Utils.showWarning("Please enter a station name or code"); return; }

  Utils.showLoader(true);

  // NTES: GET trains arriving/departing at a station
  fetch(`https://enquiry.indianrail.gov.in/api/staEnq/${code.toUpperCase()}`, {
    headers: NTES_HEADERS,
  })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((data) => {
      Utils.showLoader(false);
      // NTES may wrap response in .response or .data
      const payload = data.response || data.data || data;
      const trains =
        payload.trainsList || payload.trains || payload.stationTrainsList ||
        (Array.isArray(payload) ? payload : []);
      if (!trains.length) { Utils.showWarning("No trains found for this station — try a different code"); return; }
      renderStationResults(trains, code.toUpperCase());
    })
    .catch(() => {
      // Fallback: IRCTC station enquiry pattern
      fetch(`${API_CONFIG.IRCTC_BASE_URL}/staEnq/${code.toUpperCase()}`, {
        headers: { ...API_CONFIG.HEADERS, Greq: Date.now(), Referer: "https://www.irctc.co.in/nget/train-search/check-schedule" },
      })
        .then((r) => r.json())
        .then((data) => {
          Utils.showLoader(false);
          if (data.errorMessage) { Utils.showWarning("No trains found for this station code"); return; }
          const trains = data.trainsList || data.trains || data.stationTrainsList || [];
          if (!trains.length) { Utils.showWarning("No trains found for this station"); return; }
          renderStationResults(trains, code.toUpperCase());
        })
        .catch(() => {
          Utils.showLoader(false);
          Utils.showWarning("Unable to fetch station trains. Check the station code and try again.");
        });
    });
}

function renderStationResults(trains, stationCode) {
  const panel = document.getElementById("stationResult");
  const isLive = document.getElementById("live")?.checked;

  // Get current IST time in minutes
  const istNow = getISTDate();
  const nowMins = istNow.getHours() * 60 + istNow.getMinutes();

  const normalise = (t) => {
    const num = t.trainNumber || t.trainNo || t.train_number || t.tcode || "--";
    const name = t.trainName || t.train_name || t.tname || "--";
    const arr = t.arrivalTime || t.arrive_time || t.arrTime || t.arr || null;
    const dep = t.departureTime || t.depart_time || t.depTime || t.dep || null;
    const days = t.runsOn || t.days || t.runDays || "Daily";
    return { num, name, arr, dep, days };
  };

  const filtered = trains
    .map(normalise)
    .filter((t) => {
      if (!isLive) return true;
      const timeStr = t.dep || t.arr || "";
      if (!timeStr) return true;
      const mins = parseTimeMins(timeStr);
      return mins === null || mins >= nowMins;
    });

  if (!filtered.length) {
    panel.innerHTML = Utils.makePlaceholder("⏰", "No upcoming trains at this station right now");
    return;
  }

  const rows = filtered.map((t) => {
    const arrDisplay = !t.arr || t.arr === "00:00" ? "Origin" : t.arr;
    const depDisplay = !t.dep || t.dep === "00:00" ? "Destination" : t.dep;
    return `<tr>
      <td>${t.num}</td>
      <td>${t.name}</td>
      <td>${arrDisplay}</td>
      <td>${depDisplay}</td>
      <td>${t.days}</td>
    </tr>`;
  }).join("");

  panel.innerHTML = `
    <div class="result-header">
      <span class="result-title">Trains at ${stationCode}</span>
      <span class="result-badge">${filtered.length} trains</span>
    </div>
    <div class="schedule-table-wrap">
      <table class="data-table">
        <thead><tr><th>Number</th><th>Name</th><th>Arrival</th><th>Departure</th><th>Days</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// ===== LIVE STATUS (NTES + schedule fallback) =====
function searchLiveTrainStatus() {
  let num = Utils.extractStationCode(document.getElementById("liveTrainNumber")?.value);
  if (!num) { Utils.showWarning("Please enter a train number"); return; }

  const dateVal = document.getElementById("statusDate").value || Utils.getCurrentDate();
  const [yr, mo, dy] = dateVal.split("-");

  // NTES uses startDay: 0 = today, 1 = yesterday (for overnight trains)
  const today = Utils.getCurrentDate();
  const startDay = dateVal === today ? 0 : 1;

  Utils.showLoader(true);

  // Always fetch IRCTC schedule (reliable) — used as base + fallback
  const schedulePromise = fetch(
    `${API_CONFIG.IRCTC_BASE_URL}/trnscheduleenquiry/${num}`,
    { headers: { ...API_CONFIG.HEADERS, Greq: Date.now(), Referer: "https://www.irctc.co.in/nget/booking/check-train-schedule" } }
  ).then((r) => r.json()).catch(() => null);

  // NTES live position (best effort)
  const ntesPromise = fetch(
    `https://enquiry.indianrail.gov.in/api/GetLiveStatus?trainNo=${num}&startDay=${startDay}`,
    { headers: NTES_HEADERS }
  ).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }).catch(() => null);

  Promise.all([schedulePromise, ntesPromise]).then(([scheduleData, ntesData]) => {
    Utils.showLoader(false);

    if (!scheduleData || scheduleData.errorMessage) {
      Utils.showWarning("Invalid train number — please check and try again.");
      return;
    }

    const stationList = scheduleData.stationList || [];
    // Annotate with NTES real-time data if available
    const liveStations = extractNtesStations(ntesData);
    const annotated = annotatePositions(stationList, liveStations);
    renderLiveStatus(annotated, scheduleData, ntesData);
  });
}

// Extract station list from NTES response (handles multiple response shapes)
function extractNtesStations(ntesData) {
  if (!ntesData) return [];
  const payload = ntesData.response || ntesData.data || ntesData;
  return payload.stationList || payload.stations || payload.route || [];
}

// Build a lookup map from NTES live data keyed by station code
function buildNtesMap(ntesStations) {
  const map = {};
  ntesStations.forEach((s) => {
    const code = s.stationCode || s.code || s.stnCode || "";
    if (code) map[code] = s;
  });
  return map;
}

// Annotate schedule stations with position + live delay
function annotatePositions(stations, ntesStations) {
  const ntesMap = buildNtesMap(ntesStations);
  const istNow = getISTDate();
  const nowMins = istNow.getHours() * 60 + istNow.getMinutes();
  let currentFound = false;

  return stations.map((s, i) => {
    const live = ntesMap[s.stationCode] || null;

    // Live data wins for pass/delay info
    if (live) {
      const passed = live.passed === "Y" || live.passed === true || live.hasPassed === true;
      const isCurrent = live.current === "Y" || live.isCurrent === true;
      const delay = parseInt(live.delayMinutes || live.delay || live.lateMinutes || 0);
      const actArr = live.actualArrival || live.ata || live.actarr || "--";
      const actDep = live.actualDeparture || live.atd || live.actdep || "--";
      const pos = isCurrent ? "current" : passed ? "passed" : "upcoming";
      if (pos === "current") currentFound = true;
      return { ...s, _pos: pos, _delay: delay, _actArr: actArr, _actDep: actDep, _hasLive: true };
    }

    // Schedule-based estimation
    const dayCount = parseInt(s.dayCount || 1);
    if (dayCount > 1) return { ...s, _pos: "upcoming", _delay: 0, _hasLive: false };

    const timeMins = parseTimeMins(s.departureTime || s.arrivalTime);
    if (timeMins === null) return { ...s, _pos: i === 0 ? "origin" : "upcoming", _delay: 0, _hasLive: false };

    if (!currentFound && timeMins <= nowMins) {
      const nextIdx = i + 1;
      const next = stations[nextIdx];
      const nextMins = next ? parseTimeMins(next.departureTime || next.arrivalTime) : null;
      const nextDay = next ? parseInt(next.dayCount || 1) : 1;
      if (nextMins === null || nextMins > nowMins || nextDay > 1) {
        currentFound = true;
        return { ...s, _pos: "current", _delay: 0, _hasLive: false };
      }
      return { ...s, _pos: "passed", _delay: 0, _hasLive: false };
    }

    return { ...s, _pos: "upcoming", _delay: 0, _hasLive: false };
  });
}

// Shared time parser — returns minutes since midnight or null
function parseTimeMins(t) {
  if (!t || t === "--") return null;
  const parts = String(t).split(":");
  const h = parseInt(parts[0]);
  const m = parseInt(parts[1]);
  if (isNaN(h) || isNaN(m)) return null;
  return h * 60 + m;
}

// Return current time as IST Date
function getISTDate() {
  const now = new Date();
  // IST = UTC+5:30
  return new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60000);
}

function renderLiveStatus(annotated, scheduleData, ntesData) {
  const panel = document.getElementById("liveResult");
  const trainName = scheduleData.trainName || "Train";
  const hasLiveData = annotated.some((s) => s._hasLive);

  const currentStation = annotated.find((s) => s._pos === "current");
  const passedCount = annotated.filter((s) => s._pos === "passed").length;

  let posText = "Not yet departed";
  if (currentStation) posText = `Near ${currentStation.stationName || currentStation.stationCode}`;
  else if (passedCount === annotated.length) posText = "Journey complete";
  else if (passedCount > 0) posText = `${passedCount} stations passed`;

  // Top delay from NTES
  const topDelay = ntesData
    ? parseInt((ntesData.response || ntesData.data || ntesData).delay ||
               (ntesData.response || ntesData.data || ntesData).currentDelay || 0)
    : 0;

  const rows = annotated.map((s) => {
    const posClass = s._pos === "passed" ? "tr-passed"
      : s._pos === "current" ? "tr-current" : "";

    const badge = s._pos === "current"
      ? `<span class="pos-badge">▶ Here</span>` : "";

    const delayCell = s._hasLive
      ? (s._delay > 0
          ? `<span class="td-delayed">+${s._delay}m late</span>`
          : s._pos === "passed" ? `<span class="td-on-time">On time</span>` : `<span class="td-sched">—</span>`)
      : `<span class="td-sched">${s._pos === "passed" ? "✓" : s._pos === "current" ? "●" : "—"}</span>`;

    const actTimes = s._hasLive
      ? `${s._actArr || "--"} / ${s._actDep || "--"}`
      : `<span style="color:var(--text-subtle);font-size:0.75rem">est.</span>`;

    return `<tr class="${posClass}">
      <td>${s.stationName || ""}${badge}</td>
      <td style="font-family:monospace">${s.stationCode || ""}</td>
      <td>${s.arrivalTime || "Origin"} / ${s.departureTime || "Dest"}</td>
      <td>${actTimes}</td>
      <td>${s.distance || "--"}</td>
      <td>${delayCell}</td>
    </tr>`;
  }).join("");

  const sourceLabel = hasLiveData
    ? `<span class="result-badge" style="background:rgba(255,95,126,0.1);border-color:rgba(255,95,126,0.25);color:var(--danger)">● Live (NTES)</span>`
    : `<span class="result-badge" style="background:rgba(255,189,46,0.1);border-color:rgba(255,189,46,0.25);color:var(--warning)">⏱ Schedule-based</span>`;

  const delayBanner = topDelay > 0
    ? `<div class="live-note live-note-warn">⚠️ Train running <strong>${topDelay} minutes late</strong></div>`
    : hasLiveData
      ? `<div class="live-note">✅ Train appears to be running on time</div>`
      : `<div class="live-note">Position estimated from schedule · Current IST: ${getISTDate().toTimeString().slice(0,5)}</div>`;

  panel.innerHTML = `
    <div class="result-header">
      <span class="result-title">${trainName}</span>
      ${sourceLabel}
    </div>
    ${delayBanner}
    <div class="live-pos-chip">📍 ${posText}</div>
    <div class="schedule-table-wrap">
      <table class="data-table">
        <thead>
          <tr><th>Station</th><th>Code</th><th>Scheduled (Arr/Dep)</th><th>Actual (Arr/Dep)</th><th>Dist</th><th>Status</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// ===== SEAT AVAILABILITY =====
function changeAvailabilityDate(days) {
  const el = document.getElementById("d");
  if (!el) return;
  const d = new Date(el.value);
  d.setDate(d.getDate() + days);
  el.value = d.toISOString().split("T")[0];
  document.getElementById("availabilityForm").dispatchEvent(new Event("submit"));
}

function handleAvailabilitySubmit(e) {
  e.preventDefault();
  const src = Utils.extractStationCode(document.getElementById("src").value);
  const dst = Utils.extractStationCode(document.getElementById("dest").value);
  const date = (document.getElementById("d").value || "").split("-").join("");
  const cls = document.getElementById("class").value;
  const quota = document.getElementById("quota").value;
  let num = Utils.extractStationCode(document.getElementById("tNumber").value);

  if (!num || !src || !dst) { Utils.showWarning("Please fill in all required fields"); return; }

  const apiUrl = `${API_CONFIG.IRCTC_BASE_URL}/avlFarenquiry/${num}/${date}/${src}/${dst}/${cls}/${quota}/N`;
  const payload = {
    classCode: cls, concessionBooking: false, fromStnCode: src, ftBooking: false,
    isLogedinReq: false, journeyDate: date, loyaltyRedemptionBooking: false,
    moreThanOneDay: true, paymentFlag: "N", quotaCode: quota, ticketType: "E",
    toStnCode: dst, trainNumber: num,
  };

  Utils.showLoader(true);
  fetch(apiUrl, {
    method: "POST",
    headers: { ...API_CONFIG.HEADERS, Greq: Date.now(), Referer: "https://www.irctc.co.in/nget/booking/train-list" },
    body: JSON.stringify(payload),
  })
    .then((r) => r.json())
    .then((data) => {
      Utils.showLoader(false);
      if (data.errorMessage) { Utils.showWarning(data.errorMessage); return; }
      renderAvailability(data);
    })
    .catch(() => { Utils.showLoader(false); Utils.showWarning("Network error. Please try again."); });
}

function renderAvailability(data) {
  const panel = document.getElementById("availabilityResult");
  const dayNav = document.getElementById("dayNav");

  const avlRows = (data.avlDayList || []).map((a) => {
    const status = a.availablityStatus || "";
    const isAvail = status.includes("AVAILABLE") || status.includes("CURR_AVBL");
    return `<div class="avl-row">
      <span class="avl-date">${Utils.formatDate(a.availablityDate)}</span>
      <span class="${isAvail ? "avl-status-avail" : "avl-status-wl"}">${status}</span>
    </div>`;
  }).join("");

  panel.querySelector(".result-placeholder")?.remove();
  panel.querySelector(".avl-info-card")?.remove();
  panel.querySelector(".avl-dates")?.remove();
  panel.querySelector(".result-header")?.remove();

  const fragment = document.createElement("div");
  fragment.innerHTML = `
    <div class="result-header">
      <span class="result-title">${data.trainName || data.trainNo || "Availability"}</span>
      <span class="result-badge">${data.enqClass || ""} · ${data.quota || ""}</span>
    </div>
    <div class="avl-info-card">
      <div class="avl-field"><label>Train</label><span>${data.trainNo || "--"}</span></div>
      <div class="avl-field"><label>From</label><span>${data.from || "--"}</span></div>
      <div class="avl-field"><label>To</label><span>${data.to || "--"}</span></div>
      <div class="avl-field"><label>Fare</label><span>₹${data.totalFare || "--"}</span></div>
      <div class="avl-field"><label>Distance</label><span>${data.distance ? data.distance + " km" : "--"}</span></div>
      <div class="avl-field"><label>Last Updated</label><span style="font-size:0.78rem">${data.lastUpdateTime || "--"}</span></div>
    </div>
    <div class="avl-dates">${avlRows}</div>`;

  // Insert before day nav
  panel.insertBefore(fragment, dayNav);
  if (dayNav) dayNav.style.display = "flex";
}

// ===== AUTOCOMPLETE =====
function setupAutocomplete() {
  ["sourceStation", "destinationStation", "stationName", "src", "dest"].forEach((id) => {
    hookAutocomplete(id, false);
  });
  ["trainNumber", "liveTrainNumber", "tNumber"].forEach((id) => {
    hookAutocomplete(id, true);
  });
}

const _cache = {};

function loadData(isTrain, cb) {
  const key = isTrain ? "trains" : "stations";
  if (_cache[key]) { cb(_cache[key]); return; }
  fetch(`DB/${key}.json`)
    .then((r) => r.json())
    .then((d) => { _cache[key] = d; cb(d); })
    .catch(() => {});
}

function hookAutocomplete(inputId, isTrain) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const wrapperId = `${inputId}SuggestionsWrapper`;
  const listId = `${inputId}Suggestions`;

  // If the IDs differ (dest/src case) locate dynamically
  const wrapper = document.getElementById(wrapperId) ||
    input.closest(".input-wrap")?.querySelector(".suggestions-wrapper");
  const list = document.getElementById(listId) ||
    input.closest(".input-wrap")?.querySelector(".suggestions");

  if (!wrapper || !list) return;

  let data = [];
  loadData(isTrain, (d) => { data = d; });

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { wrapper.style.display = "none"; list.innerHTML = ""; return; }
    const hits = data.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 50);
    if (!hits.length) { wrapper.style.display = "none"; return; }
    list.innerHTML = hits.map((s) =>
      `<div class="suggestion" data-val="${s.label}">${s.label}</div>`
    ).join("");
    wrapper.style.display = "block";
    list.querySelectorAll(".suggestion").forEach((el) => {
      el.addEventListener("mousedown", (e) => {
        e.preventDefault();
        input.value = el.dataset.val;
        wrapper.style.display = "none";
      });
    });
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target) && e.target !== input) {
      wrapper.style.display = "none";
    }
  });
}
