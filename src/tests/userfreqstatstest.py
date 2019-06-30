import unittest
import pandas as pd
import sys
import os
sys.path.append('../')
from userfreqstats import UserFreqStats

class UserFreqStatsTest(unittest.TestCase):
    def setUp(self):
        self.messages_df = pd.read_csv(os.path.join(os.path.dirname(__file__), "html/dummy_messages2.csv"))
        self.messages_df = self.messages_df.dropna(axis=0, how='any')
        self.messages_df['date'] = pd.to_datetime(self.messages_df['date'])
        self.user_freq_stats = UserFreqStats(self.messages_df)

    def testInstanceCreation(self):
        self.assertIsInstance(self.user_freq_stats, UserFreqStats)
        self.assertIsNotNone(self.user_freq_stats.aggregated_data)
        self.assertIs(type(self.user_freq_stats.aggregated_data), pd.DataFrame)
        self.assertEqual(self.user_freq_stats.aggregated_data.shape, (25, 3))

    def testStatRetrieval(self):
        output = self.user_freq_stats.retrieve_stats("Tanay Agarwal", "2014-01-01")
        self.assertEqual(len(output), 8)
        self.assertEqual(output[0], ['2014-05-06 23:00:00', 6])
        self.assertEqual(output[-1], ['2016-07-07 00:00:00', 30])

        output = self.user_freq_stats.retrieve_stats("Nick Reinhart", "2014-06-01")
        self.assertEqual(len(output), 5)
        self.assertEqual(output[0], ['2014-06-11 20:00:00', 10])
        self.assertEqual(output[-1], ['2016-07-07 00:00:00', 26])

        output = self.user_freq_stats.retrieve_stats("Thomas de Lima", "2014-01-01")
        self.assertEqual(len(output), 1)
        self.assertEqual(output[0], ['2014-12-28 13:00:00', 2])
        
if __name__ == '__main__':
    unittest.main()
