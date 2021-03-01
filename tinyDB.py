# -*- coding: utf-8 -*-
"""
Created on Mon Mar  1 09:52:02 2021

@author: mikae
"""

from datetime import date
from tinydb import TinyDB, Query

today = date.today()
d1 = today.strftime("%d/%m/%Y")

db = TinyDB('db.json')

studyTime = 0
breakLength = [1,2,3,4,5]
breaks = len(breakLength)

db.insert({"paiva": d1, "Opiskeluaika" : studyTime, "Taukojen lkm": breaks, "Taukojen pituudet": breakLength})

