import { db } from './config'
import { collection, addDoc, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore'

const LEADERBOARD_COLLECTION = 'leaderboard'
const TOP_SCORES_LIMIT = 10

// Save a score to the leaderboard
export async function saveScore(playerName, score, reward) {
  try {
    await addDoc(collection(db, LEADERBOARD_COLLECTION), {
      playerName: playerName || 'Anonymous',
      score: score,
      reward: reward,
      timestamp: Timestamp.now()
    })
    return true
  } catch (error) {
    console.error('Error saving score:', error)
    return false
  }
}

// Get top scores from the leaderboard
export async function getTopScores() {
  try {
    const q = query(
      collection(db, LEADERBOARD_COLLECTION),
      orderBy('score', 'desc'),
      limit(TOP_SCORES_LIMIT)
    )
    const querySnapshot = await getDocs(q)
    const scores = []
    querySnapshot.forEach((doc) => {
      scores.push({
        id: doc.id,
        ...doc.data()
      })
    })
    return scores
  } catch (error) {
    console.error('Error getting top scores:', error)
    return []
  }
}

