from flask import Flask, request, Response, jsonify
from flask.ext.autodoc import Autodoc
# from flask.ext.api import status
from flask_pymongo import PyMongo
import time
import pandas as pd
from myuser import User
from flask_cors import CORS, cross_origin
import pickle

# file upload stuff
import os
from flask import redirect, url_for
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '../user_data'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
ALLOWED_EXTENSIONS = set(['zip'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MONGO_DBNAME'] = 'Cluster0'
app.config['MONGO_URI'] = '' # removed for privacy
auto = Autodoc(app)
mongo = PyMongo(app)
active_users = {}

@app.route("/test", methods = ["GET"])
@cross_origin()
def test():
    print 'hello'
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)

@app.route("/", methods=["GET"])
@auto.doc()
def get_splash_screen():
    """Gets basic splash screen (click log in or sign up with facebook)

    Returns:
        render_template: basic splash
    """
    return None

@app.route("/api/login/<uuid>", methods=["PUT"])
@auto.doc()
@cross_origin()
def login(uuid):
    """Attempt to login to home page

    Returns:
        404 if the user doesn't exist, 201 if login successful

    Args:
        uuid (str): user id generated by facebook javascript SDK
    """
    db = mongo.db.users
    db_user_entry = db.find_one({'UUID':uuid})

    # User does not exist
    if db_user_entry is None:
        return jsonify({"code": 404}), 404 # not sure the json body content for the status code is still needed

    # Read user from database
    serialized_user_obj = db_user_entry["serialized_user_obj"]
    active_user = pickle.loads(serialized_user_obj)
    active_users[uuid] = active_user
    return jsonify({"code": 201}), 201

@app.route("/api/logout/<uuid>", methods=["PUT"])
@auto.doc()
@cross_origin()
def logout(uuid):
    """Attempt to login to home page

    Returns:
        404 if the user doesn't exist, 201 if logout successful

    Args:
        uuid (str): user id generated by facebook javascript SDK
    """
    # User does not exist
    if not (uuid in active_users):
        return jsonify({"code": 404}), 404

    # Delete user from active_users
    del active_users[uuid]
    return jsonify({"code": 201}), 201


@app.route("/api/delete/<uuid>", methods=["DELETE"])
@auto.doc()
@cross_origin()
def delete_user(uuid):
    """Attempt to login to home page

    Returns:
        404 if the user doesn't exist, 201 if delete successful

    Args:
        uuid (str): user id generated by facebook javascript SDK
    """
    # User does not exist
    if not (uuid in active_users):
        return jsonify({"code": 404}), 404

    # Delete user from active_users
    del active_users[uuid]
    os.system("rm -rf " + UPLOAD_FOLDER + "/" + str(uuid))
    db = mongo.db.users
    db.delete_one({'UUID':uuid})
    return jsonify({"code": 200})

@app.route("/api/signup/<uuid>/<name>", methods=["POST"])
@auto.doc()
@cross_origin()
def signup(uuid, name):
    """Attempts to create user and then return the UUID of the newly signed up user

    Args:
        uuid (str): user id generated by facebook javascript SDK

    Returns:
        404 if user already exists, 201 if sign up is successful
    """
    db = mongo.db.users
    db_user_entry = db.find_one({'UUID':uuid})

    # User already exists
    if not (db_user_entry is None):
        print('USER EXISTS')
        return jsonify({"code": 404}), 404

    new_user = User(name, uuid)
    active_users[uuid] = new_user

    serialized_user_obj = pickle.dumps(new_user)
    db_user_entry = {"UUID": uuid, "serialized_user_obj": serialized_user_obj}
    db.insert_one(db_user_entry)

    return jsonify({"code": 201}), 201

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/api/upload/<uuid>", methods=["POST"])
@auto.doc()
@cross_origin()
def upload_data(uuid):
    """Uploads user data to server

    Args:
        uuid (str): user id generated by facebook javascript SDK

        Returns:
            Returns 200 if data already uploaded, 201 if successfully uploaded, and 404 if user is not logged in
    """
    print('files')
    print(request.files)

    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404}), 404

    current_user = active_users[uuid]

    # data has already been uploaded
    if current_user.uploaded_data:
        current_user.uploaded_data = False
        current_user.processed_data = False
        current_user.path_to_raw_messages = None
        current_user.friend_list = None
        current_user.user_freq_stats = None
        current_user.chat_freq_stats = None
        current_user.wordle_stats = None
        current_user.sentiment_stats = None
        current_user.crud_stats = None
        current_user.topfriends_stats = None
        current_user.chatbot = None
        os.system("rm -rf " + UPLOAD_FOLDER + "/" + str(uuid))
        #return jsonify({"code": 200}), 200

    # BEGIN File saving code
    folderpath = os.path.join(app.config['UPLOAD_FOLDER'], str(uuid))

    # make a folder if not already exists
    if not os.path.isdir(folderpath):
        os.makedirs(folderpath)

    if 'file' not in request.files:
        print('No file part')
        # return redirect(request.url)
        return jsonify({"message": "no file part"}), 404
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        print('No selected file')
        # return redirect(request.url)
        return jsonify({"message": "no selected file"}), 404
    if file and allowed_file(file.filename):
        print('saving file')
        filename = secure_filename(file.filename)
        filepath = os.path.join(folderpath, filename)
        file.save(filepath)
        # return redirect(url_for('uploaded_file',
        #                         filename=filename))
    # END File saving code

    # File unzipping and directory structure management
    os.system("unzip " + filepath + " -d " + folderpath)
    correct_files_exist = (os.path.exists(folderpath + "/html/messages.htm") and os.path.exists(folderpath + "/messages"))
    if not correct_files_exist:
        print("zip doesn't contain necessary files")
        os.system("rm -rf " + folderpath)
        return jsonify({"message": "incorrect files inside zip"}), 404
    os.system("rm " + filepath)
    os.system("rm " + folderpath + "/index.htm")
    os.system("rm -rf " + folderpath + "/videos")
    os.system("rm -rf " + folderpath + "/photos")
    messages_filepath = folderpath + "/html/messages.htm"

    current_user.upload_data(messages_filepath) # update boolean inside user object

    # Update user in database
    db = mongo.db.users
    serialized_user_obj = pickle.dumps(current_user)
    db_user_entry = {"UUID": uuid, "serialized_user_obj": serialized_user_obj}
    db.replace_one({'UUID':uuid}, db_user_entry)

    return jsonify({"message": "file uploaded"}), 201


