const API_BASE_URL = "http://127.0.0.1:5000";

const backendStatus = document.getElementById("backendStatus");
const authorName = document.getElementById("authorName");
const authorId = document.getElementById("authorId");

const appTitle = document.getElementById("appTitle");
const appSubtitle = document.getElementById("appSubtitle");
const centerTitle = document.getElementById("centerTitle");
const rightBrand = document.getElementById("rightBrand");

const patientListTitle = document.getElementById("patientListTitle");
const imageUploadTitle = document.getElementById("imageUploadTitle");
const imageUploadDesc = document.getElementById("imageUploadDesc");
const dropTitle = document.getElementById("dropTitle");
const dropSub = document.getElementById("dropSub");
const selectImageBtn = document.getElementById("selectImageBtn");
const predictBtn = document.getElementById("predictBtn");

const videoUploadTitle = document.getElementById("videoUploadTitle");
const videoUploadDesc = document.getElementById("videoUploadDesc");
const videoDropTitle = document.getElementById("videoDropTitle");
const videoDropSub = document.getElementById("videoDropSub");
const selectVideoBtn = document.getElementById("selectVideoBtn");
const videoPredictBtn = document.getElementById("videoPredictBtn");

const cameraTitle = document.getElementById("cameraTitle");
const cameraDesc = document.getElementById("cameraDesc");
const frontCameraBtn = document.getElementById("frontCameraBtn");
const rearCameraBtn = document.getElementById("rearCameraBtn");
const stopCameraBtn = document.getElementById("stopCameraBtn");
const analyzeFrameBtn = document.getElementById("analyzeFrameBtn");

const viewerTitle = document.getElementById("viewerTitle");
const previewTitle = document.getElementById("previewTitle");
const gradcamTitle = document.getElementById("gradcamTitle");

const resultSectionTitle = document.getElementById("resultSectionTitle");
const resultSectionDesc = document.getElementById("resultSectionDesc");
const labelDiagnosis = document.getElementById("labelDiagnosis");
const labelPrediction = document.getElementById("labelPrediction");
const labelSeverity = document.getElementById("labelSeverity");
const labelClassId = document.getElementById("labelClassId");
const labelConfidence = document.getElementById("labelConfidence");
const explainTitle = document.getElementById("explainTitle");
const probTitle = document.getElementById("probTitle");
const exportPdfBtn = document.getElementById("exportPdfBtn");

const metricTitle = document.getElementById("metricTitle");
const metricAccLabel = document.getElementById("metricAccLabel");
const metricMacroLabel = document.getElementById("metricMacroLabel");
const metricWeightedLabel = document.getElementById("metricWeightedLabel");

const footerDisclaimer = document.getElementById("footerDisclaimer");
const techTitle = document.getElementById("techTitle");

const fileInput = document.getElementById("fileInput");
const videoInput = document.getElementById("videoInput");
const dropZone = document.getElementById("dropZone");
const videoDropZone = document.getElementById("videoDropZone");
const previewImage = document.getElementById("previewImage");
const previewPlaceholder = document.getElementById("previewPlaceholder");
const gradcamImage = document.getElementById("gradcamImage");
const gradcamPlaceholder = document.getElementById("gradcamPlaceholder");
const videoFileName = document.getElementById("videoFileName");

const camera = document.getElementById("camera");
const cameraCanvas = document.getElementById("cameraCanvas");
const cameraPlaceholder = document.getElementById("cameraPlaceholder");

const diagnosisText = document.getElementById("diagnosisText");
const predictionText = document.getElementById("predictionText");
const severityText = document.getElementById("severityText");
const classIdText = document.getElementById("classIdText");
const confidenceText = document.getElementById("confidenceText");
const explanationText = document.getElementById("explanationText");
const probabilityBars = document.getElementById("probabilityBars");
const extraResultBox = document.getElementById("extraResultBox");
const errorBox = document.getElementById("errorBox");
const loading = document.getElementById("loading");

const metricAcc = document.getElementById("metricAcc");
const metricMacro = document.getElementById("metricMacro");
const metricWeighted = document.getElementById("metricWeighted");

let currentStream = null;
let latestResult = null;
let currentLang = "zh";

