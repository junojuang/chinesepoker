<template>
  <div class="leaderboard-container">
    <div class="leaderboard-header">
      <h3>排行榜 (Leaderboard)</h3>
      <button class="refresh-btn" @click="loadScores" :disabled="loading">
        {{ loading ? '加载中...' : '刷新 (Refresh)' }}
      </button>
    </div>
    <div class="leaderboard-list" v-if="!loading && scores.length > 0">
      <div 
        v-for="(entry, index) in scores" 
        :key="entry.id"
        class="leaderboard-item"
        :class="{ 'top-three': index < 3 }"
      >
        <div class="rank">{{ index + 1 }}</div>
        <div class="player-info">
          <div class="player-name">{{ entry.playerName }}</div>
          <div class="player-details">
            分数: {{ entry.score }}点 | 奖励: {{ entry.reward }}元
          </div>
        </div>
      </div>
    </div>
    <div class="leaderboard-empty" v-else-if="!loading">
      <p>暂无记录 (No scores yet)</p>
    </div>
    <div class="leaderboard-loading" v-else>
      <p>加载中... (Loading...)</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTopScores } from '../firebase/leaderboard'

const scores = ref([])
const loading = ref(false)

async function loadScores() {
  loading.value = true
  try {
    scores.value = await getTopScores()
  } catch (error) {
    console.error('Error loading scores:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadScores()
})

// Expose loadScores so parent can refresh
defineExpose({
  loadScores
})
</script>

<style scoped>
.leaderboard-container {
  background: white;
  border: 3px solid #2a5298;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.leaderboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
}

.leaderboard-header h3 {
  color: #2a5298;
  font-size: 18px;
  margin: 0;
}

.refresh-btn {
  background: #2a5298;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.refresh-btn:hover:not(:disabled) {
  background: #1e3c72;
}

.refresh-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.leaderboard-item.top-three {
  background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%);
  border-color: #fbc02d;
  font-weight: bold;
}

.rank {
  font-size: 20px;
  font-weight: bold;
  color: #2a5298;
  min-width: 30px;
  text-align: center;
}

.player-info {
  flex: 1;
}

.player-name {
  font-size: 16px;
  color: #1e3c72;
  margin-bottom: 4px;
  font-weight: bold;
}

.player-details {
  font-size: 12px;
  color: #666;
}

.leaderboard-empty,
.leaderboard-loading {
  text-align: center;
  padding: 30px;
  color: #666;
}

@media (max-width: 480px) {
  .leaderboard-header h3 {
    font-size: 16px;
  }

  .refresh-btn {
    font-size: 11px;
    padding: 5px 10px;
  }

  .rank {
    font-size: 18px;
    min-width: 25px;
  }

  .player-name {
    font-size: 14px;
  }

  .player-details {
    font-size: 11px;
  }
}
</style>

