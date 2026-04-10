# plan: tutorial completo "juego snake" paso a paso

## objetivo
crar una pagina web interactiva con el clasico "juego de la serpiente " (snake) utilizadando HTML5 (canvas), css3 para el diseño y vanilla javascript para la logica del juego.

## Archivos clave 
* 'index.html' : Estructura de la pagina web (canvas y contenedor).
* 'style.css'  : diseño, colores y disposicion  de los elementos.
* 'script.js'  : toda la logica del juego ( movimiento, collisiones, puntunacion, controles).

## pasos de implemenetacion

### paso 1: estructura html ('index.html')
crearemos la estructura basica del documento html. incluiremos un elemento '<canvas> que sera el tablero de juego y un elemento para mostrar la puntuacion 

'''HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8>
    <meta name="viewport" content="width=device-width, initiañ-scale=1.0">
    <title>Juego snake</title>
    <link rel="stylesheet" href="style.css">
# Plan: Tutorial Completo "Juego Snake" Paso a Paso

## Objetivo
Crear una página web interactiva con el clásico "Juego de la Serpiente" (Snake) utilizando HTML5 (Canvas), CSS3 para el diseño y Vanilla JavaScript para la lógica del juego.

## Archivos Clave
*   `index.html`: Estructura de la página web (Canvas y contenedor).
*   `style.css`: Diseño, colores y disposición de los elementos.
*   `script.js`: Toda la lógica del juego (movimiento, colisiones, puntuación, controles).

## Pasos de Implementación

### Paso 1: Estructura HTML (`index.html`)
Crearemos la estructura básica del documento HTML. Incluiremos un elemento `<canvas>` que será el tablero de juego y un elemento para mostrar la puntuación.

```<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game 3D - Expert Edition</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Loading Screen -->
    <div id="loading-screen" class="loading-screen">
        <div class="loader"></div>
        <p>Cargando Snake 3D...</p>
    </div>

    <!-- Main Game Container -->
    <div id="game-container" class="game-wrapper">
        <!-- Header -->
        <header class="game-header">
            <h1 class="game-title">
                <span class="title-icon">🐍</span>
                SNAKE 3D
                <span class="title-icon">🎮</span>
            </h1>
        </header>

        <!-- Stats Panel -->
        <div class="stats-panel">
            <div class="stat-card">
                <div class="stat-icon">🏆</div>
                <div class="stat-info">
                    <span class="stat-label">Puntuación</span>
                    <span class="stat-value" id="score">0</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">⭐</div>
                <div class="stat-info">
                    <span class="stat-label">Récord</span>
                    <span class="stat-value" id="high-score">0</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📏</div>
                <div class="stat-info">
                    <span class="stat-label">Longitud</span>
                    <span class="stat-value" id="length">3</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">⚡</div>
                <div class="stat-info">
                    <span class="stat-label">Nivel</span>
                    <span class="stat-value" id="level">1</span>
                </div>
            </div>
        </div>

        <!-- 3D Canvas Container -->
        <div class="canvas-container">
            <canvas id="gameCanvas"></canvas>
            
            <!-- Controls Overlay -->
            <div id="controls-overlay" class="controls-overlay">
                <div class="controls-card">
                    <h3>🎮 Controles</h3>
                    <div class="control-item">
                        <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd>
                        <span>Mover</span>
                    </div>
                    <div class="control-item">
                        <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>
                        <span>Mover (Alt)</span>
                    </div>
                    <div class="control-item">
                        <kbd>Espacio</kbd>
                        <span>Pausa</span>
                    </div>
                    <div class="control-item">
                        <kbd>R</kbd>
                        <span>Reiniciar</span>
                    </div>
                </div>
            </div>

            <!-- Game Over Overlay -->
            <div id="game-over" class="game-over hidden">
                <div class="game-over-content">
                    <h2>💀 Game Over</h2>
                    <div class="final-score">
                        <p>Puntuación Final: <span id="final-score">0</span></p>
                        <p>Longitud: <span id="final-length">3</span></p>
                        <p>Nivel: <span id="final-level">1</span></p>
                    </div>
                    <button id="restart-btn" class="restart-btn">🔄 Jugar de Nuevo</button>
                </div>
            </div>

            <!-- Pause Overlay -->
            <div id="pause-overlay" class="pause-overlay hidden">
                <div class="pause-content">
                    <h2>⏸️ Pausa</h2>
                    <p>Presiona Espacio para continuar</p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="game-footer">
            <p>Usa las flechas o WASD para controlar la serpiente</p>
        </footer>
    </div>

    <!-- Three.js Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
```

### Paso 3: Lógica sytle.css (`syle.css`)
Aquí es donde ocurre la magia. Dividiremos el código JS en varias partes lógicas:

'''/* ============================================
   EXPERT 3D SNAKE GAME - MODERN CSS DESIGN
   ============================================ */