const translations = {
  zh: {
    appTitle: "韩国医院骨折测量系统",
    appSubtitle: "Korean Hospital Style Diagnostic Platform",
    centerTitle: "骨折测量",
    rightBrand: "云健康",
    patientListTitle: "患者列表",
    imageUploadTitle: "影像上传诊断",
    imageUploadDesc: "支持拖拽上传图片，快速获得分析结论。",
    dropTitle: "拖拽图片到这里",
    dropSub: "或点击下方按钮选择图片",
    selectImageBtn: "选择图片",
    predictBtn: "开始图片诊断",
    videoUploadTitle: "视频检测",
    videoUploadDesc: "上传视频后按帧抽样分析，输出整体结论。",
    videoDropTitle: "拖拽视频到这里",
    videoDropSub: "或点击下方按钮选择视频",
    selectVideoBtn: "选择视频",
    videoPredictBtn: "开始视频检测",
    cameraTitle: "实时摄像头测量",
    cameraDesc: "支持前后摄像头切换，进行实时辅助分析。",
    frontCameraBtn: "前置摄像头",
    rearCameraBtn: "后置摄像头",
    stopCameraBtn: "关闭摄像头",
    analyzeFrameBtn: "分析当前画面",
    viewerTitle: "PACS 影像查看器",
    previewTitle: "原始影像",
    gradcamTitle: "Grad-CAM 热力图",
    resultSectionTitle: "AI 分析结果",
    resultSectionDesc: "以下结果仅供课程项目演示，不作为临床最终结论。",
    labelDiagnosis: "诊断结论",
    labelPrediction: "骨折类型",
    labelSeverity: "骨折程度",
    labelClassId: "类别编号",
    labelConfidence: "最高置信度",
    explainTitle: "模型解释",
    probTitle: "概率分布",
    exportPdfBtn: "一键生成 PDF 报告",
    metricTitle: "模型分析图",
    metricAccLabel: "Accuracy",
    metricMacroLabel: "Macro F1",
    metricWeightedLabel: "Weighted F1",
    footerDisclaimer: "本工具仅供科研/教育使用，不作为临床诊断依据。",
    techTitle: "技术与源码说明",
    loadingImage: "图片分析中，请稍候...",
    loadingVideo: "视频检测中，请稍候，这一步可能稍慢...",
    loadingFrame: "实时画面分析中，请稍候...",
    backendConnected: "已连接",
    backendDisconnected: "未连接",
    noImage: "请先选择图片。",
    noVideo: "请先选择视频。",
    noCamera: "请先开启摄像头。",
    cameraNotReady: "摄像头画面尚未准备好，请稍后重试。",
    imageOnly: "请上传图片文件。",
    videoOnly: "请上传视频文件。",
    chooseVideoNone: "未选择视频",
    explainDefault: "等待分析结果...",
    noExplain: "暂无解释信息。",
    videoExplain: "视频结果基于逐帧抽样分析得到，为课程项目演示用途。",
    pdfNeedResult: "请先完成一次分析再导出 PDF。",
    pdfFailed: "PDF 导出失败，请确认后端已接入 /export_pdf 接口。",
    cameraOpenFailed: "无法打开摄像头，请检查浏览器权限。",
    videoSummaryTitle: "视频检测摘要",
    sampledFrames: "抽样分析帧数",
    fractureVotes: "骨折风险帧数",
    normalVotes: "正常帧数",
    backendRequestFailed: "请求失败"
  },
  ko: {
    appTitle: "한국 병원 골절 측정 시스템",
    appSubtitle: "Korean Hospital Style Diagnostic Platform",
    centerTitle: "골절 측정",
    rightBrand: "윤건강",
    patientListTitle: "환자 목록",
    imageUploadTitle: "영상 업로드 진단",
    imageUploadDesc: "이미지를 업로드하여 빠르게 분석 결과를 확인합니다.",
    dropTitle: "이미지를 여기로 드래그하세요",
    dropSub: "또는 아래 버튼을 눌러 이미지 선택",
    selectImageBtn: "이미지 선택",
    predictBtn: "이미지 진단 시작",
    videoUploadTitle: "비디오 검사",
    videoUploadDesc: "비디오를 프레임 단위로 샘플링하여 전체 결과를 제공합니다.",
    videoDropTitle: "비디오를 여기로 드래그하세요",
    videoDropSub: "또는 아래 버튼을 눌러 비디오 선택",
    selectVideoBtn: "비디오 선택",
    videoPredictBtn: "비디오 검사 시작",
    cameraTitle: "실시간 카메라 측정",
    cameraDesc: "전면/후면 카메라 전환을 지원하며 실시간 분석이 가능합니다.",
    frontCameraBtn: "전면 카메라",
    rearCameraBtn: "후면 카메라",
    stopCameraBtn: "카메라 종료",
    analyzeFrameBtn: "현재 화면 분석",
    viewerTitle: "PACS 영상 뷰어",
    previewTitle: "원본 영상",
    gradcamTitle: "Grad-CAM 히트맵",
    resultSectionTitle: "AI 분석 결과",
    resultSectionDesc: "아래 결과는 수업 프로젝트 시연용이며 임상 최종 진단이 아닙니다.",
    labelDiagnosis: "진단 결론",
    labelPrediction: "골절 유형",
    labelSeverity: "골절 정도",
    labelClassId: "클래스 번호",
    labelConfidence: "최고 신뢰도",
    explainTitle: "모델 설명",
    probTitle: "확률 분포",
    exportPdfBtn: "PDF 보고서 생성",
    metricTitle: "모델 분석 지표",
    metricAccLabel: "Accuracy",
    metricMacroLabel: "Macro F1",
    metricWeightedLabel: "Weighted F1",
    footerDisclaimer: "본 도구는 연구/교육용이며 임상 진단 근거로 사용할 수 없습니다.",
    techTitle: "기술 및 소스 설명",
    loadingImage: "이미지 분석 중입니다...",
    loadingVideo: "비디오 분석 중입니다. 잠시만 기다려 주세요...",
    loadingFrame: "실시간 화면 분석 중입니다...",
    backendConnected: "연결됨",
    backendDisconnected: "연결 안됨",
    noImage: "먼저 이미지를 선택하세요.",
    noVideo: "먼저 비디오를 선택하세요.",
    noCamera: "먼저 카메라를 켜세요.",
    cameraNotReady: "카메라 화면이 아직 준비되지 않았습니다.",
    imageOnly: "이미지 파일을 업로드하세요.",
    videoOnly: "비디오 파일을 업로드하세요.",
    chooseVideoNone: "선택된 비디오 없음",
    explainDefault: "분석 결과를 기다리는 중...",
    noExplain: "설명 정보가 없습니다.",
    videoExplain: "비디오 결과는 프레임 샘플링 기반 분석 결과입니다.",
    pdfNeedResult: "먼저 분석을 완료한 뒤 PDF를 생성하세요.",
    pdfFailed: "PDF 내보내기에 실패했습니다. /export_pdf 백엔드 인터페이스를 확인하세요.",
    cameraOpenFailed: "카메라를 열 수 없습니다. 브라우저 권한을 확인하세요.",
    videoSummaryTitle: "비디오 검사 요약",
    sampledFrames: "분석한 프레임 수",
    fractureVotes: "골절 위험 프레임 수",
    normalVotes: "정상 프레임 수",
    backendRequestFailed: "요청 실패"
  },
  en: {
    appTitle: "Korean Hospital Fracture Measurement System",
    appSubtitle: "Korean Hospital Style Diagnostic Platform",
    centerTitle: "Fracture Measurement",
    rightBrand: "Cloud Health",
    patientListTitle: "Patient List",
    imageUploadTitle: "Image Upload Diagnosis",
    imageUploadDesc: "Upload images for fast AI-assisted analysis.",
    dropTitle: "Drag image here",
    dropSub: "or click the button below to select an image",
    selectImageBtn: "Select Image",
    predictBtn: "Start Image Diagnosis",
    videoUploadTitle: "Video Analysis",
    videoUploadDesc: "Upload a video and analyze sampled frames for an overall result.",
    videoDropTitle: "Drag video here",
    videoDropSub: "or click the button below to select a video",
    selectVideoBtn: "Select Video",
    videoPredictBtn: "Start Video Analysis",
    cameraTitle: "Realtime Camera Measurement",
    cameraDesc: "Supports front/rear camera switching for realtime assistance.",
    frontCameraBtn: "Front Camera",
    rearCameraBtn: "Rear Camera",
    stopCameraBtn: "Stop Camera",
    analyzeFrameBtn: "Analyze Current Frame",
    viewerTitle: "PACS Image Viewer",
    previewTitle: "Original Image",
    gradcamTitle: "Grad-CAM Heatmap",
    resultSectionTitle: "AI Analysis Results",
    resultSectionDesc: "These results are for coursework demonstration only and not for clinical diagnosis.",
    labelDiagnosis: "Diagnosis",
    labelPrediction: "Fracture Type",
    labelSeverity: "Severity",
    labelClassId: "Class ID",
    labelConfidence: "Top Confidence",
    explainTitle: "Model Explanation",
    probTitle: "Probability Distribution",
    exportPdfBtn: "Generate PDF Report",
    metricTitle: "Model Analytics",
    metricAccLabel: "Accuracy",
    metricMacroLabel: "Macro F1",
    metricWeightedLabel: "Weighted F1",
    footerDisclaimer: "This tool is for research/education only and not for clinical diagnosis.",
    techTitle: "Technical & Source Notes",
    loadingImage: "Analyzing image...",
    loadingVideo: "Analyzing video, this may take a bit longer...",
    loadingFrame: "Analyzing current frame...",
    backendConnected: "Connected",
    backendDisconnected: "Disconnected",
    noImage: "Please select an image first.",
    noVideo: "Please select a video first.",
    noCamera: "Please start the camera first.",
    cameraNotReady: "Camera frame is not ready yet.",
    imageOnly: "Please upload an image file.",
    videoOnly: "Please upload a video file.",
    chooseVideoNone: "No video selected",
    explainDefault: "Waiting for analysis result...",
    noExplain: "No explanation available.",
    videoExplain: "Video results are based on frame sampling for demonstration purposes.",
    pdfNeedResult: "Please complete an analysis before exporting PDF.",
    pdfFailed: "PDF export failed. Please confirm the backend supports /export_pdf.",
    cameraOpenFailed: "Unable to open the camera. Please check browser permissions.",
    videoSummaryTitle: "Video Analysis Summary",
    sampledFrames: "Frames Analyzed",
    fractureVotes: "Fracture-risk Frames",
    normalVotes: "Normal Frames",
    backendRequestFailed: "Request failed"
  }
};

