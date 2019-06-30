import pandas as pd
from statistic import Statistic

class UserFreqStats(Statistic):
    def __init__(self, messages_df):
	super(UserFreqStats, self).__init__()
        self.aggregated_data = None
        self.populate_stats(messages_df)

    def populate_stats(self, messages_df):
        messages_df['date'] = messages_df['date'].dt.round('H')
        messages_df['date'] = pd.to_datetime(messages_df['date'])
        grouped = messages_df[['sender', 'date', 'message']].groupby(['sender', 'date'], as_index=False)
        self.aggregated_data = grouped.aggregate('count')

    def retrieve_stats(self, sender, date): 
        # perform filtering
        filtered_data = self.aggregated_data[(self.aggregated_data['sender'] == sender) & (self.aggregated_data['date'] >= date)]
        filtered_data = filtered_data[['date', 'message']]
        filtered_data.index = filtered_data['date']
        del filtered_data['date']
        
        # convert dataframe to usable format
        filtered_dict = filtered_data.to_dict()['message']
        date_list = filtered_dict.keys()
        date_list = sorted(date_list)
        
        # construct final output list of data points
        output_list = []
        for date in date_list:
            data_point = [str(date), filtered_dict[date]]
            output_list.append(data_point)
        return output_list
