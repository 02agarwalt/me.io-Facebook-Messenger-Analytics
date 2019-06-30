import unittest
import pandas as pd
import sys
import os
sys.path.append('../')
from topfriendsstats import TopFriendsStats

class TopFriendsStatsTest(unittest.TestCase):
    def setUp(self):
        self.messages_df = pd.read_csv(os.path.join(os.path.dirname(__file__), "html/dummy_messages2.csv"))
        self.messages_df = self.messages_df.dropna(axis=0, how='any')
        self.messages_df['date'] = pd.to_datetime(self.messages_df['date'])
        self.topfriends_stats = TopFriendsStats(self.messages_df)

    def testInstanceCreation(self):
        self.assertIsInstance(self.topfriends_stats, TopFriendsStats)
        self.assertIsNotNone(self.topfriends_stats.top_friends_stats)
        self.assertIs(type(self.topfriends_stats.top_friends_stats), list)
        self.assertEqual(len(self.topfriends_stats.top_friends_stats), 2)

    def testStatRetrieval(self):
        output = self.topfriends_stats.retrieve_stats()
        self.assertEqual(len(output), 2)
        self.assertEqual(output[0], {'message_percent': 0.97735849056603774, 'friend': 'Nick Reinhart'})
        self.assertEqual(output[1], {'message_percent': 0.022641509433962263, 'friend': 'Thomas de Lima'})
        
if __name__ == '__main__':
    unittest.main()
