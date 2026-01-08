/***********************
 * 場景定義（資料驅動）
 ***********************/
const scenes = [
  {
    title: "🎬 開場",
    folder: "01_opening",
    sounds: [
      { label: "心跳（1）", file: "opening_heartbeat_short.mp3", key: "1" },
      { label: "史詩", file: "opening_epic_mid.mp3" },
      { label: "刀落", file: "opening_knife_short.mp3" }
    ]
  },
  {
    title: "👨‍⚕️ 老師進場",
    folder: "02_boss",
    sounds: [
      { label: "教父（2）", file: "boss_godfather_short.mp3", key: "2" },
      { label: "黑武士", file: "boss_vader_short.mp3" }
    ]
  },
  {
    title: "🧑‍⚕️ 住院醫師",
    folder: "03_resident",
    sounds: [
      { label: "緊張（3）", file: "resident_tension_short.mp3", key: "3" },
      { label: "任務", file: "resident_mission_mid.mp3" }
    ]
  },
  {
    title: "🏆 頒獎",
    folder: "04_award",
    sounds: [
      { label: "勝利（4）", file: "award_victory_short.mp3", key: "4" },
      { label: "悲壯", file: "award_tragic_mid.mp3" }
    ]
  },
  {
    title: "💥 FAIL / 嘲諷",
    folder: "05_fail",
    fail: true,
    sounds: [
      { label: "FAIL（5）", file: "fail_fail_short.mp3", key: "5" },
      { label: "Scratch（6）", file: "fail_scratch_short.mp3", key: "6" }
    ]
  },
  {
    title: "🚑 緊急救場",
    folder: "06_emergency",
    sounds: [
      { label: "時間暫停（7）", file: "emergency_pause_short.mp3", key: "7" },
      { label: "警報", file: "emergency_alarm_short.mp3" }
    ]
  },
  {
    title: "🎵 結尾",
    folder: "07_ending",
    sounds: [
      { label: "感性（8）", file: "ending_memory_long.mp3", key: "8" }
    ]
  }
];

/***********************
 * Audio 控制
 ***********************/
let currentAudio = null;
let volume = 0.8;
let chiefMode = false;

function playSound(path) {
  stopAll();
  currentAudio = new Audio(path);
  currentAudio.volume = volume;
  currentAudio.play();
}

function stopAll() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

/***********************
 * UI 控制
 ***********************/
document.getElementById("stop").onclick = stopAll;

document.getElementById("volume").oninput = e => {
  volume = e.target.value;
  if (currentAudio) currentAudio.volume = volume;
};

document.getElementById("chiefMode").onchange = e => {
  chiefMode = e.target.checked;
  updateFailButtons();
};

/***********************
 * 動態產生按鈕
 ***********************/
const board = document.getElementById("board");

scenes.forEach(scene => {
  const section = document.createElement("div");
  section.className = "section";

  const title = document.createElement("h2");
  title.textContent = scene.title;
  section.appendChild(title);

  scene.sounds.forEach(s => {
    const btn = document.createElement("button");
    btn.textContent = s.label;

    if (scene.fail) {
      btn.classList.add("fail");
    }

    btn.onclick = () => {
      if (scene.fail && chiefMode) return;
      playSound(`sounds/${scene.folder}/${s.file}`);
    };

    section.appendChild(btn);
  });

  board.appendChild(section);
});

function updateFailButtons() {
  document.querySelectorAll(".fail").forEach(btn => {
    btn.disabled = chiefMode;
    btn.style.opacity = chiefMode ? 0.3 : 1;
  });
}

/***********************
 * 快捷鍵 1–9
 ***********************/
document.addEventListener("keydown", e => {
  if (e.repeat) return;

  if (e.key === "9") {
    stopAll();
    return;
  }

  // 主任在場，鎖 FAIL
  if (chiefMode && (e.key === "5" || e.key === "6")) {
    return;
  }

  scenes.forEach(scene => {
    scene.sounds.forEach(s => {
      if (s.key === e.key) {
        playSound(`sounds/${scene.folder}/${s.file}`);
      }
    });
  });
});
