import pandas as pd
import subprocess
from userfreqstats import UserFreqStats
from chatfreqstats import ChatFreqStats
from sentimentstats import SentimentStats
from wordlestats import WordleStats
from crudstats import CrudStats
from chatbot import Chatbot
from topfriendsstats import TopFriendsStats

class User:
    def __init__(self, name, UUID):
        self.name = name
        self.UUID = UUID
        self.uploaded_data = False
        self.processed_data = False
        self.path_to_raw_messages = None
	self.friend_list = None
        self.user_freq_stats = None
        self.chat_freq_stats = None
        self.wordle_stats = None
        self.sentiment_stats = None
        self.crud_stats = None
        self.topfriends_stats = None
        self.chatbot = None

    def upload_data(self, file_path):
        self.path_to_raw_messages = file_path
        self.uploaded_data = True

    def preprocess_data(self): # path to messages.htm file
        dest_path = self.path_to_raw_messages[:-3] + "csv"
        cmd = 'fbcap ' + self.path_to_raw_messages + ' -f csv > ' + dest_path
        subprocess.call(cmd, shell=True)
        self.path_to_raw_messages = dest_path
        return dest_path

    def process_data(self): # path to messages.csv file
        messages_df = pd.read_csv(self.path_to_raw_messages)
        messages_df = messages_df.dropna(axis=0, how='any')
        messages_df['date'] = pd.to_datetime(messages_df['date'])
	self.friend_list = list(messages_df[messages_df['thread'].str.contains(',') == False]['sender'].unique())
        self.wordle_stats = WordleStats(messages_df.copy(), self.name)
        self.crud_stats = CrudStats(messages_df.copy(), self.name)
        self.topfriends_stats = TopFriendsStats(messages_df.copy())
        self.user_freq_stats = UserFreqStats(messages_df.copy())
        self.chat_freq_stats = ChatFreqStats(messages_df.copy(), self.name)
        self.sentiment_stats = SentimentStats(messages_df.copy(), self.name)
        self.processed_data = True
        messages_df = None
        #self.chatbot = Chatbot(self.path_to_raw_messages, self.name)

    def initChatbot(self):
        self.chatbot = Chatbot(self.path_to_raw_messages, self.name)
