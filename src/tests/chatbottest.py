import unittest
import pandas as pd
import sys
import os
sys.path.append('../')
from chatbot import Chatbot

class ChatbotTest(unittest.TestCase):
    def setUp(self):
        path = os.path.join(os.path.dirname(__file__), "chatbot_messages.csv")
        self.chatbot = Chatbot(path, "Tanay Agarwal")

    def testSimilarityMetric(self):
        self.assertEqual(1.0, self.chatbot.similarity("hello", "hello"))
        self.assertEqual(1.0, self.chatbot.similarity("hello my name is tanay", "hello my Name is TANAY"))
        self.assertEqual(3.0/5.0, self.chatbot.similarity("my name is Tanay", "my name is Manyu"))
        self.assertEqual(4.0/5.0, self.chatbot.similarity("my name is Tanay", "My name is Not Tanay"))
        self.assertEqual(0.0, self.chatbot.similarity("where are we", "not here"))

    def testClosestMatch(self):
        message, sender, date = self.chatbot.get_closest_match("yeah")
        self.assertEqual(message, "yeah")
        self.assertEqual(sender, "Michael Borger")
        message, sender, date = self.chatbot.get_closest_match("you can sign up")
        self.assertTrue(message in ["you can sign up with me", "you already signed up?", "thank you hahahahah"])
        self.assertEqual(sender, "Michael Borger")

    def testGetResponse(self):
        message = self.chatbot.get_response("yeah")
        self.assertTrue(message in ["damn", "alright", "im in also"])
        message = self.chatbot.get_response("you can sign up")
        self.assertTrue(message in ["ok", "thank you hahahahah", "when can i get the thing"])
        
if __name__ == '__main__':
    unittest.main()
