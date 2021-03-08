from time import sleep
from datetime import datetime
from threading import Thread

class Timer(Thread):
    'Timer functionality, extends Thread'
    def __init__(self, lcd, break_thread = False):
        super(Timer, self).__init__()
        self.daemon = True
        self.LCD = lcd
        
        'breakthread defaults to False'
        self.break_thread = break_thread

        self.start_time = None

        self.stopped = False
        self.running = False
        self.paused = False
        self.time = 0
    
    # main loop, begins when Thread.start() is called
    def run(self):
        self.start_time = datetime.now()
        self.running = True
        while not self.stopped:
            if self.running:
                self.time += 1
                if not self.break_thread:
                    self.LCD.cursor_pos = (0, 6)
                    self.LCD.write_string("Running:")
                else:
                    self.LCD.cursor_pos = (0, 7)
                    self.LCD.write_string("Paused:")

                self.LCD.cursor_pos = (1, 9)
                self.LCD.write_string("               ")
                self.LCD.cursor_pos = (1, 9)
                self.LCD.write_string(str(self.time))
                sleep(1)
            sleep(0.1)

    def resume(self):
        self.running = True
        self.paused = False

    def pause(self):
        self.running = False
        self.paused = True

    def stop(self):
        self.stopped = True

    