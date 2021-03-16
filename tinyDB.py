# -*- coding: utf-8 -*-
"""
Created on Mon Mar  1 09:52:02 2021

@author: mikae
"""
import datetime as dt
from tinydb import TinyDB, Query

#testvalues

#now = dt.datetime.now()
#testStart1 = dt.datetime(2021, 3, 16, 16, 30)
#testStop1 = dt.datetime(2021, 3, 16, 16, 45)

#testStart2 = dt.datetime(2021, 3, 16, 17, 00)
#testStop2 = dt.datetime(2021, 3, 16, 17, 30)

#testDate = now
#testStudyTime = 5

#[[kesto, tauonalotus, lopetus]]
#testBreakLength = [[10,testStart1,testStop1],[12,testStart2,testStop2]]
#testBreakLengthEmpty = []


db = TinyDB('db.json')
breakLengthDB = TinyDB('breakLengthDB.json')

def addDatabase(start, studyTime, breakLength):
    
    saveAvgBreak(start, breakLength)
    
    convertedBreaks = []
    for i in breakLength:
        temp = []
        temp.append(i[0])
        temp.append(str(i[1]))
        temp.append(str(i[2]))
        convertedBreaks.append(temp)
        
    breaks = len(breakLength)
    db.insert({"paiva": str(start), "Opiskeluaika" : studyTime, "Taukojen_lkm": breaks, "Taukojen_pituudet": convertedBreaks})
    
    
    
def getBreakAvg():
    #if list is empty insert avg, else get avg and calculate new avg
    if not breakLengthDB:
        return None
    else:
        for i in breakLengthDB:
            avg = i.get("Taukojen_valit")
            return (sum(avg)/len(avg))

def saveAvgBreak(start, breakLength):
    
    if not breakLength:
        return
    
    times = []
    times.append(breakLength[0][1]-start)
    
    i = 0
    while i < len(breakLength):
        if (i + 1 >= len(breakLength)):
            break;
        else:
            times.append(breakLength[i+1][2]-breakLength[i][1])
            i += 1
       
    seconds = []

    for i in times:
        seconds.append(i.total_seconds())
          
    if not breakLengthDB:
        breakLengthDB.insert({"Taukojen_valit" : seconds})
    else:
       for i in breakLengthDB:
           avg = i.get("Taukojen_valit")
           avg.extend(seconds)
           breakLengthDB.truncate()
           breakLengthDB.insert({"Taukojen_valit" : avg})
            
#testing
#addDatabase(testDate,testStudyTime,testBreakLengthEmpty)
#print(getBreakAvg())

