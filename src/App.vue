<template>
  <div class="container">
    <div class="header">
      <div class="header-title">扑克牌游戏</div>
    </div>
    
    <!-- Notification Modal -->
    <div v-if="showNotification" class="notification-overlay" @click="closeNotification">
      <div class="notification-modal" @click.stop>
        <div class="notification-title">{{ notificationTitle }}</div>
        <div class="notification-content">
          <div class="notification-score">总分: {{ totalScore }}点</div>
          <div class="notification-reward" v-if="notificationReward > 0">
            奖励: {{ notificationReward }}元
          </div>
          <div class="notification-reward zero" v-else>
            无奖励
          </div>
          <div class="player-name-input">
            <label>玩家名称 (Player Name):</label>
            <input 
              v-model="playerName" 
              type="text" 
              placeholder="输入名称 (Enter name)"
              maxlength="20"
              class="name-input"
              @keyup.enter="saveScoreAndClose"
            />
          </div>
        </div>
        <div class="notification-buttons">
          <button class="notification-btn" @click="saveScoreAndClose">保存并关闭 (Save & Close)</button>
          <button class="notification-btn secondary" @click="closeNotification">仅关闭 (Close)</button>
        </div>
      </div>
    </div>
    
    <div class="game-board">
      <Leaderboard ref="leaderboardRef" />
      
      <div class="payout-board">
        <h3>点数对应奖励 (Points → Rewards)</h3>
        <div class="payout-grid">
          <div 
            v-for="points in payoutPoints" 
            :key="points"
            :class="['payout-item', { highlight: totalScore === points }]"
          >
            <div class="payout-points">{{ points }}点</div>
            <div class="payout-amount">{{ payouts[points] || 0 }}元</div>
          </div>
        </div>
      </div>

      <div class="game-area">
        <div class="score-display">
          <div class="score-label">当前总分 (Current Total)</div>
          <div class="score-value">{{ totalScore }}</div>
        </div>

        <div class="cards-container">
          <div
            v-for="(card, index) in cards"
            :key="index"
            :class="['card', { back: !card.revealed, revealed: card.revealed, 'pulse-hint': showTapPrompt && !card.revealed }]"
            @click="revealCard(index)"
          >
            <div v-if="card.revealed" class="card-label">{{ getCardLabel(card.value) }}</div>
            <div v-if="card.revealed" class="card-value">
              {{ card.value === 1 ? 'A' : card.value > 10 ? ['J', 'Q', 'K'][card.value - 11] : card.value }}
            </div>
          </div>
        </div>

        <div class="controls">
          <button class="btn" @click="newGame">新游戏 (New Game)</button>
          <button class="btn secondary" @click="resetGame">重置 (Reset)</button>
        </div>
      </div>

      <div class="rules">
        <h4>游戏规则 (Rules)</h4>
        <p>从一副牌里随机抽出5张牌，点数相加对应的分数，奖励！</p>
        <p>Randomly draw 5 cards from a deck, add up the points for the corresponding score, reward!</p>
        <p><strong>J = 11点, Q = 12点, K = 13点</strong></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Leaderboard from './components/Leaderboard.vue'
import { saveScore } from './firebase/leaderboard'

// Payout table based on the spreadsheet (for every 20 yuan bet)
const payouts = {
  6: 300, 7: 80, 8: 70, 9: 60, 10: 50, 11: 40,
  12: 30, 13: 30, 14: 30, 15: 30, 16: 30, 17: 30,
  18: 5, 19: 5, 20: 10, 21: 5, 22: 5, 23: 5, 24: 5, 25: 5, 26: 5, 27: 5, 28: 5,
  29: 10, 30: 5, 31: 5, 32: 5, 33: 5, 34: 5, 35: 5,
  36: 30, 37: 5, 38: 10, 39: 5, 40: 5, 41: 5, 42: 5, 43: 5, 44: 5, 45: 5,
  46: 10, 47: 5, 48: 5, 49: 5, 50: 5, 51: 5, 52: 5,
  53: 30, 54: 30, 55: 30, 56: 30, 57: 30, 58: 30,
  59: 40, 60: 50, 61: 60, 62: 70, 63: 80, 64: 400
}

