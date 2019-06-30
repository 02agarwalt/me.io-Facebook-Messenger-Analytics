import pandas as pd
import random

class Chatbot:
    def __init__(self, path_to_messages, user_name):
        self.user_name = user_name
        self.path_to_messages = path_to_messages
        self.messages_df = pd.read_csv(self.path_to_messages)
        self.messages_df = self.messages_df.dropna(axis=0, how='any')
        self.messages_df['date'] = pd.to_datetime(self.messages_df['date'])
        # consider only direct message threads (no group chats)
        self.messages_df = self.messages_df[self.messages_df['thread'].str.contains(',') == False]

    def get_response(self, input_message):
        # find best match in overall dataframe
        best_message, best_sender, best_date = self.get_closest_match(input_message)
        # filter dataframe to only include messages by the best sender passed the best date
        response_df = self.messages_df[(self.messages_df['date'] >= best_date) & (self.messages_df['thread'] == best_sender)]
        response_message_list = response_df['message'].tolist()
        index = -1
        # iterate over responses to find index of chosen match
        for i in range(len(response_message_list)):
            if response_message_list[i] == best_message:
                index = i
                break
        response_sender_list = response_df['sender'].tolist()
        index2 = -1
        # iterate further to find user's response to chosen match
        for i in range(index + 1, len(response_sender_list)):
            if response_sender_list[i] == self.user_name:
                index2 = i
                break
        best_response = response_message_list[index2]
        return best_response

    def get_closest_match(self, input_message):
        input_message_df = self.messages_df[(self.messages_df['sender'] != self.user_name)]
        input_message_df.loc[:,'similarity'] = input_message_df['message'].apply(self.similarity, args=(input_message,))
        # get two most similar responses and then choose one randomly
        best_index_list = input_message_df.nlargest(2, 'similarity').index
        best_index = random.choice(best_index_list)
        # return details of chosen best match
        best_message = input_message_df.get_value(best_index, 'message')
        best_sender = input_message_df.get_value(best_index, 'sender')
        best_date = input_message_df.get_value(best_index, 'date')
        return best_message, best_sender, best_date

    def similarity(self, x, y):
        x = x.split()
        # make case-insensitive when computing similarity
        x_lower = [item.lower() for item in x]
        y = y.split()
        y_lower = [item.lower() for item in y]
        intersection = list(set(x_lower) & set(y_lower))
        union = list(set(x_lower) | set(y_lower))
        return float(len(intersection)) / float(len(union))
