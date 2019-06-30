import pandas as pd
from statistic import Statistic

class TopFriendsStats(Statistic):
    def __init__(self, messages_df):
        super(TopFriendsStats, self).__init__()
        self.top_friends_stats = self.populate_stats(messages_df)

    def populate_stats(self, messages_df):
        messages_df = messages_df[['thread', 'date']] # Drop messages and sender column
        messages_df = messages_df[messages_df['thread'].str.contains(',') == False] # drop all group chats
        grouped_by_thread = messages_df.groupby(['thread'], as_index=False)
        grouped_by_thread = grouped_by_thread.aggregate('count')
        grouped_by_thread = grouped_by_thread.rename(index=str, columns={'date':'num_messages'})
        grouped_by_thread_sorted = grouped_by_thread.sort_values('num_messages', ascending=False)

        total_messages = grouped_by_thread_sorted['num_messages'].sum()
        grouped_by_thread_sorted['num_messages'] = grouped_by_thread_sorted['num_messages']/total_messages # Covert num messages to percentage

        top_10_friends = grouped_by_thread_sorted[:10]
        other_percentage = 1 - top_10_friends['num_messages'].sum()

        top_10_output = []

        for i in range (0, len(top_10_friends)):
            thread_stat = {'friend': top_10_friends['thread'].iloc[i], 'message_percent': top_10_friends['num_messages'].iloc[i]}
            top_10_output.append(thread_stat)

        if other_percentage != 0:
            other_stat = {'friend': 'Other', 'message_percent': other_percentage}
            top_10_output.append(other_stat)

        return top_10_output


    def retrieve_stats(self):
        return self.top_friends_stats