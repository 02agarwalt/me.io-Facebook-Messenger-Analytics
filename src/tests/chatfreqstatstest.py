import unittest
import pandas as pd
import sys
import os
sys.path.append('../')
from chatfreqstats import ChatFreqStats

class ChatFreqStatsTest(unittest.TestCase):
    def setUp(self):
        self.messages_df = pd.read_csv(os.path.join(os.path.dirname(__file__), "html/dummy_messages2.csv"))
        self.messages_df = self.messages_df.dropna(axis=0, how='any')
        self.messages_df['date'] = pd.to_datetime(self.messages_df['date'])
        self.chat_freq_stats = ChatFreqStats(self.messages_df, "Tanay Agarwal")

    def testInstanceCreation(self):
        self.assertIsInstance(self.chat_freq_stats, ChatFreqStats)
        self.assertIsNotNone(self.chat_freq_stats.aggregated_data)
        self.assertIs(type(self.chat_freq_stats.aggregated_data), dict)
        self.assertEqual(len(self.chat_freq_stats.aggregated_data), 3)

    def testStatRetrieval(self):
        output = self.chat_freq_stats.retrieve_stats("Tanay Agarwal")
        self.assertEqual(len(output), 11)
        self.assertEqual(output[0], ['0', 0.21678321678321677])
        self.assertEqual(output[-1], ['23', 0.097902097902097904])

        output = self.chat_freq_stats.retrieve_stats("Nick Reinhart")
        self.assertEqual(len(output), 11)
        self.assertEqual(output[0], ['0', 0.22779922779922779])
        self.assertEqual(output[-1], ['23', 0.092664092664092659])

        output = self.chat_freq_stats.retrieve_stats("Thomas de Lima")
        self.assertEqual(len(output), 1)
        self.assertEqual(output[0], ['12', 1.0])
        
if __name__ == '__main__':
    unittest.main()
