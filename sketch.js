let numSegments = 10;
let seaweedCount = 35;
let seaweeds = [];

function setup() {//初始設定，只會執行一次
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件
  canvas.position(0, 0); // 確保畫布在 iframe 之上
  
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.attribute('width', windowWidth);
  iframe.attribute('height', windowHeight);
  iframe.position(0, 0);
  iframe.style('z-index', '-1'); // 將 iframe 放在畫布後面
  
  for (let j = 0; j < seaweedCount; j++) {
    let x = (windowWidth / seaweedCount) * j + (windowWidth / seaweedCount) / 2;
    let segmentLength = random(20, 60);//海草的長度
    let strokeW = random(30, 60);//海草的寬度
    let col = color(random(255), random(255), random(255), random(150, 255)); // 增加透明度
    seaweeds.push({ x, segmentLength, strokeW, col });
  }
}

function draw() {//畫圖，每秒執行60次
  clear(); // 清除畫布，保持透明背景
  blendMode(BLEND);
  
  for (let j = 0; j < seaweedCount; j++) {
    let seaweed = seaweeds[j];
    let x = seaweed.x;
    let y = windowHeight + 80; // 調整海草的起始位置
    let segmentLength = seaweed.segmentLength;
    let strokeW = seaweed.strokeW;
    let col = seaweed.col;
    
    stroke(col);
    strokeWeight(strokeW);
    noFill();
    
    beginShape();
    for (let i = 0; i < numSegments; i++) {
      let offset = sin(frameCount * 0.05 + i * 0.5 + j) * 20;
      let nextX = x + offset;
      let nextY = y - segmentLength;
      
      // 調整顏色透明度
      let alpha = map(i, 0, numSegments, 255, 100); // 調整透明度範圍
      stroke(red(col), green(col), blue(col), alpha);
      
      vertex(nextX, nextY);
      x = nextX;
      y = nextY;
    }
    endShape();
  }
}
