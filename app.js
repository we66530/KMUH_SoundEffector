const scenes = [
  {
    title: "🎬 開場",
    folder: "01_opening",
    sounds: [
      { label: "心跳", file: "opening_heartbeat_short.mp3" },
      { label: "史詩", file: "opening_epic_mid.mp3" },
      { label: "刀落", file: "opening_knife_short.mp3" }
    ]
  },
  {
    title: "👨‍⚕️ 老師進場",
    folder: "02_boss",
    sounds: [
      { label: "教父", file: "boss_godfather_short.mp3" },
      { label: "黑武士", file: "boss_vader_short.mp3" }
    ]
  },
  {
    title: "🧑‍⚕️ 住院醫師",
    folder: "03_resident",
    sounds: [
      { label: "緊張", file: "resident_tension_short.mp3" },
      { label: "MI", file: "resident_mission_mid.mp3" }
    ]
  },
  {
    title: "🏆 頒獎",
    folder: "04_award",
    sounds: [
      { label: "勝利", file: "award_victory_short.mp3" },
      { label: "悲壯", file: "award_tragic_mid.mp3" }
    ]
  },
  {
    title: "💥 FAIL",
    folder: "05_fail",
    sounds: [
      { label: "Fail", file: "fail_fail_short.mp3" },
      { label: "Scratch", file: "fail_scratch_short.mp3" }
    ]
  },
  {
    title: "🚑 救場",
    folder: "06_emergency",
    sounds: [
      { label: "時間暫停", file: "emergency_pause_short.mp3" },
      { label: "警報", file: "emergency_alarm_short.mp3" }
    ]
  },
  {
    title: "🎵 結尾",
    folder: "07_ending",
    sounds: [
      { label: "感性", file: "ending_memory_long.mp3" }
    ]
  }
];

let currentAudio = null;
let volume = 0.8;

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

document.getElementById("stop").onclick = stopAll;
document.getElementById("volume").oninput = e => {
  volume = e.target.value;
  if (currentAudio) currentAudio.volume = volume;
};

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
    btn.onclick = () =>
      playSound(`sounds/${scene.folder}/${s.file}`);
    section.appendChild(btn);
  });

  board.appendChild(section);
});
