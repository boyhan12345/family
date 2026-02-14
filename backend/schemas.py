from pydantic import BaseModel
from datetime import date

class ScheduleBase(BaseModel):
    title: str
    date: date
    time: str
    owner: str   # ✅ 추가

class ScheduleCreate(ScheduleBase):
    pass

class ScheduleResponse(ScheduleBase):
    id: int

    class Config:
        from_attributes = True
