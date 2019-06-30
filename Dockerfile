FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y zip unzip
RUN apt-get install -y git wget vim python-nose python-coverage

RUN apt-get install -y python-dev
RUN wget https://bootstrap.pypa.io/get-pip.py
RUN python get-pip.py

RUN pip install pandas flask flask_cors flask-autodoc textblob
RUN python -m textblob.download_corpora
RUN pip install fbchat-archive-parser flask_pymongo
RUN apt-get install -y python-dateutil
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y npm

COPY . /me.io
RUN cd /me.io/front_end && npm install
COPY ./entrypoint.sh /

# and add it as an entrypoint
ENTRYPOINT ["/entrypoint.sh"]
