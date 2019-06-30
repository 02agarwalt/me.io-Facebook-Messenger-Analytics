import unittest
import pandas as pd
import sys
import os
sys.path.append('../')
from crudstats import CrudStats

class CrudStatsTest(unittest.TestCase):
    def setUp(self):
        self.messages_df = pd.read_csv(os.path.join(os.path.dirname(__file__), "html/dummy_messages2.csv"))
        self.messages_df = self.messages_df.dropna(axis=0, how='any')
        self.messages_df['date'] = pd.to_datetime(self.messages_df['date'])
        self.crud_stats = CrudStats(self.messages_df, "Tanay Agarwal")

    def testInstanceCreation(self):
        self.assertIsInstance(self.crud_stats, CrudStats)
        self.assertIsNotNone(self.crud_stats.crud_data)
        self.assertIs(type(self.crud_stats.crud_data), dict)
        self.assertEqual(len(self.crud_stats.crud_data), 8)

    def testStatRetrieval(self):
        output = self.crud_stats.retrieve_stats()
        self.assertEqual(len(output), 8)
        self.assertEqual(output, {'total_messaged_sent': 143, 'total_messages_received': 122, 'num_messages_received_by_top_friend': 120, 'average_messages_per_day': 11.916666666666666, 'top_friend_messages_received': 'Nick Reinhart', 'first_message_date': 'November 08, 2011', 'num_messaged_to_top_friend': 139, 'top_friend_messaged': 'Nick Reinhart'})

if __name__ == '__main__':
    unittest.main()