/* CSS Variables for easy theming */
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    --bg-dark: #0f172a;
    --bg-card: #1e293b;
    --bg-card-hover: #334155;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --border-color: #475569;
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
    --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.5);
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-accent: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --gradient-success: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: var(--gradient-primary);
    min-height: 100vh;
    overflow: hidden;
    color: var(--text-primary);
}

/* Loading Screen */
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-dark);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, visibility 0.5s ease;
}

.loading-screen.hidden {
    opacity: 0;
    visibility: hidden;
}

.loader {
    width: 60px;
    height: 60px;
    border: 4px solid var(--border-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-screen p {
    margin-top: 20px;
    font-size: 18px;
    color: var(--text-secondary);
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* Game Wrapper */
.game-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    animation: slideIn 0.8s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Game Header */
.game-header {
    text-align: center;
}

.game-title {
    font-size: 3.5rem;
    font-weight: 900;
    background: var(--gradient-accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    letter-spacing: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

.title-icon {
    font-size: 3rem;
    animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

/* Stats Panel */
.stats-panel {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

.stat-card {
    background: rgba(30, 41, 59, 0.8);
    backdrop-filter: blur(10px);
    border: 2px solid var(--border-color);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);
}

.stat-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
    box-shadow: var(--shadow-md), var(--shadow-glow);
}

.stat-icon {
    font-size: 2.5rem;
}

.stat-info {
    display: flex;
    flex-direction: column;
}

.stat-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.stat-value {
    font-size: 2rem;
    font-weight: 900;
    background: var(--gradient-success);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Canvas Container */
.canvas-container {
    position: relative;
    flex: 1;
    background: var(--bg-card);
    border-radius: 20px;
    overflow: hidden;
    border: 3px solid var(--border-color);
    box-shadow: var(--shadow-lg);
}

#gameCanvas {
    width: 100%;
    height: 100%;
    display: block;
}

/* Controls Overlay */
.controls-overlay {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
}

.controls-card {
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(10px);
    border: 2px solid var(--border-color);
    border-radius: 16px;
    padding: 20px;
    min-width: 250px;
    box-shadow: var(--shadow-md);
}

.controls-card h3 {
    margin-bottom: 15px;
    font-size: 1.3rem;
    color: var(--primary-color);
}

.control-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    font-size: 0.9rem;
    color: var(--text-secondary);
}

kbd {
    background: var(--bg-card-hover);
    border: 2px solid var(--border-color);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 0.85rem;
    font-weight: bold;
    color: var(--text-primary);
    box-shadow: 0 2px 0 var(--border-color);
}

/* Game Over Overlay */
.game-over {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    animation: fadeIn 0.5s ease;
}

.game-over.hidden {
    display: none;
}

.game-over-content {
    background: var(--bg-card);
    border: 3px solid var(--danger-color);
    border-radius: 24px;
    padding: 40px;
    text-align: center;
    box-shadow: var(--shadow-lg), 0 0 40px rgba(239, 68, 68, 0.3);
    animation: scaleIn 0.5s ease;
}

@keyframes scaleIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.game-over-content h2 {
    font-size: 3rem;
    color: var(--danger-color);
    margin-bottom: 20px;
    text-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
}

.final-score {
    margin-bottom: 30px;
}

.final-score p {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: var(--text-secondary);
}

.final-score span {
    font-weight: 900;
    color: var(--warning-color);
    font-size: 1.5rem;
}

.restart-btn {
    background: var(--gradient-success);
    border: none;
    border-radius: 12px;
    padding: 15px 40px;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-md);
}

.restart-btn:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg), var(--shadow-glow);
}

/* Pause Overlay */
.pause-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}

.pause-overlay.hidden {
    display: none;
}

.pause-content {
    text-align: center;
    animation: fadeIn 0.3s ease;
}

