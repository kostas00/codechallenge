from sqlalchemy.orm import Session
from api import models, schemas
import requests
import asyncio
from typing import List

import hashlib, binascii, os
from sqlalchemy import literal
from fastapi.responses import JSONResponse
import logging
from datetime import date
from sqlalchemy import exc

def get_employees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Employees).offset(skip).limit(limit).all()
    
    
def get_skills(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Skills).all()

def get_skill_by_id(db: Session,skillid:int):
    return db.query(models.Skills).filter(models.Skills.id == skillid).first()


def get_skill_by_name(db: Session, name: str):
    return db.query(models.Skills).filter(models.Skills.name == name).first()


def updateskill( db: Session, skill_id : int, skill:schemas.SkillsCreate):
    print(skill.name)
    print(skill_id)
    res = db.query(models.Skills).filter(models.Skills.id==skill_id).update({models.Skills.name:skill.name,models.Skills.details:skill.details,
    models.Skills.dateadded:skill.dateadded},
     synchronize_session = False)  
    db.commit()
    print(res)  
    if res == 1:
        return "Field Updated Successfully!"
    else:
        return JSONResponse(status_code=404, content={"message": "Item not found"})


def delete_skill(db:Session,skillid:int):
    linkres = db.query(models.Links).filter(models.Links.skillid==skillid).delete()
    print(linkres)
    res = db.query(models.Skills).filter(models.Skills.id==skillid).delete()
    db.commit()
    if res > 0:
        return "Field Deleted Successfully!"
    else:
        return JSONResponse(status_code=404, content={"message": "Item not found"})

def create_skill(db:Session,name:str,description:str):
    db_skill=models.Skills(name=name,details=description,dateadded=date.today())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

#--------------------------employee methods---------------------------
# 


def get_employee_by_id(employeeid:int, db: Session):
    return db.query(models.Employees).filter(models.Employees.id == employeeid).first()

def get_employee_by_name(db: Session, name: str):
    return db.query(models.Employees).filter(models.Employees.name == name).first()

def create_employee(db: Session, name : str, surname:str, hiringdate:date,skills:List[int]):
    db_em=models.Employees(name=name,surname=surname,hiringdate=hiringdate)
    db.add(db_em)
    db.commit()  
    db.refresh(db_em)
    emid= db.query(models.Employees).filter(models.Employees.name == name).first()
    for i in skills:
      db_link=models.Links(employeeid=emid.id,skillid=i)
      db.add(db_link)
    db.commit()  
    return db_em


def update_employee( db: Session, emid : int, em:schemas.EmployeeCreate):
    print(em.name)
    print(emid)
    res = db.query(models.Employees).filter(models.Employees.id==emid).update({models.Employees.name:em.name,models.Employees.surname:em.surname,
    models.Employees.hiringdate:em.hiringdate},
     synchronize_session = False)  
    db.commit()
    print(res)  
    if res == 1:
        return "Field Updated Successfully!"
    else:
        return JSONResponse(status_code=404, content={"message": "Item not found"})

def delete_employee_by_id(db:Session,emid:int):
    db.query(models.Links).filter(models.Links.employeeid==emid).delete()
    #print(linkres.skillid)
    res = db.query(models.Employees).filter(models.Employees.id==emid).delete()
    db.commit()
    if res > 0:
        return "Field Deleted Successfully!"
    else:
        return JSONResponse(status_code=404, content={"message": "Item not found"})


def get_employees_skills(db:Session,emid:int):
    print(emid)
    linkres = db.query(models.Links).filter(models.Links.employeeid==emid).all()
    print(len(linkres))
    skillsid=[]
    for i in range(len(linkres)):
        skillsid.append(linkres[i].skillid)
    print(skillsid)   
    skillres = db.query(models.Skills).filter(models.Skills.id.in_(skillsid)).all()
    return skillres

def add_skill_to_employee(db:Session,emid:int,skillid:int):
    db_link=models.Links(employeeid=emid,skillid=skillid)
    db.add(db_link)
    try:
        db.commit()
        db.refresh(db_link)
        res="skill inserted!"
        return res
    except exc.SQLAlchemyError:
        res="something went wrong"
        return res
    
def delete_skill_from_employee(db:Session,emid:int,skillid:int):
    db_link=db.query(models.Links).filter(models.Links.employeeid==emid,models.Links.skillid==skillid).delete()    
    print(db_link)
    try:
        db.commit()
        #db.refresh(db_link)
        if db_link > 0:
            return "Field Deleted Successfully!"
        else:
            return JSONResponse(status_code=404, content={"message": "Item not found"})
    except exc.SQLAlchemyError:
        res="something went wrong"
        return res   

def get_employee_diff_skills(db:Session,employeeid:int):
    linkres = db.query(models.Links).filter(models.Links.employeeid==employeeid).all()
    print(len(linkres))
    skillsid=[]
    for i in range(len(linkres)):
        skillsid.append(linkres[i].skillid)
    print(skillsid)   
    skillres = db.query(models.Skills).filter(models.Skills.id.notin_(skillsid)).all()
    return skillres
