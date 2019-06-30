import pandas as pd
from statistic import Statistic
from textblob import TextBlob

class SentimentStats(Statistic):
    def __init__(self, messages_df, users_name):
        super(SentimentStats, self).__init__()
        self.users_name = users_name
        self.sentiment_data = self.populate_stats(messages_df)

    def format_for_output(self, sentiment_df):
        filtered_dict = sentiment_df.to_dict()['sentiment']
        date_list = filtered_dict.keys()
        date_list = sorted(date_list)
        
        # construct final output list of data points
        output_list = []
        for date in date_list:
            data_point = [str(date), filtered_dict[date]]
            output_list.append(data_point)
        return output_list

    def populate_stats(self, messages_df):
        # consider only direct message threads (no group chats)
        messages_df = messages_df[messages_df['thread'].str.contains(',') == False]
        messages_df['date'] = messages_df['date'].dt.round('H') # Round time to closest hour
        messages_df['date'] = pd.to_datetime(messages_df['date']) # Convert to time object'
        # Add sentiment column and compute sentiment for each column
        def compute_sentiment(message):
            try: 
                score = TextBlob(message).sentiment.polarity
                return score
            except:
                return 0

        messages_df['sentiment'] = messages_df['message'].apply(compute_sentiment)
        grouped = messages_df[['sender', 'date', 'thread', 'sentiment']].groupby(['sender', 'date', 'thread'], as_index=False) # Group by sender and date
        return grouped.aggregate('mean')

    def retrieve_stats(self, sender, date):
        sender_sentiment = self.sentiment_data[(self.sentiment_data['sender'] == sender) & (self.sentiment_data['date'] >= date) & (self.sentiment_data['thread'] == sender)]
        sender_sentiment = sender_sentiment[['date', 'sentiment']]
        sender_sentiment.index = sender_sentiment['date']
        del sender_sentiment['date']

        user_sentiment = self.sentiment_data[(self.sentiment_data['sender'] == self.users_name) & (self.sentiment_data['date'] >= date) & (self.sentiment_data['thread'] == sender)]
        user_sentiment = user_sentiment[['date', 'sentiment']]
        user_sentiment.index = user_sentiment['date']
        del user_sentiment['date']

        # Format data for font end
        sender_formatted = self.format_for_output(sender_sentiment)
        user_formatted = self.format_for_output(user_sentiment)

        output = {}
        output['sender'] = sender_formatted
        output['user'] = user_formatted
        return output
