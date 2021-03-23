from time import sleep
from threading import Thread

class Alarm(Thread):
    ''' activate(), stop(), kill() '''
    def __init__(self, piezo):
        super(Alarm, self).__init__(daemon=True)
        self.piezo = piezo
        self.alive = True
        self.active = False

    def run(self):
        while self.alive:
            if self.active:
                self.piezo.on()
                sleep(0.1)
                self.piezo.off()
                sleep(0.1)
                self.piezo.on()
                sleep(0.1)
                self.piezo.off()
                sleep(0.1)
                self.piezo.on()
                sleep(0.1)
                self.piezo.off()
                sleep(0.7)
            sleep(0.1)

    def activate(self):
        self.active = True

    def stop(self):
        self.active = False

    def kill(self):
        self.alive = False