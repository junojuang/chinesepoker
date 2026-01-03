import itertools
from collections import Counter

# Build the deck: 4 of each value 1–13
deck = []
for value in range(1, 14):
    deck.extend([value] * 4)

totals = Counter()

# Enumerate all 5-card hands
for hand in itertools.combinations(deck, 5):
    totals[sum(hand)] += 1

TOTAL_HANDS = 2598960

# Loop over all possible sums (min 5*1=5, max 5*13=65)
for total_sum in range(6, 65):
    count = totals.get(total_sum, 0)  # 0 if no hands sum to this total
    probability = count / TOTAL_HANDS
    print(f"Total = {total_sum}, Hands = {count}, P = {probability:.8f}")
