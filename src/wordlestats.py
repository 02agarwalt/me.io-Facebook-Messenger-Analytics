import pandas as pd
import os
from statistic import Statistic

class WordleStats(Statistic):
    def __init__(self, messages_df, users_name):
	super(WordleStats, self).__init__()
        self.wordle_stats = {}
        self.users_name = users_name
        self.populate_stats(messages_df)

    def populate_stats(self, messages_df):
        # Filter our all group chats
        messages_df = messages_df[messages_df['thread'].str.contains(',') == False]

        for thread in list(messages_df['sender'].unique()):
            if thread == self.users_name:
                messages_subset = messages_df[messages_df['sender'] == thread]
            else:
                messages_subset = messages_df[messages_df['thread'] == thread]

            messages_subset = messages_subset['message'].str.lower()
            word_series = pd.Series(' '.join(messages_subset).split())
            word_counts = word_series.value_counts()
            word_counts_df = word_counts.to_frame()

            # Drop common words that are not useful to user
            path = os.path.join(os.path.dirname(__file__), "excluded_words.txt")
            excluded_words_file = open(path, "r")
            excluded_words = excluded_words_file.read().split('\n')
            word_counts_df = word_counts_df.drop(excluded_words, errors='ignore')
            # Get top 150 uncommon words
            word_counts_df = word_counts_df[:150]

            try:
                highest_frequency = word_counts_df[0].iloc[0]
                # Normalize the data on scale 0 - 1
                word_counts_df = word_counts_df/highest_frequency
            except:
                pass

            word_counts_dict = word_counts_df.to_dict()[0]

            thread_values = []
            for word, count in word_counts_dict.iteritems():
                new_dict = {'text': word, 'value': count}
                thread_values.append(new_dict)
            self.wordle_stats[thread] = thread_values

    def retrieve_stats(self, thread):
        return self.wordle_stats[thread]
