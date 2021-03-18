import datetime
from time import sleep
from gpiozero import Button, Buzzer
from RPLCD.i2c import CharLCD

from timer import Timer

from alarm import Alarm

import tinyDB

LCD = CharLCD(i2c_expander='PCF8574', address=0x27, port=1,
              cols=20, rows=4, dotsize=8,
              charmap='A00',
              auto_linebreaks=True,
              backlight_enabled=True)

# buttons
start_stop = Button(17)
pause = Button(27)

# piezo
piezo = Buzzer(22)

BOUNCE = 0.2

try:
    # main loop
    while True:
        #  NB!! average time before a break
        avg_break = tinyDB.getBreakAvg()
        print("avg_break:", avg_break)

        if avg_break == None:
            print("avg_break", 1800)
            avg_break = 1800
        
        # timer is instantiated everytime 
        timer = Timer(LCD, False, avg_break, Alarm(piezo))


        study_time = None

        # breaks, each element of a list displays the break duration in seconds
        breaks = []
        # input loop

        # cleared and readied for timer
        LCD.clear()
        while True:
            sleep(BOUNCE)
            if start_stop.is_active:
                # timer has not been started
                if not timer.running and not timer.paused:
                    timer.start()
                    print("started timer")
                # timer has been started, but not paused
                elif timer.running:
                    timer.stop()
                    LCD.clear()
                    LCD.cursor_pos = (1,3)
                    LCD.write_string("Timer stopped")
                    study_time = timer.time
                    print("Study time was {} seconds".format(study_time))
                    sleep(1)
                    break

            if pause.is_active:
                if timer.running:
                    timer.pause()
                    LCD.clear()
                    pause_timer = Timer(LCD, break_thread=True, suggested_break=None, alarm=None)
                    pause_timer.start()
                else:
                    try:
                        pause_timer.stop()
                    except Exception:
                        print("Cant pause before starting!")
                        continue
                    breaks.append([pause_timer.time, pause_timer.start_time, pause_timer.end_time])
                    print("break lasted {} seconds".format(pause_timer.time))
                    timer.resume()

        
        start = timer.start_time
        end = timer.end_time

        # adding the study session to the db
        tinyDB.addDatabase(start, study_time, breaks)

        print("[{}, {}]".format(study_time, breaks))

except KeyboardInterrupt:
    print("\nkilled")