@app.route("/api/compute-user-stats/<uuid>", methods=["PUT"])
@auto.doc()
@cross_origin()
def compute_user_stats(uuid):
    """Computes all message statistics for the given user

    Args:
        uuid (str): user id generated by facebook javascript SDK

        Returns: Returns 200 if stats already computed, 201 if successfully computed,
        405 if data hasn't been uploaded first, and 404 if user is not logged in

    """
    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404})

    current_user = active_users[uuid]

    if not (current_user.uploaded_data):
        return jsonify({"code": 405})

    # Data has already been processed
    if current_user.processed_data:
        return jsonify({"code": 200})

    current_user.preprocess_data()
    current_user.process_data()

    # Update user in database
    db = mongo.db.users
    serialized_user_obj = pickle.dumps(current_user)
    db_user_entry = {"UUID": uuid, "serialized_user_obj": serialized_user_obj}
    db.replace_one({'UUID':uuid}, db_user_entry)

    return jsonify({"code": 201})

@app.route("/api/wordle/<uuid>", methods=["GET"])
@auto.doc()
@cross_origin()
def get_wordle(uuid):
    """Requests wordle given parameter of person (me, friend 1, friend 2, etc...)
        and the selected time frame (1 week, 1 month, 3 month, etc...)

    Args:
        uuid (str): user id generated by facebook javascript SDK
        sender (str): name of the sender that the user messages
        date (str): the start date

    IGNORE DOCUMENTATION BELOW

    Returns:
        JSON: parameters for wordle construction structured as:
        {
            "Thread name": the name of the thread (str)
            "wordList": [
                {given word (str):number of occurences (int)},
                ...
                {given word (str):number of occurences (int)}

            ]
        }

    """
    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404})

    sender = request.args.get('sender', default = '', type = str)

    current_user = active_users[uuid]

    # Data not yet processed
    if not (current_user.processed_data):
        return jsonify({"code": 200})


    wordle_list = current_user.wordle_stats.retrieve_stats(sender)

    return jsonify(wordle_list)