// Generate array of payout points (6-64)
const payoutPoints = Array.from({ length: 59 }, (_, i) => i + 6)

// Reactive state
const cards = ref([])
const totalScore = ref(0)
const showNotification = ref(false)
const notificationTitle = ref('')
const notificationReward = ref(0)
const playerName = ref('')
const leaderboardRef = ref(null)
const showTapPrompt = ref(false)

// Generate 5 random cards
function generateCards() {
  cards.value = []
  totalScore.value = 0
  showTapPrompt.value = true
  
  // Generate 5 random card values (1-13, where 1=A, 11=J, 12=Q, 13=K)
  for (let i = 0; i < 5; i++) {
    cards.value.push({
      value: Math.floor(Math.random() * 13) + 1,
      revealed: false
    })
  }
}

// Reveal a card when tapped
function revealCard(index) {
  if (cards.value[index].revealed) {
    return // Card already revealed
  }

  // Hide prompt when first card is tapped
  if (showTapPrompt.value) {
    showTapPrompt.value = false
  }

  cards.value[index].revealed = true
  totalScore.value += cards.value[index].value

  // Check if all cards are revealed
  if (cards.value.every(card => card.revealed)) {
    setTimeout(() => {
      const reward = payouts[totalScore.value] || 0
      
      // Show notification
      showNotification.value = true
      notificationTitle.value = reward > 0 ? '恭喜！ (Congratulations!)' : '游戏结束 (Game Over)'
      notificationReward.value = reward
    }, 500)
  }
}

// Get card label (A, J, Q, K)
function getCardLabel(value) {
  if (value === 1) return 'A'
  if (value === 11) return 'J'
  if (value === 12) return 'Q'
  if (value === 13) return 'K'
  return value.toString()
}

// New game
function newGame() {
  generateCards()
}

// Reset game
function resetGame() {
  cards.value = []
  totalScore.value = 0
  showTapPrompt.value = false
}

// Close notification
function closeNotification() {
  showNotification.value = false
  playerName.value = ''
}

// Save score to leaderboard and close notification
async function saveScoreAndClose() {
  if (totalScore.value > 0) {
    const name = playerName.value.trim() || 'Anonymous'
    await saveScore(name, totalScore.value, notificationReward.value)
    // Refresh leaderboard
    if (leaderboardRef.value) {
      leaderboardRef.value.loadScores()
    }
  }
  closeNotification()
}

// Initialize on mount
onMounted(() => {
  generateCards()
})
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 500px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    overflow: hidden;
}

.header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.header-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}

.game-board {
    padding: 15px;
    background: #f0f4ff;
}

.payout-board {
    background: white;
    border: 3px solid #2a5298;
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 20px;
}

.payout-board h3 {
    color: #2a5298;
    text-align: center;
    margin-bottom: 10px;
    font-size: 16px;
}

.payout-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 4px;
}

.payout-item {
    background: #e8f0fe;
    border: 1.5px solid #2a5298;
    border-radius: 4px;
    padding: 4px 2px;
    text-align: center;
    font-size: 10px;
    min-height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.payout-item.highlight {
    background: #ffeb3b;
    border-color: #f57f17;
    border-width: 2px;
    font-weight: bold;
}

.payout-points {
    color: #1e3c72;
    font-weight: bold;
    font-size: 11px;
    line-height: 1.2;
}

.payout-amount {
    color: #d32f2f;
    font-size: 10px;
    margin-top: 2px;
    line-height: 1.2;
}

.game-area {
    background: white;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}

.score-display {
    background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 20px;
}

.score-label {
    font-size: 16px;
    opacity: 0.9;
    margin-bottom: 5px;
}

.score-value {
    font-size: 48px;
    font-weight: bold;
}

.cards-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    min-height: 120px;
    align-items: center;
}

.card {
    width: 70px;
    height: 100px;
    background: #1e3c72;
    border: 3px solid #2a5298;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.card.back {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    background-image: 
        repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);
}

.card.pulse-hint {
    animation: cardPulse 1.5s ease-in-out infinite;
    cursor: pointer;
}

