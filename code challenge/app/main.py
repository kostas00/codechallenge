from typing import List
from fastapi import Depends, FastAPI, HTTPException, Form, Query
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
import os; 
from fastapi_login import LoginManager
from api import db_manager
from api import models
from api import schemas
from datetime import date
from api.db import SessionLocal, engine
from fastapi_login.exceptions import InvalidCredentialsException
from fastapi.encoders import jsonable_encoder


models.Base.metadata.create_all(bind=engine)

app = FastAPI()
# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/skills", response_model=List[schemas.skills])
def read_skills(skip: int = 0, db: Session = Depends(get_db)):
    skills = db_manager.get_skills(db, skip=skip)
    return skills    

@app.get("/viewskill",response_model=schemas.skills)
def get_skill_by_id(skillid:int, db: Session = Depends(get_db)):
    print(skillid)
    res= db_manager.get_skill_by_id(db=db,skillid=skillid)
    return res       

@app.put("/skills/{skill_id}")
def update_skill(skill_id:int,skill:schemas.SkillsCreate, db: Session = Depends(get_db)):
    #update_skill_encoded = jsonable_encoder(skill)
    print(skill.name)
    res = db_manager.updateskill(db=db ,skill_id=skill_id  ,skill=skill)
    return  res

@app.get("/deleteskill/")
def delete_skills(skillid:int, db: Session = Depends(get_db)):
    print(skillid)
    res= db_manager.delete_skill(db,skillid)
    return res   

@app.post('/addskill',response_model=schemas.skills)
def add_skill(name: str ,description: str, db: Session = Depends(get_db)):
    db_skill = db_manager.get_skill_by_name(db, name=name)
    if db_skill:
        raise HTTPException(status_code=400, detail="Skill already exists")
    return db_manager.create_skill(db=db,name = name,description = description)
 
 #--------------------------employees apis----------------------

@app.get("/employees", response_model=List[schemas.Employee])
def read_employees(skip: int = 0, db: Session = Depends(get_db)):
    employees = db_manager.get_employees(db, skip=skip)
    return employees

@app.post("/employees/")
def delete_employees_by_ids(q:List[int]=Query(None)):
    for i in q:
        print(i)
    return{"q":q}

@app.get("/employeeid/",response_model=schemas.Employee)
def get_employee_by_id(employeeid:int, db: Session = Depends(get_db)):
    print(employeeid)
    res= db_manager.get_employee_by_id(employeeid=employeeid,db=db)
    return res   

@app.put("/employee/{employee_id}")
def update_employee(emid:int,em:schemas.EmployeeCreate, db: Session = Depends(get_db)):
    #update_skill_encoded = jsonable_encoder(skill)
    print(em.name)
    res = db_manager.update_employee(db=db ,emid=emid  ,em=em)
    return  res

@app.get("/employee/{employee_id}")
def delete_employee_by_id(emid:int, db: Session = Depends(get_db)):
    print(emid)
    res= db_manager.delete_employee_by_id(db,emid)
    return res       

@app.get("/employeeskills",response_model=List[schemas.skills])
def get_employees_skills(emid:int, db: Session = Depends(get_db)):
    print(emid)
    res= db_manager.get_employees_skills(db,emid)
    return res      

@app.get("/addskilltoemployee")  
def add_skill_to_employee(emid:int,skillid:int,db: Session = Depends(get_db)):
    res= db_manager.add_skill_to_employee(db,emid,skillid)
    return res
 
@app.get("/deleteskillfromemployee")  
def delete_skill_from_employee(emid:int,skillid:int,db: Session = Depends(get_db)):
    res= db_manager.delete_skill_from_employee(db,emid,skillid)
    return res 

@app.post('/createemployee',response_model=schemas.Employee)
def create_employee(name: str = Form(...),surname: str = Form(...),hiringdate: date = Form(...),skills:List[int]=Query(None)  ,db: Session = Depends(get_db)):
    db_skill = db_manager.get_employee_by_name(db=db, name=name)
    if db_skill:
        raise HTTPException(status_code=400, detail="Employee already exists")
    return db_manager.create_employee(db=db,name = name,surname = surname,hiringdate=hiringdate,skills=skills)
 
@app.get("/employeediffkills/", response_model=List[schemas.skills])
def get_employee_diff_skills(employeeid:int, db: Session = Depends(get_db)):
    print(employeeid)
    res= db_manager.get_employee_diff_skills(db,employeeid)
    return res   