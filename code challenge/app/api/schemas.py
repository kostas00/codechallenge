from typing import List, Optional
from pydantic import BaseModel
from datetime import date, datetime, time, timedelta

class EmployeeBase(BaseModel):
    id: int

class EmployeeCreate(EmployeeBase):
    name : str
    surname : str
    hiringdate : date
   

class Employee(EmployeeBase):
    id: int
    name : str
    surname : str
    hiringdate : date   
    class Config:
        orm_mode = True

class Links(BaseModel):
    employeeid : int
    skillid : int

class SkillsBase(BaseModel):
    id: int

class SkillsCreate(SkillsBase):
    name : str
    details : str
    dateadded : date
   

class skills(SkillsBase):
    id: int
    name : str
    details : str
    dateadded : date   
    class Config:
        orm_mode = True        