function t(key) {
  return translations[currentLang][key] || key;
}

function setLanguage(lang) {
  currentLang = lang;

  appTitle.textContent = t("appTitle");
  appSubtitle.textContent = t("appSubtitle");
  centerTitle.textContent = t("centerTitle");
  rightBrand.textContent = t("rightBrand");

  patientListTitle.textContent = t("patientListTitle");
  imageUploadTitle.textContent = t("imageUploadTitle");
  imageUploadDesc.textContent = t("imageUploadDesc");
  dropTitle.textContent = t("dropTitle");
  dropSub.textContent = t("dropSub");
  selectImageBtn.textContent = t("selectImageBtn");
  predictBtn.textContent = t("predictBtn");

  videoUploadTitle.textContent = t("videoUploadTitle");
  videoUploadDesc.textContent = t("videoUploadDesc");
  videoDropTitle.textContent = t("videoDropTitle");
  videoDropSub.textContent = t("videoDropSub");
  selectVideoBtn.textContent = t("selectVideoBtn");
  videoPredictBtn.textContent = t("videoPredictBtn");

  cameraTitle.textContent = t("cameraTitle");
  cameraDesc.textContent = t("cameraDesc");
  frontCameraBtn.textContent = t("frontCameraBtn");
  rearCameraBtn.textContent = t("rearCameraBtn");
  stopCameraBtn.textContent = t("stopCameraBtn");
  analyzeFrameBtn.textContent = t("analyzeFrameBtn");

  viewerTitle.textContent = t("viewerTitle");
  previewTitle.textContent = t("previewTitle");
  gradcamTitle.textContent = t("gradcamTitle");

  resultSectionTitle.textContent = t("resultSectionTitle");
  resultSectionDesc.textContent = t("resultSectionDesc");
  labelDiagnosis.textContent = t("labelDiagnosis");
  labelPrediction.textContent = t("labelPrediction");
  labelSeverity.textContent = t("labelSeverity");
  labelClassId.textContent = t("labelClassId");
  labelConfidence.textContent = t("labelConfidence");
  explainTitle.textContent = t("explainTitle");
  probTitle.textContent = t("probTitle");
  exportPdfBtn.textContent = t("exportPdfBtn");

  metricTitle.textContent = t("metricTitle");
  metricAccLabel.textContent = t("metricAccLabel");
  metricMacroLabel.textContent = t("metricMacroLabel");
  metricWeightedLabel.textContent = t("metricWeightedLabel");

  footerDisclaimer.textContent = t("footerDisclaimer");
  techTitle.textContent = t("techTitle");

  if (!videoInput.files.length) {
    videoFileName.textContent = t("chooseVideoNone");
  }
}

