import pandas as pd
from statistic import Statistic

class ChatFreqStats(Statistic):
    def __init__(self, messages_df, users_name):
	super(ChatFreqStats, self).__init__()
        self.aggregated_data = {}
        self.users_name = users_name
        self.populate_stats(messages_df)

    def populate_stats(self, messages_df):
        messages_df['date'] = messages_df['date'].dt.hour
        grouped = messages_df[['thread', 'date', 'message']].groupby(['thread', 'date'], as_index=False)
        agged = grouped.aggregate('count')
        for thread in list(messages_df[messages_df['thread'].str.contains(',') == False]['sender'].unique()):
            filtered_data = agged[agged['thread'] == thread]
            if thread == self.users_name:
                temp_grouped = messages_df[['sender', 'date', 'message']].groupby(['sender', 'date'], as_index=False)
                temp_agged = temp_grouped.aggregate('count')
                filtered_data = temp_agged[temp_agged['sender'] == self.users_name]
            filtered_data = filtered_data[['date', 'message']]
            filtered_data.index = filtered_data['date']
            del filtered_data['date']

            # convert to usable format
            filtered_dict = filtered_data.to_dict()['message']
            date_list = filtered_dict.keys()
            date_list = sorted(date_list)
        
            # construct final output list of data points
            total = float(sum(filtered_dict.values()))
            output_list = []
            for date in date_list:
                data_point = [str(date), filtered_dict[date] / total]
                output_list.append(data_point)
            self.aggregated_data[thread] = output_list

    def retrieve_stats(self, thread):
	return self.aggregated_data[thread]
