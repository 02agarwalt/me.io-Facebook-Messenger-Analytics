#!/bin/bash

if [ $1 == "tests" ] ; then
    cd me.io
    nosetests --with-coverage --cover-package=myuser,userfreqstats,chatbot,wordlestats,chatfreqstats,sentimentstats,crudstats,topfriendsstats src/tests/*.py
else
    cd me.io/src
    python controller.py & npm --prefix ../front_end/ start && fg
fi