.card.back:hover,
.card.back:active {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(42, 82, 152, 0.4);
}

@keyframes cardPulse {
    0%, 100% {
        box-shadow: 0 4px 8px rgba(0,0,0,0.2), 0 0 0 0 rgba(255, 235, 59, 0.7);
    }
    50% {
        box-shadow: 0 4px 8px rgba(0,0,0,0.2), 0 0 0 8px rgba(255, 235, 59, 0);
    }
}

.card.revealed {
    background: white;
    color: #1e3c72;
    transform: scale(1.1);
    z-index: 10;
}

.card:active {
    transform: scale(0.95);
}

.card-value {
    font-size: 28px;
}

.card-label {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 12px;
    font-weight: normal;
    color: #d32f2f;
}

.controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    min-width: 120px;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
}

.btn:active {
    transform: translateY(0);
}

.btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
}

.btn.secondary {
    background: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);
}

.rules {
    background: #e8f0fe;
    border-left: 4px solid #2a5298;
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    font-size: 14px;
    color: #1e3c72;
}

.rules h4 {
    margin-bottom: 10px;
    color: #2a5298;
}

.rules p {
    line-height: 1.6;
    margin-bottom: 5px;
}

.notification-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.notification-modal {
    background: white;
    border-radius: 15px;
    padding: 30px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    text-align: center;
}

.notification-title {
    font-size: 24px;
    font-weight: bold;
    color: #2a5298;
    margin-bottom: 20px;
}

.notification-content {
    margin-bottom: 25px;
}

.notification-score {
    font-size: 20px;
    color: #1e3c72;
    margin-bottom: 15px;
    font-weight: bold;
}

.notification-reward {
    font-size: 28px;
    color: #d32f2f;
    font-weight: bold;
    margin-bottom: 15px;
}

.notification-reward.zero {
    color: #757575;
    font-size: 20px;
}

.player-name-input {
    margin-top: 20px;
    padding-top: 15px;
    border-top: 2px solid #e0e0e0;
}

.player-name-input label {
    display: block;
    font-size: 14px;
    color: #1e3c72;
    margin-bottom: 8px;
    font-weight: bold;
}

.name-input {
    width: 100%;
    padding: 10px;
    border: 2px solid #2a5298;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box;
}

.name-input:focus {
    outline: none;
    border-color: #1e3c72;
    box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
}

.notification-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.notification-btn {
    background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
    color: white;
    border: none;
    padding: 12px 40px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    width: 100%;
}

.notification-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
}

.notification-btn:active {
    transform: translateY(0);
}

.notification-btn.secondary {
    background: linear-gradient(135deg, #757575 0%, #616161 100%);
}

@media (max-width: 480px) {
    .header {
        padding: 12px 15px;
    }

    .header-title {
        font-size: 20px;
    }

    .card {
        width: 60px;
        height: 85px;
        font-size: 20px;
    }

    .card-value {
        font-size: 24px;
    }

    .score-value {
        font-size: 40px;
    }

    .payout-board {
        padding: 8px;
    }

    .payout-board h3 {
        font-size: 14px;
        margin-bottom: 8px;
    }

    .payout-grid {
        grid-template-columns: repeat(8, 1fr);
        gap: 3px;
    }

    .payout-item {
        padding: 3px 1px;
        min-height: 35px;
        font-size: 9px;
    }

    .payout-points {
        font-size: 10px;
    }

    .payout-amount {
        font-size: 9px;
    }

    .notification-modal {
        padding: 25px 20px;
        margin: 10px;
    }

    .notification-title {
        font-size: 20px;
        margin-bottom: 15px;
    }

    .notification-score {
        font-size: 18px;
    }

    .notification-reward {
        font-size: 24px;
    }

    .player-name-input label {
        font-size: 12px;
    }

    .name-input {
        font-size: 14px;
        padding: 8px;
    }

    .notification-btn {
        font-size: 14px;
        padding: 10px 30px;
    }
}

@media (max-width: 360px) {
    .payout-grid {
        grid-template-columns: repeat(7, 1fr);
    }
}
</style>