@app.route("/api/chat-freq-stats/<uuid>", methods=["GET"])
@auto.doc()
@cross_origin()
def get_chat_freq_stats(uuid):
    """Requests histogram given parameter of person (me, friend 1, friend 2, etc...)
        and the selected time frame (1 week, 1 month, 3 month, etc...)

    Args:
        uuid (str): user id generated by facebook javascript SDK
        sender (str): name of the sender that the user messages

    IGNORE DOCUMENTATION BELOW

    Returns:
        JSON: parameters for histogram construction as:
        {
            "graphType": "histogram"
            "someMetaData": information (str),
            "numMessagesOverTime": [
                {Date (str) : value (int)},
                {"2017-10-23T19:00:00.511Z" : 55},
                ...
                {Date (str) : value (int)}
            ]
        }
    """
    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404})

    sender = request.args.get('sender', default = '', type = str)

    current_user = active_users[uuid]

    # Data not yet processed
    if not (current_user.processed_data):
        return jsonify({"code": 200})

    chat_freq_stats = current_user.chat_freq_stats.retrieve_stats(sender)

    response = {}
    response['sender'] = sender
    response['messagesPerHour'] = chat_freq_stats
    return jsonify(response)
    return jsonify(freq_stats_list)


@app.route("/api/user-freq-stats/<uuid>", methods=["GET"])
@auto.doc()
@cross_origin()
def get_user_freq_stats(uuid):
    """Requests line graph given parameter of person (me, friend 1, friend 2, etc...)
        and the selected time frame (1 week, 1 month, 3 month, etc...)

    Args:
        uuid (str): user id generated by facebook javascript SDK
        sender (str): name of the sender that the user messages
        date (str): the start date

    Returns:
        JSON: parameters for graph construction
        {
            "graphType": "linegraph"
            "someMetaData": information (str),
            "numMessagesOverTime": [
                {Date (str) : value (int)},
                {"2017-10-23T19:00:00.511Z" : 55},
                ...
                {Date (str) : value (int)}
            ]
        }
    """
    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404}), 404

    sender = request.args.get('sender', default = '', type = str)
    date = request.args.get('date', default = '', type = str)

    current_user = active_users[uuid]

    # Data not yet processed
    if not (current_user.processed_data):
        return jsonify({"message": "data not yet processed"}), 201

    user_freq_stats = current_user.user_freq_stats.retrieve_stats(sender, date)
    print("WEEEEEEW YAYAAYYA")

    response = {}
    response['sender'] = sender
    response['numMessagesOverTime'] = user_freq_stats
    return jsonify(response), 200

@app.route("/api/get-sentiment-stat/<uuid>", methods=["GET"])
@auto.doc()
@cross_origin()
def get_sentiment_stats(uuid):
    """Requests line graph given parameter of person (me, friend 1, friend 2, etc...)
        and the selected time frame (1 week, 1 month, 3 month, etc...)

    Args:
        uuid (str): user id generated by facebook javascript SDK
        sender (str): name of the sender that the user messages
        date (str): the start date

    Returns:
        JSON: parameters for graph construction
        {
            "graphType": "linegraph"
            "someMetaData": information (str),
            "numMessagesOverTime": [
                {Date (str) : value (int)},
                {"2017-10-23T19:00:00.511Z" : 55},
                ...
                {Date (str) : value (int)}
            ]
        }
    """
    # User not logged in
    print("HELLO IN HERE YAY")
    if not (uuid in active_users):
        return jsonify({"code": 404})

    sender = request.args.get('sender', default = '', type = str)
    date = request.args.get('date', default = '', type = str)

    current_user = active_users[uuid]

    # Data not yet processed
    if not (current_user.processed_data):
        return jsonify({"code": 200})

    sentiment_stats = current_user.sentiment_stats.retrieve_stats(sender, date)
    return jsonify(sentiment_stats)

@app.route("/api/get-crud-stats/<uuid>", methods=["GET"])
@auto.doc()
@cross_origin()
def get_crud_stats(uuid):
    """Requests line graph given parameter of person (me, friend 1, friend 2, etc...)
        and the selected time frame (1 week, 1 month, 3 month, etc...)

    Args:
        uuid (str): user id generated by facebook javascript SDK
        sender (str): name of the sender that the user messages
        date (str): the start date

    Returns:
        JSON: parameters for graph construction
        {
            "graphType": "linegraph"
            "someMetaData": information (str),
            "numMessagesOverTime": [
                {Date (str) : value (int)},
                {"2017-10-23T19:00:00.511Z" : 55},
                ...
                {Date (str) : value (int)}
            ]
        }
    """
    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404})

    current_user = active_users[uuid]

    # Data not yet processed
    if not (current_user.processed_data):
        return jsonify({"code": 200})

    return jsonify(current_user.crud_stats.retrieve_stats())