window.setLanguage = setLanguage;

async function checkBackend() {
  try {
    const res = await fetch(`${API_BASE_URL}/`);
    if (!res.ok) throw new Error("backend not ready");
    const data = await res.json();

    backendStatus.textContent = t("backendConnected");
    backendStatus.className = "safe-text";

    authorName.textContent = data.author_name || "GUO YUNYUN";
    authorId.textContent = data.author_id || "202317100";
  } catch (e) {
    backendStatus.textContent = t("backendDisconnected");
    backendStatus.className = "danger-text";

    authorName.textContent = "GUO YUNYUN";
    authorId.textContent = "202317100";
  }
}

function showLoading(text) {
  loading.textContent = text;
  loading.classList.remove("hidden");
  errorBox.classList.add("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.remove("hidden");
}

function clearError() {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

function renderProbabilities(items = []) {
  probabilityBars.innerHTML = "";

  items.forEach((item) => {
    const probability = item.probability ?? item.confidence ?? 0;

    const row = document.createElement("div");
    row.className = "prob-row";
    row.innerHTML = `
      <div class="prob-head">
        <span>${item.label}</span>
        <span>${(probability * 100).toFixed(2)}%</span>
      </div>
      <div class="prob-track">
        <div class="prob-fill" style="width: 0%"></div>
      </div>
    `;

    probabilityBars.appendChild(row);

    setTimeout(() => {
      const fill = row.querySelector(".prob-fill");
      if (fill) fill.style.width = `${(probability * 100).toFixed(2)}%`;
    }, 80);
  });
}

function setGradcamImage(value) {
  if (!value) {
    gradcamImage.src = "";
    gradcamImage.style.display = "none";
    gradcamPlaceholder.style.display = "block";
    return;
  }

  if (
    value.startsWith("data:image") ||
    value.endsWith(".png") ||
    value.endsWith(".jpg") ||
    value.endsWith(".jpeg") ||
    value.endsWith(".webp")
  ) {
    gradcamImage.src = value;
  } else {
    gradcamImage.src = `data:image/png;base64,${value}`;
  }

  gradcamImage.style.display = "block";
  gradcamPlaceholder.style.display = "none";
}

function renderImageResult(data) {
  diagnosisText.textContent = data.diagnosis || "-";
  predictionText.textContent = data.prediction || "-";
  severityText.textContent = data.severity || "-";
  classIdText.textContent = data.class_id ?? "-";
  confidenceText.textContent = `${((data.confidence || 0) * 100).toFixed(2)}%`;

  explanationText.textContent =
    data.explanation ||
    data.analysis_text ||
    t("noExplain");

  diagnosisText.className = data.is_fracture ? "value danger-text" : "value safe-text";

  renderProbabilities(data.top_predictions || data.top3 || []);
  setGradcamImage(data.gradcam || null);

  extraResultBox.innerHTML = "";

  if (data.metrics) {
    metricAcc.textContent = data.metrics.accuracy ?? "--";
    metricMacro.textContent = data.metrics.macro_f1 ?? "--";
    metricWeighted.textContent = data.metrics.weighted_f1 ?? "--";
  }

  latestResult = data;
}

function renderVideoResult(data) {
  diagnosisText.textContent = data.diagnosis || "-";
  predictionText.textContent = data.prediction || "-";
  severityText.textContent = data.severity || "-";
  classIdText.textContent = "-";
  confidenceText.textContent = `${((data.confidence || 0) * 100).toFixed(2)}%`;

  explanationText.textContent = t("videoExplain");
  diagnosisText.className = data.is_fracture ? "value danger-text" : "value safe-text";

  probabilityBars.innerHTML = "";
  setGradcamImage(null);

  extraResultBox.innerHTML = `
    <h4>${t("videoSummaryTitle")}</h4>
    <p>${t("sampledFrames")}：${data.frames_analyzed ?? "-"}</p>
    <p>${t("fractureVotes")}：${data.fracture_votes ?? "-"}</p>
    <p>${t("normalVotes")}：${data.normal_votes ?? "-"}</p>
  `;

  latestResult = data;
}

function bindDropZone(zone, input, fileType = "image") {
  ["dragenter", "dragover"].forEach((eventName) => {
    zone.addEventListener(eventName, (e) => {
      e.preventDefault();
      zone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    zone.addEventListener(eventName, (e) => {
      e.preventDefault();
      zone.classList.remove("dragover");
    });
  });

  zone.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (fileType === "image" && !file.type.startsWith("image/")) {
      showError(t("imageOnly"));
      return;
    }

    if (fileType === "video" && !file.type.startsWith("video/")) {
      showError(t("videoOnly"));
      return;
    }

    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;

    if (fileType === "image") {
      const reader = new FileReader();
      reader.onload = (ev) => {
        previewImage.src = ev.target.result;
        previewImage.style.display = "block";
        previewPlaceholder.style.display = "none";
      };
      reader.readAsDataURL(file);
    }

    if (fileType === "video") {
      videoFileName.textContent = file.name;
    }
  });
}

async function openCamera(facingMode) {
  clearError();

  try {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }

    currentStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode },
      audio: false
    });

    camera.srcObject = currentStream;
    camera.style.display = "block";
    cameraPlaceholder.style.display = "none";
  } catch (e) {
    showError(t("cameraOpenFailed"));
  }
}

