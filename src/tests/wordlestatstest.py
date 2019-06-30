import unittest
import pandas as pd
import sys
import os
sys.path.append('../')
from wordlestats import WordleStats

class WordleStatsTest(unittest.TestCase):
    def setUp(self):
        self.messages_df = pd.read_csv(os.path.join(os.path.dirname(__file__), "html/dummy_messages2.csv"))
        self.messages_df = self.messages_df.dropna(axis=0, how='any')
        self.messages_df['date'] = pd.to_datetime(self.messages_df['date'])
        self.wordle_stats = WordleStats(self.messages_df, 'Tanay Agarwal')

    def testInstanceCreation(self):
        self.assertIsInstance(self.wordle_stats, WordleStats)
        self.assertIsNotNone(self.wordle_stats.wordle_stats)
        self.assertIs(type(self.wordle_stats.wordle_stats), dict)
        self.assertEqual(len(self.wordle_stats.wordle_stats), 3)

    def testStatRetrieval(self):
        output = self.wordle_stats.retrieve_stats("Nick Reinhart")
        self.assertEqual(len(output), 150)
        self.assertEqual(output[0], {'text': 'coach', 'value': 0.15384615384615385})
        self.assertEqual(output[-1], {'text': 'mergersandinquisitions', 'value': 0.15384615384615385})

        output = self.wordle_stats.retrieve_stats("Thomas de Lima")
        self.assertEqual(len(output), 10)
        self.assertEqual(output[0], {'text': 'clicked', 'value': 1})
        self.assertEqual(output[-1], {'text': 'shit', 'value': 1})

        output = self.wordle_stats.retrieve_stats("Tanay Agarwal")
        self.assertEqual(len(output), 150)
        self.assertEqual(output[0], {'text': 'coach', 'value': 0.14285714285714285})
        self.assertEqual(output[-1], {'text': 'mergersandinquisitions', 'value': 0.2857142857142857})

        
if __name__ == '__main__':
    unittest.main()