.pause-content h2 {
    font-size: 4rem;
    color: var(--warning-color);
    margin-bottom: 15px;
}

.pause-content p {
    font-size: 1.2rem;
    color: var(--text-secondary);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Footer */
.game-footer {
    text-align: center;
    padding: 15px;
    background: rgba(30, 41, 59, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    border: 2px solid var(--border-color);
}

.game-footer p {
    color: var(--text-secondary);
    font-size: 0.95rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .stats-panel {
        grid-template-columns: repeat(2, 1fr);
    }

    .game-title {
        font-size: 2.5rem;
    }
}

@media (max-width: 768px) {
    .game-wrapper {
        padding: 15px;
        gap: 15px;
    }

    .game-title {
        font-size: 2rem;
    }

    .title-icon {
        font-size: 2rem;
    }

    .stats-panel {
        grid-template-columns: 1fr;
        gap: 10px;
    }

    .stat-card {
        padding: 15px;
    }

    .controls-overlay {
        display: none;
    }

    .game-over-content h2 {
        font-size: 2rem;
    }

    .pause-content h2 {
        font-size: 2.5rem;
    }
}

@media (max-width: 480px) {
    .stat-value {
        font-size: 1.5rem;
    }

    .stat-icon {
        font-size: 2rem;
    }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: var(--bg-dark);
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-color);
}

## paso a paso javascript que modelo es dinseño modernada 

```javascript
/* ============================================
   EXPERT 3D SNAKE GAME - THREE.JS IMPLEMENTATION
   ============================================ */

// ==========================================
// GAME CONFIGURATION
// ==========================================
const CONFIG = {
    GRID_SIZE: 20,
    CELL_SIZE: 1,
    INITIAL_SPEED: 150,
    SPEED_INCREMENT: 5,
    MIN_SPEED: 50,
    INITIAL_LENGTH: 3,
    COLORS: {
        BACKGROUND: 0x1a1a2e,
        GRID: 0x16213e,
        GRID_LINES: 0x0f3460,
        SNAKE_HEAD: 0x00ff88,
        SNAKE_BODY: 0x00cc6a,
        SNAKE_TAIL: 0x009950,
        FOOD: 0xff3366,
        FOOD_GLOW: 0xff6699,
        WALL: 0x533483,
        PARTICLE: 0xffd700
    }
};

// ==========================================
// GAME STATE MANAGEMENT
// ==========================================
class GameState {
    constructor() {
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('snake3d_highscore')) || 0;
        this.level = 1;
        this.length = CONFIG.INITIAL_LENGTH;
        this.speed = CONFIG.INITIAL_SPEED;
        this.isPaused = false;
        this.isGameOver = false;
        this.isRunning = false;
    }

    reset() {
        this.score = 0;
        this.level = 1;
        this.length = CONFIG.INITIAL_LENGTH;
        this.speed = CONFIG.INITIAL_SPEED;
        this.isPaused = false;
        this.isGameOver = false;
        this.isRunning = true;
    }

    addScore(points) {
        this.score += points;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snake3d_highscore', this.highScore);
        }
        this.updateUI();
    }

    levelUp() {
        this.level++;
        this.speed = Math.max(CONFIG.MIN_SPEED, this.speed - CONFIG.SPEED_INCREMENT);
        this.updateUI();
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('high-score').textContent = this.highScore;
        document.getElementById('length').textContent = this.length;
        document.getElementById('level').textContent = this.level;
    }
}

// ==========================================
// 3D SCENE MANAGER
// ==========================================
class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = null;
        this.renderer = null;
        this.lights = [];
        this.init();
    }

    init() {
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(CONFIG.COLORS.BACKGROUND, 1);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            60,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 25, 20);
        this.camera.lookAt(0, 0, 0);

        // Lighting
        this.setupLighting();

        // Background
        this.scene.fog = new THREE.Fog(CONFIG.COLORS.BACKGROUND, 30, 60);
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);

        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(10, 20, 10);
        mainLight.castShadow = true;
        mainLight.shadow.camera.left = -20;
        mainLight.shadow.camera.right = 20;
        mainLight.shadow.camera.top = 20;
        mainLight.shadow.camera.bottom = -20;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);

        // Point lights for atmosphere
        const pointLight1 = new THREE.PointLight(0x6366f1, 1, 30);
        pointLight1.position.set(-10, 5, -10);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xec4899, 1, 30);
        pointLight2.position.set(10, 5, 10);
        this.scene.add(pointLight2);

        this.lights = [ambientLight, mainLight, pointLight1, pointLight2];
    }

    resize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

// ==========================================
// 3D GAME BOARD
// ==========================================
class GameBoard {
    constructor(scene) {
        this.scene = scene;
        this.gridSize = CONFIG.GRID_SIZE;
        this.cellSize = CONFIG.CELL_SIZE;
        this.board = new THREE.Group();
        this.init();
    }

    init() {
        // Create ground plane
        const groundGeometry = new THREE.BoxGeometry(
            this.gridSize * this.cellSize,
            0.2,
            this.gridSize * this.cellSize
        );
        const groundMaterial = new THREE.MeshPhongMaterial({
            color: CONFIG.COLORS.GRID,
            shininess: 100
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.position.y = -0.1;
        ground.receiveShadow = true;
        this.board.add(ground);

        // Create grid lines
        const lineMaterial = new THREE.LineBasicMaterial({
            color: CONFIG.COLORS.GRID_LINES,
            transparent: true,
            opacity: 0.3
        });

        const halfSize = (this.gridSize * this.cellSize) / 2;

        for (let i = 0; i <= this.gridSize; i++) {
            const position = i * this.cellSize - halfSize;

            // Lines along X
            const geometryX = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(-halfSize, 0, position),
                new THREE.Vector3(halfSize, 0, position)
            ]);
            const lineX = new THREE.Line(geometryX, lineMaterial);
            this.board.add(lineX);

            // Lines along Z
            const geometryZ = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(position, 0, -halfSize),
                new THREE.Vector3(position, 0, halfSize)
            ]);
            const lineZ = new THREE.Line(geometryZ, lineMaterial);
            this.board.add(lineZ);
        }

        // Create border walls
        this.createWalls(halfSize);

        this.scene.add(this.board);
    }

    createWalls(halfSize) {
        const wallHeight = 0.5;
        const wallThickness = 0.2;
        const wallMaterial = new THREE.MeshPhongMaterial({
            color: CONFIG.COLORS.WALL,
            emissive: CONFIG.COLORS.WALL,
            emissiveIntensity: 0.2
        });

        const wallPositions = [
            { x: 0, z: -halfSize - wallThickness / 2, w: this.gridSize + wallThickness * 2, d: wallThickness },
            { x: 0, z: halfSize + wallThickness / 2, w: this.gridSize + wallThickness * 2, d: wallThickness },
            { x: -halfSize - wallThickness / 2, z: 0, w: wallThickness, d: this.gridSize + wallThickness * 2 },
            { x: halfSize + wallThickness / 2, z: 0, w: wallThickness, d: this.gridSize + wallThickness * 2 }
        ];

        wallPositions.forEach(pos => {
            const wallGeometry = new THREE.BoxGeometry(pos.w, wallHeight, pos.d);
            const wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(pos.x, wallHeight / 2, pos.z);
            wall.castShadow = true;
            wall.receiveShadow = true;
            this.board.add(wall);
        });
    }
}

// ==========================================
// 3D SNAKE RENDERER
// ==========================================
class SnakeRenderer {
    constructor(scene) {
        this.scene = scene;
        this.segments = [];
        this.headMesh = null;
    }

    createSegment(position, isHead = false) {
        const size = isHead ? 0.9 : 0.85;
        const geometry = new THREE.BoxGeometry(size, size, size);
        
        // Rounded edges using bevel
        const material = new THREE.MeshPhongMaterial({
            color: isHead ? CONFIG.COLORS.SNAKE_HEAD : CONFIG.COLORS.SNAKE_BODY,
            emissive: isHead ? CONFIG.COLORS.SNAKE_HEAD : CONFIG.COLORS.SNAKE_BODY,
            emissiveIntensity: isHead ? 0.3 : 0.15,
            shininess: 100,
            specular: 0x444444
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(position.x, size / 2, position.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Add eyes to head
        if (isHead) {
            this.addEyes(mesh);
        }

        this.scene.add(mesh);
        this.segments.push(mesh);
        return mesh;
    }

    addEyes(headMesh) {
        const eyeGeometry = new THREE.SphereGeometry(0.12, 16, 16);
        const eyeMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.5
        });

        const pupilGeometry = new THREE.SphereGeometry(0.06, 16, 16);
        const pupilMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000
        });

        // Left eye
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.2, 0.2, -0.4);
        headMesh.add(leftEye);

        const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        leftPupil.position.set(0, 0, -0.08);
        leftEye.add(leftPupil);

        // Right eye
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.2, 0.2, -0.4);
        headMesh.add(rightEye);

        const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        rightPupil.position.set(0, 0, -0.08);
        rightEye.add(rightPupil);
    }

    removeSegment() {
        if (this.segments.length > 0) {
            const segment = this.segments.pop();
            this.scene.remove(segment);
            segment.geometry.dispose();
            segment.material.dispose();
        }
    }

    clear() {
        this.segments.forEach(segment => {
            this.scene.remove(segment);
            segment.geometry.dispose();
            segment.material.dispose();
        });
        this.segments = [];
    }

    updatePositions(positions) {
        // Update existing segments
        positions.forEach((pos, index) => {
            if (index < this.segments.length) {
                const segment = this.segments[index];
                segment.position.x = pos.x;
                segment.position.z = pos.z;
                
                // Rotate based on direction
                if (index === 0 && positions.length > 1) {
                    const next = positions[1];
                    const dx = pos.x - next.x;
                    const dz = pos.z - next.z;
                    segment.rotation.y = Math.atan2(dx, dz);
                }
            }
        });
    }
}

// ==========================================
// 3D FOOD RENDERER
// ==========================================
class FoodRenderer {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        this.glowMesh = null;
        this.time = 0;
    }

    create(position) {
        this.remove();

        // Main food sphere
        const geometry = new THREE.SphereGeometry(0.4, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: CONFIG.COLORS.FOOD,
            emissive: CONFIG.COLORS.FOOD,
            emissiveIntensity: 0.4,
            shininess: 150,
            specular: 0xffffff
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(position.x, 0.5, position.z);
        this.mesh.castShadow = true;

        // Glow effect
        const glowGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const glowMaterial = new THREE.MeshPhongMaterial({
            color: CONFIG.COLORS.FOOD_GLOW,
            emissive: CONFIG.COLORS.FOOD_GLOW,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.5
        });

        this.glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        this.glowMesh.position.copy(this.mesh.position);
        this.glowMesh.position.y = 0.5;

        this.scene.add(this.mesh);
        this.scene.add(this.glowMesh);
    }

    update(deltaTime) {
        this.time += deltaTime;
        
        if (this.mesh) {
            // Rotation animation
            this.mesh.rotation.y += 0.02;
            this.mesh.rotation.x = Math.sin(this.time * 2) * 0.2;

            // Floating animation
            this.mesh.position.y = 0.5 + Math.sin(this.time * 3) * 0.1;
            
            if (this.glowMesh) {
                this.glowMesh.position.y = this.mesh.position.y;
                this.glowMesh.scale.setScalar(1 + Math.sin(this.time * 4) * 0.1);
            }
        }
    }

    remove() {
        if (this.mesh) {
            this.scene.remove(this.mesh);
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
            this.mesh = null;
        }
        if (this.glowMesh) {
            this.scene.remove(this.glowMesh);
            this.glowMesh.geometry.dispose();
            this.glowMesh.material.dispose();
            this.glowMesh = null;
        }
    }
}

// ==========================================
// PARTICLE SYSTEM
// ==========================================
class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
    }

    emit(position, count = 10) {
        for (let i = 0; i < count; i++) {
            const geometry = new THREE.SphereGeometry(0.08, 8, 8);
            const material = new THREE.MeshPhongMaterial({
                color: CONFIG.COLORS.PARTICLE,
                emissive: CONFIG.COLORS.PARTICLE,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 1
            });

            const particle = new THREE.Mesh(geometry, material);
            particle.position.copy(position);
            particle.position.y = 0.5;
            
            // Random velocity
            particle.userData.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.3,
                Math.random() * 0.2 + 0.1,
                (Math.random() - 0.5) * 0.3
            );
            particle.userData.lifetime = 1.0;

            this.scene.add(particle);
            this.particles.push(particle);
        }
    }

    update(deltaTime) {
        this.particles = this.particles.filter(particle => {
            particle.userData.lifetime -= deltaTime * 2;
            
            if (particle.userData.lifetime <= 0) {
                this.scene.remove(particle);
                particle.geometry.dispose();
                particle.material.dispose();
                return false;
            }

            // Update position
            particle.position.add(particle.userData.velocity);
            particle.userData.velocity.y -= 0.01; // Gravity
            
            // Fade out
            particle.material.opacity = particle.userData.lifetime;
            particle.scale.setScalar(particle.userData.lifetime);

            return true;
        });
    }

    clear() {
        this.particles.forEach(particle => {
            this.scene.remove(particle);
            particle.geometry.dispose();
            particle.material.dispose();
        });
        this.particles = [];
    }
}

// ==========================================
// INPUT HANDLER
// ==========================================
class InputHandler {
    constructor() {
        this.direction = { x: 1, z: 0 };
        this.nextDirection = { x: 1, z: 0 };
        this.setupKeyboard();
    }

    setupKeyboard() {
        document.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase();

            // WASD or Arrow keys
            const directions = {
                'arrowup': { x: 0, z: -1 },
                'arrowdown': { x: 0, z: 1 },
                'arrowleft': { x: -1, z: 0 },
                'arrowright': { x: 1, z: 0 },
                'w': { x: 0, z: -1 },
                's': { x: 0, z: 1 },
                'a': { x: -1, z: 0 },
                'd': { x: 1, z: 0 }
            };

            if (directions[key]) {
                const newDir = directions[key];
                // Prevent 180-degree turns
                if (this.direction.x + newDir.x !== 0 || this.direction.z + newDir.z !== 0) {
                    this.nextDirection = newDir;
                }
            }

            // Space for pause
            if (key === ' ') {
                event.preventDefault();
                window.dispatchEvent(new CustomEvent('toggle-pause'));
            }

            // R for restart
            if (key === 'r') {
                window.dispatchEvent(new CustomEvent('restart'));
            }
        });
    }

    applyDirection() {
        this.direction = { ...this.nextDirection };
    }

    reset() {
        this.direction = { x: 1, z: 0 };
        this.nextDirection = { x: 1, z: 0 };
    }
}

// ==========================================
// MAIN GAME ENGINE
// ==========================================
class SnakeGame3D {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.gameState = new GameState();
        this.inputHandler = new InputHandler();
        
        this.sceneManager = null;
        this.gameBoard = null;
        this.snakeRenderer = null;
        this.foodRenderer = null;
        this.particleSystem = null;
        
        this.snake = [];
        this.food = null;
        this.lastMoveTime = 0;
        this.animationId = null;
        this.clock = new THREE.Clock();

        this.init();
    }

    async init() {
        // Initialize Three.js components
        this.sceneManager = new SceneManager(this.canvas);
        this.gameBoard = new GameBoard(this.sceneManager.scene);
        this.snakeRenderer = new SnakeRenderer(this.sceneManager.scene);
        this.foodRenderer = new FoodRenderer(this.sceneManager.scene);
        this.particleSystem = new ParticleSystem(this.sceneManager.scene);

        // Setup event listeners
        this.setupEventListeners();

        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
            this.start();
        }, 1000);

        // Handle resize
        window.addEventListener('resize', () => this.sceneManager.resize());
        
        // Start render loop
        this.animate();
    }

    setupEventListeners() {
        window.addEventListener('toggle-pause', () => this.togglePause());
        window.addEventListener('restart', () => this.restart());
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());
    }

    start() {
        this.gameState.reset();
        this.inputHandler.reset();
        this.createInitialSnake();
        this.spawnFood();
        this.gameState.updateUI();
    }

    createInitialSnake() {
        this.snakeRenderer.clear();
        this.snake = [];

        for (let i = 0; i < CONFIG.INITIAL_LENGTH; i++) {
            const position = {
                x: -i * CONFIG.CELL_SIZE,
                z: 0
            };
            this.snake.push(position);
            this.snakeRenderer.createSegment(position, i === 0);
        }
    }

    spawnFood() {
        const halfGrid = Math.floor(CONFIG.GRID_SIZE / 2);
        let position;

        do {
            position = {
                x: (Math.floor(Math.random() * CONFIG.GRID_SIZE) - halfGrid) * CONFIG.CELL_SIZE,
                z: (Math.floor(Math.random() * CONFIG.GRID_SIZE) - halfGrid) * CONFIG.CELL_SIZE
            };
        } while (this.isSnakeAt(position));

        this.food = position;
        this.foodRenderer.create(position);
    }

    isSnakeAt(position) {
        return this.snake.some(segment => 
            Math.abs(segment.x - position.x) < 0.1 && 
            Math.abs(segment.z - position.z) < 0.1
        );
    }

    togglePause() {
        if (this.gameState.isGameOver) return;
        this.gameState.isPaused = !this.gameState.isPaused;
        
        const pauseOverlay = document.getElementById('pause-overlay');
        if (this.gameState.isPaused) {
            pauseOverlay.classList.remove('hidden');
        } else {
            pauseOverlay.classList.add('hidden');
        }
    }

    restart() {
        document.getElementById('game-over').classList.add('hidden');
        document.getElementById('pause-overlay').classList.add('hidden');
        this.particleSystem.clear();
        this.start();
    }

    gameOver() {
        this.gameState.isGameOver = true;
        
        // Update high score
        if (this.gameState.score > this.gameState.highScore) {
            this.gameState.highScore = this.gameState.score;
            localStorage.setItem('snake3d_highscore', this.gameState.highScore);
        }

        // Show game over screen
        document.getElementById('final-score').textContent = this.gameState.score;
        document.getElementById('final-length').textContent = this.gameState.length;
        document.getElementById('final-level').textContent = this.gameState.level;
        document.getElementById('game-over').classList.remove('hidden');
    }

    update(currentTime) {
        if (this.gameState.isPaused || this.gameState.isGameOver) return;

        // Move snake based on speed
        if (currentTime - this.lastMoveTime > this.gameState.speed) {
            this.moveSnake();
            this.lastMoveTime = currentTime;
        }

        // Update animations
        const deltaTime = this.clock.getDelta();
        this.foodRenderer.update(deltaTime);
        this.particleSystem.update(deltaTime);
    }

    moveSnake() {
        this.inputHandler.applyDirection();

        // Calculate new head position
        const head = this.snake[0];
        const newHead = {
            x: head.x + this.inputHandler.direction.x * CONFIG.CELL_SIZE,
            z: head.z + this.inputHandler.direction.z * CONFIG.CELL_SIZE
        };

        // Check collisions
        if (this.checkCollision(newHead)) {
            this.gameOver();
            return;
        }

        // Add new head
        this.snake.unshift(newHead);

        // Check if food is eaten
        if (this.food && 
            Math.abs(newHead.x - this.food.x) < 0.1 && 
            Math.abs(newHead.z - this.food.z) < 0.1) {
            
            // Add score
            this.gameState.addScore(10 * this.gameState.level);
            this.gameState.length++;

            // Create particles
            this.particleSystem.emit(new THREE.Vector3(this.food.x, 0.5, this.food.z), 15);

            // Spawn new food
            this.spawnFood();

            // Level up every 50 points
            if (this.gameState.score % 50 === 0) {
                this.gameState.levelUp();
            }
        } else {
            // Remove tail
            this.snake.pop();
        }

        // Update renderer
        this.snakeRenderer.clear();
        this.snake.forEach((segment, index) => {
            this.snakeRenderer.createSegment(segment, index === 0);
        });
    }

    checkCollision(position) {
        const halfGrid = (CONFIG.GRID_SIZE * CONFIG.CELL_SIZE) / 2;

        // Wall collision
        if (Math.abs(position.x) >= halfGrid || Math.abs(position.z) >= halfGrid) {
            return true;
        }

        // Self collision (skip head)
        for (let i = 1; i < this.snake.length; i++) {
            if (Math.abs(this.snake[i].x - position.x) < 0.1 &&
                Math.abs(this.snake[i].z - position.z) < 0.1) {
                return true;
            }
        }

        return false;
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const currentTime = performance.now();
        this.update(currentTime);
        this.sceneManager.render();
    }
}

// ==========================================
// INITIALIZE GAME
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    new SnakeGame3D();
});
```

## Verificación
1.  Crear los tres archivos (`index.html`, `style.css`, `script.js`) en la misma carpeta.
2.  Pegar el código correspondiente en cada archivo.
3.  Abrir el archivo `index.html` en cualquier navegador web moderno (Chrome, Firefox, Edge, Safari).
4.  El juego debería comenzar automáticamente. Usa las flechas del teclado para mover la serpiente, comer los bloques rojos y ver cómo aumenta tu puntuación./* 