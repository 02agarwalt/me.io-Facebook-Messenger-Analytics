import unittest
import pandas as pd
import os.path
import sys
sys.path.append('../')
from userfreqstats import UserFreqStats
from chatfreqstats import ChatFreqStats
from sentimentstats import SentimentStats
from wordlestats import WordleStats
from chatbot import Chatbot
from myuser import User

class UserTest(unittest.TestCase):
    def setUp(self):
        self.user = User("Tanay Agarwal", 1234)

    def testInstanceCreation(self):
        self.assertIsNotNone(self.user)
        self.assertIsInstance(self.user, User)

    def testPreprocessData(self):
        self.user.path_to_raw_messages = os.path.join(os.path.dirname(__file__), "html/dummy_messages2.htm")
        self.user.preprocess_data()
        self.assertTrue(os.path.isfile(os.path.join(os.path.dirname(__file__), "html/dummy_messages2.csv")))
        self.messages = pd.read_csv(os.path.join(os.path.dirname(__file__), "html/dummy_messages2.csv"))
        self.assertIsInstance(self.messages, pd.DataFrame)
        self.assertEqual(self.messages.shape, (265, 4))

    def testProcessData(self):
        self.user.path_to_raw_messages = os.path.join(os.path.dirname(__file__), "html/dummy_messages2.csv")
        self.user.process_data()
        self.assertIsInstance(self.user.user_freq_stats, UserFreqStats)
        self.assertIsInstance(self.user.chat_freq_stats, ChatFreqStats)
        self.assertIsInstance(self.user.sentiment_stats, SentimentStats)
        self.assertIsInstance(self.user.wordle_stats, WordleStats)
	self.assertEqual(self.user.friend_list, ['Tanay Agarwal', 'Nick Reinhart', 'Thomas de Lima'])

    def testChatbot(self):
        self.user.path_to_raw_messages = os.path.join(os.path.dirname(__file__), "html/dummy_messages2.csv")
        self.user.initChatbot()
        self.assertIsInstance(self.user.chatbot, Chatbot)
        
if __name__ == '__main__':
    unittest.main()
