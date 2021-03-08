# -*- coding: utf-8 -*-
"""
Created on Mon Mar  1 09:52:02 2021

@author: mikae
"""


from tinydb import TinyDB, Query

#studyTime = 0
#breakLength = [2,2]

db = TinyDB('db.json')
breakLengthDB = TinyDB('breakLengthDB.json')

def addDatabase(date, studyTime, breakLength):
    
    breaks = len(breakLength)
    db.insert({"paiva": date, "Opiskeluaika" : studyTime, "Taukojen_lkm": breaks, "Taukojen_pituudet": breakLength})
    
    getBreakAvg(breakLength)
    
    
def getBreakAvg(breakLength):
    
    avg = sum(breakLength)/len(breakLength)
   
    #if list is empty insert avg, else get avg and calculate new avg
    if not breakLengthDB:
        breakLengthDB.insert({"Taukojen_keskiarvo" : avg})
        return avg
    else:
        for i in breakLengthDB:
            tmp = i.get("Taukojen_keskiarvo")
            tmp = (avg + tmp) / 2
            breakLengthDB.truncate()
            breakLengthDB.insert({"Taukojen_keskiarvo" : tmp})
            return tmp