function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    currentStream = null;
  }

  camera.srcObject = null;
  camera.style.display = "none";
  cameraPlaceholder.style.display = "block";
}

async function exportPDF() {
  if (!latestResult) {
    showError(t("pdfNeedResult"));
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/export_pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        patient_name: "GUO YUNYUN",
        student_id: "202317100",
        prediction: latestResult.prediction || "-",
        confidence: latestResult.confidence || 0,
        diagnosis: latestResult.diagnosis || "-",
        severity: latestResult.severity || "-",
        class_id: latestResult.class_id ?? "-",
        top_predictions: latestResult.top_predictions || latestResult.top3 || [],
        explanation: latestResult.explanation || explanationText.textContent || "",
        disclaimer: t("footerDisclaimer")
      })
    });

    if (!res.ok) {
      throw new Error("export failed");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "fracture_report.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (e) {
    showError(t("pdfFailed"));
  }
}

selectImageBtn.addEventListener("click", () => fileInput.click());
selectVideoBtn.addEventListener("click", () => videoInput.click());

bindDropZone(dropZone, fileInput, "image");
bindDropZone(videoDropZone, videoInput, "video");

fileInput.addEventListener("change", () => {
  clearError();

  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    previewImage.style.display = "block";
    previewPlaceholder.style.display = "none";
  };
  reader.readAsDataURL(file);
});