@app.route("/api/get-topfriends-stats/<uuid>", methods=["GET"])
@auto.doc()
@cross_origin()
def get_topfriends_stats(uuid):
    """Requests line graph given parameter of person (me, friend 1, friend 2, etc...)
        and the selected time frame (1 week, 1 month, 3 month, etc...)

    Args:
        uuid (str): user id generated by facebook javascript SDK
        sender (str): name of the sender that the user messages
        date (str): the start date

    Returns:
        JSON: parameters for graph construction
        {
            "graphType": "linegraph"
            "someMetaData": information (str),
            "numMessagesOverTime": [
                {Date (str) : value (int)},
                {"2017-10-23T19:00:00.511Z" : 55},
                ...
                {Date (str) : value (int)}
            ]
        }
    """
    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404})

    current_user = active_users[uuid]

    # Data not yet processed
    if not (current_user.processed_data):
        return jsonify({"code": 200})

    return jsonify(current_user.topfriends_stats.retrieve_stats())


@app.route("/api/allgraphs/<uuid>", methods=["GET"])
@auto.doc()
def get_all_graphs(uuid):
    """Returns every set of tiles (only called when app is first loaded) with default parameters

    Returns:
        JSON: parameters for all of the homepage graphs

    Args:
        uuid (str): user id generated by facebook javascript SDK
    """
    return None


@app.route("/api/chatbot/<uuid>", methods=["POST"])
@auto.doc()
@cross_origin()
def chat(uuid):
    """Chat with the chatbot

    Args:
        uuid (str): user id generated by facebook javascript SDK
        message (str): user message (sent in the request body)

    Returns:
        JSON: reply to user message (sent in the request body) as:
        {
            "message": message content (str)
        }

    """

    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404})

    current_user = active_users[uuid]

    # TODO add error checking to see if processed data exists, etc.

    if current_user.chatbot is None:
        current_user.initChatbot()

    message = request.json.get('message')
    if message is None:
        message = 'hello'
    message_response = current_user.chatbot.get_response(message)

    return jsonify({"message": message_response})

@app.route('/documentation')
def documentation():
    return auto.html()

@app.route("/api/friend_list/<uuid>", methods=["GET"])
@cross_origin()
def get_friend_list(uuid):
    return jsonify(["Nirmal Krishnan", "Tanay Agarwal"])

@app.route("/api/friends/<uuid>", methods=["GET"])
@cross_origin()
def get_friends(uuid):
    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404})

    current_user = active_users[uuid]

    # Data not yet processed
    if not (current_user.processed_data):
        return jsonify({"code": 200})

    friend_list = current_user.friend_list
    return jsonify(friend_list)

@app.route("/api/whether_uploaded/<uuid>", methods=["GET"])
@cross_origin()
def get_whether_uploaded(uuid):
    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404})

    current_user = active_users[uuid]

    response = {'wasUploaded': current_user.uploaded_data}
    if (current_user.uploaded_data):
        # data uploaded already
        return jsonify(response), 200
    return jsonify(response), 404

@app.route("/api/whether_processed/<uuid>", methods=["GET"])
@cross_origin()
def get_whether_processed(uuid):
    # User not logged in
    if not (uuid in active_users):
        return jsonify({"code": 404})

    current_user = active_users[uuid]

    response = {'wasProcessed': current_user.processed_data}
    if (current_user.processed_data):
        # data processed already
        return jsonify(response), 200
    return jsonify(response), 404


@app.route("/api/test_dummy", methods=["POST"])
@auto.doc()
@cross_origin()
def create_test_dummy():
    uuid = 666
    name = "Test Dummy"
    db = mongo.db.users
    db_user_entry = db.find_one({'UUID':uuid})

    # User already exists
    if not (db_user_entry is None):
        print('USER EXISTS')
        return jsonify({"code": 404}), 404

    current_user = User(name, uuid)
    current_user.upload_data("tests/html/dummy_messages2.csv")
    current_user.process_data()

    active_users[uuid] = current_user

    serialized_user_obj = pickle.dumps(current_user)
    db_user_entry = {"UUID": uuid, "serialized_user_obj": serialized_user_obj}
    db.insert_one(db_user_entry)
    return jsonify({"code": 201})


app.run(host='0.0.0.0', port=5000, threaded=True)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'