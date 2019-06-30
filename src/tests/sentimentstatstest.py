import unittest
import pandas as pd
import sys
import os
sys.path.append('../')
from sentimentstats import SentimentStats

class SentimentStatsTest(unittest.TestCase):
    def setUp(self):
        self.messages_df = pd.read_csv(os.path.join(os.path.dirname(__file__), "html/dummy_messages2.csv"))
        self.messages_df = self.messages_df.dropna(axis=0, how='any')
        self.messages_df['date'] = pd.to_datetime(self.messages_df['date'])
        self.sentiment_stats = SentimentStats(self.messages_df, "Tanay Agarwal")

    def testInstanceCreation(self):
        self.assertIsInstance(self.sentiment_stats, SentimentStats)
        self.assertIsNotNone(self.sentiment_stats.sentiment_data)
        self.assertIs(type(self.sentiment_stats.sentiment_data), pd.DataFrame)
        self.assertEqual(self.sentiment_stats.sentiment_data.shape, (25, 4))

    def testStatRetrieval(self):
        output = self.sentiment_stats.retrieve_stats("Nick Reinhart", "2008-01-01")
        self.assertEqual(len(output), 2)
        self.assertEqual(output['sender'][0], ['2011-11-08 22:00:00', 0.099999999999999992])
        self.assertEqual(output['sender'][1], ['2012-04-15 20:00:00', 0.0])
        self.assertEqual(output['sender'][-1], ['2016-07-07 00:00:00', 0.14611111111111111])
        self.assertEqual(output['user'][0], ['2011-11-08 22:00:00', 0.090064102564102563])
        self.assertEqual(output['user'][1], ['2012-04-15 20:00:00', 0.083333333333333329])
        self.assertEqual(output['user'][-1], ['2016-07-07 00:00:00', 0.16415564373897709])

        output = self.sentiment_stats.retrieve_stats("Thomas de Lima", "2014-01-01")
        self.assertEqual(len(output), 2)
        self.assertEqual(output['sender'][0], ['2014-12-28 13:00:00', 0.5])
        self.assertEqual(output['user'][0], ['2014-12-28 12:00:00', 0.0])
        self.assertEqual(output['user'][-1], ['2014-12-28 13:00:00', -0.46666666666666662])
        
if __name__ == '__main__':
    unittest.main()
