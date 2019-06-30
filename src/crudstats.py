import pandas as pd
from statistic import Statistic

class CrudStats(Statistic):
    def __init__(self, messages_df, users_name):
        super(CrudStats, self).__init__()
        self.users_name = users_name
        self.crud_data = self.populate_stats(messages_df)

    def populate_stats(self, messages_df):
        messages_df = messages_df[['thread', 'sender', 'date']] # Drop messages column
        total_messages = len(messages_df)
        received_messages = messages_df[messages_df['sender']!=self.users_name]
        messages_df = messages_df[messages_df['sender']==self.users_name] # Keep only messages sent by you
        sorted_by_date = messages_df.sort_values('date') 
        first_message = sorted_by_date['date'].iloc[0]
        first_message_date_string = first_message.date().strftime('%B %d, %Y') # Get first message date

        # compute total messages
        total_messages_sent = len(messages_df)
        total_messages_received = total_messages - total_messages_sent

        # compute messages sent per day average
        messages_df['date'] = messages_df['date'].dt.round('D')
        messages_df['date'] = pd.to_datetime(messages_df['date'])
        grouped_by_day = messages_df[['thread', 'date']].groupby(['date'], as_index=False)
        grouped_by_day = grouped_by_day.aggregate('count')
        average_messages_per_day = grouped_by_day['thread'].mean()

        # Compute friend you message the most
        messages_df = messages_df[messages_df['thread'].str.contains(',') == False] # drop all group messages
        # compute most messages to who and how many
        grouped_by_thread = messages_df[['thread', 'date']].groupby(['thread'], as_index=False)
        grouped_by_thread = grouped_by_thread.aggregate('count')
        grouped_by_thread_sorted = grouped_by_thread.sort_values('date', ascending=False)
        top_friend_messaged = grouped_by_thread_sorted['thread'].iloc[0]
        num_messages_to_top_friend = grouped_by_thread_sorted['date'].iloc[0]

        # Compute friend who has messaged you the most
        received_messages = received_messages[received_messages['thread'].str.contains(',') == False] # drop all group messages
        grouped_by_friend = received_messages[['thread', 'date']].groupby(['thread'], as_index=False)
        grouped_by_friend = grouped_by_friend.aggregate('count')
        grouped_by_friend_sorted = grouped_by_friend.sort_values('date', ascending=False)
        top_friend_received = grouped_by_friend_sorted['thread'].iloc[0]
        num_messages_received_by_top_friend = grouped_by_friend_sorted['date'].iloc[0]

        crud_data = {}
        crud_data['first_message_date'] = first_message_date_string
        crud_data['total_messaged_sent'] = total_messages_sent
        crud_data['total_messages_received'] = total_messages_received
        crud_data['average_messages_per_day'] = average_messages_per_day
        crud_data['top_friend_messaged'] = top_friend_messaged
        crud_data['num_messaged_to_top_friend'] = num_messages_to_top_friend
        crud_data['top_friend_messages_received'] = top_friend_received
        crud_data['num_messages_received_by_top_friend'] = num_messages_received_by_top_friend
        return crud_data


    def retrieve_stats(self):
        return self.crud_data
