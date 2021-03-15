from time import time, sleep
from datetime import datetime as dt
from threading import Thread

class Timer(Thread):
    'Timer functionality, extends Thread'
    def __init__(self, lcd, break_thread, suggested_break, alarm):
        super(Timer, self).__init__()
        self.daemon = True
        self.LCD = lcd
        
        'breakthread defaults to False'
        self.break_thread = break_thread

        self.suggested_break = suggested_break

        self.alarm = alarm

        self.start_time = None

        self.stopped = False
        self.running = False
        self.paused = False
        self.time = 0
    
    # main loop, begins when Thread.start() is called
    def run(self):
        self.start_time = dt.now()
        self.end_time = None
        self.running = True
        if self.alarm is not None:
            self.alarm.start()
        start = time()
        while not self.stopped:
            if self.running:
                self.time = int(time() - start)
                if not self.break_thread:
                    self.LCD.cursor_pos = (0, 6)
                    self.LCD.write_string("Running:")
                    mod = self.time % self.suggested_break
                    if self.time != 0 and mod == 0 :
                        self.alarm.activate()
                    elif mod >= 6:
                        self.alarm.stop()
            
                else:
                    self.LCD.cursor_pos = (0, 7)
                    self.LCD.write_string("Paused:")

                self.LCD.cursor_pos = (1, 9)
                self.LCD.write_string("               ")
                self.LCD.cursor_pos = (1, 9)
                self.LCD.write_string(str(self.time))
                sleep(0.2)
            sleep(0.1)

        if self.alarm is not None:
            self.alarm.stop()

    def resume(self):
        self.running = True
        self.paused = False

    def pause(self):
        self.running = False
        self.paused = True
        self.alarm.stop()

    def stop(self):
        self.stopped = True
        self.end_time = dt.now()

    