videoInput.addEventListener("change", () => {
  clearError();
  const file = videoInput.files[0];
  videoFileName.textContent = file ? file.name : t("chooseVideoNone");
});

predictBtn.addEventListener("click", async () => {
  clearError();

  const file = fileInput.files[0];
  if (!file) {
    showError(t("noImage"));
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  showLoading(t("loadingImage"));

  try {
    const res = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "predict failed");

    renderImageResult(data);
  } catch (e) {
    showError(`${t("backendRequestFailed")}：${e.message}`);
  } finally {
    hideLoading();
  }
});

videoPredictBtn.addEventListener("click", async () => {
  clearError();

  const file = videoInput.files[0];
  if (!file) {
    showError(t("noVideo"));
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  showLoading(t("loadingVideo"));

  try {
    const res = await fetch(`${API_BASE_URL}/predict_video`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "video predict failed");

    renderVideoResult(data);
  } catch (e) {
    showError(`${t("backendRequestFailed")}：${e.message}`);
  } finally {
    hideLoading();
  }
});

frontCameraBtn.addEventListener("click", () => openCamera("user"));
rearCameraBtn.addEventListener("click", () => openCamera("environment"));
stopCameraBtn.addEventListener("click", stopCamera);

analyzeFrameBtn.addEventListener("click", async () => {
  clearError();

  if (!currentStream) {
    showError(t("noCamera"));
    return;
  }

  const width = camera.videoWidth;
  const height = camera.videoHeight;

  if (!width || !height) {
    showError(t("cameraNotReady"));
    return;
  }

  cameraCanvas.width = width;
  cameraCanvas.height = height;

  const ctx = cameraCanvas.getContext("2d");
  ctx.drawImage(camera, 0, 0, width, height);

  const dataUrl = cameraCanvas.toDataURL("image/jpeg", 0.9);

  previewImage.src = dataUrl;
  previewImage.style.display = "block";
  previewPlaceholder.style.display = "none";

  showLoading(t("loadingFrame"));

  try {
    const res = await fetch(`${API_BASE_URL}/predict_frame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image: dataUrl })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "frame predict failed");

    renderImageResult(data);
  } catch (e) {
    showError(`${t("backendRequestFailed")}：${e.message}`);
  } finally {
    hideLoading();
  }
});

exportPdfBtn.addEventListener("click", exportPDF);

setLanguage("zh");
checkBackend();

explanationText.textContent = t("explainDefault");
videoFileName.textContent = t("chooseVideoNone");
metricAcc.textContent = "--";
metricMacro.textContent = "--";
metricWeighted.textContent = "--";