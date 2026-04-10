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
