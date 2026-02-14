# routers/schedule.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models
import schemas

router = APIRouter(
    prefix="/schedules",
    tags=["Schedules"]
)

# DB 세션 연결
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔥 일정 저장
@router.post("/", response_model=schemas.ScheduleResponse)
def create_schedule(schedule: schemas.ScheduleCreate, db: Session = Depends(get_db)):
    new_schedule = models.Schedule(
        day=schedule.day,
        memo=schedule.memo,
        time=schedule.time
    )
    db.add(new_schedule)
    db.commit()
    db.refresh(new_schedule)
    return new_schedule


# 🔥 전체 조회
@router.get("/", response_model=list[schemas.ScheduleResponse])
def get_schedules(db: Session = Depends(get_db)):
    return db.query(models.Schedule).all()


# 🔥 삭제
@router.delete("/{schedule_id}")
def delete_schedule(schedule_id: int, db: Session = Depends(get_db)):
    schedule = db.query(models.Schedule).filter(models.Schedule.id == schedule_id).first()
    if schedule:
        db.delete(schedule)
        db.commit()
        return {"message": "삭제 완료"}
    return {"message": "데이터 없음"}
