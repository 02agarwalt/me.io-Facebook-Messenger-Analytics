from abc import ABCMeta, abstractmethod

class Statistic(object):
    __metaclass__ = ABCMeta

    @abstractmethod
    def populate_stats(self):
        pass

    @abstractmethod
    def retrieve_stats(self):
        pass
