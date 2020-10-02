from sqlalchemy import Boolean, Column, ForeignKey,Sequence, Integer, String,DateTime,Date
from sqlalchemy.orm import relationship
from sqlalchemy.schema import  PrimaryKeyConstraint
from .db import Base
from sqlalchemy.orm import relationship

class Employees(Base):
    __tablename__ = 'employees'
    id = Column(Integer, Sequence('employees_id_seq'), primary_key=True)
    name = Column( String(25))
    surname = Column( String(25))
    hiringdate = Column( DateTime)

class Skills(Base):
    __tablename__ = 'skills'
    id = Column(Integer, Sequence('skills_id_seq'), primary_key=True)
    name = Column( String(25))
    details = Column( String(250))
    dateadded = Column( DateTime)

class Links(Base):
    __tablename__ = 'links'
    __table_args__ = (
        PrimaryKeyConstraint('employeeid', 'skillid'),
    )
    employeeid=Column(Integer, ForeignKey('employees.id', onupdate='CASCADE', ondelete='CASCADE'))
    skillid=Column(Integer, ForeignKey('skills.id', onupdate='CASCADE', ondelete='CASCADE'))